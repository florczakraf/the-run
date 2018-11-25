import React from "react";
import { StyleSheet, View, Text } from "react-native";
import Colors from "@app/theme";
import { BlurView } from "expo";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { msToMMSS } from "@app/utils/helpers";

interface Props {
  runStats: any;
  run: RunInfo;
  participants: number;
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
        <Text style={styles.text}>Participants: {this.props.participants}</Text>
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
