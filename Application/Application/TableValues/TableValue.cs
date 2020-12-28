using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Azure.Cosmos.Table;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace Application.TableValues
{
    class TableValue : TableEntity
    {
        public TableValue()
        {

        }

        public TableValue(string id, string deviceId)
        {
            PartitionKey = deviceId;
            RowKey = id;
        }

        public long Humidity { get; set; }
        public long Pressure { get; set; }
        public long Temperature { get; set; }
        public DateTime Sent_Timestamp { get; set; }
    }
}
