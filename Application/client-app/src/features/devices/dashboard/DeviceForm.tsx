import { observer } from "mobx-react-lite";
import React, { ChangeEvent, useState, useEffect, useContext } from "react";
import { Button, Checkbox, CheckboxProps, Form, Segment } from "semantic-ui-react";
import DeviceStore from "../../../app/stores/DeviceStore";

const DeviceForm = () => {
  const deviceStore = useContext(DeviceStore);
  const { selectedDevice, createDevice, cancelForm, editDevice, deleteDevice } = deviceStore;

  const [edit, setEdit] = useState<boolean>(false);

  const initForm = () => {
    if (selectedDevice) {
      return selectedDevice;
    } else {
      setEdit(true);
      return {
        deviceId: "",
        deviceType: "Raspberry Pi 3B",
        location: "",
        name: "",
        temperatureSensor: false,
        humiditySensor: false,
        pressureSensor: false,
        sendFrequency_ms: 1000,
      };
    }
  };

  const [device, setDevice] = useState(initForm);

  useEffect(() => {
    setDevice(initForm);
  }, [deviceStore.selectedDevice]);

  const handleSubmit = () => {
    if (selectedDevice === undefined) {
      createDevice(device);
    } else {
      editDevice(device);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setDevice({ ...device, [name]: value });
  };

  const handleToggle = (e: React.FormEvent<HTMLInputElement>, data: CheckboxProps) => {
    const { name } = data;
    if (name !== undefined) {
      setDevice((prevDevice) => ({ ...device, [name]: !prevDevice[name] }));
    }
  };

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          onChange={handleInputChange}
          name="deviceId"
          placeholder="ID"
          value={device.deviceId}
          disabled={!edit}
        />
        <Form.Input
          onChange={handleInputChange}
          name="name"
          placeholder="Nazwa"
          value={device.name}
        />
        <Form.Input
          onChange={handleInputChange}
          name="location"
          placeholder="Lokalizacja"
          value={device.location}
        />
        <Form.Group inline>
          <label>Temperatura</label>
          <Checkbox
            toggle
            name="temperatureSensor"
            checked={device.temperatureSensor}
            onChange={handleToggle}
          />
        </Form.Group>
        <Form.Group inline>
          <label>Wilgotność</label>
          <Checkbox
            toggle
            name="humiditySensor"
            checked={device.humiditySensor}
            onChange={handleToggle}
          />
        </Form.Group>
        <Form.Group inline>
          <label>Ciśnienie</label>
          <Checkbox
            toggle
            name="pressureSensor"
            checked={device.pressureSensor}
            onChange={handleToggle}
          />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Input
            label={`Interwał: ${device.sendFrequency_ms / 1000}s `}
            min={1000}
            max={60000}
            name="sendFrequency_ms"
            onChange={handleInputChange}
            step={1000}
            type="range"
            value={device.sendFrequency_ms}
          />
        </Form.Group>

        {selectedDevice && (
          <Button
            floated="right"
            negative
            icon="trash"
            onClick={() => deleteDevice(selectedDevice)}
          />
        )}
        <Button floated="right" positive type="submit">
          Zatwierdź
        </Button>

        <Button onClick={cancelForm} floated="left" type="reset">
          Anuluj
        </Button>
      </Form>
    </Segment>
  );
};

export default observer(DeviceForm);
