using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.Azure.Devices;
using Microsoft.Azure.Devices.Shared;

namespace Application.Devices
{
    public class Edit
    {
        public class Command : IRequest
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

        public class Handler : IRequestHandler<Command>
        {
            private readonly RegistryManager _registryManager;

            public Handler(RegistryManager registryManager)
            {
                _registryManager = registryManager;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var twin = await _registryManager.GetTwinAsync(request.DeviceId, cancellationToken);
                
                var twinPatch = new Twin
                {
                    Tags =
                    {
                        ["location"] = request.Location ?? twin.Tags["location"],
                        ["device_name"] = request.Name ?? twin.Tags["device_name"],
                        ["device_type"] = request.DeviceType ?? twin.Tags["device_type"]
                    },
                };

                twinPatch.Properties.Desired["send_frequency_ms"] =
                    request.SendFrequency_ms ?? twin.Properties.Desired["send_frequency_ms"];
                twinPatch.Properties.Desired["temperature_sensor"] = request.TemperatureSensor ?? twin.Properties.Desired["temperature_sensor"];
                twinPatch.Properties.Desired["humidity_sensor"] = request.HumiditySensor ?? twin.Properties.Desired["humidity_sensor"];
                twinPatch.Properties.Desired["pressure_sensor"] = request.PressureSensor ?? twin.Properties.Desired["pressure_sensor"];
                twinPatch.Properties.Desired["running"] = request.Running ?? twin.Properties.Desired["running"];

                await _registryManager.UpdateTwinAsync(twin.DeviceId, twinPatch, twin.ETag, cancellationToken);
                
                return Unit.Value;
            }
        }
    }
}