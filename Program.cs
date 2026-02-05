using System.IdentityModel.Tokens.Jwt;
using System.Text;
using back_end.Context;
using back_end.Models;
using back_end.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Scalar.AspNetCore;

namespace back_end
{
    public class Program
    {
        public static void Main(string[] args)
        {
            WebApplication app = BuildBuilder(WebApplication.CreateBuilder(args));
            RunApplication(app);
        }

        public static void RunApplication(WebApplication app)
        {
            if (app.Environment.IsDevelopment())
            {
                app.MapOpenApi();
                app.MapScalarApiReference();
            }
            app.UseHttpsRedirection();
            app.UseAuthentication();
            app.UseAuthorization();
            app.MapControllers();
            app.Run();
        }

        public static WebApplication BuildBuilder(WebApplicationBuilder builder)
        {
            if (builder.Environment.IsDevelopment())
            {
                builder.Services.AddEndpointsApiExplorer();
                builder.Services.AddOpenApi();
                builder.Services.AddSwaggerGen();
                builder.Services.AddRazorPages();
            }

            builder.Services.AddControllers();
            builder.Services.AddDbContext<DBContext>(o =>
            {
                o.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
                o.EnableSensitiveDataLogging();
            });

            builder.Services.AddScoped<PasswordHasher<UserDB>>();  
            builder.Services.AddScoped<IStudentService, StudentService>();
            builder.Services.AddScoped<IAuthService, AuthService>();

            builder.Services.AddSingleton(sp =>
            {
                var config = sp.GetRequiredService<IConfiguration>();
                return new SymmetricSecurityKey(
                    Encoding.UTF8.GetBytes(config["Jwt:Key"]!));
            });

            builder.Services.AddSingleton(sp =>
            {
                var key = sp.GetRequiredService<SymmetricSecurityKey>();
                return new SigningCredentials(key, SecurityAlgorithms.HmacSha512);
            });

            builder.Services.AddSingleton<JwtSecurityTokenHandler>();

            builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = builder.Configuration["Jwt:Issuer"],
                    ValidAudience = builder.Configuration["Jwt:Audience"],
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"] ?? "HelloWorld"))
                };
            });

            return builder.Build();
        }
    }
}
