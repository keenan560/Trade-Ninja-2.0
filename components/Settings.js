import React, { useContext, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { UserContext } from "../App";

function Settings({ navigation }) {
  const userContext = useContext(UserContext);

  const logOut = () => {
    userContext.userDispatch({
      type: "logout",
      payload: { user: null, isLogged: false },
    });

    setTimeout(() => {
      navigation.navigate("Welcome");
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <Text>Settings</Text>

      <Button buttonStyle={styles.button} title="Log Out" onPress={logOut} />
    </View>
  );
}

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#141414",
    width: 275,
    height: 65,
    marginBottom: 10,
    borderRadius: 10,
    marginTop: 75,
  },
});
