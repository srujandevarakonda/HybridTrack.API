using System.ComponentModel.DataAnnotations;

namespace HybridTrack.Api.DTOs;

// Note: StrengthWorkoutId comes from the route (nested under /strengthworkouts/{workoutId}/sets),
// not from the request body, so it's not on the Create/Update DTOs.

public class CreateStrengthSetDto
{
    [Required]
    [MaxLength(120)]
    public string ExerciseName { get; set; } = string.Empty;

    [Range(1, 100)]
    public int SetNumber { get; set; }

    [Range(1, 1000)]
    public int Repetitions { get; set; }

    [Range(typeof(decimal), "0", "1000")]
    public decimal WeightKg { get; set; }
}

public class UpdateStrengthSetDto
{
    [Required]
    [MaxLength(120)]
    public string ExerciseName { get; set; } = string.Empty;

    [Range(1, 100)]
    public int SetNumber { get; set; }

    [Range(1, 1000)]
    public int Repetitions { get; set; }

    [Range(typeof(decimal), "0", "1000")]
    public decimal WeightKg { get; set; }
}

public class StrengthSetResponseDto
{
    public Guid Id { get; set; }
    public Guid StrengthWorkoutId { get; set; }
    public string ExerciseName { get; set; } = string.Empty;
    public int SetNumber { get; set; }
    public int Repetitions { get; set; }
    public decimal WeightKg { get; set; }
}