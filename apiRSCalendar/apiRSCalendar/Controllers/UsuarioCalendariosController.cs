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
    public class UsuarioCalendariosController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UsuarioCalendariosController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/UsuarioCalendarios
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UsuarioCalendario>>> GetUsuarioCalendarios()
        {
            return await _context.UsuarioCalendarios.ToListAsync();
        }

        // GET: api/UsuarioCalendarios/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UsuarioCalendario>> GetUsuarioCalendario(int id)
        {
            var usuarioCalendario = await _context.UsuarioCalendarios.FindAsync(id);

            if (usuarioCalendario == null)
            {
                return NotFound();
            }

            return usuarioCalendario;
        }

        // PUT: api/UsuarioCalendarios/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUsuarioCalendario(int id, UsuarioCalendario usuarioCalendario)
        {
            if (id != usuarioCalendario.Id)
            {
                return BadRequest();
            }

            _context.Entry(usuarioCalendario).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UsuarioCalendarioExists(id))
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

        // POST: api/UsuarioCalendarios
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<UsuarioCalendario>> PostUsuarioCalendario(UsuarioCalendario usuarioCalendario)
        {
            _context.UsuarioCalendarios.Add(usuarioCalendario);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUsuarioCalendario", new { id = usuarioCalendario.Id }, usuarioCalendario);
        }

        // DELETE: api/UsuarioCalendarios/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUsuarioCalendario(int id)
        {
            var usuarioCalendario = await _context.UsuarioCalendarios.FindAsync(id);
            if (usuarioCalendario == null)
            {
                return NotFound();
            }

            _context.UsuarioCalendarios.Remove(usuarioCalendario);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UsuarioCalendarioExists(int id)
        {
            return _context.UsuarioCalendarios.Any(e => e.Id == id);
        }
    }
}
