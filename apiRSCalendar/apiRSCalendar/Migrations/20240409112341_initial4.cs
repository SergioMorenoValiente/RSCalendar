using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace apiRSCalendar.Migrations
{
    /// <inheritdoc />
    public partial class initial4 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Visible",
                table: "UsuarioCalendarios");

            migrationBuilder.AddColumn<int>(
                name: "Visible",
                table: "Calendario",
                type: "int",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Visible",
                table: "Calendario");

            migrationBuilder.AddColumn<int>(
                name: "Visible",
                table: "UsuarioCalendarios",
                type: "int",
                nullable: true);
        }
    }
}
