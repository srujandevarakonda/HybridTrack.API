using HybridTrack.Api.Domain;
using Microsoft.EntityFrameworkCore;

namespace HybridTrack.Api.Data;

public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : DbContext(options)
{
    public DbSet<StrengthWorkout> StrengthWorkouts => Set<StrengthWorkout>();
    public DbSet<StrengthSet> StrengthSets => Set<StrengthSet>();
    public DbSet<RunActivity> RunActivities => Set<RunActivity>();
    public DbSet<BodyMeasurement> BodyMeasurements => Set<BodyMeasurement>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<StrengthWorkout>(entity =>
        {
            entity.Property(workout => workout.Name).HasMaxLength(120).IsRequired();
            entity.Property(workout => workout.Notes).HasMaxLength(2000);
            entity.HasMany(workout => workout.Sets).WithOne(set => set.StrengthWorkout)
                .HasForeignKey(set => set.StrengthWorkoutId).OnDelete(DeleteBehavior.Cascade);
        });

        modelBuilder.Entity<StrengthSet>(entity =>
        {
            entity.Property(set => set.ExerciseName).HasMaxLength(120).IsRequired();
            entity.Property(set => set.WeightKg).HasPrecision(8, 2);
        });

        modelBuilder.Entity<RunActivity>(entity =>
        {
            entity.Property(run => run.DistanceKm).HasPrecision(8, 2);
            entity.Property(run => run.Notes).HasMaxLength(2000);
        });

        modelBuilder.Entity<BodyMeasurement>(entity =>
        {
            entity.Property(measurement => measurement.WeightKg).HasPrecision(8, 2);
            entity.Property(measurement => measurement.BodyFatPercentage).HasPrecision(5, 2);
            entity.Property(measurement => measurement.WaistCm).HasPrecision(8, 2);
        });
    }
}
