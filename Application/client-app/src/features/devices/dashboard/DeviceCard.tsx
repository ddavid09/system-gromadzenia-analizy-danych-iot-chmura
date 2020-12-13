import React, { SyntheticEvent } from "react";
import { Card, Dimmer, Segment, Image, Label, CardProps } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { IDevice } from "../../../app/modules/device";

interface IProps {
  device: IDevice;
  handleSelection: (e: SyntheticEvent<HTMLAnchorElement>, d: CardProps) => void;
  loading: boolean;
}

const DeviceCard: React.FC<IProps> = ({ device, handleSelection, loading }) => {
  return (
    <Card name={device.deviceId} onClick={handleSelection}>
      {loading && <LoadingComponent />}
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
  );
};

export default DeviceCard;
