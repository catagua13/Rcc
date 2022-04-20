using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using ChatApp.ViewModels;

namespace ChatApp.Data
{
    public class DataContext : IdentityDbContext
    {
        public DataContext(DbContextOptions<DataContext> options)
             : base(options)
        {
        }

        public DbSet<Rcc> Rccs { get; set; }

        public DbSet<RccDetail> RccDetails { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Rcc>().ToTable("Rcc");
            modelBuilder.Entity<RccDetail>().ToTable("RccDetail");
        }
    }

}