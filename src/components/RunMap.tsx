import React from "react";
import { MapView, Permissions, Location } from "expo";

interface Props {
  targets: { latitude: number; longitude: number }[];
  visitedTargets: any[];
  location: any;
  accuracy: number;
}

class RunMap extends React.Component<Props> {
  render = () => {
    const visitedPositions = this.props.visitedTargets
      .map((timestamp, i) => (timestamp ? this.props.targets[i] : null))
      .filter(target => !!target);

    const notVisitedPositions = this.props.visitedTargets
      .map((timestamp, i) => (!timestamp ? this.props.targets[i] : null))
      .filter(target => !!target);

    return (
      <MapView
        style={{ flex: 1 }}
        provider={MapView.PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 52.22977,
          longitude: 21.011788,
          latitudeDelta: 0.002,
          longitudeDelta: 0.142
        }}
      >
        {visitedPositions.map((marker, i) => (
          <MapView.Marker coordinate={marker} key={i} pinColor="#2ecc71" />
        ))}

        {notVisitedPositions.map((marker, i) => (
          <MapView.Marker coordinate={marker} key={i} pinColor="#e74c3c" />
        ))}

        {this.props.location ? (
          <MapView.Marker
            coordinate={this.props.location}
            key="player"
            pinColor="rgb(52,152,219)"
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
  };
}

export default RunMap;
