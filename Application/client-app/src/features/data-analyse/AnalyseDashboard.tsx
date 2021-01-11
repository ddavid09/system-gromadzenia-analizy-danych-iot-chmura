import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
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
import LoadingComponent from "../../app/layout/LoadingComponent";
import { RootStoreContext } from "../../app/stores/RootStore";
import AnalyseSettings from "./AnalyseSettings";

const AnalyseDashboard = () => {
  const { deviceStore, userStore, analyseDataStore } = useContext(RootStoreContext);
  const { loadingInitial } = deviceStore;
  const { Logged } = userStore;
  const {
    analyseData,
    analysableSet,
    devicesIds,
    avgAnalysableSet,
    loadingValues,
    minMaxAnalysableSet,
  } = analyseDataStore;

  useEffect(() => {
    if (Logged) {
      deviceStore.loadDevices();
    }
  }, [deviceStore, Logged]);

  const colors = ["#8884d8", "#ffc658", "#83a6ed", "#d0ed57", "#8dd1e1"];
  let color_t1 = 0;
  let color_p1 = 0;
  let color_h1 = 0;
  let color_t2 = 0;
  let color_p2 = 0;
  let color_h2 = 0;

  if (Logged) {
    return (
      <Segment basic>
        <h1>Analiza danych</h1>
        <AnalyseSettings />
        {loadingValues ||
          (loadingInitial && (
            <Segment basic style={{ marginTop: "200px" }}>
              <LoadingComponent content="Ładowanie" />
            </Segment>
          ))}
        {analyseData.length > 0 && (
          <Grid>
            <Grid.Row>
              <Grid.Column width={5}>
                <h2 style={{ paddingLeft: "60px" }}>Temperatura</h2>
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
                <h2 style={{ paddingLeft: "60px" }}>Ciśnienie</h2>
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
                <h2 style={{ paddingLeft: "60px" }}>Wilgotność</h2>
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
        {devicesIds.length > 0 && analyseData.length === 0 && <h3>Brak danych </h3>}
      </Segment>
    );
  } else {
    return (
      <Segment basic>
        <h1>Zaloguj się aby zobaczyć Twoje analizy</h1>
      </Segment>
    );
  }
};

export default observer(AnalyseDashboard);
