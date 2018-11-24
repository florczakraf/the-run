import React from "react";
import { StyleSheet, View, Text } from "react-native";
import Colors from "@app/theme";

const MainHeader = () => (
  <View style={styles.container}>
    <Text style={styles.headerText}>THE RUN</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    flex: 1
  },
  headerText: {
    color: "#ffffff",
    fontSize: 50
  }
});

export default MainHeader;
