import React from "react";
import { Button, Label, Segment } from "semantic-ui-react";
import Item from "semantic-ui-react/dist/commonjs/views/Item";
import { IAppointment } from "../../../app/modules/appointment";

interface IProps {
  appointments: IAppointment[];
  selectAppointment: (id: string) => void;
  deleteAppointment: (id: string) => void;
}

const AppointmentList: React.FC<IProps> = ({
  appointments,
  selectAppointment,
  deleteAppointment,
}) => {
  return (
    <Segment clearing>
      <Item.Group divided>
        {appointments.map((appointment) => (
          <Item key={appointment.id}>
            <Item.Content>
              <Item.Header as="a">{appointment.title}</Item.Header>
              <Item.Meta>{appointment.startDate}</Item.Meta>
              <Item.Description>
                <div>{appointment.description}</div>
                <div>{appointment.location}</div>
              </Item.Description>
              <Item.Extra>
                <Label as="a" color="black">
                  {appointment.doctor}
                  <Label.Detail>Doctor</Label.Detail>
                </Label>
                <Button
                  onClick={() => selectAppointment(appointment.id)}
                  floated="right"
                  content="szczegóły"
                  color="green"
                />
                <Button
                  onClick={() => deleteAppointment(appointment.id)}
                  floated="right"
                  negative
                  type="button"
                >
                  Usuń
                </Button>
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
};

export default AppointmentList;
