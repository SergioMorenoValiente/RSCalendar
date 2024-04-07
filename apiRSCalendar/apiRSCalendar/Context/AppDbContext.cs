using apiRSCalendar.Models;
using Microsoft.EntityFrameworkCore;

namespace apiRSCalendar.Context
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<Calendario> Calendarios { get; set; }
        public DbSet<Calendario> Calendariosgenerales { get; set; }
        public DbSet<UsuarioCalendario> UsuarioCalendarios { get; set; }
        public DbSet<Tarea> Tareas { get; set; }
        public DbSet<Evento> Eventos { get; set; }
        public DbSet<Campeon> Campeones { get; set; }
        public DbSet<Region> Regiones { get; set; }
        public DbSet<Rol> Roles { get; set; }
        public DbSet<apiRSCalendar.Models.Calendariogeneral> Calendariogeneral { get; set; } = default!;
        public DbSet<apiRSCalendar.Models.Eventogeneral> Eventogeneral { get; set; } = default!;
    }
}
