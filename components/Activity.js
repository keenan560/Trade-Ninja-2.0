import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { UserContext } from "../App";
import { ListItem, Avatar, Icon } from "react-native-elements";
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

function Activity() {
  const userContext = useContext(UserContext);
  const [trades, setTrades] = useState([]);

  useEffect(() => {
    firebase
      .firestore()
      .collection("users")
      .doc(`${userContext.userState.user.user.uid}`)
      .collection("trades")
      // .orderBy("timeStamp", "desc")
      .onSnapshot((snapshot) =>
        setTrades(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
  }, []);

  return (
    <View style={styles.container}>
      <Text style={{ textAlign: "center", height: 25, margin: 10 }}>
        {trades.length} trades
      </Text>
      <ScrollView>
        {trades.map(({ id, data }) => (
          <ListItem key={id} bottomDivider>
            <Avatar
              source={{ uri: data.symbol }}
              size="medium"
              rounded
              title={data.symbol}
              titleStyle={{ fontSize: 16, fontWeight: "bold" }}
              avatarStyle={data.type === "Buy" ? styles.buy : styles.sold}
            />
            <ListItem.Content>
              <ListItem.Title style={{ fontWeight: "bold" }}>
                {data.desc}
              </ListItem.Title>
              <ListItem.Subtitle>
                {data.type === "Buy" ? "brought" : "sold"}{" "}
                {Numeral(data.quantity).format("0,0")} shares at{" "}
                {Numeral(data.price).format("$0,0.00")} on{" "}
                {new Date(data.timeStamp).toLocaleDateString()}
              </ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        ))}
      </ScrollView>
    </View>
  );
}

export default Activity;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",

    backgroundColor: "#fff",
  },
  buy: {
 
    color: "#fff",
  },
  buyText: {},

  soldText: {
    color: "#fff",
  },

  sold: {
    // backgroundColor: "#385C67",
  },
});
