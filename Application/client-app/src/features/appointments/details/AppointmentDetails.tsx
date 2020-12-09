import React from "react";
import { Button, Card } from "semantic-ui-react";
import { IAppointment } from "../../../app/modules/appointment";

interface IProps {
  appointment: IAppointment;
}

const AppointmentDetails: React.FC<IProps> = ({ appointment }) => {
  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>{appointment.title}</Card.Header>
        <Card.Meta>{appointment.startDate}</Card.Meta>
        <Card.Description>{appointment.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button color="grey">anuluj</Button>
        <Button color="black">edytuj</Button>
      </Card.Content>
    </Card>
  );
};

export default AppointmentDetails;
