import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { NavigationScreenProp, withNavigation } from "react-navigation";
import RoundButton from "./RoundButton";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";

interface Props {
  run: RunInfo;
  navigation?: NavigationScreenProp<any>;
}

const RunCard = ({ run, navigation }: Props) => (
  <View style={styles.container}>
    <View style={styles.row}>
      <Text style={styles.title}>{run.title}</Text>
    </View>

    <View style={styles.row}>
      <MaterialCommunityIcons name="clock-outline" size={32} />
    </View>

    <View style={styles.buttonContainer}>
      <RoundButton
        key={run.id}
        title="Sign Up"
        icon={<Feather name="edit-2" color="#ffffff" size={24} />}
        onPress={() =>
          navigation.navigate("RunDetails", {
            run
          })
        }
      />
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#ecf0f1",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2
  },
  title: {
    fontSize: 24,
    color: "#000000"
  },
  row: {
    flexDirection: "row",
    marginBottom: 20
  },
  buttonContainer: {
    marginTop: 30
  }
});

export default withNavigation(RunCard);
