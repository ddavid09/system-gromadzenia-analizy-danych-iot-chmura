import React, { ChangeEvent, useEffect, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { IAppointment } from "../../../app/modules/appointment";
import { v4 as uuidv4 } from 'uuid';

interface IProps {
  appointment: IAppointment | null;
  cancelAppointment: () => void;
  submitAppointment: (appointment: IAppointment) => void;
}

const AppointmentForm: React.FC<IProps> = ({
  appointment: commingAppointment,
  cancelAppointment,
  submitAppointment,
}) => {
  const initializeFrom = () => {
    if (commingAppointment) {
      return commingAppointment;
    } else {
      return {
        id: uuidv4(),
        title: "",
        description: "",
        doctor: "",
        location: "",
        patient: "",
        startDate: "",
      };
    }
  };

  const [appointment, setAppointment] = useState<IAppointment>(initializeFrom);

  useEffect(() => {
    setAppointment(initializeFrom);
  }, [commingAppointment]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setAppointment({ ...appointment, [name]: value });
  };

  return (
    <Segment clearing>
      <Form onSubmit={() => submitAppointment(appointment)}>
        <Form.Input
          onChange={handleInputChange}
          name="title"
          placeholder="Wizyta"
          value={appointment.title}
        />
        <Form.TextArea
          onChange={handleInputChange}
          name="description"
          placeholder="Opis"
          value={appointment.description}
        />
        <Form.Input
          onChange={handleInputChange}
          name="doctor"
          placeholder="Lekarz"
          value={appointment.doctor}
        />
        <Form.Input
          onChange={handleInputChange}
          name="location"
          placeholder="Lokalizacja"
          value={appointment.location}
        />
        <Form.Input
          onChange={handleInputChange}
          name="patient"
          placeholder="Pacjent"
          value={appointment.patient}
        />
        <Form.Input
          onChange={handleInputChange}
          name="startDate"
          type="datetime-local"
          value={appointment.startDate}
        />

        <Button floated="right" positive type="submit">
          Zatwierdź
        </Button>
        <Button onClick={cancelAppointment} floated="left" type="reset">
          Anuluj
        </Button>
      </Form>
    </Segment>
  );
};

export default AppointmentForm;
