import React, { useContext } from "react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { Grid, Segment } from "semantic-ui-react";
import { RootStoreContext } from "../../app/stores/RootStore";

const AnalyseDashboard = () => {
  const { deviceStore, storedDataStore } = useContext(RootStoreContext);
  const { dataToAnlyse } = storedDataStore;

  return (
    <Segment basic>
      <h1>Analiza danych</h1>
      <Grid>
        <Grid.Column width={5}>
          <h2 style={{ textAlign: "center" }}>Temperatura</h2>
          <LineChart width={500} height={300} data={dataToAnlyse}>
            <Line type="linear" dot={false} dataKey="temperature" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="sentTimestamp" />
            <YAxis />
          </LineChart>
        </Grid.Column>
        <Grid.Column width={5}>
          <h2 style={{ textAlign: "center" }}>Ciśnienie</h2>
          <LineChart width={500} height={300} data={dataToAnlyse}>
            <Line type="monotone" dot={false} dataKey="pressure" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="sentTimestamp" />
            <YAxis domain={[980, 1030]} />
          </LineChart>
        </Grid.Column>
        <Grid.Column width={5}>
          <h2 style={{ textAlign: "center" }}>Wilgotoność</h2>
          <LineChart width={500} height={300} data={dataToAnlyse}>
            <Line type="monotone" dot={false} dataKey="humidity" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="sentTimestamp" />
            <YAxis />
          </LineChart>
        </Grid.Column>
      </Grid>
    </Segment>
  );
};

export default AnalyseDashboard;
