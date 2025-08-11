using Microsoft.EntityFrameworkCore;
using FitTrack90.Backend.Data;

var builder = WebApplication.CreateBuilder(args);

// DB
var conn = builder.Configuration.GetConnectionString("DefaultConnection") ?? Environment.GetEnvironmentVariable("ConnectionStrings__DefaultConnection");
builder.Services.AddDbContext<AppDbContext>(opt => opt.UseNpgsql(conn));

// CORS
builder.Services.AddCors(options => options.AddDefaultPolicy(policy =>
{
    policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
}));

builder.Services.AddControllers();
var app = builder.Build();

app.UseCors();
app.MapControllers();

app.Run();
