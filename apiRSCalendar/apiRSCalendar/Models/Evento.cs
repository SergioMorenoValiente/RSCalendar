namespace apiRSCalendar.Models
{
    public class Evento
    {
        public int Id { get; set; }
        public string? Nombre { get; set; }
        public DateTime? FechInicio { get; set; }
        public DateTime? FechFin { get; set; }
        public int  CalendarioId { get; set;}
        public virtual Calendario? Calendario { get; set; }
    }
}
