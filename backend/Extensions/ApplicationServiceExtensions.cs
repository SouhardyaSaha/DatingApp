using backend.Data;
using backend.Helpers;
using backend.Interfaces;
using backend.Services;
using Microsoft.EntityFrameworkCore;

namespace backend.Extensions;

public static class ApplicationServiceExtensions
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
    {
        services.Configure<CloudinarySettings>(config.GetSection("CloudinarySettings"));
        services.AddScoped<IPhotoService, PhotoService>();
        services.AddScoped<ITokenService, TokenService>();
        services.AddScoped<IUserRepository, UserRepository>();
        services.AddAutoMapper(typeof(AutoMapperProfiles).Assembly);
        services.AddDbContextPool<DataContext>(options =>
        {
            options.UseSqlite(config.GetConnectionString("DBConnectionString"));
        });

        return services;
    }
}