import React, { Fragment } from "react";
import { Route } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import { Container } from "semantic-ui-react";
import AnalyseDashboard from "../../features/data-analyse/AnalyseDashboard";
import DevicesDashboard from "../../features/devices/DevicesDashboard";
import HomePage from "../../features/home/HomePage";
import NavBar from "../../features/nav/NavBar";
import SideBar from "../../features/nav/SideBar";
import StoredData from "../../features/stored-data/StoredData";

const App = () => {
  return (
    <Fragment>
      <NavBar />
      <SideBar />
      <Container fluid style={{ paddingTop: "4em", paddingLeft: "13em" }}>
        <Route exact path="/" component={HomePage} />
        <Route path="/devices" component={DevicesDashboard} />
        <Route path="/stored-data" component={StoredData} />
        <Route path="/analyse" component={AnalyseDashboard} />
      </Container>
    </Fragment>
  );
};

export default App;
