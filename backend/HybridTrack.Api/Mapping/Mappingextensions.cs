using HybridTrack.Api.Domain;
using HybridTrack.Api.DTOs;

namespace HybridTrack.Api.Mapping;

public static class MappingExtensions
{
    // ---------- BodyMeasurement ----------

    public static BodyMeasurementResponseDto ToDto(this BodyMeasurement entity) => new()
    {
        Id = entity.Id,
        MeasuredAt = entity.MeasuredAt,
        WeightKg = entity.WeightKg,
        BodyFatPercentage = entity.BodyFatPercentage,
        WaistCm = entity.WaistCm
    };

    public static BodyMeasurement ToEntity(this CreateBodyMeasurementDto dto) => new()
    {
        Id = Guid.NewGuid(),
        MeasuredAt = dto.MeasuredAt,
        WeightKg = dto.WeightKg,
        BodyFatPercentage = dto.BodyFatPercentage,
        WaistCm = dto.WaistCm
    };

    public static void ApplyUpdate(this BodyMeasurement entity, UpdateBodyMeasurementDto dto)
    {
        entity.MeasuredAt = dto.MeasuredAt;
        entity.WeightKg = dto.WeightKg;
        entity.BodyFatPercentage = dto.BodyFatPercentage;
        entity.WaistCm = dto.WaistCm;
    }

    // ---------- RunActivity ----------

    public static RunActivityResponseDto ToDto(this RunActivity entity) => new()
    {
        Id = entity.Id,
        StartedAt = entity.StartedAt,
        DistanceKm = entity.DistanceKm,
        Duration = entity.Duration,
        Notes = entity.Notes,
        PaceMinPerKm = entity.DistanceKm > 0
            ? Math.Round((decimal)entity.Duration.TotalMinutes / entity.DistanceKm, 2)
            : null
    };

    public static RunActivity ToEntity(this CreateRunActivityDto dto) => new()
    {
        Id = Guid.NewGuid(),
        StartedAt = dto.StartedAt,
        DistanceKm = dto.DistanceKm,
        Duration = dto.Duration,
        Notes = dto.Notes
    };

    public static void ApplyUpdate(this RunActivity entity, UpdateRunActivityDto dto)
    {
        entity.StartedAt = dto.StartedAt;
        entity.DistanceKm = dto.DistanceKm;
        entity.Duration = dto.Duration;
        entity.Notes = dto.Notes;
    }

    // ---------- StrengthSet ----------

    public static StrengthSetResponseDto ToDto(this StrengthSet entity) => new()
    {
        Id = entity.Id,
        StrengthWorkoutId = entity.StrengthWorkoutId,
        ExerciseName = entity.ExerciseName,
        SetNumber = entity.SetNumber,
        Repetitions = entity.Repetitions,
        WeightKg = entity.WeightKg
    };

    public static StrengthSet ToEntity(this CreateStrengthSetDto dto, Guid workoutId) => new()
    {
        Id = Guid.NewGuid(),
        StrengthWorkoutId = workoutId,
        ExerciseName = dto.ExerciseName,
        SetNumber = dto.SetNumber,
        Repetitions = dto.Repetitions,
        WeightKg = dto.WeightKg
    };

    public static void ApplyUpdate(this StrengthSet entity, UpdateStrengthSetDto dto)
    {
        entity.ExerciseName = dto.ExerciseName;
        entity.SetNumber = dto.SetNumber;
        entity.Repetitions = dto.Repetitions;
        entity.WeightKg = dto.WeightKg;
    }

    // ---------- StrengthWorkout ----------

    public static StrengthWorkoutSummaryDto ToSummaryDto(this StrengthWorkout entity) => new()
    {
        Id = entity.Id,
        StartedAt = entity.StartedAt,
        Name = entity.Name,
        Notes = entity.Notes,
        SetCount = entity.Sets?.Count ?? 0
    };

    public static StrengthWorkoutResponseDto ToDto(this StrengthWorkout entity) => new()
    {
        Id = entity.Id,
        StartedAt = entity.StartedAt,
        Name = entity.Name,
        Notes = entity.Notes,
        Sets = entity.Sets?.Select(s => s.ToDto()).ToList() ?? new List<StrengthSetResponseDto>()
    };

    public static StrengthWorkout ToEntity(this CreateStrengthWorkoutDto dto) => new()
    {
        Id = Guid.NewGuid(),
        StartedAt = dto.StartedAt,
        Name = dto.Name,
        Notes = dto.Notes
    };

    public static void ApplyUpdate(this StrengthWorkout entity, UpdateStrengthWorkoutDto dto)
    {
        entity.StartedAt = dto.StartedAt;
        entity.Name = dto.Name;
        entity.Notes = dto.Notes;
    }
}