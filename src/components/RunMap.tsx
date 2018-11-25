import React from "react";
import { MapView, Permissions, Location } from "expo";

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

interface Props {
  targets: { latitude: number; longitude: number }[];
  location: any;
  accuracy: number;
}

class RunMap extends React.Component<Props> {
  render = () => (
    <MapView
      style={{ flex: 1 }}
      provider={MapView.PROVIDER_GOOGLE}
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

      {this.props.location ? (
        <MapView.Marker
          coordinate={this.props.location}
          key="player"
          pinColor="blue"
        />
      ) : null}
      {this.props.accuracy ? (
        <MapView.Circle
          center={this.props.location}
          radius={this.props.accuracy}
          strikeWidth={2}
          strokeColor="#2980b9"
          fillColor="#3498db"
        />
      ) : null}
    </MapView>
  );
}

export default RunMap;
