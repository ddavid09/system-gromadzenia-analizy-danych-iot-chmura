#! /usr/bin/env python3.7

import asyncio
from azure.iot.device.aio import IoTHubDeviceClient
from azure.iot.device import Message
from sense_hat import SenseHat
import uuid
import json
import glob

def connection_string():
    filepaths = glob.glob("/boot/*_connectionFile.json")
    f = open(filepaths[0], "r")
    data = json.loads(f.read())
    return data["connectionString"];

IOTHUB_CONNECTION_STRING = connection_string()

device_configuration = None
sense = SenseHat()

class Config:
    def __init__(self, freq, temp, humi, press, run):
        self.send_frequency_ms = freq
        self.temperature_sensor = temp
        self.humidity_sensor = humi
        self.pressure_sensor = press
        self.running = run


def prepare_message():
    values = {}
    if device_configuration.temperature_sensor: values["temperature"] = sense.temperature
    if device_configuration.humidity_sensor: values["humidity"] = sense.humidity
    if device_configuration.pressure_sensor: values["pressure"] = sense.pressure
    print("to send: ", json.dumps(values))
    return json.dumps(values)

async def init_config(device_client: IoTHubDeviceClient):
    twin = await device_client.get_twin()
    desired = twin['desired']
    global device_configuration
    device_configuration = Config(desired['send_frequency_ms'], desired['temperature_sensor'], desired['humidity_sensor'], desired['pressure_sensor'], desired['running'])

async def say_connected():
    while True:
        print("connected")
        print(json.dumps(device_configuration.__dict__))
        await asyncio.sleep(1)


async def twin_patch_handler(patch):
        update_config(patch)
        print('got patch, updated config!')

def update_config(patch:dict):
    device_configuration.send_frequency_ms = patch['send_frequency_ms']
    device_configuration.temperature_sensor = patch['temperature_sensor']
    device_configuration.humidity_sensor = patch['humidity_sensor']
    device_configuration.pressure_sensor = patch['pressure_sensor']
    device_configuration.running = patch['running']

async def send_message(device_client: IoTHubDeviceClient):
    while True:
        msg_data=prepare_message()
        msg = Message(msg_data)
        msg.message_id = uuid.uuid4()
        msg.content_type="telemetry"
        if device_configuration.running:
            await device_client.send_message(msg)
            print("message sent!")
        await asyncio.sleep(device_configuration.send_frequency_ms/1000)

async def main():
    print(IOTHUB_CONNECTION_STRING)
    device_client = IoTHubDeviceClient.create_from_connection_string(IOTHUB_CONNECTION_STRING)

    await device_client.connect()
    device_client.on_twin_desired_properties_patch_received = twin_patch_handler
    await init_config(device_client)
    await asyncio.gather(say_connected(), send_message(device_client))
    # await asyncio.gather(say_connected())
    await device_client.disconnect()

asyncio.run(main())

