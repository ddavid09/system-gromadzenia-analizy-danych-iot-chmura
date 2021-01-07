import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { DateTimePicker } from "react-widgets";
import { Button, Form, Icon, Input, Segment } from "semantic-ui-react";
import { RootStoreContext } from "../../app/stores/RootStore";

const AnalyseFilterSettings = () => {
  const { analyseDataStore } = useContext(RootStoreContext);
  const {
    hideFilters,
    fetchTableData,
    minDate,
    setMinDate,
    maxDate,
    setMaxDate,
  } = analyseDataStore;

  return (
    <Segment clearing>
      <Form>
        <h3>Filtruj dane</h3>
        <h5>Przedział czasowy:</h5>
        <Form.Group>
          <DateTimePicker placeholder="Od.." value={minDate} onChange={setMinDate} />
        </Form.Group>
        <Form.Group>
          <DateTimePicker placeholder="Do.." value={maxDate} onChange={setMaxDate} />
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
