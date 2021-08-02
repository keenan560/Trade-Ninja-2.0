import React from "react";
import { View, Text, StyleSheet } from "react-native";

function Activity() {
  return (
    <View style={styles.container}>
      <Text>Activity</Text>
    </View>
  );
}

export default Activity;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});
