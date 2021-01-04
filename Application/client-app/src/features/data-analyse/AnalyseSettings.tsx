import React from "react";
import { Button, Segment } from "semantic-ui-react";
import AnalyseFilterSettings from "./AnalyseFilterSettings";
import MultipleDeviceSelector from "./MultipleDeviceSelector";

const AnalyseSettings = () => {
  return (
    <Segment>
      <MultipleDeviceSelector />
      <AnalyseFilterSettings />
      <Button>Filtruj dane</Button>
    </Segment>
  );
};

export default AnalyseSettings;
