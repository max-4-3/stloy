using back_end.Models;
using back_end.Context;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace back_end.Services
{
    public class AuthService(DBContext context, IConfiguration configuration) : IAuthService
    {
        public TokenResponse? Login(UserLogin login)
        {
            var user = context.Users.FirstOrDefault(u => u.Email == login.Email);
            if (user is null)
            {
                return null;
            }
            // Skip password hash checking for Admin since Admin is inserted via raw sql query
            if (!user.Roles.Equals("Admin") && new PasswordHasher<UserDB>().VerifyHashedPassword(user, user.HashedPassword, login.Password)
                == PasswordVerificationResult.Failed)
            {
                return null;
            }

            return CreateTokenResponse(user);
        }

        public UserResponse? Register(UserLogin login)
        {
            if (context.Users.Any(u => u.Email == login.Email))
            {
                return null;
            }

            UserDB user = new()
            {
                Email = login.Email,
                Name = login.Name,
                Roles = "Employer",
            };

            user.HashedPassword = new PasswordHasher<UserDB>().HashPassword(user, login.Password);
            context.Users.Add(user);
            context.SaveChanges();

            return new()
            {
                Id = user.Id,
                Name = user.Name,
                Email = user.Email,
                RefreshTokenExpiryTime = DateTime.Now.AddDays(7),
            };
        }

        public TokenResponse? RefreshToken(RefreshTokenRequest request)
        {
            var user = ValidateRefreshToken(request.UserId, request.RefreshToken);
            if (user is null)
                return null;

            return CreateTokenResponse(user);
        }

        private TokenResponse CreateTokenResponse(UserDB user)
        {
            return new()
            {
                AccessToken = CreateToken(user),
                RefreshToken = GenerateAndSaveRefreshToken(user)
            };
        }

        private UserDB? ValidateRefreshToken(Guid userId, string refreshToken)
        {
            var user = context.Users.Find(userId);
            if (user is null || user.RefreshToken != refreshToken
                || user.RefreshTokenExpiryTime <= DateTime.UtcNow)
            {
                return null;
            }

            return user;
        }

        private static string GenerateRefreshToken()
        {
            var randomNumber = new byte[32];
            using var rng = RandomNumberGenerator.Create();
            rng.GetBytes(randomNumber);
            return Convert.ToBase64String(randomNumber);
        }

        private string GenerateAndSaveRefreshToken(UserDB user)
        {
            var refreshToken = GenerateRefreshToken();
            user.RefreshToken = refreshToken;
            user.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(7);
            context.SaveChanges();
            return refreshToken;
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

            var key = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(configuration.GetValue<string>("Jwt:Key")!));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512);

            var tokenDescriptor = new JwtSecurityToken(
                issuer: configuration.GetValue<string>("Jwt:Issuer"),
                audience: configuration.GetValue<string>("Jwt:Audience"),
                claims: claims,
                expires: DateTime.UtcNow.AddDays(1),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(tokenDescriptor);
        }
    }
}
