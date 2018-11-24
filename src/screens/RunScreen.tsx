import React from "react";
import { StyleSheet, View, Button } from "react-native";
import RunMap from "@app/components/RunMap";
import RunStatus from "@app/components/RunStatus";
import { Constants } from "expo";

class RunScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <View style={styles.container}>
        <RunStatus participants="35" countdown="453" />
        <RunMap />
        <Button onPress={() => {}} title="Confirm Position" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight
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
