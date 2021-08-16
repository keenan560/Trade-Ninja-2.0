import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Numeral from "numeral";

function Event({ desc, price, quantity, symbol, timeStamp, total, type }) {
  return (
    <View style={styles.container}>
      <Text style={styles.desc}>
        You {type === "Buy" ? "brought" : "sold"} {quantity}{" "}
      </Text>
    </View>
  );
}

export default Event;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
    alignItems: "center",
    borderWidth: 0.5,
    height: 100,
    width: "100%",
    marginBottom: 10,
  },

  desc: {},
});
