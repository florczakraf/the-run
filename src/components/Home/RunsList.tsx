import React from "react";
import { StyleSheet, View, Text } from "react-native";
import RegisterButton from "./RegisterButton";
import { withNavigation, NavigationScreenProp } from "react-navigation";

interface Props {
  runs: RunInfo[];
  navigation?: NavigationScreenProp<any>;
}

class RunsList extends React.Component<Props> {
  _renderButton = (run: RunInfo) => (
    <RegisterButton
      key={run.id}
      title={run.title.toUpperCase()}
      navigateToDetails={() =>
        this.props.navigation.navigate("RunDetails", {
          run
        })
      }
    />
  );

  render() {
    const { runs } = this.props;

    return (
      <View style={styles.container}>
        <Text style={styles.signLabel}>Available runs</Text>

        <View style={styles.buttons}>{runs.map(this._renderButton)}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
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

export default withNavigation(RunsList);
