using back_end.Context;
using back_end.Services;
using Microsoft.EntityFrameworkCore;

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
                app.UseSwagger();
                app.UseSwaggerUI();
            }
            app.UseHttpsRedirection();
            app.UseAuthorization();
            app.MapControllers();
            app.Run();
        }

        public static WebApplication BuildBuilder(WebApplicationBuilder builder)
        {
            if (builder.Environment.IsDevelopment())
            {
                builder.Services.AddEndpointsApiExplorer();
                builder.Services.AddSwaggerGen();
            }
            builder.Services.AddControllers();
            builder.Services.AddScoped<IStudentService, StudentService>();
            builder.Services.AddDbContext<DBContext>(o =>
            {
                o.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
                o.EnableSensitiveDataLogging();
            });

            return builder.Build();
        }
    }
}
