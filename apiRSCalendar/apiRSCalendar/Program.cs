using Microsoft.EntityFrameworkCore;
using apiRSCalendar.Context;
using System;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using apiRSCalendar.Models;
using apiRSCalendar.Helpers;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "MyPolicy",
        builder =>
        {
            builder.WithOrigins("*").AllowAnyHeader().AllowAnyMethod();
        });
});
builder.Services.AddControllers();
builder.Services.AddDbContext<AppDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("Conexion"));
});
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configure JWT authentication
builder.Services.AddAuthentication(cfg => {
    cfg.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    cfg.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    cfg.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(x => {
    x.RequireHttpsMetadata = false;
    x.SaveToken = false;
    x.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(builder.Configuration["ApplicationSettings:JWT_Secret"])
        ),
        ValidateIssuer = false,
        ValidateAudience = false,
        ClockSkew = TimeSpan.Zero
    };
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(
        c =>
        {
            c.SwaggerEndpoint(
                url: "/swagger/v1/swagger.json",
                name: "APi v1");
        });
}

app.UseHttpsRedirection();
app.UseCors("MyPolicy");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

// Add the login route
app.MapPost("/login", async (AppDbContext dbContext, Usuario usuario) =>
{
    var user = await dbContext.Usuarios.FirstOrDefaultAsync(u => u.Email == usuario.Email && u.Contrasena == usuario.Contrasena);

    if (user != null)
    {
        var authHelper = new AuthHelper(builder.Configuration["ApplicationSettings:JWT_Secret"]);
        var token = authHelper.GenerateJWTToken(user);

        return Results.Ok(new { Token = token });
    }
    else
    {
        return Results.BadRequest("Credenciales inv�lidas");
    }
});

app.MapPost("/checkauth", async (string token) =>
{
    var authHelper = new AuthHelper(builder.Configuration["ApplicationSettings:JWT_Secret"]);
    var isvalid = authHelper.ValidateJWTToken(token);
    return Results.Ok(isvalid);
});

app.Run();
