import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Grid, Segment, Table } from "semantic-ui-react";
import LoadingComponent from "../../app/layout/LoadingComponent";
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
  const {
    analyseData,
    analysableSet,
    devicesIds,
    avgAnalysableSet,
    loadingValues,
    minMaxAnalysableSet,
  } = analyseDataStore;

  const colors = ["#8884d8", "#ffc658", "#83a6ed", "#d0ed57", "#8dd1e1"];
  let color_t1 = 0;
  let color_p1 = 0;
  let color_h1 = 0;
  let color_t2 = 0;
  let color_p2 = 0;
  let color_h2 = 0;

  return (
    <Segment basic>
      <h1>Analiza danych</h1>
      <AnalyseSettings />
      {loadingValues && (
        <Segment basic style={{ marginTop: "200px" }}>
          <LoadingComponent content="Ładowanie" />
        </Segment>
      )}
      {analyseData.length > 0 && (
        <Grid>
          <Grid.Row>
            <Grid.Column width={5}>
              <h2 style={{ textAlign: "center" }}>Temperatura</h2>
              <LineChart width={500} height={300} data={analysableSet}>
                {devicesIds.map((deviceId) => (
                  <Line
                    key={deviceId}
                    type="monotone"
                    dot={false}
                    dataKey={`${deviceId}_temperature`}
                    stroke={colors[color_t1++ % 4]}
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
                    key={deviceId}
                    type="monotone"
                    dot={false}
                    dataKey={`${deviceId}_pressure`}
                    stroke={colors[color_p1++ % 4]}
                    strokeWidth={2}
                  />
                ))}

                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="timestamp" />
                <YAxis domain={[925, 1050]} />
                <Tooltip />
                <Legend />
              </LineChart>
            </Grid.Column>
            <Grid.Column width={5}>
              <h2 style={{ textAlign: "center" }}>Wilgotność</h2>
              <LineChart width={500} height={300} data={analysableSet}>
                {devicesIds.map((deviceId) => (
                  <Line
                    key={deviceId}
                    type="monotone"
                    dot={false}
                    dataKey={`${deviceId}_humidity`}
                    stroke={colors[color_h1++ % 4]}
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
              <BarChart width={500} height={300} data={avgAnalysableSet}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="deviceId" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="temperature_avg" fill={colors[color_t2++ % 4]} />
              </BarChart>
            </Grid.Column>
            <Grid.Column width={5}>
              <BarChart width={500} height={300} data={avgAnalysableSet}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="deviceId" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="pressure_avg" fill={colors[color_p2++ % 4]} />
              </BarChart>
            </Grid.Column>
            <Grid.Column width={5}>
              <BarChart width={500} height={300} data={avgAnalysableSet}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="deviceId" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="humidity_avg" fill={colors[color_h2++ % 4]} />
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
                  {devicesIds.map((deviceId) => (
                    <Table.Row key={deviceId}>
                      <Table.Cell>{deviceId}</Table.Cell>
                      <Table.Cell>
                        {minMaxAnalysableSet.get(deviceId)?.temperature_max.toFixed(3)}
                      </Table.Cell>
                      <Table.Cell>
                        {minMaxAnalysableSet.get(deviceId)?.temperature_min.toFixed(3)}
                      </Table.Cell>
                    </Table.Row>
                  ))}
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
                  {devicesIds.map((deviceId) => (
                    <Table.Row key={deviceId}>
                      <Table.Cell>{deviceId}</Table.Cell>
                      <Table.Cell>
                        {minMaxAnalysableSet.get(deviceId)?.pressure_max.toFixed(3)}
                      </Table.Cell>
                      <Table.Cell>
                        {minMaxAnalysableSet.get(deviceId)?.pressure_min.toFixed(3)}
                      </Table.Cell>
                    </Table.Row>
                  ))}
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
                  {devicesIds.map((deviceId) => (
                    <Table.Row key={deviceId}>
                      <Table.Cell>{deviceId}</Table.Cell>
                      <Table.Cell>
                        {minMaxAnalysableSet.get(deviceId)?.humidity_max.toFixed(3)}
                      </Table.Cell>
                      <Table.Cell>
                        {minMaxAnalysableSet.get(deviceId)?.humidity_min.toFixed(3)}
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Header>
              </Table>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      )}
    </Segment>
  );
};

export default observer(AnalyseDashboard);
