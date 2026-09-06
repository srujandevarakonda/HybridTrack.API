using HybridTrack.Api.Data;
using HybridTrack.Api.DTOs;
using HybridTrack.Api.Mapping;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HybridTrack.Api.Controllers;

[ApiController]
[Route("api/strengthworkouts")]
public class StrengthWorkoutsController : ControllerBase
{
    private readonly ApplicationDbContext _db;

    public StrengthWorkoutsController(ApplicationDbContext db)
    {
        _db = db;
    }

    // GET api/strengthworkouts?from=2026-01-01&to=2026-02-01
    // Returns summaries (no nested sets) - keeps the list endpoint light.
    [HttpGet]
    public async Task<ActionResult<List<StrengthWorkoutSummaryDto>>> GetAll(
        [FromQuery] DateTimeOffset? from,
        [FromQuery] DateTimeOffset? to)
    {
        var query = _db.StrengthWorkouts.Include(w => w.Sets).AsQueryable();

        if (from.HasValue)
            query = query.Where(w => w.StartedAt >= from.Value);

        if (to.HasValue)
            query = query.Where(w => w.StartedAt <= to.Value);

        var entities = await query
            .OrderByDescending(w => w.StartedAt)
            .ToListAsync();

        return Ok(entities.Select(e => e.ToSummaryDto()).ToList());
    }

    // GET api/strengthworkouts/{id}
    // Returns the full workout including its sets.
    [HttpGet("{id:guid}")]
    public async Task<ActionResult<StrengthWorkoutResponseDto>> GetById(Guid id)
    {
        var entity = await _db.StrengthWorkouts
            .Include(w => w.Sets)
            .FirstOrDefaultAsync(w => w.Id == id);

        if (entity is null)
            return NotFound();

        return Ok(entity.ToDto());
    }

    // POST api/strengthworkouts
    [HttpPost]
    public async Task<ActionResult<StrengthWorkoutResponseDto>> Create(CreateStrengthWorkoutDto dto)
    {
        var entity = dto.ToEntity();

        _db.StrengthWorkouts.Add(entity);
        await _db.SaveChangesAsync();

        var response = entity.ToDto();
        return CreatedAtAction(nameof(GetById), new { id = entity.Id }, response);
    }

    // PUT api/strengthworkouts/{id}
    [HttpPut("{id:guid}")]
    public async Task<IActionResult> Update(Guid id, UpdateStrengthWorkoutDto dto)
    {
        var entity = await _db.StrengthWorkouts.FindAsync(id);

        if (entity is null)
            return NotFound();

        entity.ApplyUpdate(dto);
        await _db.SaveChangesAsync();

        return NoContent();
    }

    // DELETE api/strengthworkouts/{id}
    // Also removes the workout's sets, so this works whether or not
    // cascade delete is configured at the database level.
    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var entity = await _db.StrengthWorkouts
            .Include(w => w.Sets)
            .FirstOrDefaultAsync(w => w.Id == id);

        if (entity is null)
            return NotFound();

        _db.StrengthSets.RemoveRange(entity.Sets);
        _db.StrengthWorkouts.Remove(entity);
        await _db.SaveChangesAsync();

        return NoContent();
    }
}