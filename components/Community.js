import React, { useState, useEffect, useContext } from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import Numeral from "numeral";
import { UserContext } from "../App";
import { LinearGradient } from "expo-linear-gradient";
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

function Community({}) {
  const userContext = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const [activeUsers, setActiveUsers] = useState([]);
  useEffect(() => {
    firebase
      .firestore()
      .collection("users")
      .orderBy("cashBal", "desc")
      .onSnapshot((snapshot) =>
        setUsers(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
  }, []);

  useEffect(() => {
    if (users) {
      setActiveUsers(users.filter((user) => user.data.cashBal < 100000));
    }
  }, [users]);

  console.log(activeUsers);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {activeUsers.length} / {users.length} Ninjas are investing
      </Text>
      <ScrollView style={{ width: 320 }} showsVerticalScrollIndicator={false}>
        {activeUsers.map(({ id, data }, idx) => (
          <LinearGradient
            // Background Linear Gradient
            colors={
              id === userContext.userState.user.user.uid
                ? ["#B53389", "transparent"]
                : ["#385C67", "transparent"]
            }
            style={styles.background}
            key={id}
          >
            <View
              style={
                id === userContext.userState.user.user.uid
                  ? styles.myUserContainer
                  : styles.userContainer
              }
              key={id}
            >
              <Text style={styles.userName}>
                {idx + 1}. {data.displayName}
              </Text>
              <Text
                style={{ textAlign: "right", color: "#fff", paddingRight: 10 }}
              >
                Cash:
              </Text>
              <Text style={styles.cash}>
                {Numeral(data.cashBal).format("$0,0.00")}
              </Text>
            </View>
          </LinearGradient>
        ))}
      </ScrollView>
    </View>
  );
}

export default Community;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#141414",
  },
  background: {
    borderRadius: 12,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    marginTop: 50,
    marginBottom: 50,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  userContainer: {
    marginBottom: 50,
    height: 100,
    borderRadius: 12,
  },
  myUserContainer: {
    marginBottom: 50,
    // backgroundColor: "#B53389",
    height: 100,
    borderRadius: 12,
  },
  userName: {
    color: "#fff",
    fontSize: 25,
    fontWeight: "bold",
    paddingLeft: 10,
    paddingTop: 5,
  },

  cash: {
    textAlign: "right",
    paddingRight: 10,
    color: "#fff",
    fontSize: 25,
    fontWeight: "bold",
  },
});
