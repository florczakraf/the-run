import React from "react";
import { MapView } from "expo";

const RunScreen = () => (
  <MapView
    style={{ flex: 1 }}
    initialRegion={{
      latitude: 52.22977,
      longitude: 21.011788,
      latitudeDelta: 0.002,
      longitudeDelta: 0.002
    }}
  />
);

export default RunScreen;
