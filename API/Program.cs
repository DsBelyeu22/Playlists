//using Application.Tracks;
using API.Services;
using Application.Tracks;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System.Collections.Generic;

var builder = WebApplication.CreateBuilder(args); // creates a Kestrel server

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<DataContext>(opt =>
{
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});

builder.Services.AddMediatR(config => config.RegisterServicesFromAssembly(typeof(List.Handler).Assembly)); // this makes Mediatr register ALL of the handlers

builder.Services.AddCors(opt =>
{
    opt.AddPolicy("CorsPolicy", policy =>
    {
        policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:3000");

    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// app.UseHttpsRedirection();

app.UseCors("CorsPolicy");

app.UseAuthorization();

app.MapControllers();

using var scope = app.Services.CreateScope();
// when using anything in this scope, when its done will be disposed
var services = scope.ServiceProvider;

// try
// {
//     var context = services.GetRequiredService<DataContext>();
//     context.Database.Migrate();
//     await SongSeed.SeedSongData(context);
// }
// catch (Exception ex)
// {

//     var logger = services.GetRequiredService<ILogger<Program>>();
//     logger.LogError(ex, "An error occured during migration");
// }

app.Run();

// Program.cs is the entry point for any dotnet appplication
