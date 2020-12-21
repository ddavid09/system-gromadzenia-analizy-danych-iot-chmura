import asyncio
from azure.eventhub.aio import EventHubConsumerClient
from azure.iot.device.aio import IoTHubDeviceClient
from azure.iot.device import Message
import uuid

IOTHUB_CONNECTION_STRING = "HostName=sgds-iot-hub.azure-devices.net;DeviceId=Develop1;SharedAccessKey=g5/7j85lddbHkfmRuJ8LlTysGyaE8kwdJn4Yoz+s4GA="
EVENTHUB_NAMESPACE_CONNECTION_STRING ="Endpoint=sb://sgdseventhubnamespace.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=57wgR5PFnovxJ4Eqctjw++VxYcBjXEeRG9GvONAXIXY="
TWINCHANGE_EVENTHUB_NAME = "twin-change"

class DeviceConfig:
    temperature = True;

async def say_connected(config: DeviceConfig):
    while True:
        print("connected concur_var= ", config.temperature)
        await asyncio.sleep(1)

async def send_message(device_client: IoTHubDeviceClient, delay, config: DeviceConfig):
    while True:
        print("sending message...")
        msg = Message("test message")
        msg.message_id = uuid.uuid4()
        msg.custom_properties["test"] = "test"
        await device_client.send_message(msg)
        config.temperature = False
        print("message sent!")
        await asyncio.sleep(delay)

async def on_twin_event(partition_context, event):
    print("Received the event: \"{}\" from the partition with ID: \"{}\"".format(event.body_as_str(encoding='UTF-8'), partition_context.partition_id))

async def twin_eventhub_handler(twin_client: EventHubConsumerClient):
    while True:
        await twin_client.receive(on_event=on_twin_event, starting_position="-1")

async def main():
    device_client = IoTHubDeviceClient.create_from_connection_string(IOTHUB_CONNECTION_STRING)
    twin_eventhub_client = EventHubConsumerClient.from_connection_string(EVENTHUB_NAMESPACE_CONNECTION_STRING, consumer_group="$Default", eventhub_name=TWINCHANGE_EVENTHUB_NAME)

    concur_config = DeviceConfig();

    await device_client.connect()
    await asyncio.gather(send_message(device_client, 6, concur_config), say_connected(concur_config), twin_eventhub_handler(twin_eventhub_client))
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
