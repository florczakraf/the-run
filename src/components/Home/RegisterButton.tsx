import React from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import Colors from "@app/theme";

interface Props {
  title: string;
  navigateToDetails: () => void;
}

const RegisterButton = ({ navigateToDetails, title }: Props) => (
  <TouchableOpacity onPress={navigateToDetails}>
    <View style={styles.container}>
      <Text style={styles.buttonText}>{title}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 10,
    backgroundColor: Colors.primary,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1
  },
  buttonText: {
    fontSize: 20,
    color: "#ffffff"
  }
});

export default RegisterButton;
