using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using apiRSCalendar.Context;
using apiRSCalendar.Models;

namespace apiRSCalendar.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventogeneralsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public EventogeneralsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Eventogenerals
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Eventogeneral>>> GetEventogeneral()
        {
            return await _context.Eventogeneral.ToListAsync();
        }

        // GET: api/Eventogenerals/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Eventogeneral>> GetEventogeneral(int id)
        {
            var eventogeneral = await _context.Eventogeneral.FindAsync(id);

            if (eventogeneral == null)
            {
                return NotFound();
            }

            return eventogeneral;
        }

        // PUT: api/Eventogenerals/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEventogeneral(int id, Eventogeneral eventogeneral)
        {
            if (id != eventogeneral.Id)
            {
                return BadRequest();
            }

            _context.Entry(eventogeneral).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EventogeneralExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Eventogenerals
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Eventogeneral>> PostEventogeneral(Eventogeneral eventogeneral)
        {
            _context.Eventogeneral.Add(eventogeneral);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetEventogeneral", new { id = eventogeneral.Id }, eventogeneral);
        }

        // DELETE: api/Eventogenerals/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEventogeneral(int id)
        {
            var eventogeneral = await _context.Eventogeneral.FindAsync(id);
            if (eventogeneral == null)
            {
                return NotFound();
            }

            _context.Eventogeneral.Remove(eventogeneral);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool EventogeneralExists(int id)
        {
            return _context.Eventogeneral.Any(e => e.Id == id);
        }
    }
}
