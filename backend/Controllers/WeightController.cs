using Microsoft.AspNetCore.Mvc;
using FitTrack90.Backend.Data;
using FitTrack90.Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace FitTrack90.Backend.Controllers
{
    [ApiController]
    [Route("api/weights")]
    public class WeightController : ControllerBase
    {
        private readonly AppDbContext _db;
        public WeightController(AppDbContext db) { _db = db; }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var list = await _db.WeightLogs.OrderBy(w => w.Date).ToListAsync();
            return Ok(list);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] WeightLog model)
        {
            model.Date = model.Date == default ? DateTime.UtcNow : model.Date;
            _db.WeightLogs.Add(model);
            await _db.SaveChangesAsync();
            return CreatedAtAction(nameof(Get), new { id = model.Id }, model);
        }
    }
}
