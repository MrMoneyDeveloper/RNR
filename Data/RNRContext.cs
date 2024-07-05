using Microsoft.EntityFrameworkCore;
using RNR.Models;

namespace RNR.Data
{
    public class RNRContext : DbContext
    {
        public RNRContext(DbContextOptions<RNRContext> options) : base(options)
        {
        }

        public DbSet<Breakdown> Breakdowns { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Breakdown>()
                .HasIndex(b => b.BreakdownReference)
                .IsUnique();
        }
    }
}
