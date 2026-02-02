using back_end.Models;

namespace back_end.Services
{
    public interface IStudentService
    {
        public IEnumerable<StudentResponse> GetStudents(int start, int chunk);
        public StudentResponse? GetStudent(int EmpID);
        public StudentResponse? AddStudent(StudentAdd student);
        public StudentResponse? UpdateStudent(int EmpId, StudentUpdate student);
    }
}
