using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Application.TableValues.Extensions;
using MediatR;
using Microsoft.Azure.Cosmos.Table;
using Microsoft.Azure.Cosmos.Table.Queryable;

namespace Application.TableValues
{
    public class GetTableValues
    {
        public class Query : IRequest<List<TableValue>>
        {
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
              
                var query = table.CreateQuery<TableValue>().Where(v => v.PartitionKey.Equals("Develop1")).Take(10).AsTableQuery();
                var result = await query.ExecuteAsync(cancellationToken);

               return result.ToList();
            }
        }

    }
}
