import MainHeader from "@app/components/Home/MainHeader";
import RunsList from "@app/components/Home/RunsList";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { NavigationScreenProp } from "react-navigation";
import { defaultNavigationOptions } from "@app/navigation/defaults";
import { SocketService } from "@app/services/SocketService";

interface Props {
  navigation: NavigationScreenProp<any>;
}

interface State {
  availableRuns: RunInfo[];
  signedIn: string[];
}

class HomeScreen extends React.Component<Props, State> {
  static navigationOptions = {
    ...defaultNavigationOptions,
    header: null
  };

  state = {
    availableRuns: [] as RunInfo[],
    signedIn: [] as string[]
  };

  componentDidMount() {
    SocketService.init(this._onGamesChange, this._onGameStarted);
  }

  _onGamesChange = (games: RunInfo[]) => {
    this.setState({ availableRuns: games });
  };

  _onGameStarted = (game: RunInfo) => {
    this.props.navigation.navigate("Run", game);
  };

  _signUp = (id: string) => {
    const updatedRuns = this.state.availableRuns.map(run =>
      run.id === id ? { ...run, players: run.players + 1 } : run
    );
    this.setState(state => ({
      signedIn: [...state.signedIn, id],
      availableRuns: updatedRuns
    }));
  };

  render() {
    const { availableRuns } = this.state;

    return (
      <ScrollView style={styles.container}>
        <View style={styles.mainHeaderContainer}>
          <MainHeader />
        </View>

        <RunsList
          runs={availableRuns}
          onSignUp={this._signUp}
          signedIn={this.state.signedIn}
        />
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
