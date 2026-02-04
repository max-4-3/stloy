using back_end.Models;

namespace back_end.Services
{
    public interface IAuthService
    {
        UserResponse? Register(UserLogin login);
        TokenResponse? Login(UserLogin login);
        TokenResponse? RefreshToken(RefreshTokenRequest login);
        UserConfigResponse? GetUserConfig(UserLogin login);
    }
}
