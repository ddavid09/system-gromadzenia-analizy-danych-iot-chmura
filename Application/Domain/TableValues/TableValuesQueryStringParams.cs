using System;

namespace Domain.TableValues
{
    public class TableValuesQueryStringParams
    {
        public DateTime? MinDate { get; set; }
        public DateTime? MaxDate { get; set; }
        public Double? MinHumidity { get; set; }
        public Double? MaxHumidity { get; set; }
        public Double? MinPressure { get; set; }
        public Double? MaxPressure { get; set; }
        public Double? MinTemperature { get; set; }
        public Double? MaxTemperature { get; set; }
        
        public int? Limit { get; set; }
    }
}