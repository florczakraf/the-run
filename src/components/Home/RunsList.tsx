import React from "react";
import { StyleSheet, Text, View } from "react-native";
import RunCard from "./RunCard";
import Separator from "./Separator";

interface Props {
  runs: RunInfo[];
}

interface State {
  signedIn: string[];
}

class RunsList extends React.Component<Props, State> {
  state = {
    signedIn: []
  };

  _signUp = (id: string) => {
    this.setState(state => ({ signedIn: [...state.signedIn, id] }));
  };

  _renderCard = (run: RunInfo) => (
    <RunCard
      run={run}
      key={run.id}
      onSignUp={this._signUp}
      signedUp={this.state.signedIn.includes(run.id)}
    />
  );

  render() {
    const { runs } = this.props;

    return (
      <View style={styles.container}>
        <Separator text="Available runs" />

        {runs.map(this._renderCard)}
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
  }
});

export default RunsList;
