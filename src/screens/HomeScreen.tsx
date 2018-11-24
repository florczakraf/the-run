import MainHeader from "@app/components/Home/MainHeader";
import RunsList from "@app/components/Home/RunsList";
import { availableRuns } from "@app/data";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { NavigationScreenProp } from "react-navigation";

interface Props {
  navigation: NavigationScreenProp<any>;
}

class HomeScreen extends React.Component<Props> {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.mainHeaderContainer}>
          <MainHeader />
        </View>

        <RunsList runs={availableRuns} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  mainHeaderContainer: {
    height: 200
  },
  main: {}
});

export default HomeScreen;
