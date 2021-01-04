import React, { useContext } from "react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { Grid, Segment } from "semantic-ui-react";
import { RootStoreContext } from "../../app/stores/RootStore";
const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const AnalyseDashboard = () => {
  const { deviceStore, storedDataStore } = useContext(RootStoreContext);
  const { dataToAnlyse } = storedDataStore;

  return (
    <Segment fluid basic>
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
