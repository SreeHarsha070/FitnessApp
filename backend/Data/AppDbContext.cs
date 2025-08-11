using Microsoft.EntityFrameworkCore;
using FitTrack90.Backend.Models;

namespace FitTrack90.Backend.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> opts) : base(opts) { }

        public DbSet<WeightLog> WeightLogs { get; set; }
    }
}
