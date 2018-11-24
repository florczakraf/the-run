import React from "react";
import { StyleSheet, View, Button } from "react-native";
import RunMap from "@app/components/RunMap";
import RunStatus from "@app/components/RunStatus";

const RunScreen = () => (
  <View style={styles.container}>
    <RunStatus participants="35" countdown="453" />
    <RunMap />
    <Button onPress={() => {}} title="Confirm Position" />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1
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
