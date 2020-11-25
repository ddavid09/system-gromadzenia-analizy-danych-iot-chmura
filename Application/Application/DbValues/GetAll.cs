using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.DbValues
{
    public class GetAll
    {
        public class Query : IRequest<List<DbValue>>
        {
        }

        public class Handler : IRequestHandler<Query, List<DbValue>>
        {
            private readonly SqlContext _context;

            public Handler(SqlContext context)
            {
                _context = context;
            }

            public async Task<List<DbValue>> Handle(Query request, CancellationToken cancellationToken)
            {
                var values = await _context.DbValues.ToListAsync();

                return values;
            }
        }
    }
}
