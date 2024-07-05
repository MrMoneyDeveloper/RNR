using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RNR.Data;
using RNR.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;

namespace RNR.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BreakdownsController : ControllerBase
    {
        private readonly RNRContext _context;
        private readonly ILogger<BreakdownsController> _logger;

        public BreakdownsController(RNRContext context, ILogger<BreakdownsController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Breakdown>>> GetBreakdowns()
        {
            _logger.LogInformation("Fetching all breakdowns from the database.");
            var breakdowns = await _context.Breakdowns.ToListAsync();
            _logger.LogInformation($"Fetched {breakdowns.Count} breakdowns.");
            return Ok(breakdowns);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Breakdown>> GetBreakdown(int id)
        {
            _logger.LogInformation($"Fetching breakdown with id: {id}");
            var breakdown = await _context.Breakdowns.FindAsync(id);
            if (breakdown == null)
            {
                _logger.LogWarning($"Breakdown with id: {id} not found.");
                return NotFound();
            }

            _logger.LogInformation($"Fetched breakdown: {breakdown.BreakdownReference}");
            return Ok(breakdown);
        }

        [HttpGet("checkReference/{reference}")]
        public async Task<ActionResult<bool>> CheckReferenceExists(string reference)
        {
            _logger.LogInformation($"Checking if breakdown reference: {reference} exists.");
            var exists = await _context.Breakdowns.AnyAsync(b => b.BreakdownReference == reference);
            return Ok(exists);
        }

        [HttpPost]
        public async Task<ActionResult<Breakdown>> CreateBreakdown([FromBody] Breakdown breakdown)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (await _context.Breakdowns.AnyAsync(b => b.BreakdownReference == breakdown.BreakdownReference))
            {
                _logger.LogWarning($"Breakdown reference: {breakdown.BreakdownReference} already exists.");
                return BadRequest(new { message = "Breakdown reference already exists." });
            }

            _logger.LogInformation("Creating a new breakdown.");
            _context.Breakdowns.Add(breakdown);
            await _context.SaveChangesAsync();

            _logger.LogInformation($"Created breakdown with id: {breakdown.Id}");
            return CreatedAtAction(nameof(GetBreakdown), new { id = breakdown.Id }, breakdown);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBreakdown(int id, [FromBody] Breakdown breakdown)
        {
            if (id != breakdown.Id)
            {
                _logger.LogWarning($"Bad request: Mismatch between route id: {id} and breakdown id: {breakdown.Id}");
                return BadRequest(new { message = "Mismatch between route id and breakdown id" });
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _logger.LogInformation($"Updating breakdown with id: {id}");
            _context.Entry(breakdown).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
                _logger.LogInformation($"Updated breakdown with id: {id}");
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Breakdowns.Any(e => e.Id == id))
                {
                    _logger.LogWarning($"Breakdown with id: {id} not found.");
                    return NotFound();
                }
                else
                {
                    _logger.LogError($"Concurrency error occurred while updating breakdown with id: {id}");
                    throw;
                }
            }

            return NoContent();
        }
    }
}
