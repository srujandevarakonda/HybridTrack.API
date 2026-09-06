using System.ComponentModel.DataAnnotations;

namespace HybridTrack.Api.DTOs;

public class CreateRunActivityDto
{
    [Required]
    public DateTimeOffset StartedAt { get; set; }

    [Range(typeof(decimal), "0.01", "500")]
    public decimal DistanceKm { get; set; }

    [Range(typeof(TimeSpan), "00:00:01", "23:59:59")]
    public TimeSpan Duration { get; set; }

    [MaxLength(2000)]
    public string? Notes { get; set; }
}

public class UpdateRunActivityDto
{
    [Required]
    public DateTimeOffset StartedAt { get; set; }

    [Range(typeof(decimal), "0.01", "500")]
    public decimal DistanceKm { get; set; }

    [Range(typeof(TimeSpan), "00:00:01", "23:59:59")]
    public TimeSpan Duration { get; set; }

    [MaxLength(2000)]
    public string? Notes { get; set; }
}

public class RunActivityResponseDto
{
    public Guid Id { get; set; }
    public DateTimeOffset StartedAt { get; set; }
    public decimal DistanceKm { get; set; }
    public TimeSpan Duration { get; set; }
    public string? Notes { get; set; }

    // Convenience field for the UI - minutes per km. Null if distance is 0.
    public decimal? PaceMinPerKm { get; set; }
}