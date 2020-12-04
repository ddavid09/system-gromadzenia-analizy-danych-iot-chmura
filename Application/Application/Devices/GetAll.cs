using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.Azure.Devices;
using Newtonsoft.Json;

namespace Application.Devices
{
    public class GetAll
    {
        public class Query : IRequest<List<Device>>
        {
        }

        public class Handler : IRequestHandler<Query, List<Device>>
        {
            private readonly RegistryManager _registryManager;

            public Handler(RegistryManager registryManager)
            {
                _registryManager = registryManager;
            }

            public async Task<List<Device>> Handle(Query request, CancellationToken cancellationToken)
            {
                var q = _registryManager.CreateQuery("SELECT * FROM devices");
                try
                {
                    var queryResult = await q.GetNextAsJsonAsync();
                    while (q.HasMoreResults)
                    {
                        queryResult = await q.GetNextAsJsonAsync();
                    }

                    return queryResult.Select(d => JsonConvert.DeserializeObject<Device>(d)).ToList();
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