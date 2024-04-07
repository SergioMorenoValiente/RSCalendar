namespace apiRSCalendar.Models
{
    public class Tarea
    {
        public int Id { get; set; }
        public string? Nombre { get; set; }
        public DateTime? FechInicio { get; set; }
        public string? Completado { get; set; }
        public int CalendarioId { get; set; }
        public virtual Calendario? Calendario { get; set; }
    }
}
