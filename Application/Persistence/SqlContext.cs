using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class SqlContext : DbContext
    {
        public SqlContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<DbValue> DbValues { get; set; }
    }
}
