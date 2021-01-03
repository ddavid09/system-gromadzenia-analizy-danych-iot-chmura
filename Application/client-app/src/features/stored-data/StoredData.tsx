import React from "react";
import { Segment } from "semantic-ui-react";
import TableValuesTable from "./TableValuesTable";

const StoredData = () => {
  return (
    <Segment fluid basic>
      <h1>Zgromadzone dane</h1>
      <TableValuesTable />
    </Segment>
  );
};

export default StoredData;
