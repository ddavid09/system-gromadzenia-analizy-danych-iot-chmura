import { AuthenticatedTemplate, useAccount, useMsal } from "@azure/msal-react";
import { observer } from "mobx-react-lite";
import React, { Fragment, useContext, useEffect } from "react";
import { Route } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import { Container } from "semantic-ui-react";
import AnalyseDashboard from "../../features/data-analyse/AnalyseDashboard";
import DevicesDashboard from "../../features/devices/DevicesDashboard";
import HomePage from "../../features/home/HomePage";
import NavBar from "../../features/nav/NavBar";
import SideBar from "../../features/nav/SideBar";
import StoredData from "../../features/stored-data/StoredData";
import { loginRequest } from "../auth/authConfig";
import { RootStoreContext } from "../stores/RootStore";

const App = () => {
  const { userStore } = useContext(RootStoreContext);
  const { setUserStore } = userStore;

  const { instance, accounts, inProgress } = useMsal();
  const account = useAccount(accounts[0] || {});

  useEffect(() => {
    if (account && inProgress === "none") {
      instance
        .acquireTokenSilent({
          ...loginRequest,
          account: account,
        })
        .then((response) => {
          setUserStore(response);
        });
    }
  }, [account, inProgress, instance, setUserStore]);

  return (
    <Fragment>
      <NavBar />
      <AuthenticatedTemplate>
        <SideBar />
      </AuthenticatedTemplate>
      <Container
        fluid
        style={
          account
            ? { paddingTop: "4em", paddingLeft: "13em" }
            : { paddingTop: "4em", paddingLeft: "3em" }
        }
      >
        <Route exact path="/" component={HomePage} />
        <Route path="/devices" component={DevicesDashboard} />
        <Route path="/stored-data" component={StoredData} />
        <Route path="/analyse" component={AnalyseDashboard} />
      </Container>
    </Fragment>
  );
};

export default observer(App);
