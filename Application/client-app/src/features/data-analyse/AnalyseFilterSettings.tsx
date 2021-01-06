import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Button, Form, Icon, Input, Segment } from "semantic-ui-react";
import { RootStoreContext } from "../../app/stores/RootStore";

const AnalyseFilterSettings = () => {
  const { analyseDataStore } = useContext(RootStoreContext);
  const { hideFilters, fetchTableData, minDate } = analyseDataStore;

  return (
    <Segment>
      <Form>
        <h3>Filtruj dane</h3>
        <h5>Przedział czasowy:</h5>
        <Form.Group>
          <Form.Input type="datetime-local" />

          <Form.Input type="datetime-local" />
        </Form.Group>

        <Button onClick={hideFilters}>Zamknij</Button>
        <Button onClick={fetchTableData} positive>
          Filtruj
        </Button>
      </Form>
    </Segment>
  );
};

export default observer(AnalyseFilterSettings);
