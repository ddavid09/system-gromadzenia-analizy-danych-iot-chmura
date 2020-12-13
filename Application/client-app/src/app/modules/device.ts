export interface IDevice {
    deviceId: string;
    deviceType: string;
    location: string;
    name: string;
    temperatureSensor: boolean;
    humiditySensor: boolean;
    pressureSensor: boolean;
    sendFrequency_ms: number;
    connected?: boolean;
    enabled?: boolean;
    sentMessages?: string | null;
    [key: string]: any;
}