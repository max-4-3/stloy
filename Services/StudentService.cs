using back_end.Context;
using back_end.Models;
using Microsoft.EntityFrameworkCore;

namespace back_end.Services
{
    public class StudentService(DBContext _c) : IStudentService
    {
        public IEnumerable<StudentResponse> GetStudents(int start, int chunk)
        {
            Console.WriteLine("Getting All Students!");
            List<StudentResponse> students = [];
            foreach (Student student in _c.Students.Include(s => s.Salery))
            {
                StudentResponse? s = Convert(student);
                if (s == null) continue;
                students.Add(s);
            }
            Console.WriteLine($"Got Students: {students}!");
            return students;
        }

        public StudentResponse? GetStudent(int EmpId)
        {
            var s = _c.Students.Include(s => s.Salery).FirstOrDefault(s => s.EmpId == EmpId);
            Console.WriteLine($"Got Student: {s} [{EmpId}]!");
            return Convert(s);
        }

        public StudentResponse? AddStudent(StudentAdd student)
        {
            Console.WriteLine($"Attempting to add student: {student}...");
            if (StudentExists(student))
            {
                Console.WriteLine("Student already exists!");
                return null;
            }

            EmpSalery salery = new()
            {
                Salery = 1_000_000,
            };

            // Salery Logic
            salery.Salery /= student.Designation.ToLower() switch
            {
                "manager" => 1,
                "clerk" => 20,
                "peon" => 40,
                _ => salery.Salery,
            };

            Student student1 = Convert(student);
            student1.Salery = salery;
            student1.EmpId = student.GetHashCode();

            _c.Students.Add(student1);
            _c.SaveChanges();

            var response = Convert(student1);

            Console.WriteLine($"Added Student: {response}!");
            return response;
        }

        public StudentResponse? UpdateStudent(int EmpId, StudentUpdate student)
        {
            // Didn't included Salery so it should be null
            Console.WriteLine($"Attempting to update student: {student} [{EmpId}]");
            var existingStudent = _c.Students.Include(s => s.Salery).FirstOrDefault(s => s.EmpId == EmpId);
            if (existingStudent == null)
            {
                Console.WriteLine("Student doesn't exists!");
                return null;
            }

            var properties = typeof(StudentUpdate).GetProperties();
            foreach (var prop in properties)
            {
                var newValue = prop.GetValue(student);
                if (newValue == null) continue;

                var targerProp = existingStudent.GetType().GetProperty(prop.Name);
                if (targerProp != null && targerProp.CanWrite) targerProp.SetValue(existingStudent, newValue);
            }

            _c.SaveChanges();
            StudentResponse? response = Convert(existingStudent);
            Console.WriteLine($"Updated Student: {response} [{EmpId}]");
            return response;
        }

        private bool StudentExists(StudentBase student)
        {
            return _c.Students.FirstOrDefault(s => s.Name == student.Name && student.Mobile == s.Mobile && s.Email == student.Email) != null;
        }

        private static StudentResponse? Convert(Student? s)
        {
            if (s == null)
            {
                Console.WriteLine($"Received Empty Student object to be Converted to Response: {s}");
                return null;
            }

            return new ()
            {
                EmpId = s.EmpId,
                Name = s.Name,
                Mobile = s.Mobile,
                Email = s.Email,
                Designation = s.Designation,
                Salery = s.Salery?.Salery ?? 0,
            };
        }

        private static Student Convert(StudentAdd s)
        {
            return new()
            {
                Name = s.Name,
                Mobile = s.Mobile,
                Email = s.Email,
                Designation = s.Designation,
            };
        }

    }
}
