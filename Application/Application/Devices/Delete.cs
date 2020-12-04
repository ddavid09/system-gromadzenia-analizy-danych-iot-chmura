using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.Azure.Devices;

namespace Application.Devices
{
    public class Delete
    {
        public class Command : IRequest
        {
            public string Id { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly RegistryManager _registryManager;

            public Handler(RegistryManager registryManager)
            {
                _registryManager = registryManager;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                await _registryManager.RemoveDeviceAsync(request.Id, cancellationToken);
                return Unit.Value;
            }
        }
    }
}