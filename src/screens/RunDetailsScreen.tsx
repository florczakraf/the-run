import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { NavigationScreenProp } from "react-navigation";
import {
  MaterialCommunityIcons,
  MaterialIcons,
  FontAwesome
} from "@expo/vector-icons";
import { MapView } from "expo";
import Colors from "@app/theme";
import RoundButton from "@app/components/Home/RoundButton";
import { defaultNavigationOptions } from "@app/navigation/defaults";
import Separator from "@app/components/Home/Separator";
import { format } from "date-fns";
import { SocketService } from "@app/services/SocketService";

const POSITION = {
  latitude: 52.22977,
  longitude: 21.011788
};

interface Props {
  navigation: NavigationScreenProp<any>;
}

class RunDetailsScreen extends React.Component<Props> {
  static navigationOptions = ({ navigation }) => ({
    ...defaultNavigationOptions,
    title: navigation.state.params.run.name
  });

  _signUp = () => {
    const run: RunInfo = this.props.navigation.getParam("run");

    SocketService.joinGame(run.id);
    this.props.navigation.getParam("onSignUp")(run.id);
    this.props.navigation.pop();
  };

  render() {
    const run: RunInfo = this.props.navigation.getParam("run");

    return (
      <View style={styles.container}>
        <View style={styles.mapContainer}>
          <MapView
            style={{ flex: 1 }}
            showUserLocation={true}
            provider={MapView.PROVIDER_GOOGLE}
            initialRegion={{
              ...POSITION,
              latitudeDelta: 0.002,
              longitudeDelta: 0.232
            }}
          >
            <MapView.Circle
              center={POSITION}
              radius={4000}
              strokeWidth={2}
              strokeColor="rgba(41,128,185, 0.5)"
              fillColor="rgba(52,152,219, 0.5)"
            />
          </MapView>
        </View>
        <Separator text="Run details" />
        <View style={styles.detailsContainer}>
          <View style={styles.info}>
            <MaterialCommunityIcons
              name="clock-outline"
              size={32}
              color={Colors.primary}
            />
            <Text style={styles.infoText}>
              {format(run.startTime, "H:mm")} –{" "}
              {format(run.startTime + run.duration, "H:mm")}
            </Text>
          </View>

          <View style={styles.info}>
            <MaterialCommunityIcons
              name="run"
              size={32}
              color={Colors.primary}
            />
            <Text style={styles.infoText}>{run.players} participants</Text>
          </View>

          <View style={styles.info}>
            <FontAwesome name="ticket" size={32} color={Colors.primary} />
            <Text style={styles.infoText}>${run.entryFee.toFixed(2)}</Text>
          </View>

          <View style={styles.descriptionContainer}>
            <Text style={styles.description}>{run.description}</Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <RoundButton
            icon={<MaterialIcons name="payment" size={24} color="#ffffff" />}
            onPress={this._signUp}
            title="Pay & sign up"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative"
  },
  mapContainer: {
    height: "40%"
  },
  detailsContainer: {
    paddingBottom: 24,
    paddingHorizontal: 12
  },
  info: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10
  },
  infoText: {
    marginLeft: 12,
    color: "#000000",
    fontSize: 16,
    fontWeight: "500"
  },
  buttonContainer: {
    paddingHorizontal: 24,
    position: "absolute",
    width: "100%",
    bottom: 20
  },
  descriptionContainer: {
    width: "100%",
    padding: 10,
    backgroundColor: "#000000",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1,
    borderRadius: 6
  },
  description: {
    color: "#ffffff",
    fontSize: 15
  }
});

export default RunDetailsScreen;
