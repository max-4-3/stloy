using Microsoft.AspNetCore.Mvc;
using back_end.Models;
using back_end.Services;

namespace back_end.Controllers
{
    [ApiController]
    [Route("api")]
    public class IDKController(IStudentService _s) : ControllerBase
    {

        [HttpGet("students")]
        public ActionResult<IEnumerable<StudentResponse>> GetStudents()
        {
            return Ok(_s.GetStudents(0, 0));
        }

        [HttpGet("student/{EmpId}")]
        public ActionResult<StudentResponse> GetStudent(int EmpId)
        {
            StudentResponse? student = _s.GetStudent(EmpId);
            return student != null ? Ok(student) : NotFound($"Not able to Found student by id {EmpId}!");
        }

        [HttpPost("student")]
        public ActionResult<StudentResponse> AddStudent(StudentAdd student)
        {
            StudentResponse? s = _s.AddStudent(student);
            return s != null ? Ok(s) : BadRequest("Not able to Add student!");
        }

        [HttpPut("student/{EmpId}")]
        public ActionResult<StudentResponse> UpdateStudent(int EmpId, StudentUpdate student)
        {
            StudentResponse? s = _s.UpdateStudent(EmpId, student);
            return s != null ? Ok(s) : BadRequest($"Not able to Update student with EmpId={EmpId}!");
        }
    }
}
