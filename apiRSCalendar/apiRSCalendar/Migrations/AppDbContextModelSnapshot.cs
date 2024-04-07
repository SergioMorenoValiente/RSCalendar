﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using apiRSCalendar.Context;

#nullable disable

namespace apiRSCalendar.Migrations
{
    [DbContext(typeof(AppDbContext))]
    partial class AppDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "9.0.0-preview.2.24128.4")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("apiRSCalendar.Models.Calendario", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Descripcion")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Nombre")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Calendario");
                });

            modelBuilder.Entity("apiRSCalendar.Models.Calendariogeneral", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Descripcion")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Nombre")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Calendariogeneral");
                });

            modelBuilder.Entity("apiRSCalendar.Models.Campeon", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Color")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Imagen")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Nombre")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("RegionId")
                        .HasColumnType("int");

                    b.Property<int>("RolId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("RegionId");

                    b.HasIndex("RolId");

                    b.ToTable("Campeones");
                });

            modelBuilder.Entity("apiRSCalendar.Models.Evento", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("CalendarioId")
                        .HasColumnType("int");

                    b.Property<DateTime?>("FechFin")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("FechInicio")
                        .HasColumnType("datetime2");

                    b.Property<string>("Nombre")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("CalendarioId");

                    b.ToTable("Eventos");
                });

            modelBuilder.Entity("apiRSCalendar.Models.Eventogeneral", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("CalendariogeneralId")
                        .HasColumnType("int");

                    b.Property<DateTime?>("FechFin")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("FechInicio")
                        .HasColumnType("datetime2");

                    b.Property<string>("Nombre")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("CalendariogeneralId");

                    b.ToTable("Eventogeneral");
                });

            modelBuilder.Entity("apiRSCalendar.Models.Region", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Imagen")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Nombre")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Regiones");
                });

            modelBuilder.Entity("apiRSCalendar.Models.Rol", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Icono1")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Icono2")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Icono3")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Nombre")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Roles");
                });

            modelBuilder.Entity("apiRSCalendar.Models.Tarea", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("CalendarioId")
                        .HasColumnType("int");

                    b.Property<string>("Completado")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("FechInicio")
                        .HasColumnType("datetime2");

                    b.Property<string>("Nombre")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("CalendarioId");

                    b.ToTable("Tareas");
                });

            modelBuilder.Entity("apiRSCalendar.Models.Usuario", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Contrasena")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Nombre")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Usuarios");
                });

            modelBuilder.Entity("apiRSCalendar.Models.UsuarioCalendario", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("CalendarioId")
                        .HasColumnType("int");

                    b.Property<int>("UsuarioId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("CalendarioId");

                    b.HasIndex("UsuarioId");

                    b.ToTable("UsuarioCalendarios");
                });

            modelBuilder.Entity("apiRSCalendar.Models.Campeon", b =>
                {
                    b.HasOne("apiRSCalendar.Models.Region", "Region")
                        .WithMany()
                        .HasForeignKey("RegionId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("apiRSCalendar.Models.Rol", "Rol")
                        .WithMany()
                        .HasForeignKey("RolId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Region");

                    b.Navigation("Rol");
                });

            modelBuilder.Entity("apiRSCalendar.Models.Evento", b =>
                {
                    b.HasOne("apiRSCalendar.Models.Calendario", "Calendario")
                        .WithMany()
                        .HasForeignKey("CalendarioId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Calendario");
                });

            modelBuilder.Entity("apiRSCalendar.Models.Eventogeneral", b =>
                {
                    b.HasOne("apiRSCalendar.Models.Calendariogeneral", "Calendariogeneral")
                        .WithMany()
                        .HasForeignKey("CalendariogeneralId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Calendariogeneral");
                });

            modelBuilder.Entity("apiRSCalendar.Models.Tarea", b =>
                {
                    b.HasOne("apiRSCalendar.Models.Calendario", "Calendario")
                        .WithMany()
                        .HasForeignKey("CalendarioId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Calendario");
                });

            modelBuilder.Entity("apiRSCalendar.Models.UsuarioCalendario", b =>
                {
                    b.HasOne("apiRSCalendar.Models.Calendario", "Calendario")
                        .WithMany()
                        .HasForeignKey("CalendarioId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("apiRSCalendar.Models.Usuario", "Usuario")
                        .WithMany()
                        .HasForeignKey("UsuarioId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Calendario");

                    b.Navigation("Usuario");
                });
#pragma warning restore 612, 618
        }
    }
}
