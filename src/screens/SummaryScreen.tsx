import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Constants } from "expo";

export default class SummaryScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    const summary: Summary = this.props.navigation.getParam("summary") || {
      players: 73
    };

    return (
      <View style={styles.container}>
        <View style={styles.statusBarBackground} />
        <View style={styles.main}>
          <Text style={styles.congrats}>🎉 Congratulations!</Text>
        </View>

        <View style={styles.main2}>
          <Text style={styles.finished}>You have completed the objective.</Text>
          <View style={styles.row}>
            <Text style={styles.placeText}>Place</Text>
          </View>
          <Text style={styles.place}>1 / {summary.players}</Text>
          <View style={styles.row}>
            <Text style={styles.placeText}>Prize</Text>
          </View>
          <Text style={styles.prize2}>$140</Text>
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
    height: 200,
    backgroundColor: "#000000"
  },
  congrats: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#ffffff"
  },
  main2: {
    flex: 1,
    padding: 24
  },
  finished: {
    fontSize: 24
  },
  placeText: {
    fontSize: 20,
    color: "#ffffff"
  },
  place: {
    fontSize: 50,
    textAlign: "center"
  },
  prizeContainer: {
    marginTop: 60,
    flexDirection: "row"
  },
  prize2: {
    fontSize: 40,
    color: "#2ecc71",
    textAlign: "center",
    marginTop: 10
  },
  row: {
    marginTop: 30,
    backgroundColor: "#000000",
    padding: 10,
    justifyContent: "center",
    alignItems: "center"
  }
});
