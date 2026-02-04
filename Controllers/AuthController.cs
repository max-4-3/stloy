using back_end.Services;
using back_end.Models;
using Microsoft.AspNetCore.Mvc;

namespace back_end.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController(IAuthService authService) : ControllerBase
    {
        [HttpPost("register")]
        public ActionResult<UserDB> Register(UserLogin request)
        {
            var user = authService.Register(request);
            if (user is null)
                return BadRequest("Already exists.");
            return Ok(user);
        }

        [HttpPost("login")]
        public ActionResult<TokenResponse> Login(UserLogin request)
        {
            var result = authService.Login(request);
            if (result is null)
                return BadRequest("Invalid username or password.");

            return Ok(result);
        }

        [HttpGet("config")]
        public ActionResult<UserConfigResponse> GetUserId(UserLogin request)
        {
            var result = authService.GetUserConfig(request);
            if (result is null) return Unauthorized("Relogin");
            return Ok(result);
        }

        [HttpPost("refresh")]
        public ActionResult<TokenResponse> RefreshToken(RefreshTokenRequest request)
        {
            var result = authService.RefreshToken(request);
            if (result is null || result.AccessToken is null || result.RefreshToken is null)
                return Unauthorized("Invalid refresh token.");

            return Ok(result);
        }
    }
}
