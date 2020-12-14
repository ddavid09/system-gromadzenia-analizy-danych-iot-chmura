import React, { Fragment } from "react";
import { Route } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import { Container } from "semantic-ui-react";
import DevicesDashboard from "../../features/devices/DevicesDashboard";
import HomePage from "../../features/home/HomePage";
import NavBar from "../../features/nav/NavBar";
import SideBar from "../../features/nav/SideBar";

const App = () => {
  return (
    <Fragment>
      <NavBar />
      <SideBar />
      <Container fluid style={{ paddingTop: "5em", paddingLeft: "15em" }}>
        <Route exact path="/" component={HomePage} />
        <Route path="/devices" component={DevicesDashboard} />
      </Container>
    </Fragment>
  );
};

export default App;
