import React, { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { UserContext } from "../App";
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
function Stash({ navigation }) {
  const userContext = useContext(UserContext);
  const [holdings, setHoldings] = useState([]);

  useEffect(() => {
    firebase
      .firestore()
      .collection("users")
      .doc(`${userContext.userState.user.user.uid}`)
      .collection("holdings")
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setHoldings(doc.data());
        });
      });
  }, []);
  console.log(holdings);

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
    // backgroundColor: "",
  },
});
