export interface IDevice {
    deviceId: string,
    deviceType: string,
    location: string,
    name: string,
    temperatureSensor: string,
    humidiySensor: string,
    pressureSensor: string,
    sendFrequency_ms: string,
    connected: string,
    enabled: string,
    sentMessages?: string
}