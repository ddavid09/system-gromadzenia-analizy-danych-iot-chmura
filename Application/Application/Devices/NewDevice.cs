using System.Threading;
using System.Threading.Tasks;
using Domain.DevicesDtos;
using MediatR;
using Microsoft.Azure.Devices;

namespace Application.Devices
{
    public class NewDevice
    {
        public class Command : IRequest<DeviceResponse>
        {
            public string Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, DeviceResponse>
        {
            private readonly RegistryManager _registryManager;

            public Handler(RegistryManager registryManager)
            {
                _registryManager = registryManager;
            }

            public async Task<DeviceResponse> Handle(Command request, CancellationToken cancellationToken)
            {

                await _registryManager.AddDeviceAsync(new Device(request.Id), cancellationToken);

                var twin = await _registryManager.GetTwinAsync(request.Id, cancellationToken);
                
                twin.Tags["location"] = "Room 428";
                twin.Tags["device_name"] = "Raspberry Alpha";
                twin.Tags["device_type"] = "Raspberry Pi";
                
                twin.Properties.Desired["send_frequency_ms"] = 1000;
                twin.Properties.Desired["temperature_sensor"] = 0;
                twin.Properties.Desired["humidity_sensor"] = 0;
                twin.Properties.Desired["pressure_sensor"] = 0;

                var twinResponse = await _registryManager.UpdateTwinAsync(twin.DeviceId, twin, twin.ETag, cancellationToken);

                return new DeviceResponse()
                {
                    DeviceId = twinResponse.DeviceId,
                    Name = twinResponse.Tags["device_name"],
                    DeviceType = twinResponse.Tags["device_type"],
                    Location = twinResponse.Tags["location"],
                    HumiditySensor = twinResponse.Properties.Desired["humidity_sensor"],
                    TemperatureSensor = twinResponse.Properties.Desired["temperature_sensor"],
                    PressureSensor = twinResponse.Properties.Desired["pressure_sensor"],
                    SendFrequency_ms = twinResponse.Properties.Desired["send_frequency_ms"],
                    Connected = twinResponse.ConnectionState is DeviceConnectionState.Connected,
                    Enabled = twinResponse.Status is DeviceStatus.Enabled
                };
            }
        }
    }
}