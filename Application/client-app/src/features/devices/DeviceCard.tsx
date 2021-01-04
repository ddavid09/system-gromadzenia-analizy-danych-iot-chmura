import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Card, Image, Label } from "semantic-ui-react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { IDevice } from "../../app/modules/device";
import { RootStoreContext } from "../../app/stores/RootStore";

const DeviceCard: React.FC<{ device: IDevice }> = ({ device }) => {
  const { deviceStore } = useContext(RootStoreContext);
  const { selectDevice, target, editing } = deviceStore;

  return (
    <Card name={device.deviceId} onClick={selectDevice}>
      {editing && device.deviceId === target && <LoadingComponent />}
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
          {device.connected ? (
            <Label color="green">Połączone</Label>
          ) : (
            <Label color="red">Nie połączone</Label>
          )}
          {device.connected && device.running ? (
            <Label color="green">Wysyła dane</Label>
          ) : (
            <Label color="red">Nie wysyła danych</Label>
          )}
        </Card.Content>
      </Card.Content>
    </Card>
  );
};

export default observer(DeviceCard);
