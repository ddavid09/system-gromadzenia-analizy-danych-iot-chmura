import React, { Fragment } from "react";
import "semantic-ui-css/semantic.min.css";
import NavBar from "../../features/nav/NavBar";
import FixedSideBar from "../../features/nav/FixedSideBar";
import SideBar from "../../features/nav/SideBar";
// import agent from "../api/agent";
// import { IAppointment } from "../modules/appointment";

const App = () => {
  // const [appointments, setAppointments] = useState<IAppointment[]>([]);
  // const [selectedAppointment, setSelectedAppointment] = useState<IAppointment | null>(null);
  // const [editMode, setEditMode] = useState(false);

  // const handleSelectAppointment = (id: string) => {
  //   setSelectedAppointment(appointments.filter((a) => a.id === id)[0]);
  //   setEditMode(true);
  // };

  // const handleCancelSelection = () => {
  //   setEditMode(false);
  //   setSelectedAppointment(null);
  // };

  // const handleSubmit = (appointment: IAppointment) => {
  //   setEditMode(false);

  //   if (selectedAppointment) {
  //     agent.Appointments.update(appointment).then(() => {
  //       let arr = [...appointments];
  //       const index = arr.findIndex((a) => a.id === appointment.id);
  //       arr[index] = appointment;
  //       setAppointments([...arr]);
  //     });
  //   } else {
  //     agent.Appointments.create(appointment).then(() => {
  //       setAppointments([...appointments.filter((a) => a.id !== appointment.id), appointment]);
  //     });
  //   }
  // };

  // const handleNewAppointment = () => {
  //   setEditMode(true);
  //   setSelectedAppointment(null);
  // };

  // const handleDelete = (id: string) => {
  //   agent.Appointments.delete(id).then(() =>
  //     setAppointments([...appointments.filter((a) => a.id !== id)])
  //   );
  //   if (selectedAppointment && selectedAppointment.id === id) {
  //     setEditMode(false);
  //   }
  // };

  // useEffect(() => {
  //   agent.Appointments.list().then((response) => {
  //     let as: IAppointment[] = [];
  //     response.forEach((a) => {
  //       a.startDate = a.startDate.split(".")[0];
  //       as.push(a);
  //     });
  //     setAppointments(as);
  //   });
  // }, []);

  return (
    <Fragment>
      <NavBar />
      {/* <FixedSideBar/> */}
      <SideBar />
    </Fragment>
  );
};

export default App;
