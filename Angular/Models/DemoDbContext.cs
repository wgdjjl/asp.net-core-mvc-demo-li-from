using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Demo.Models
{
    public partial class DemoDbContext : DbContext
    {
        public DemoDbContext()
        {
        }

        public DemoDbContext(DbContextOptions<DemoDbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<BankInfo> BankInfo { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlite("Filename=DB/data.sqlite");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<BankInfo>(entity =>
            {
                entity.HasIndex(e => e.Id)
                    .IsUnique();

                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.BankCode)
                    .IsRequired()
                    .HasColumnType("STRING");

                entity.Property(e => e.BankType).HasColumnType("INT");

                entity.Property(e => e.BranchCode)
                    .IsRequired()
                    .HasColumnType("STRING");

                entity.Property(e => e.BranchType).HasColumnType("INT");

                entity.Property(e => e.Furigana).IsRequired();

                entity.Property(e => e.Name).IsRequired();
            });
        }
    }
}
