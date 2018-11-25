import React from "react";
import { StyleSheet, View, Text } from "react-native";
import Colors from "@app/theme";
import { BlurView } from "expo";
import { MaterialCommunityIcons, Feather, Ionicons } from "@expo/vector-icons";
import { msToMMSS } from "@app/utils/helpers";

interface Props {
  run: RunInfo;
  visitedTargets: number[];
}

interface State {
  timeLeft: number;
}

export default class RunStatus extends React.Component<Props, State> {
  private _interval: NodeJS.Timeout;

  state = {
    timeLeft: 0
  };

  componentDidMount() {
    this._updateTimeLeft();
    this._interval = setInterval(this._updateTimeLeft, 1000);
  }

  componentWillUnmount() {
    if (this._interval) {
      clearInterval(this._interval);
    }
  }

  _updateTimeLeft = () => {
    const run: RunInfo = this.props.run;
    this.setState({ timeLeft: run.startTime + run.duration - Date.now() });
  };

  render() {
    return (
      <BlurView tint="light" intensity={50} style={styles.container}>
        <View style={styles.information}>
          <MaterialCommunityIcons name="clock-outline" size={22} />
          <Text style={styles.text}>{msToMMSS(this.state.timeLeft)}</Text>
        </View>
        <View style={styles.information}>
          <Feather name="map-pin" size={22} />
          <Text style={styles.text}>{`${
            this.props.visitedTargets.filter(v => v).length
          } / ${this.props.run.numberOfTargets}`}</Text>
        </View>
        <View style={styles.information}>
          <Ionicons name="md-podium" size={22} />
          <Text style={styles.text}>{this.props.run.finished + 1}</Text>
        </View>
      </BlurView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderColor: Colors.primary,
    borderWidth: 5,
    // backgroundColor: "transparent",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    flexDirection: "row",
    padding: 8
  },
  information: {
    flexDirection: "row",
    alignItems: "center"
  },
  text: {
    color: "#000000",
    fontSize: 15,
    marginLeft: 10,
    fontWeight: "500"
  }
});
