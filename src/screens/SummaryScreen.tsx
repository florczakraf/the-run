import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Constants } from "expo";

export default class SummaryScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.statusBarBackground} />
        <View style={styles.main}>
          <Text style={styles.congrats}>Congratulations!</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  statusBarBackground: {
    height: Constants.statusBarHeight,
    width: "100%",
    backgroundColor: "#000000"
  },
  main: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: "#000000"
  },
  congrats: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#ffffff"
  }
});
