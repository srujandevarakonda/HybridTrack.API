using HybridTrack.Api.Data;
using HybridTrack.Api.DTOs;
using HybridTrack.Api.Mapping;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HybridTrack.Api.Controllers;

[ApiController]
[Route("api/bodymeasurements")]
public class BodyMeasurementsController : ControllerBase
{
    private readonly ApplicationDbContext _db;

    public BodyMeasurementsController(ApplicationDbContext db)
    {
        _db = db;
    }

    // GET api/bodymeasurements?from=2026-01-01&to=2026-02-01
    [HttpGet]
    public async Task<ActionResult<List<BodyMeasurementResponseDto>>> GetAll(
        [FromQuery] DateTimeOffset? from,
        [FromQuery] DateTimeOffset? to)
    {
        var query = _db.BodyMeasurements.AsQueryable();

        if (from.HasValue)
            query = query.Where(m => m.MeasuredAt >= from.Value);

        if (to.HasValue)
            query = query.Where(m => m.MeasuredAt <= to.Value);

        var results = await query
            .OrderByDescending(m => m.MeasuredAt)
            .Select(m => m.ToDto())
            .ToListAsync();

        return Ok(results);
    }

    // GET api/bodymeasurements/{id}
    [HttpGet("{id:guid}")]
    public async Task<ActionResult<BodyMeasurementResponseDto>> GetById(Guid id)
    {
        var entity = await _db.BodyMeasurements.FindAsync(id);

        if (entity is null)
            return NotFound();

        return Ok(entity.ToDto());
    }

    // POST api/bodymeasurements
    [HttpPost]
    public async Task<ActionResult<BodyMeasurementResponseDto>> Create(CreateBodyMeasurementDto dto)
    {
        var entity = dto.ToEntity();

        _db.BodyMeasurements.Add(entity);
        await _db.SaveChangesAsync();

        var response = entity.ToDto();
        return CreatedAtAction(nameof(GetById), new { id = entity.Id }, response);
    }

    // PUT api/bodymeasurements/{id}
    [HttpPut("{id:guid}")]
    public async Task<IActionResult> Update(Guid id, UpdateBodyMeasurementDto dto)
    {
        var entity = await _db.BodyMeasurements.FindAsync(id);

        if (entity is null)
            return NotFound();

        entity.ApplyUpdate(dto);
        await _db.SaveChangesAsync();

        return NoContent();
    }

    // DELETE api/bodymeasurements/{id}
    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var entity = await _db.BodyMeasurements.FindAsync(id);

        if (entity is null)
            return NotFound();

        _db.BodyMeasurements.Remove(entity);
        await _db.SaveChangesAsync();

        return NoContent();
    }
}