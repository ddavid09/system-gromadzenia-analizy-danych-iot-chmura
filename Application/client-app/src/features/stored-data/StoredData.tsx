import { AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";
import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { Grid, Segment } from "semantic-ui-react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { RootStoreContext } from "../../app/stores/RootStore";
import DeviceSelector from "./DeviceSelector";
import TableValuesTable from "./TableValuesTable";

const StoredData = () => {
  const { deviceStore, userStore } = useContext(RootStoreContext);
  const { loadingInitial } = deviceStore;
  const { Logged } = userStore;

  useEffect(() => {
    if (Logged) {
      deviceStore.loadDevices();
    }
  }, [deviceStore, Logged]);

  return (
    <Segment basic>
      <AuthenticatedTemplate>
        <h1>Zgromadzone dane</h1>
        <Grid>
          {loadingInitial && <LoadingComponent content="Ładowanie" />}
          <Grid.Column width={10}>
            <DeviceSelector />
            <TableValuesTable />
          </Grid.Column>
        </Grid>
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <h1>Zaloguj się aby zobaczyć Zgromadzone dane</h1>
      </UnauthenticatedTemplate>
    </Segment>
  );
};

export default observer(StoredData);
