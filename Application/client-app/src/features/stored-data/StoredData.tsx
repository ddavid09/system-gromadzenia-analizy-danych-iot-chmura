import React from "react";
import { Grid, Segment } from "semantic-ui-react";
import TableValuesTable from "./TableValuesTable";

const StoredData = () => {
  return (
    <Segment fluid basic>
      <h1>Zgromadzone dane</h1>
      <Grid>
        <Grid.Column width={10}>
          <TableValuesTable />
        </Grid.Column>
      </Grid>
    </Segment>
  );
};

export default StoredData;
