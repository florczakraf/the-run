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
    flex: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3
  },
  headerText: {
    color: "#ffffff",
    fontSize: 50
  }
});

export default MainHeader;
