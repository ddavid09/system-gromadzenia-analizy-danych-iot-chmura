import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { Grid, Segment } from "semantic-ui-react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { RootStoreContext } from "../../app/stores/RootStore";
import DeviceSelector from "./DeviceSelector";
import TableValuesTable from "./TableValuesTable";

const StoredData = () => {
  const { deviceStore } = useContext(RootStoreContext);
  const { loadingInitial } = deviceStore;

  useEffect(() => {
    deviceStore.loadDevices();
  }, [deviceStore]);

  return (
    <Segment basic>
      <h1>Zgromadzone dane</h1>
      <Grid>
        {loadingInitial && <LoadingComponent content="Ładowanie" />}
        <Grid.Column width={10}>
          <DeviceSelector />
          <TableValuesTable />
        </Grid.Column>
      </Grid>
    </Segment>
  );
};

export default observer(StoredData);
