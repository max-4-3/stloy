using back_end.Models;
using Microsoft.EntityFrameworkCore;

namespace back_end.Context
{
    public class DBContext : DbContext
    {
        public DBContext(DbContextOptions<DBContext> o) : base(o) { }
        public DbSet<Student> Students { get; set; }
        public DbSet<EmpSalery> EmpSaleries { get; set; }
    }
}
