using API.AuthorizationPolicies;
using Application.DbValues;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Azure.Cosmos.Table;
using Microsoft.Azure.Devices;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Identity.Web;
using Persistence;

namespace API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        private IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<SqlContext>(opt =>
            {
                opt.UseSqlServer(Configuration.GetConnectionString("AzureSqlConnection"));
            });

            services.AddCors(opt =>
            {
                opt.AddPolicy("CorsPolicy",
                    policy => { policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:3000"); });
            });

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddMicrosoftIdentityWebApi(options =>
                    {
                        Configuration.Bind("AzureAdB2C", options);

                        options.TokenValidationParameters.NameClaimType = "name";
                    },
                    options => { Configuration.Bind("AzureAdB2C", options); });

            services.AddMediatR(typeof(GetAll.Handler).Assembly);

            services.AddControllers();

            services.AddScoped(registryManager =>
                RegistryManager.CreateFromConnectionString(Configuration.GetConnectionString("IoTHubOwnerConnection")));

            services.AddScoped(tableClient =>
                CloudStorageAccount.Parse(Configuration.GetConnectionString("StorageConnectionString"))
                    .CreateCloudTableClient(new TableClientConfiguration()));

            services.AddAuthorization(options =>
            {
                // Create policy to check for the scope 'read'
                options.AddPolicy("AccessScope",
                    policy => policy.Requirements.Add(new ScopesRequirement("application.access")));
            });
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseCors("CorsPolicy");
            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();


            app.UseEndpoints(endpoints => { endpoints.MapControllers(); });
        }
    }
}