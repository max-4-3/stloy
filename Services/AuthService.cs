using back_end.Models;
using back_end.Context;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;

namespace back_end.Services
{
    public class AuthService(DBContext c, IConfiguration _c, PasswordHasher<UserDB> ph, SigningCredentials sc, JwtSecurityTokenHandler jh) : IAuthService
    {
        // static configs
        static private DateTime GetAccesTime()
        {
            return DateTime.UtcNow.AddMinutes(30);
        }

        static private DateTime GetRefreshTime()
        {
            return DateTime.UtcNow.AddDays(7);
        }

        // Interface implementations
        public TokenResponse? Login(UserLogin login)
        {
            var user = c.Users.FirstOrDefault(u => u.Email == login.Email);
            if (user is null)
            {
                return null;
            }
            // Skip password hash checking for Admin since Admin is inserted via raw sql query
            // No longer as Admin is added to db via cli tool that hash the password
            if (ph.VerifyHashedPassword(user, user.HashedPassword, login.Password)
                == PasswordVerificationResult.Failed)
            {
                return null;
            }

            return CreateTokenResponse(user);
        }

        public UserResponse? Register(UserLogin login)
        {
            if (c.Users.Any(u => u.Email == login.Email))
            {
                return null;
            }

            UserDB user = new()
            {
                Email = login.Email,
                Name = login.Name,
                Roles = "Employer",
            };

            user.HashedPassword = ph.HashPassword(user, login.Password);
            c.Users.Add(user);
            c.SaveChanges();

            return new()
            {
                Id = user.Id,
                Name = user.Name,
                Email = user.Email,
            };
        }

        public TokenResponse? RefreshToken(RefreshTokenRequest request)
        {
            var user = ValidateRefreshToken(request.UserId, request.RefreshToken);
            if (user is null)
                return null;

            return CreateTokenResponse(user);
        }

        public UserConfigResponse? GetUserConfig(UserLogin login)
        {
            UserDB? user = c.Users.FirstOrDefault(u => u.Email == login.Email && u.Name == login.Name);
            if (user is null) return null;
            return new()
            {
                UserId = user.Id,
                RefreshTokenValidUntil = user.RefreshTokenExpiryTime ?? DateTime.UtcNow,
            };
        }

        // Helper methods
        private TokenResponse CreateTokenResponse(UserDB user)
        {
            return new()
            {
                AccessToken = CreateToken(user),
                RefreshToken = GenerateAndSaveRefreshToken(user),
            };
        }

        private string CreateToken(UserDB user)
        {
            Claim[] claims =
            [
                new Claim(ClaimTypes.Name, user.Name),
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Role, user.Roles),
                new Claim(ClaimTypes.Email, user.Email),
            ];

            var tokenDescriptor = new JwtSecurityToken(
                issuer: _c.GetValue<string>("Jwt:Issuer"),
                audience: _c.GetValue<string>("Jwt:Audience"),
                claims: claims,
                expires: GetAccesTime(),
                signingCredentials: sc
            );

            return jh.WriteToken(tokenDescriptor);
        }

        private string GenerateAndSaveRefreshToken(UserDB user)
        {
            var refreshToken = GenerateRefreshToken();
            user.RefreshToken = refreshToken;
            user.RefreshTokenExpiryTime = GetRefreshTime();
            c.SaveChanges();
            return refreshToken;
        }

        private static string GenerateRefreshToken()
        {
            var randomNumber = new byte[32];
            using var rng = RandomNumberGenerator.Create();
            rng.GetBytes(randomNumber);
            return Convert.ToBase64String(randomNumber);
        }

        private UserDB? ValidateRefreshToken(Guid userId, string refreshToken)
        {
            var user = c.Users.Find(userId);
            if (user is null || user.RefreshToken != refreshToken
                || user.RefreshTokenExpiryTime <= DateTime.UtcNow)
            {
                return null;
            }

            return user;
        }

    }
}
