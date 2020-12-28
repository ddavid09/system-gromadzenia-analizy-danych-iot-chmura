using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Azure.Cosmos.Table;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace Application.TableValues
{
    public class TableValue : TableEntity
    {
        public TableValue() { }

        public TableValue(string id, string deviceId)
        {
            PartitionKey = deviceId;
            RowKey = id;
        }

        public Double Humidity { get; set; }
        public Double? Pressure { get; set; }
        public Double? Temperature { get; set; }
        public DateTime? SentTimestamp { get; set; }
        
    }
}
