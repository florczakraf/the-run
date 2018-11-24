import React from "react";
import { StyleSheet, View, Text } from "react-native";
import MainHeader from "@app/components/MainHeader";
import RegisterButton from "@app/components/RegisterButton";

interface Props {
  navigation: any;
}

class HomeScreen extends React.Component<Props> {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.mainHeaderContainer}>
          <MainHeader />
        </View>

        <View style={styles.main}>
          <Text style={styles.signLabel}>SIGN FOR</Text>

          <View style={styles.buttons}>
            <RegisterButton
              navigateToDetails={() =>
                this.props.navigation.navigate("RunDetails")
              }
            />
          </View>
        </View>
      </View>
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
