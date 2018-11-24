import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

const RoundButton = ({
  onPress,
  title,
  icon
}: {
  onPress: () => void;
  title: string;
  icon?: any;
}) => (
  <TouchableOpacity onPress={onPress}>
    <View style={styles.payButton}>
      <View style={styles.iconContainer}>{icon}</View>
      <Text style={styles.payButtonText}>{title.toUpperCase()}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  payButton: {
    position: "relative",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#000000",
    borderRadius: 6,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1
  },
  payButtonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "500"
  },
  iconContainer: {
    position: "absolute",
    left: 20
  }
});

export default RoundButton;
