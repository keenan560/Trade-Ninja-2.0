import React from "react";
import { View, Text, StyleSheet } from "react-native";

function Stash() {
  return (
    <View style={styles.container}>
      <Text>Stash</Text>
    </View>
  );
}

export default Stash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#141414",
  },
});
