using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Domain.DevicesDtos;
using MediatR;
using Microsoft.Azure.Devices;
using Microsoft.Azure.Devices.Shared;
using Newtonsoft.Json;

namespace Application.Devices
{
    public class GetAll
    {
        public class Query : IRequest<List<DeviceResponse>>
        {
        }

        public class Handler : IRequestHandler<Query, List<DeviceResponse>>
        {
            private readonly RegistryManager _registryManager;

            public Handler(RegistryManager registryManager)
            {
                _registryManager = registryManager;
            }

            public async Task<List<DeviceResponse>> Handle(Query request, CancellationToken cancellationToken)
            {
                var q = _registryManager.CreateQuery("SELECT * FROM devices");
                try
                {
                    var queryResult = await q.GetNextAsJsonAsync();
                    while (q.HasMoreResults)
                    {
                        queryResult = await q.GetNextAsJsonAsync();
                    }

                    return queryResult.Select(JsonConvert.DeserializeObject<Twin>).Select(t => new DeviceResponse()
                    {
                        DeviceId = t.DeviceId,
                        Name = t.Tags["device_name"],
                        DeviceType = t.Tags["device_type"],
                        Location = t.Tags["location"],
                        HumiditySensor = t.Properties.Desired["humidity_sensor"],
                        TemperatureSensor = t.Properties.Desired["temperature_sensor"],
                        PressureSensor = t.Properties.Desired["pressure_sensor"],
                        SendFrequency_ms = t.Properties.Desired["send_frequency_ms"],
                        Connected = t.ConnectionState is not DeviceConnectionState.Disconnected,
                        Enabled = t.Status is DeviceStatus.Enabled,
                        Running = t.Properties.Desired["running"],
                    }).ToList();
                }
                catch(Exception e)
                {
                    Console.WriteLine(e.Message);
                    throw;
                }
            }
        }
    }
}