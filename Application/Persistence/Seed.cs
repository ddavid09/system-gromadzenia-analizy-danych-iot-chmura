using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain;

namespace Persistence
{
    public class Seed
    {
        public static void SeedSql(SqlContext context)
        {
            if (!context.DbValues.Any())
            {
                var values = new List<DbValue>
                {
                    new DbValue{Name = "test1"},
                    new DbValue{Name = "test2"},
                    new DbValue{Name = "test3"},
                    new DbValue{Name = "test4"}
                };

                context.DbValues.AddRange(values);
                context.SaveChanges();
            }
        }
    }
}
