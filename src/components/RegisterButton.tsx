import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";

const RegisterButton = () => (
  <TouchableOpacity style={styles.container}>
    <Text style={styles.buttonText}>The main run</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 20,
    backgroundColor: "purple",
    borderRadius: 20
  },
  buttonText: {
    fontSize: 20,
    color: "#ffffff"
  }
});

export default RegisterButton;
