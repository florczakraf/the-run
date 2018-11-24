import React from "react";
import { StyleSheet, Text, View } from "react-native";
import RunCard from "./RunCard";
import Separator from "./Separator";

interface Props {
  runs: RunInfo[];
}

class RunsList extends React.Component<Props> {
  _renderCard = (run: RunInfo) => <RunCard run={run} key={run.id} />;

  render() {
    const { runs } = this.props;

    return (
      <View style={styles.container}>
        {/* <Text style={styles.signLabel}>Available runs</Text> */}
        <Separator text="Available runs" />

        <View style={styles.buttons}>{runs.map(this._renderCard)}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  signLabel: {
    color: "#393939",
    fontSize: 20
  },
  buttons: {
    marginBottom: 30
  }
});

export default RunsList;
