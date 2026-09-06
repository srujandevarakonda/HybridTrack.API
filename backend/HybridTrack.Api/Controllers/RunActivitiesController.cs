using HybridTrack.Api.Data;
using HybridTrack.Api.DTOs;
using HybridTrack.Api.Mapping;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HybridTrack.Api.Controllers;

[ApiController]
[Route("api/runactivities")]
public class RunActivitiesController : ControllerBase
{
    private readonly ApplicationDbContext _db;

    public RunActivitiesController(ApplicationDbContext db)
    {
        _db = db;
    }

    // GET api/runactivities?from=2026-01-01&to=2026-02-01
    [HttpGet]
    public async Task<ActionResult<List<RunActivityResponseDto>>> GetAll(
        [FromQuery] DateTimeOffset? from,
        [FromQuery] DateTimeOffset? to)
    {
        var query = _db.RunActivities.AsQueryable();

        if (from.HasValue)
            query = query.Where(r => r.StartedAt >= from.Value);

        if (to.HasValue)
            query = query.Where(r => r.StartedAt <= to.Value);

        var entities = await query
            .OrderByDescending(r => r.StartedAt)
            .ToListAsync();

        return Ok(entities.Select(e => e.ToDto()).ToList());
    }

    // GET api/runactivities/{id}
    [HttpGet("{id:guid}")]
    public async Task<ActionResult<RunActivityResponseDto>> GetById(Guid id)
    {
        var entity = await _db.RunActivities.FindAsync(id);

        if (entity is null)
            return NotFound();

        return Ok(entity.ToDto());
    }

    // POST api/runactivities
    [HttpPost]
    public async Task<ActionResult<RunActivityResponseDto>> Create(CreateRunActivityDto dto)
    {
        var entity = dto.ToEntity();

        _db.RunActivities.Add(entity);
        await _db.SaveChangesAsync();

        var response = entity.ToDto();
        return CreatedAtAction(nameof(GetById), new { id = entity.Id }, response);
    }

    // PUT api/runactivities/{id}
    [HttpPut("{id:guid}")]
    public async Task<IActionResult> Update(Guid id, UpdateRunActivityDto dto)
    {
        var entity = await _db.RunActivities.FindAsync(id);

        if (entity is null)
            return NotFound();

        entity.ApplyUpdate(dto);
        await _db.SaveChangesAsync();

        return NoContent();
    }

    // DELETE api/runactivities/{id}
    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var entity = await _db.RunActivities.FindAsync(id);

        if (entity is null)
            return NotFound();

        _db.RunActivities.Remove(entity);
        await _db.SaveChangesAsync();

        return NoContent();
    }
}