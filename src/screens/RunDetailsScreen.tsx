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

interface Props {
  navigation: NavigationScreenProp<any>;
}

class RunDetailsScreen extends React.Component<Props> {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.run.title
  });

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
              latitude: 52.22977,
              longitude: 21.011788,
              latitudeDelta: 0.002,
              longitudeDelta: 0.232
            }}
          />
        </View>
        <View style={styles.detailsContainer}>
          <View style={styles.info}>
            <MaterialCommunityIcons
              name="clock-outline"
              size={32}
              color={Colors.primary}
            />
            <Text style={styles.infoText}>Starts at 12:00am</Text>
          </View>

          <View style={styles.info}>
            <MaterialCommunityIcons
              name="run"
              size={32}
              color={Colors.primary}
            />
            <Text style={styles.infoText}>
              {run.participantsCount} participants
            </Text>
          </View>

          <View style={styles.info}>
            <FontAwesome name="ticket" size={32} color={Colors.primary} />
            <Text style={styles.infoText}>{run.price}$ ticket cost</Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <RoundButton
            icon={<MaterialIcons name="payment" size={24} color="#ffffff" />}
            onPress={() => this.props.navigation.pop()}
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
    paddingVertical: 24,
    paddingHorizontal: 12
  },
  info: {
    flexDirection: "row",
    padding: 10,
    marginBottom: 10
  },
  infoText: {
    marginLeft: 12,
    color: "#393939",
    fontSize: 24,
    fontWeight: "500"
  },
  buttonContainer: {
    paddingHorizontal: 24,
    position: "absolute",
    width: "100%",
    bottom: 20
  }
});

export default RunDetailsScreen;
