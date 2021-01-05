import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Grid, Segment, Table } from "semantic-ui-react";
import { RootStoreContext } from "../../app/stores/RootStore";
import AnalyseSettings from "./AnalyseSettings";

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
  const { deviceStore, analyseDataStore } = useContext(RootStoreContext);
  const { analysableSet, devicesIds } = analyseDataStore;

  const colors = ["#8884d8", "#ffc658", "#83a6ed", "#d0ed57", "#8dd1e1"];
  let color_t = 0;
  let color_p = 0;
  let color_h = 0;

  return (
    <Segment basic>
      <h1>Analiza danych</h1>
      <AnalyseSettings />
      <Grid>
        <Grid.Row>
          <Grid.Column width={5}>
            <h2 style={{ textAlign: "center" }}>Temperatura</h2>
            <LineChart width={500} height={300} data={analysableSet}>
              {devicesIds.map((deviceId) => (
                <Line
                  type="monotone"
                  dot={false}
                  dataKey={`${deviceId}_temperature`}
                  stroke={colors[color_t++ % 4]}
                  strokeWidth={2}
                />
              ))}

              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="timestamp" />
              <YAxis />
              <Tooltip />
              <Legend />
            </LineChart>
          </Grid.Column>
          <Grid.Column width={5}>
            <h2 style={{ textAlign: "center" }}>Ciśnienie</h2>
            <LineChart width={500} height={300} data={analysableSet}>
              {devicesIds.map((deviceId) => (
                <Line
                  type="monotone"
                  dot={false}
                  dataKey={`${deviceId}_pressure`}
                  stroke={colors[color_p++ % 4]}
                  strokeWidth={2}
                />
              ))}

              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="timestamp" />
              <YAxis />
              <Tooltip />
              <Legend />
            </LineChart>
          </Grid.Column>
          <Grid.Column width={5}>
            <h2 style={{ textAlign: "center" }}>Wilgotność</h2>
            <LineChart width={500} height={300} data={analysableSet}>
              {devicesIds.map((deviceId) => (
                <Line
                  type="monotone"
                  dot={false}
                  dataKey={`${deviceId}_humidity`}
                  stroke={colors[color_h++ % 4]}
                  strokeWidth={2}
                />
              ))}

              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="timestamp" />
              <YAxis />
              <Tooltip />
              <Legend />
            </LineChart>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column width={5}>
            <BarChart width={500} height={300} data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="pv" fill="#8884d8" />
              <Bar dataKey="uv" fill="#82ca9d" />
            </BarChart>
          </Grid.Column>
          <Grid.Column width={5}>
            <BarChart width={500} height={300} data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="pv" fill="#8884d8" />
              <Bar dataKey="uv" fill="#82ca9d" />
            </BarChart>
          </Grid.Column>
          <Grid.Column width={5}>
            <BarChart width={500} height={300} data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="pv" fill="#8884d8" />
              <Bar dataKey="uv" fill="#82ca9d" />
            </BarChart>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column width={5}>
            <Table>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>ID urządzenia</Table.HeaderCell>
                  <Table.HeaderCell>Max </Table.HeaderCell>
                  <Table.HeaderCell>Min</Table.HeaderCell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Cell</Table.Cell>
                  <Table.Cell>Cell</Table.Cell>
                  <Table.Cell>Cell</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Cell</Table.Cell>
                  <Table.Cell>Cell</Table.Cell>
                  <Table.Cell>Cell</Table.Cell>
                </Table.Row>
              </Table.Header>
            </Table>
          </Grid.Column>
          <Grid.Column width={5}>
            <Table>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>ID urządzenia</Table.HeaderCell>
                  <Table.HeaderCell>Max </Table.HeaderCell>
                  <Table.HeaderCell>Min</Table.HeaderCell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Cell</Table.Cell>
                  <Table.Cell>Cell</Table.Cell>
                  <Table.Cell>Cell</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Cell</Table.Cell>
                  <Table.Cell>Cell</Table.Cell>
                  <Table.Cell>Cell</Table.Cell>
                </Table.Row>
              </Table.Header>
            </Table>
          </Grid.Column>
          <Grid.Column width={5}>
            <Table>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>ID urządzenia</Table.HeaderCell>
                  <Table.HeaderCell>Max </Table.HeaderCell>
                  <Table.HeaderCell>Min</Table.HeaderCell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Cell</Table.Cell>
                  <Table.Cell>Cell</Table.Cell>
                  <Table.Cell>Cell</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Cell</Table.Cell>
                  <Table.Cell>Cell</Table.Cell>
                  <Table.Cell>Cell</Table.Cell>
                </Table.Row>
              </Table.Header>
            </Table>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  );
};

export default observer(AnalyseDashboard);
