using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using RNR.Data;
using System;
using System.IO;

public static class DatabaseInitializer
{
    public static void InitializeDatabase(IServiceProvider services)
    {
        using (var scope = services.CreateScope())
        {
            var context = scope.ServiceProvider.GetRequiredService<RNRContext>();
            var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();

            try
            {
                context.Database.EnsureDeleted();
                context.Database.EnsureCreated();

                var scriptDirectory = Path.Combine(AppContext.BaseDirectory, "dbo");
                var createDbScript = Path.Combine(scriptDirectory, "CreateDatabase.sql");
                var createTableScript = Path.Combine(scriptDirectory, "CreateTable.sql");
                var populateDataScript = Path.Combine(scriptDirectory, "PopulateData.sql");

                if (File.Exists(createDbScript))
                {
                    logger.LogInformation("Running CreateDatabase.sql");
                    context.Database.ExecuteSqlRaw(File.ReadAllText(createDbScript));
                }
                else
                {
                    logger.LogError("CreateDatabase.sql not found");
                }

                if (File.Exists(createTableScript))
                {
                    logger.LogInformation("Running CreateTable.sql");
                    context.Database.ExecuteSqlRaw(File.ReadAllText(createTableScript));
                }
                else
                {
                    logger.LogError("CreateTable.sql not found");
                }

                if (File.Exists(populateDataScript))
                {
                    logger.LogInformation("Running PopulateData.sql");
                    context.Database.ExecuteSqlRaw(File.ReadAllText(populateDataScript));
                }
                else
                {
                    logger.LogError("PopulateData.sql not found");
                }
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "An error occurred while initializing the database.");
            }
        }
    }
}
