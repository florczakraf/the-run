import React from "react";
import { StyleSheet, View, Button } from "react-native";
import RunMap from "@app/components/RunMap";
import RunStatus from "@app/components/RunStatus";
import { Constants, Permissions, Location } from "expo";
import { availableRuns } from "@app/data";
import { EventSubscription } from "fbemitter";
import { SocketService } from "@app/services/SocketService";
import { NavigationScreenProp } from "react-navigation";
import { computeDestinationPoint, getBearing, getDistance } from "geolib";

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
      location: { latitude: 52.22977, longitude: 21.011788 },
      locationAccuracy: null,
      hasPermissions: false,
      run: run,
      visitedTargets: new Array(run.numberOfTargets).fill(null),
      targets: run.targets
    };

    setTimeout(() => this._performWalk(0), 3000);
  }

  async componentDidMount() {
    SocketService.setStatsHandler(this._onNewStats);

    // await this._getLocationPermission();
    // this._locationListener = Location.watchPositionAsync(
    //   { enableHighAccuracy: true, timeInterval: 3000 },
    //   this._onNewLocation
    // );
  }

  _performWalk(targetIndex) {
    const STEPS = 5;
    const target = this.state.targets[targetIndex];
    const distance = getDistance({ ...this.state.location }, { ...target });
    const step = distance / STEPS;
    const bearing = getBearing({ ...this.state.location }, { ...target });
    const DELAY = 500;

    const points = new Array(STEPS)
      .fill(0)
      .map((_, i) =>
        computeDestinationPoint(
          { ...this.state.location },
          step * (i + 1),
          bearing
        )
      );
    for (let i = 0; i < points.length; i++) {
      const point = points[i];
      setTimeout(() => this._onNewLocation({ coords: point }), DELAY * i);
    }

    setTimeout(() => SocketService.visitTarget(targetIndex), DELAY * STEPS);

    if (targetIndex < this.state.targets.length - 1) {
      setTimeout(() => this._performWalk(targetIndex + 1), DELAY * STEPS);
    }
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
