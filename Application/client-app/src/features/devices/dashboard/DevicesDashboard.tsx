import React, { useState, useEffect } from "react";
import { Button, Card, Grid, Icon, Image, Label } from "semantic-ui-react";
import Devices from "../../../app/api/agent";
import { IDevice } from "../../../app/modules/device";
import DeviceForm from "../form/DeviceForm";

const DevicesDashboard: React.FC = () => {
  const [devices, setDevices] = useState<IDevice[]>([]);
  const [editVisible, setEditVisible] = useState<boolean>(false);
  const [selectedDevice, setSelectedDevice] = useState<IDevice | null>(null);

  useEffect(() => {
    Devices.getAll().then((response) => {
      console.log("api getAll");
      setDevices(response);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (device: IDevice) => {
    if (selectedDevice) {
      Devices.update(device).then(() => {
        let devicesArray = [...devices];
        const index = devicesArray.findIndex((d) => d.deviceId === device.deviceId);
        devicesArray[index] = device;
        setDevices([...devicesArray]);
      });
    } else {
      Devices.create(device).then(() => {
        setDevices([...devices.filter((d) => d.deviceId !== device.deviceId), device]);
      });
    }
    setEditVisible(false);
  };

  const handleDelete = (device: IDevice) => {
    Devices.delete(device.deviceId).then(() =>
      setDevices([...devices.filter((d) => d.deviceId !== device.deviceId)])
    );
    if (selectedDevice && selectedDevice.deviceId === device.deviceId) {
      setEditVisible(false);
    }
  };

  return (
    <Grid style={{ paddingTop: "70px", marginLeft: "170px" }}>
      <Grid.Column width={9}>
        <Card.Group>
          {devices.map((device) => (
            <Card
              key={device.deviceId}
              onClick={() => {
                setSelectedDevice(device);
                setEditVisible(true);
              }}
            >
              <Card.Content>
                <Image floated="right" size="mini" src="assets/raspberry-pi-logo.png" />
                <Card.Header>{device.name}</Card.Header>
                <Card.Meta>ID: {device.deviceId}</Card.Meta>
                <Card.Description>
                  <table style={{ width: "100%" }}>
                    <tbody>
                      <tr>
                        <td>Typ urządzenia</td>
                        <td style={{ float: "right" }}>{device.deviceType}</td>
                      </tr>
                      <tr>
                        <td>Lokalizacja</td>
                        <td style={{ float: "right" }}>{device.location}</td>
                      </tr>
                    </tbody>
                  </table>
                </Card.Description>
                <Card.Content extra style={{ paddingTop: "10px" }}>
                  <Label color="red">Nie połączone</Label>
                </Card.Content>
              </Card.Content>
            </Card>
          ))}
          <Button
            icon
            style={{
              height: "168px",
              marginTop: "11px",
              marginLeft: "7px",
              width: "289px",
              padding: "10px",
            }}
            onClick={() => {
              setSelectedDevice(null);
              setEditVisible(true);
            }}
          >
            <Icon name="add" size="huge" />
          </Button>
        </Card.Group>
      </Grid.Column>
      <Grid.Column width={3}>
        {editVisible && (
          <DeviceForm
            commingDevice={selectedDevice}
            cancelDevice={() => {
              setSelectedDevice(null);
              setEditVisible(false);
            }}
            deleteDevice={handleDelete}
            submitDevice={handleSubmit}
          />
        )}
      </Grid.Column>
    </Grid>
  );
};

export default DevicesDashboard;
