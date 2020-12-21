import asyncio
from azure.eventhub.aio import EventHubConsumerClient
from azure.iot.device.aio import IoTHubDeviceClient
from azure.iot.device import Message
from sense_hat import SenseHat
import uuid
import json

IOTHUB_CONNECTION_STRING = "HostName=sgds-iot-hub.azure-devices.net;DeviceId=Develop1;SharedAccessKey=g5/7j85lddbHkfmRuJ8LlTysGyaE8kwdJn4Yoz+s4GA="
EVENTHUB_NAMESPACE_CONNECTION_STRING ="Endpoint=sb://sgdseventhubnamespace.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=57wgR5PFnovxJ4Eqctjw++VxYcBjXEeRG9GvONAXIXY="
# TWINCHANGE_EVENTHUB_NAME = "twin-change"

device_configuration = None
sense = SenseHat()

class Config:
    def __init__(self, freq, temp, humi, press):
        self.send_frequency_ms = freq
        self.temperature_sensor = temp
        self.humidity_sensor = humi
        self.pressure_sensor = press

def prepare_message():
    values = {}
    if device_configuration.temperature_sensor: values["temperature"] = sense.temperature
    if device_configuration.humidity_sensor: values["humidity"] = sense.humidity
    if device_configuration.pressure_sensor: values["pressure"] = sense.pressure
    return json.dumps(values)



    return values

async def init_config(device_client: IoTHubDeviceClient):
    twin = await device_client.get_twin()
    desired = twin['desired']
    global device_configuration
    device_configuration = Config(desired['send_frequency_ms'], desired['temperature_sensor'], desired['humidity_sensor'], desired['pressure_sensor'])

async def say_connected():
    while True:
        print("connected")
        await asyncio.sleep(1)


async def send_message(device_client: IoTHubDeviceClient, msg_data: str):
    while True:
        print("sending message...")
        msg = Message(msg_data)
        msg.message_id = uuid.uuid4()
        msg.content_type="telemetry"
        await device_client.send_message(msg)
        print("message sent!")
        await asyncio.sleep(device_configuration.send_frequency_ms/1000)

async def on_twin_event(partition_context, event):
    print("Received the event: \"{}\" from the partition with ID: \"{}\"".format(event.body_as_str(encoding='UTF-8'), partition_context.partition_id))

async def twin_eventhub_handler(twin_client: EventHubConsumerClient):
    while True:
        await twin_client.receive(on_event=on_twin_event, starting_position="-1")

async def main():
    device_client = IoTHubDeviceClient.create_from_connection_string(IOTHUB_CONNECTION_STRING)
    # twin_eventhub_client = EventHubConsumerClient.from_connection_string(EVENTHUB_NAMESPACE_CONNECTION_STRING, consumer_group="$Default", eventhub_name=TWINCHANGE_EVENTHUB_NAME)

    await device_client.connect()
    await init_config(device_client)
    await asyncio.gather(say_connected(), send_message(device_client, prepare_message()))
    await device_client.disconnect()

asyncio.run(main())



# async def on_event(partition_context, event):
#     print("Received the event: \"{}\" from the partition with ID: \"{}\"".format(event.body_as_str(encoding='UTF-8'), partition_context.partition_id))
#     return



    # client = EventHubConsumerClient.from_connection_string(EVENTHUB_NAMESPACE_CONNECTION_STRING,
    #                                                        consumer_group="$Default",
    #                                                        eventhub_name=TWINCHANGE_EVENTHUB_NAME)
    #
    # while True:
    #     await say_connected()
    #     await client.receive(on_event=on_event, starting_position="-1")
    #     await say_connected()


# def iothub_client_run():
#     device_client = IoTHubDeviceClient.create_from_connection_string(IOTHUB_CONNECTION_STRING)
#
#     device_client.connect()
#     twin = device_client.get_twin()
#     print("{}".format(twin))
#
#     device_client.disconnect()
