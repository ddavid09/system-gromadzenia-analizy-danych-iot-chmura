import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Icon, Menu, Segment, Table } from "semantic-ui-react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { RootStoreContext } from "../../app/stores/RootStore";

const TableValuesTable = () => {
  const { storedDataStore } = useContext(RootStoreContext);
  const { tableValuesArray, loadingValues, selectedDeviceId } = storedDataStore;

  if (loadingValues === false && selectedDeviceId && tableValuesArray.length === 0) {
    return <h3>Brak danych dla urządzenia o ID: {selectedDeviceId} </h3>;
  }

  if (selectedDeviceId === "") {
    return null;
  }

  return (
    <Segment basic>
      {" "}
      {loadingValues && <LoadingComponent content="Ładowanie" />}
      <Table celled>
        <Table.Header>
          <Table.Row key="header">
            <Table.HeaderCell>Data Przesłania</Table.HeaderCell>
            <Table.HeaderCell>Temperatura</Table.HeaderCell>
            <Table.HeaderCell>Ciśnienie</Table.HeaderCell>
            <Table.HeaderCell>Wilgotność</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {tableValuesArray.map((value) => (
            <Table.Row key={value.rowKey}>
              <Table.Cell>{value.sentTimestamp}</Table.Cell>
              <Table.Cell>{value.temperature}</Table.Cell>
              <Table.Cell>{value.pressure}</Table.Cell>
              <Table.Cell>{value.humidity}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>

        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan="4">
              <Menu floated="right" pagination>
                <Menu.Item as="a" icon>
                  <Icon name="chevron left" />
                </Menu.Item>
                <Menu.Item as="a">1</Menu.Item>
                <Menu.Item as="a">2</Menu.Item>
                <Menu.Item as="a">3</Menu.Item>
                <Menu.Item as="a">4</Menu.Item>
                <Menu.Item as="a" icon>
                  <Icon name="chevron right" />
                </Menu.Item>
              </Menu>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </Segment>
  );
};

export default observer(TableValuesTable);
