using System.ComponentModel.DataAnnotations;

namespace HybridTrack.Api.DTOs;

public class CreateBodyMeasurementDto
{
    [Required]
    public DateTimeOffset MeasuredAt { get; set; }

    [Range(typeof(decimal), "0.1", "500")]
    public decimal WeightKg { get; set; }

    [Range(typeof(decimal), "0", "100")]
    public decimal? BodyFatPercentage { get; set; }

    [Range(typeof(decimal), "0", "300")]
    public decimal? WaistCm { get; set; }
}

public class UpdateBodyMeasurementDto
{
    [Required]
    public DateTimeOffset MeasuredAt { get; set; }

    [Range(typeof(decimal), "0.1", "500")]
    public decimal WeightKg { get; set; }

    [Range(typeof(decimal), "0", "100")]
    public decimal? BodyFatPercentage { get; set; }

    [Range(typeof(decimal), "0", "300")]
    public decimal? WaistCm { get; set; }
}

public class BodyMeasurementResponseDto
{
    public Guid Id { get; set; }
    public DateTimeOffset MeasuredAt { get; set; }
    public decimal WeightKg { get; set; }
    public decimal? BodyFatPercentage { get; set; }
    public decimal? WaistCm { get; set; }
}