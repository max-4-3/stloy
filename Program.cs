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
            if (args.Any((arg) => arg.Equals("create"))) {
                AddUser();
            }
            WebApplication app = BuildBuilder(WebApplication.CreateBuilder(args));
            RunApplication(app);
        }

        private static void AddUser()
        {
            // Load appsettings.json from API project
            var config = new ConfigurationBuilder()
                .AddJsonFile("appsettings.json")
                .Build();

            var options = new DbContextOptionsBuilder<DBContext>()
                .UseSqlServer(config.GetConnectionString("DefaultConnection"))
                .Options;

            using var db = new DBContext(options);

            Console.Write("Name: ");
            var name = Console.ReadLine();

            Console.Write("Email: ");
            var email = Console.ReadLine();

            Console.Write("Password: ");
            var password = Console.ReadLine();

            Console.Write("Roles (comma seprated): ");
            var roles = Console.ReadLine();

            if (db.Users.Any(u => u.Email == email))
            {
                Console.WriteLine("User already exists!");
                return;
            }

            var hasher = new PasswordHasher<UserDB>();

            var admin = new UserDB
            {
                Id = Guid.NewGuid(),
                Email = email!,
                Name = name!,
                Roles = roles!,
            };

            admin.HashedPassword = hasher.HashPassword(admin, password!);

            db.Users.Add(admin);
            db.SaveChanges();

            Console.WriteLine($"✅ User created successfully with {roles} roles.");
            IEnumerable<UserDB> users = db.Users;
            if (users.Any())
            {
                Console.WriteLine("Admins:");
                foreach (UserDB user in users)
                {
                    Console.WriteLine($"Name = {user.Name}; Email = {user.Email}; Roles = {user.Roles}; Id = {user.Id}");
                }
            }
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
