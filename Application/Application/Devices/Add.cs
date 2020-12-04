using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.Azure.Devices;

namespace Application.Devices
{
    public class Add
    {
        public class Command : IRequest<Device>
        {
            public string Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, Device>
        {
            private readonly RegistryManager _registryManager;

            public Handler(RegistryManager registryManager)
            {
                _registryManager = registryManager;
            }

            public async Task<Device> Handle(Command request, CancellationToken cancellationToken)
            {

                var createdDevice = await _registryManager.AddDeviceAsync(new Device(request.Id), cancellationToken);

                return createdDevice;
            }
        }
    }
}