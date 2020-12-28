using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Application.TableValues.Extensions;
using Domain.TableValues;
using MediatR;
using Microsoft.Azure.Cosmos.Table;
using Microsoft.Azure.Cosmos.Table.Queryable;

namespace Application.TableValues
{
    public class GetTableValues
    {
        public class Query : IRequest<List<TableValue>>
        {
            public string Id { get; set; }
            public FilterTableValues Filter { get; set; }
        }

        public class Handler : IRequestHandler<Query, List<TableValue>>
        {
            private readonly CloudTableClient _tableClient;

            public Handler(CloudTableClient tableClient)
            {
                _tableClient = tableClient;
            }

            public async Task<List<TableValue>> Handle(Query request, CancellationToken cancellationToken)
            {
                var table = _tableClient.GetTableReference("iotinsights");
              
                var query = table.CreateQuery<TableValue>().Where(v => v.PartitionKey.Equals(request.Id));

                if (request.Filter.MinTemperature is not null)
                {
                    query = query.Where(v => v.Temperature >= request.Filter.MinTemperature);
                }

                if (request.Filter.MinHumidity is not null)
                {
                    query = query.Where((v => v.Humidity >= request.Filter.MinHumidity));
                }

                var result = await query.AsTableQuery().ExecuteAsync(cancellationToken);

                return result.OrderByDescending(v => v.SentTimestamp).ToList();
            }
        }

    }
}
