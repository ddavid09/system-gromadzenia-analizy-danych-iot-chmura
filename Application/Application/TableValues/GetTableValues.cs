using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Domain.TableValues;
using MediatR;
using Microsoft.Azure.Cosmos.Table;
using Microsoft.Azure.Cosmos.Table.Queryable;

namespace Application.TableValues
{
    public class GetTableValues
    {
        public class TableValuesEnvelope
        {
            public List<TableValue> TableValues { get; set; }

            public int ValuesCount { get; set; }
            
            public TableContinuationToken ContinuationToken { get; set; }
        }
        public class Query : IRequest<TableValuesEnvelope>
        {
            public string Id { get; set; }
            public TableValuesQueryStringParams Params { get; set; }
            public TableContinuationToken OffsetToken { get; set; }
        }

        public class Handler : IRequestHandler<Query, TableValuesEnvelope>
        {
            private readonly CloudTableClient _tableClient;

            public Handler(CloudTableClient tableClient)
            {
                _tableClient = tableClient;
            }

            public async Task<TableValuesEnvelope> Handle(Query request, CancellationToken cancellationToken)
            {
                var table = _tableClient.GetTableReference("iotinsights");
              
                var query = table.CreateQuery<TableValue>().Where(v => v.PartitionKey.Equals(request.Id));

                var filter = request.Params;

                if (filter.MinTemperature is not null)
                {
                    query = query.Where(v => v.Temperature >= filter.MinTemperature);
                }

                if (filter.MaxTemperature is not null)
                {
                    query = query.Where(v => v.Temperature <= filter.MaxTemperature);
                }

                if (filter.MinHumidity is not null)
                {
                    query = query.Where(v => v.Humidity >= filter.MinHumidity);
                }
                
                if (filter.MaxHumidity is not null)
                {
                    query = query.Where(v => v.Humidity <= filter.MaxHumidity);
                }

                if (filter.MinPressure is not null)
                {
                    query = query.Where(v => v.Pressure >= filter.MinPressure);
                }
                
                if (filter.MaxPressure is not null)
                {
                    query = query.Where(v => v.Pressure <= filter.MaxPressure);
                }

                if (filter.MinDate is not null)
                {
                    query = query.Where(v => v.SentTimestamp >= filter.MinDate);
                }
                
                if (filter.MaxDate is not null)
                {
                    query = query.Where(v => v.SentTimestamp <= filter.MaxDate);
                }

                query = query
                    .Take(filter.Limit ?? 50);

                var result = await query.AsTableQuery().ExecuteSegmentedAsync(request.OffsetToken ?? new TableContinuationToken(), cancellationToken);

                var resultList = result.OrderByDescending(v => v.SentTimestamp).ToList();

                return new TableValuesEnvelope()
                {
                    TableValues = resultList,
                    ValuesCount = resultList.Count,
                    ContinuationToken = result.ContinuationToken
                };
            }
            
            
        }

    }
}
