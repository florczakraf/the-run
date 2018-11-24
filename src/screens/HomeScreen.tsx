import React from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import MainHeader from "@app/components/MainHeader";
import RegisterButton from "@app/components/RegisterButton";
import { availableRuns } from "@app/data";
import { NavigationScreenProp } from "react-navigation";

const AVAILABLE_RUNS = availableRuns;

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

        <View style={styles.main}>
          <Text style={styles.signLabel}>SIGN FOR</Text>

          <View style={styles.buttons}>
            <RegisterButton
              title={AVAILABLE_RUNS[0].title}
              navigateToDetails={() =>
                this.props.navigation.navigate("RunDetails", {
                  run: AVAILABLE_RUNS[0]
                })
              }
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}

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
    marginVertical: 30
  }
});

export default HomeScreen;
