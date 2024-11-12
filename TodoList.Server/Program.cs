using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using TodoList.Server.Services;
using TodoList.Server.Models;

var builder = WebApplication.CreateBuilder(args);

// Register ITodoService with its implementation TodoService as a Singleton
builder.Services.AddSingleton<ITodoService, TodoService>();

// Register controllers
builder.Services.AddControllers();

// Configure CORS to allow requests from the frontend port
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        builder => builder.WithOrigins("http://localhost:5173")
                          .AllowAnyHeader()
                          .AllowAnyMethod());
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

// Use CORS policy
app.UseCors("AllowFrontend");

app.UseHttpsRedirection();
app.UseRouting();
app.UseAuthorization();

// Map the controllers
app.MapControllers();

app.Run();