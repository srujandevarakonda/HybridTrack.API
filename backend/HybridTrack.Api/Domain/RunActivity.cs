namespace HybridTrack.Api.Domain;

public class RunActivity
{
    public Guid Id { get; set; }
    public DateTimeOffset StartedAt { get; set; }
    public decimal DistanceKm { get; set; }
    public TimeSpan Duration { get; set; }
    public string? Notes { get; set; }
}
