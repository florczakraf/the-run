import React from "react";
import { StyleSheet, View, Text } from "react-native";
import Colors from "@app/theme";

const RunStatus = props => (
  <View style={styles.container}>
    <Text style={styles.text}>Countdown: {props.countdown}</Text>
    <Text style={styles.text}>Participants: {props.participants}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: 4
  },
  text: {
    color: "#ffffff"
  }
});

export default RunStatus;
