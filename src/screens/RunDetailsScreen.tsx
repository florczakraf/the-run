import React from "react";
import { StyleSheet, View } from "react-native";

class RunDetailsScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.mapContainer} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  mapContainer: {
    height: "40%",
    backgroundColor: "green"
  }
});

export default RunDetailsScreen;
