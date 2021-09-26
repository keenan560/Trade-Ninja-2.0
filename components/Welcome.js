import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

function Welcome({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trade Ninja</Text>
      <Button
        // icon={<Icon name="user-plus" size={15} color="#fff" />}
        title="Register"
        buttonStyle={styles.button}
        titleStyle={{ color: "#fff", fontWeight: "bold" }}
        onPress={() => navigation.navigate("Register")}
      />
      <Button
        // icon={<Icon name="arrow-right" size={15} color="#fff" />}
        title="Login"
        buttonStyle={styles.button}
        titleStyle={{ color: "#fff", fontWeight: "bold" }}
        onPress={() => navigation.navigate("Login")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 60,
    color: "#E50914",
    textAlign: "center",
    marginBottom: 120,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#141414",
    width: 275,
    height: 65,
    marginBottom: 10,
    borderRadius: 10,
  },
});

export default Welcome;
