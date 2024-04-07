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
    public class CalendariogeneralsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CalendariogeneralsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Calendariogenerals
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Calendariogeneral>>> GetCalendariogeneral()
        {
            return await _context.Calendariogeneral.ToListAsync();
        }

        // GET: api/Calendariogenerals/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Calendariogeneral>> GetCalendariogeneral(int id)
        {
            var calendariogeneral = await _context.Calendariogeneral.FindAsync(id);

            if (calendariogeneral == null)
            {
                return NotFound();
            }

            return calendariogeneral;
        }

        // PUT: api/Calendariogenerals/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCalendariogeneral(int id, Calendariogeneral calendariogeneral)
        {
            if (id != calendariogeneral.Id)
            {
                return BadRequest();
            }

            _context.Entry(calendariogeneral).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CalendariogeneralExists(id))
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

        // POST: api/Calendariogenerals
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Calendariogeneral>> PostCalendariogeneral(Calendariogeneral calendariogeneral)
        {
            _context.Calendariogeneral.Add(calendariogeneral);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCalendariogeneral", new { id = calendariogeneral.Id }, calendariogeneral);
        }

        // DELETE: api/Calendariogenerals/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCalendariogeneral(int id)
        {
            var calendariogeneral = await _context.Calendariogeneral.FindAsync(id);
            if (calendariogeneral == null)
            {
                return NotFound();
            }

            _context.Calendariogeneral.Remove(calendariogeneral);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CalendariogeneralExists(int id)
        {
            return _context.Calendariogeneral.Any(e => e.Id == id);
        }
    }
}
