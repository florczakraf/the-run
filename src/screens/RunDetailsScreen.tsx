import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { NavigationScreenProp } from "react-navigation";

interface Props {
  navigation: NavigationScreenProp<any>;
}

class RunDetailsScreen extends React.Component<Props> {
  render() {
    const run: RunInfo = this.props.navigation.getParam("run");

    return (
      <View style={styles.container}>
        <View style={styles.mapContainer} />
        <Text>{run.title}</Text>
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
