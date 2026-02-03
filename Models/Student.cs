using System.ComponentModel.DataAnnotations;

namespace back_end.Models
{
    public class StudentBase
    {
        public int EmpId { get; init; }
        public string? Name { get; init; }
        public string? Email { get; init; }
        public string? Mobile { get; init; }

        override public string ToString()
        {
            return $"EmpId = {EmpId}; Name = {Name}; Email = {Email}; Mobile = {Mobile}";
        }
    }

    public class Student : StudentBase
    {
        [Key]
        public int Id { get; set; }

        [Required]
        new public int EmpId { get; set; }

        [Required]
        required public string Designation { get; set; }

        public virtual EmpSalery? Salery { get; set; }

        override public string ToString()
        {
            return $"[DB] Id = {Id}; EmpId = {EmpId}; Name = {Name}; Email = {Email}; Mobile = {Mobile}; Designation = {Designation}; Salery = {Salery}";
        }
    };

    public class StudentUpdate : StudentBase
    {
    }

    public class StudentAdd : StudentBase
    {
        required public string Designation { get; init; }

        override public string ToString()
        {
            return $"[Add] Name = {Name}; Email = {Email}; Mobile = {Mobile}; Designation = {Designation};";
        }
    }

    public class StudentResponse : StudentBase
    {
        required public string Designation { get; init; }
        public int Salery { get; init; }

        override public string ToString()
        {
            return $"[Response] EmpId = {EmpId}; Name = {Name}; Email = {Email}; Mobile = {Mobile}; Designation = {Designation}; Salery = {Salery}";
        }
    }
}
