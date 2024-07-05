using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using RNR.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.Preserve;
    });

// Add DbContext with SQL Server
builder.Services.AddDbContext<RNRContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Add Razor Pages service
builder.Services.AddRazorPages();

// Add Swagger/OpenAPI support
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Run the SQL scripts to initialize the database
DatabaseInitializer.InitializeDatabase(app.Services);

// Add the middleware registration after the app variable is declared
app.UseMiddleware<RequestResponseLoggingMiddleware>();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "RNR API V1");
        c.RoutePrefix = "swagger"; // Set Swagger UI to load at /swagger
    });
}

app.UseHttpsRedirection();
app.UseStaticFiles(); // Serve static files

app.UseRouting(); // Add routing

app.UseAuthorization();

app.MapRazorPages(); // Map Razor Pages
app.MapControllers(); // Map controllers

// Set the default route to the Index page
app.MapFallbackToPage("/Index");

app.Run();
