using System.Text;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.Azure.Devices;
using Microsoft.Extensions.Configuration;

namespace Application.Devices
{
    public class Download
    {
        public class Query : IRequest<byte[]>
        {
            public string Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, byte[]>
        {
            private readonly RegistryManager _registryManager;
            private readonly IConfiguration _config;

            public Handler(RegistryManager registryManager, IConfiguration config)
            {
                _registryManager = registryManager;
                _config = config;
            }

            public async Task<byte[]> Handle(Query request, CancellationToken cancellationToken)
            {
                var device = await _registryManager.GetDeviceAsync(request.Id, cancellationToken);
                var deviceConnectionString = device.Authentication.SymmetricKey.PrimaryKey;
                var iotHubHostName = _config.GetSection("IotHubConfiguration")["HostName"];
                var fileContent = $"{{\"connectionString\": \"HostName={iotHubHostName};DeviceId={request.Id};SharedAccessKey={deviceConnectionString}\"}}";
                return Encoding.UTF8.GetBytes(fileContent);
            }
        }
    }
}