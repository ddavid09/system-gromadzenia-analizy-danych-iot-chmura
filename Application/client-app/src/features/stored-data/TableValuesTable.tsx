import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { Icon, Menu, Table } from "semantic-ui-react";
import { RootStoreContext } from "../../app/stores/RootStore";

const TableValuesTable = () => {
  const { storedDataStore } = useContext(RootStoreContext);
  const { tableValuesArray, loadTableValues } = storedDataStore;

  useEffect(() => {
    loadTableValues();
  }, [loadTableValues]);

  return (
    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Data Przesłania</Table.HeaderCell>
          <Table.HeaderCell>Temperatura</Table.HeaderCell>
          <Table.HeaderCell>Ciśnienie</Table.HeaderCell>
          <Table.HeaderCell>Wilgotność</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        <Table.Row>
          <Table.Cell>1</Table.Cell>
          <Table.Cell>2</Table.Cell>
          <Table.Cell>3</Table.Cell>
          <Table.Cell>4</Table.Cell>
        </Table.Row>

        {tableValuesArray.map((value) => (
          <Table.Row>
            <Table.Cell>{value.sentTimestamp}</Table.Cell>
            {console.log(value.sentTimestamp)}
            <Table.Cell>{value.temperature}</Table.Cell>
            {console.log(value.temperature)}
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
  );
};

export default observer(TableValuesTable);
