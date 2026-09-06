namespace HybridTrack.Api.Domain;

public class BodyMeasurement
{
    public Guid Id { get; set; }
    public DateTimeOffset MeasuredAt { get; set; }
    public decimal WeightKg { get; set; }
    public decimal? BodyFatPercentage { get; set; }
    public decimal? WaistCm { get; set; }
}
