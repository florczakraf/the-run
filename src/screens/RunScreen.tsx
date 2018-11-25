import React from "react";
import { StyleSheet, View, Button } from "react-native";
import RunMap from "@app/components/RunMap";
import RunStatus from "@app/components/RunStatus";
import { Constants, Permissions, Location } from "expo";
import { availableRuns } from "@app/data";
import { EventSubscription } from "fbemitter";
import { SocketService } from "@app/services/SocketService";

class RunScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  private _locationListener: EventSubscription;

  state = {
    location: null,
    locationAccuracy: null,
    hasPermissions: false
  };

  async componentDidMount() {
    await this._getLocationPermission();
    this._locationListener = Location.watchPositionAsync(
      { enableHighAccuracy: true, timeInterval: 3000 },
      this._onNewLocation
    );
  }

  componentWillUnmount() {
    if (this._locationListener) {
      this._locationListener.remove();
    }
  }

  _onNewLocation = ({ coords, timestamp }: Location.LocationData) => {
    const { longitude, latitude, accuracy } = coords;
    // SocketService.sendLocation({ longitude, latitude });
    this.setState({ location: { longitude, latitude }, accuracy });
  };

  async _getLocationPermission() {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        location: null
      });
    } else {
      this.setState({ hasPermissions: true });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.statusBarBackground} />
        <View style={styles.runStatusContainer}>
          <RunStatus participants={35} run={availableRuns[0]} runStats={null} />
        </View>
        <RunMap
          location={this.state.location}
          targets={[]}
          accuracy={this.state.locationAccuracy}
        />
        {/* <Button onPress={() => {}} title="Confirm Position" /> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative"
  },
  runStatusContainer: {
    position: "absolute",
    top: Constants.statusBarHeight,
    zIndex: 10,
    width: "100%",
    padding: 20
  },
  statusBarBackground: {
    height: Constants.statusBarHeight,
    width: "100%",
    backgroundColor: "#000000"
  },
  mainHeaderContainer: {
    height: 300
  },
  main: {
    padding: 20,
    flex: 1
  },
  signLabel: {
    color: "#393939",
    fontSize: 20
  },
  buttons: {
    margin: 10
  }
});

export default RunScreen;
