namespace apiRSCalendar.Models
{
    public class Campeon
    {
        public int Id { get; set; }
        public string? Nombre { get; set; }
        public string? Imagen { get; set; }
        public string? Color { get; set; }
        public int RolId { get; set; }
        public virtual Rol? Rol { get; set; }
        public int RegionId { get; set; }
        public virtual Region? Region { get; set; }
    }
}
