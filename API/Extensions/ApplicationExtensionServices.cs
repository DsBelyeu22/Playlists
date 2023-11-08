using Application.Core;
using Application.Playlists;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System.ComponentModel;

namespace API.Extensions
{
    public static class ApplicationExtensionServices
    {
        // when creating extension method, it should be static as we are not going to call a new instance of this class
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
        {
            // this refers to the AddApplicationServices method
            //adding IConfig paramter gives us access to the appsettings.json
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen();
            services.AddMediatR(config => config.RegisterServicesFromAssembly(typeof(List.Handler).Assembly)); // this makes Mediatr register ALL of the handlers
            services.AddAutoMapper(typeof(MappingProfiles).Assembly);

            services.AddCors(opt =>
            {
                opt.AddPolicy("CorsPolicy", policy =>
                {
                    policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:3000");

                });
            });

            services.AddDbContext<DataContext>(opt =>
            {
                opt.UseSqlite(config.GetConnectionString("DefaultConnection"));
            });
            return services;

        }
    }
}
