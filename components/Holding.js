import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Numeral from "numeral";
import * as firebase from "firebase";
import "firebase/auth";
//import "firebase/database";
import "firebase/firestore";
//import "firebase/functions";
//import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBwRxZbifzgYYu59xXbFmomJwA1802mV3Y",
  authDomain: "trade-ninja.firebaseapp.com",
  projectId: "trade-ninja",
  storageBucket: "trade-ninja.appspot.com",
  messagingSenderId: "855711194325",
  appId: "1:855711194325:web:13403595279738b142d65c",
  measurementId: "G-1WS4WBW5W6",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

function Holding({ desc, price, quantity, symbol, timeStamp }) {
  return (
    <View style={styles.container}>
      <Text style={styles.symbol}>{symbol}</Text>
      <Text style={styles.desc}>{desc}</Text>
      <Text style={styles.price}>{Numeral(price).format("$0,0.00")}</Text>
      <Text style={{ textAlign: "center" }}>QTY:</Text>
      <Text style={styles.quantity}>{Numeral(quantity).format("0,0")}</Text>
      <Text style={styles.timestamp}> {timeStamp}</Text>
    </View>
  );
}

export default Holding;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    textAlign: "center",
    flex: 1,
    marginBottom: 100,
    maxWidth: 320,
    minWidth: 320,
    height: "auto",
    borderWidth: 0.5,
    padding: 10,
    backgroundColor: "#DFA40D",
    borderRadius: 50,
  },
  symbol: {
    fontSize: 30,
    alignItems: "center",
    textAlign: "center",
    fontWeight: "bold",
  },
  desc: {
    textAlign: "center",
  },
  quantity: {
    textAlign: "center",
    fontWeight: "500",
    fontSize: 50,
  },
  price: {
    textAlign: "center",
    fontWeight: "normal",
    fontSize: 20,
  },
  timestamp: {
    textAlign: "center",
  },
});
