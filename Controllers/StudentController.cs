using Microsoft.AspNetCore.Mvc;
using back_end.Models;
using back_end.Services;
using Microsoft.AspNetCore.Authorization;

namespace back_end.Controllers
{
    [ApiController]
    [Route("api")]
    public class IDKController(IStudentService _s) : ControllerBase
    {

        [Authorize(Roles = "Admin")]
        [HttpGet("students")]
        public ActionResult<IEnumerable<StudentResponse>> GetStudents()
        {
            return Ok(_s.GetStudents(0, 0));
        }

        [Authorize(Roles = "Admin,Employer")]
        [HttpPost("student")]
        public ActionResult<StudentResponse> AddStudent(StudentAdd student)
        {
            StudentResponse? s = _s.AddStudent(student);
            return s != null ? Ok(s) : BadRequest("Not able to Add student!");
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("student/{EmpId}")]
        public ActionResult<StudentResponse> UpdateStudent(int EmpId, StudentUpdate student)
        {
            StudentResponse? s = _s.UpdateStudent(EmpId, student);
            return s != null ? Ok(s) : BadRequest($"Not able to Update student with EmpId={EmpId}!");
        }
    }
}
