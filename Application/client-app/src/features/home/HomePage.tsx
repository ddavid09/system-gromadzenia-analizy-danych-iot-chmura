import React from "react";
import { Segment } from "semantic-ui-react";
import { Image } from "semantic-ui-react";

const HomePage = () => {
  return (
    <Segment basic>
      <h1>
        System gromadzenia i analizy danych sensorycznych z urządzeń IoT z wykorzystaniem
        przetwarzania w chmurze
      </h1>
      <h3>
        The system for collecting and analyzing sensory data from IoT devices using cloud computing
      </h3>
      <Image size="massive" src="assets/wysoki-poziom-azure.png" />
      <Image size="huge" src="assets/architektura-ai.png" />
    </Segment>
  );
};

export default HomePage;
