import React from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";

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
    backgroundColor: "purple",
    borderRadius: 10,
    alignItems: "center"
  },
  buttonText: {
    fontSize: 20,
    color: "#ffffff"
  }
});

export default RegisterButton;
