import React, { useEffect, useContext } from "react";
import { Card, Container, Grid, Segment } from "semantic-ui-react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import DeviceForm from "./DeviceForm";
import DeviceCard from "./DeviceCard";
import NewDeviceButton from "./NewDeviceButton";
import DeviceStore from "../../app/stores/DeviceStore";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../app/stores/RootStore";

const DevicesDashboard = () => {
  const {deviceStore} = useContext(RootStoreContext);
  const { devicesArray, loadingInitial, editVisible } = deviceStore;

  useEffect(() => {
    deviceStore.loadDevices();
  }, [deviceStore]);

  return (
    <Segment fluid basic>
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
        <Grid.Column width={3}>{editVisible && <DeviceForm />}</Grid.Column>
      </Grid>
    </Segment>
  );
};

export default observer(DevicesDashboard);
