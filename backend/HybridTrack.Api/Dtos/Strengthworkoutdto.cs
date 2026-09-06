using System.ComponentModel.DataAnnotations;

namespace HybridTrack.Api.DTOs;

public class CreateStrengthWorkoutDto
{
    [Required]
    public DateTimeOffset StartedAt { get; set; }

    [Required]
    [MaxLength(120)]
    public string Name { get; set; } = string.Empty;

    [MaxLength(2000)]
    public string? Notes { get; set; }
}

public class UpdateStrengthWorkoutDto
{
    [Required]
    public DateTimeOffset StartedAt { get; set; }

    [Required]
    [MaxLength(120)]
    public string Name { get; set; } = string.Empty;

    [MaxLength(2000)]
    public string? Notes { get; set; }
}

// Lightweight version for list views - no nested sets, keeps list payloads small.
public class StrengthWorkoutSummaryDto
{
    public Guid Id { get; set; }
    public DateTimeOffset StartedAt { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? Notes { get; set; }
    public int SetCount { get; set; }
}

// Full version for the detail view - includes all sets.
public class StrengthWorkoutResponseDto
{
    public Guid Id { get; set; }
    public DateTimeOffset StartedAt { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? Notes { get; set; }
    public List<StrengthSetResponseDto> Sets { get; set; } = new();
}