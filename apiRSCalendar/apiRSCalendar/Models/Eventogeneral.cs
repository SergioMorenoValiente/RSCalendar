namespace apiRSCalendar.Models
{
    public class Eventogeneral
    {
        public int Id { get; set; }
        public string? Nombre { get; set; }
        public DateTime? FechInicio { get; set; }
        public DateTime? FechFin { get; set; }
        public int CalendariogeneralId { get; set; }
        public virtual Calendariogeneral? Calendariogeneral { get; set; }
    }
}
