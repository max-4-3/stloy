using Microsoft.AspNetCore.Mvc;
using back_end.Models;
using back_end.Services;
using Microsoft.AspNetCore.Authorization;

namespace back_end.Controllers
{
    [ApiController]
    [Authorize(Roles = "Admin")]
    [Route("api")]
    public class IDKController(IStudentService _s) : ControllerBase
    {

        [HttpGet("students")]
        public ActionResult<IEnumerable<StudentResponse>> GetStudents()
        {
            return Ok(_s.GetStudents(0, 0));
        }

        [Authorize(Roles = "Employer")]
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
