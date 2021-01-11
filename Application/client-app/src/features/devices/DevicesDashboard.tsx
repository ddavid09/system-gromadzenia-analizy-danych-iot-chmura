import React, { useEffect, useContext } from "react";
import { Card, Container, Grid, Segment } from "semantic-ui-react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import DeviceForm from "./DeviceForm";
import DeviceCard from "./DeviceCard";
import NewDeviceButton from "./NewDeviceButton";
import DeviceStore from "../../app/stores/DeviceStore";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../app/stores/RootStore";
import {
  AuthenticatedTemplate,
  MsalAuthenticationTemplate,
  UnauthenticatedTemplate,
} from "@azure/msal-react";
import { InteractionType } from "@azure/msal-browser";
import { loginRequest } from "../../app/auth/authConfig";

const DevicesDashboard = () => {
  const { deviceStore, userStore } = useContext(RootStoreContext);
  const { devicesArray, loadingInitial, editVisible } = deviceStore;
  const { Logged } = userStore;

  useEffect(() => {
    if (Logged) {
      deviceStore.loadDevices();
    }
  }, [deviceStore, Logged]);

  if (Logged) {
    return (
      <Segment basic>
        <Grid>
          {loadingInitial && <LoadingComponent content="Ładowanie" />}
          <Grid.Column width={8}>
            <h1>Twoje urządzenia IoT</h1>
            <Card.Group>
              {devicesArray.map((device) => (
                <DeviceCard key={device.deviceId} device={device} />
              ))}
              <NewDeviceButton />
            </Card.Group>
          </Grid.Column>
          <Grid.Column width={5}>{editVisible && <DeviceForm />}</Grid.Column>
        </Grid>
      </Segment>
    );
  } else {
    return (
      <Segment basic>
        <h1>Zaloguj się aby zobaczyć Twoje urządzenia</h1>
      </Segment>
    );
  }
};

export default observer(DevicesDashboard);
