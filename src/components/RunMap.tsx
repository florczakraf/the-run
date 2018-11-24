import React from "react";
import { MapView } from "expo";

const someMarkers = [
  {
    latitude: 52.2246811,
    longitude: 20.9439219
  },
  {
    latitude: 52.2282377,
    longitude: 21.0132706
  },
  {
    latitude: 52.22707279999999,
    longitude: 21.0015926
  },
  {
    latitude: 52.1981326,
    longitude: 20.9644923
  },
  {
    latitude: 52.2306037,
    longitude: 20.9947205
  },
  {
    latitude: 52.2323258,
    longitude: 20.9598583
  },
  {
    latitude: 52.2535086,
    longitude: 20.9913124
  }
];

const RunMap = () => (
  <MapView
    style={{ flex: 1 }}
    initialRegion={{
      latitude: 52.22977,
      longitude: 21.011788,
      latitudeDelta: 0.002,
      longitudeDelta: 0.232
    }}
  >
    {someMarkers.map((marker, i) => (
      <MapView.Marker coordinate={marker} key={i} />
    ))}
  </MapView>
);

export default RunMap;
