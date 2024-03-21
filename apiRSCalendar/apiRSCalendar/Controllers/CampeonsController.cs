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
    public class CampeonsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CampeonsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Campeons
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Campeon>>> GetCampeones()
        {
            return await _context.Campeones.ToListAsync();
        }

        // GET: api/Campeons/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Campeon>> GetCampeon(int id)
        {
            var campeon = await _context.Campeones.FindAsync(id);

            if (campeon == null)
            {
                return NotFound();
            }

            return campeon;
        }

        // PUT: api/Campeons/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCampeon(int id, Campeon campeon)
        {
            if (id != campeon.Id)
            {
                return BadRequest();
            }

            _context.Entry(campeon).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CampeonExists(id))
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

        // POST: api/Campeons
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Campeon>> PostCampeon(Campeon campeon)
        {
            _context.Campeones.Add(campeon);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCampeon", new { id = campeon.Id }, campeon);
        }

        // DELETE: api/Campeons/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCampeon(int id)
        {
            var campeon = await _context.Campeones.FindAsync(id);
            if (campeon == null)
            {
                return NotFound();
            }

            _context.Campeones.Remove(campeon);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CampeonExists(int id)
        {
            return _context.Campeones.Any(e => e.Id == id);
        }
    }
}
