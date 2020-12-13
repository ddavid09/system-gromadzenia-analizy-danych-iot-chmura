import React, { ChangeEvent, useState, useEffect, FormEvent } from "react";
import { Button, Checkbox, CheckboxProps, Form, Segment } from "semantic-ui-react";
import { IDevice } from "../../../app/modules/device";

interface IProps {
  commingDevice: IDevice | null;
  submitDevice: () => void;
  cancelDevice: () => void;
}

const DeviceForm: React.FC<IProps> = ({ commingDevice, submitDevice, cancelDevice }) => {
  const initForm = () => {
    if (commingDevice) {
      return commingDevice;
    } else {
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
  }, [commingDevice]);

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
      <Form onSubmit={submitDevice}>
        <Form.Input
          onChange={handleInputChange}
          name="deviceId"
          placeholder="ID"
          value={device.deviceId}
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

        <Button floated="right" positive type="submit">
          Zatwierdź
        </Button>
        <Button onClick={cancelDevice} floated="left" type="reset">
          Anuluj
        </Button>
      </Form>
    </Segment>
  );
};

export default DeviceForm;
