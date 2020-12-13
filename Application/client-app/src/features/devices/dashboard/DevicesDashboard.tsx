import axios from "axios";
import React, { useState, useEffect } from "react";
import { Button, Card, Grid, Icon, Segment, Image, Label } from "semantic-ui-react";
import { IDevice } from "../../../app/modules/device";
import DeviceForm from "../form/DeviceForm";

const DevicesDashboard: React.FC = () => {
  const [devices, setDevices] = useState<IDevice[]>([]);
  const [editVisible, setEditVisible] = useState<boolean>(true);
  const [selectedDevice, setSelectedDevice] = useState<IDevice | null>(null);

  useEffect(() => {
    axios.get<IDevice[]>("http://localhost:5000/api/devices").then((response) => {
      setDevices(response.data);
    });
  }, []);

  return (
    <Grid style={{ paddingTop: "70px", marginLeft: "170px" }}>
      <Grid.Column width={9}>
        <Card.Group>
          {devices.map((device) => (
            <Card onClick={() => setSelectedDevice(device)}>
              <Card.Content>
                <Image floated="right" size="mini" src="assets/raspberry-pi-logo.png" />
                <Card.Header>{device.name}</Card.Header>
                <Card.Meta>ID: {device.deviceId}</Card.Meta>
                <Card.Description>
                  <table style={{ width: "100%" }}>
                    <tr>
                      <td>Typ urządzenia</td>
                      <td style={{ float: "right" }}>{device.deviceType}</td>
                    </tr>
                    <tr>
                      <td>Lokalizacja</td>
                      <td style={{ float: "right" }}>{device.location}</td>
                    </tr>
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
          >
            <Icon name="add" size="huge" />
          </Button>
        </Card.Group>
      </Grid.Column>
      <Grid.Column width={3}>
        {editVisible && (
          <DeviceForm
            commingDevice={selectedDevice}
            cancelDevice={() => void 0}
            submitDevice={() => void 0}
          />
        )}
      </Grid.Column>
    </Grid>
  );
};

export default DevicesDashboard;
