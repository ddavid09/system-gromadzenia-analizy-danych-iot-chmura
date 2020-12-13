import React, { Fragment } from "react";
import "semantic-ui-css/semantic.min.css";
import DevicesDashboard from "../../features/devices/dashboard/DevicesDashboard";
import NavBar from "../../features/nav/NavBar";
import SideBar from "../../features/nav/SideBar";

const App = () => {
  return (
    <Fragment>
      <NavBar />
      <SideBar />
      <DevicesDashboard />
    </Fragment>
  );
};

export default App;
