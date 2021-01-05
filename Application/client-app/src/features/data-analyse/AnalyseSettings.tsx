import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Button, Segment } from "semantic-ui-react";
import { RootStoreContext } from "../../app/stores/RootStore";
import AnalyseFilterSettings from "./AnalyseFilterSettings";
import MultipleDeviceSelector from "./MultipleDeviceSelector";

const AnalyseSettings = () => {
  const { analyseDataStore } = useContext(RootStoreContext);
  const { hideFilters, makeFiltersVisible, filtersAvailable, filtersVisible } = analyseDataStore;

  return (
    <Segment>
      <MultipleDeviceSelector />
      {filtersVisible && <AnalyseFilterSettings />}
      {filtersAvailable && (
        <Button onClick={makeFiltersVisible} style={{ marginTop: "10px" }}>
          Filtruj dane
        </Button>
      )}
    </Segment>
  );
};

export default observer(AnalyseSettings);
