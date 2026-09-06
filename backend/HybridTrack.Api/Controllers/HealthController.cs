using Microsoft.AspNetCore.Mvc;

namespace HybridTrack.Api.Controllers;

[ApiController]
[Route("api/health")]
public class HealthController : ControllerBase
{
    [HttpGet]
    public IActionResult Get() => Ok(new
    {
        status = "Healthy",
        service = "HybridTrack.Api",
        utc = DateTimeOffset.UtcNow
    });
}
