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
            public class DeviceParams
            {
                public string DeviceId { get; set; }
                public string DeviceType { get; set; }
                public string Location { get; set; }
                public string Name{ get; set; }
                public bool? TemperatureSensor { get; set; }
                public bool? HumiditySensor { get; set; }
                public bool? PressureSensor { get; set; }
                public int? SendFrequency_ms { get; set; }
                public bool? Running { get; set; }
            }
            
            public string Owner { get; set; }
            public  DeviceParams deviceParams { get; set; }
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

                await _registryManager.AddDeviceAsync(new Device(request.deviceParams.DeviceId), cancellationToken);

                var twin = await _registryManager.GetTwinAsync(request.deviceParams.DeviceId, cancellationToken);

                twin.Tags["owner"] = request.Owner;
                twin.Tags["location"] = request.deviceParams.Location;
                twin.Tags["device_name"] = request.deviceParams.Name;
                twin.Tags["device_type"] = request.deviceParams.DeviceType;
                
                twin.Properties.Desired["send_frequency_ms"] = request.deviceParams.SendFrequency_ms;
                twin.Properties.Desired["temperature_sensor"] = request.deviceParams.TemperatureSensor;
                twin.Properties.Desired["humidity_sensor"] = request.deviceParams.HumiditySensor;
                twin.Properties.Desired["pressure_sensor"] = request.deviceParams.PressureSensor;
                twin.Properties.Desired["running"] = request.deviceParams.Running;

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
                    Enabled = twinResponse.Status is DeviceStatus.Enabled,
                    Running = twinResponse.Properties.Desired["running"],
                };
            }
        }
    }
}