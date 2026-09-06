namespace HybridTrack.Api.Domain;

public class StrengthSet
{
    public Guid Id { get; set; }
    public Guid StrengthWorkoutId { get; set; }
    public string ExerciseName { get; set; } = string.Empty;
    public int SetNumber { get; set; }
    public int Repetitions { get; set; }
    public decimal WeightKg { get; set; }
    public StrengthWorkout StrengthWorkout { get; set; } = null!;
}
