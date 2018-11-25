import React from "react";
import { StyleSheet, View, Button } from "react-native";
import RunMap from "@app/components/RunMap";
import RunStatus from "@app/components/RunStatus";
import { Constants, Permissions, Location } from "expo";
import { availableRuns } from "@app/data";
import { EventSubscription } from "fbemitter";
import { SocketService } from "@app/services/SocketService";
import { NavigationScreenProp } from "react-navigation";

interface Props {
  navigation: NavigationScreenProp<any>;
}

class RunScreen extends React.Component<Props> {
  static navigationOptions = {
    header: null
  };

  private _locationListener: EventSubscription;

  constructor(props: Props) {
    super(props);

    const run = this.props.navigation.getParam("run");

    this.state = {
      location: null,
      locationAccuracy: null,
      hasPermissions: false,
      run: run,
      visitedTargets: new Array(run.numberOfTargets).fill(null),
      targets: run.targets
    };
  }

  async componentDidMount() {
    SocketService.setStatsHandler(this._onNewStats);

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

  _onNewStats = (stats: Stats) => {
    const { visitedTargets, ...run } = stats;
    this.setState({ visitedTargets, run });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.statusBarBackground} />
        <View style={styles.runStatusContainer}>
          <RunStatus
            run={this.state.run}
            visitedTargets={this.state.visitedTargets}
          />
        </View>
        <RunMap
          location={this.state.location}
          targets={this.state.targets}
          accuracy={this.state.locationAccuracy}
          visitedTargets={this.state.visitedTargets}
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
