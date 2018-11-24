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

class RunMap extends React.Component {
  state = {
    hasPermissions: false,
    location: null
  };

  componentDidMount() {
    this._getLocation();
  }

  _getLocation = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        location: null
      });
    } else {
      this.setState({ hasPermissions: true });
    }

    let location = await Location.getCurrentPositionAsync({}); // TODO this or server? extract to method
    setTimeout(() => {
      this.setState({ location: location["coords"] });
    }, 3000);

    // TODO follow player on map? run on timer or socket data?
    // this.setState({
    //   mapRegion: {
    //     latitude: location.coords.latitude,
    //     longitude: location.coords.longitude,
    //     latitudeDelta: 0.0022,
    //     longitudeDelta: 0.0021
    //   }
    // });
  };

  render = () => (
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

      {this.state.location ? (
        <MapView.Marker
          coordinate={this.state.location}
          key="player"
          pinColor="blue"
        />
      ) : null}
    </MapView>
  );
}

export default RunMap;
