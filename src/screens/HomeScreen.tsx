import React from "react";
import { StyleSheet, View } from "react-native";
import Hello from "@app/components/Hello";

const HelloScreen = () => (
  <View style={styles.container}>
    <Hello />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default HelloScreen;
