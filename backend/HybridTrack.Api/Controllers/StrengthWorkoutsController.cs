using HybridTrack.Api.Data;
using HybridTrack.Api.DTOs;
using HybridTrack.Api.Mapping;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HybridTrack.Api.Controllers;

// Nested under a workout: /api/strengthworkouts/{workoutId}/sets
// This keeps sets scoped to their parent workout, which matches how
// the domain actually works (a set can't exist without a workout).
[ApiController]
[Route("api/strengthworkouts/{workoutId:guid}/sets")]
public class StrengthSetsController : ControllerBase
{
    private readonly ApplicationDbContext _db;

    public StrengthSetsController(ApplicationDbContext db)
    {
        _db = db;
    }

    // GET api/strengthworkouts/{workoutId}/sets
    [HttpGet]
    public async Task<ActionResult<List<StrengthSetResponseDto>>> GetAll(Guid workoutId)
    {
        var workoutExists = await _db.StrengthWorkouts.AnyAsync(w => w.Id == workoutId);
        if (!workoutExists)
            return NotFound($"Strength workout {workoutId} was not found.");

        var sets = await _db.StrengthSets
            .Where(s => s.StrengthWorkoutId == workoutId)
            .OrderBy(s => s.SetNumber)
            .ToListAsync();

        return Ok(sets.Select(s => s.ToDto()).ToList());
    }

    // GET api/strengthworkouts/{workoutId}/sets/{id}
    [HttpGet("{id:guid}")]
    public async Task<ActionResult<StrengthSetResponseDto>> GetById(Guid workoutId, Guid id)
    {
        var entity = await _db.StrengthSets
            .FirstOrDefaultAsync(s => s.Id == id && s.StrengthWorkoutId == workoutId);

        if (entity is null)
            return NotFound();

        return Ok(entity.ToDto());
    }

    // POST api/strengthworkouts/{workoutId}/sets
    [HttpPost]
    public async Task<ActionResult<StrengthSetResponseDto>> Create(Guid workoutId, CreateStrengthSetDto dto)
    {
        var workoutExists = await _db.StrengthWorkouts.AnyAsync(w => w.Id == workoutId);
        if (!workoutExists)
            return NotFound($"Strength workout {workoutId} was not found.");

        var entity = dto.ToEntity(workoutId);

        _db.StrengthSets.Add(entity);
        await _db.SaveChangesAsync();

        var response = entity.ToDto();
        return CreatedAtAction(nameof(GetById), new { workoutId, id = entity.Id }, response);
    }

    // PUT api/strengthworkouts/{workoutId}/sets/{id}
    [HttpPut("{id:guid}")]
    public async Task<IActionResult> Update(Guid workoutId, Guid id, UpdateStrengthSetDto dto)
    {
        var entity = await _db.StrengthSets
            .FirstOrDefaultAsync(s => s.Id == id && s.StrengthWorkoutId == workoutId);

        if (entity is null)
            return NotFound();

        entity.ApplyUpdate(dto);
        await _db.SaveChangesAsync();

        return NoContent();
    }

    // DELETE api/strengthworkouts/{workoutId}/sets/{id}
    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid workoutId, Guid id)
    {
        var entity = await _db.StrengthSets
            .FirstOrDefaultAsync(s => s.Id == id && s.StrengthWorkoutId == workoutId);

        if (entity is null)
            return NotFound();

        _db.StrengthSets.Remove(entity);
        await _db.SaveChangesAsync();

        return NoContent();
    }
}