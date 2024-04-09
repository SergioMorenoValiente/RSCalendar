namespace apiRSCalendar.Models
{
    public class UsuarioCalendario
    {
        public int Id { get; set; }
        public int CalendarioId { get; set; }
        public virtual Calendario? Calendario{ get; set; }
        public int UsuarioId { get; set; }
        public virtual Usuario? Usuario { get; set; }

    }
}
