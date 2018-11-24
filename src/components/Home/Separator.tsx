import React from "react";
import { StyleSheet, View, Text } from "react-native";

const Separator = ({ text }: { text: string }) => (
  <View style={styles.container}>
    <View style={styles.line} />
    <Text style={styles.text}>{text.toUpperCase()}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    position: "relative",
    height: 60,
    justifyContent: "center",
    alignItems: "center"
  },
  line: {
    position: "absolute",
    top: "50%",
    height: 2,
    width: "100%",
    backgroundColor: "#000000"
  },
  text: {
    fontSize: 14,
    fontWeight: "500",
    backgroundColor: "#ffffff",
    paddingHorizontal: 15,
    letterSpacing: 2
  }
});

export default Separator;
