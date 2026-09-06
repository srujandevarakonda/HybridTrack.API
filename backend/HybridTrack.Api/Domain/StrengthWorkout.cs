namespace HybridTrack.Api.Domain;

public class StrengthWorkout
{
    public Guid Id { get; set; }
    public DateTimeOffset StartedAt { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? Notes { get; set; }
    public ICollection<StrengthSet> Sets { get; set; } = new List<StrengthSet>();
}
