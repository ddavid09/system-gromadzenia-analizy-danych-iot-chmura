using System.Collections.Generic;

namespace Domain.DevicesDtos
{
    public class DeviceResponse
    {
        public string DeviceId { get; set; }
        public string DeviceType { get; set; }
        public string Location { get; set; }
        public string Name{ get; set; }
        public bool TemperatureSensor { get; set; }
        public bool HumiditySensor { get; set; }
        public bool PressureSensor { get; set; }
        public int SendFrequency_ms { get; set; }
        public bool Connected { get; set; }
        public bool Enabled { get; set; }
        public int? SentMessages { get; set; }
        
    }
}