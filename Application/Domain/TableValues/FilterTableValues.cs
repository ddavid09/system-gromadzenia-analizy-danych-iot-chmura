using System;

namespace Domain.TableValues
{
    public class FilterTableValues
    {
        public DateTime? MinDate { get; set; }
        public DateTime? MaxDate { get; set; }
        public Double? MinHumidity { get; set; }
        public Double? MaxHumidity { get; set; }
        public Double? MinPressure { get; set; }
        public Double? MaxPressure { get; set; }
        public Double? MinTemperature { get; set; }
        public Double? MaxTemperature { get; set; }
        
    }
}