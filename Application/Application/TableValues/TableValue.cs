using System;
using Microsoft.Azure.Cosmos.Table;

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

        public Double? Humidity { get; set; }
        public Double? Pressure { get; set; }
        public Double? Temperature { get; set; }
        public DateTime? SentTimestamp { get; set; }
        
    }
}
