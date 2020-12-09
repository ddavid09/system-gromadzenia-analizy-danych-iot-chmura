import React from "react";
import { Grid } from "semantic-ui-react";
import { IAppointment } from "../../../app/modules/appointment";
import AppointmentList from "./AppointmentList";
import AppointmentForm from "../form/AppointmentForm";

interface IProps {
  appointments: IAppointment[];
  selectAppointment: (id: string) => void;
  selectedAppointment: IAppointment | null;
  editMode: boolean;
  cancelAppointment: () => void;
  submitAppointment: (appointment: IAppointment) => void;
  deleteAppointment: (id: string) => void
}

const AppointmentDashboard: React.FC<IProps> = ({
  appointments,
  selectAppointment,
  selectedAppointment,
  editMode,
  cancelAppointment,
  submitAppointment,
  deleteAppointment
}) => {
  return (
    <Grid>
      <Grid.Column width={10}>
        <AppointmentList appointments={appointments} selectAppointment={selectAppointment} deleteAppointment={deleteAppointment}/>
      </Grid.Column>
      <Grid.Column width={6}>
        {editMode && (
          <AppointmentForm
            appointment={selectedAppointment}
            cancelAppointment={cancelAppointment}
            submitAppointment={submitAppointment}
          />
        )}
      </Grid.Column>
    </Grid>
  );
};

export default AppointmentDashboard;
