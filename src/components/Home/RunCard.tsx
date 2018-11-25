import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { NavigationScreenProp, withNavigation } from "react-navigation";
import RoundButton from "./RoundButton";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { format } from "date-fns";

interface Props {
  run: RunInfo;
  navigation?: NavigationScreenProp<any>;
  onSignUp: (id: string) => void;
}

const RunCard = ({ run, navigation, onSignUp }: Props) => (
  <View style={styles.container}>
    <View style={styles.row}>
      <Text style={styles.title}>{run.name}</Text>
    </View>

    <View style={styles.row}>
      <View style={styles.rowInner}>
        <MaterialCommunityIcons
          name="clock-outline"
          size={32}
          // color="#393939"
        />
        <Text style={styles.rowText}>
          {format(run.startTime, "H:mm")} –{" "}
          {format(run.startTime + run.duration, "H:mm")}
        </Text>
      </View>
      <View style={styles.rowInner}>
        <MaterialCommunityIcons name="run" size={32} />
        <Text style={styles.rowText}>{run.players} participants</Text>
      </View>
    </View>

    <View style={styles.buttonContainer}>
      <RoundButton
        key={run.id}
        title="Sign Up"
        icon={<Feather name="edit-2" color="#ffffff" size={24} />}
        onPress={() =>
          navigation.navigate("RunDetails", {
            run,
            onSignUp
          })
        }
      />
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderTopWidth: 10,
    borderBottomWidth: 10,
    borderColor: "#000000",
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
    alignItems: "center",
    marginBottom: 20
  },
  rowInner: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20
  },
  rowText: {
    marginLeft: 10,
    fontSize: 15
  },
  buttonContainer: {
    marginTop: 10
  }
});

export default withNavigation(RunCard);
