import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Button, Form, Icon, Segment } from "semantic-ui-react";
import { RootStoreContext } from "../../app/stores/RootStore";

const AnalyseFilterSettings = () => {
  const { analyseDataStore } = useContext(RootStoreContext);
  const { hideFilters, fetchTableData } = analyseDataStore;

  return (
    <Segment>
      <Form onSubmit={fetchTableData}>
        <h3>Filtruj dane</h3>
        <h5>Przedział czasowy:</h5>
        <Form.Group>
          <Form.Input type="datetime-local"></Form.Input>
          <Form.Input type="datetime-local"></Form.Input>
        </Form.Group>

        <h5>Odczyt z czujników:</h5>
        <Form.Group inline>
          <Form.Checkbox label="Temperatura" />
          <Form.Checkbox label="Ciśnienie" />
          <Form.Checkbox label="Wilgotność" />
        </Form.Group>
        <Button onClick={hideFilters}>Zamknij</Button>
        <Button type="submit" positive>
          Filtruj
        </Button>
      </Form>
    </Segment>
  );
};

export default observer(AnalyseFilterSettings);
