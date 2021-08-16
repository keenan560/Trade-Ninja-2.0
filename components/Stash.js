import React, { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Button } from "react-native-elements";
import { UserContext } from "../App";
import Holding from "./Holding";
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

const apiKey = "c43kis2ad3if0j0spuj0";

function Stash({ navigation }) {
  const userContext = useContext(UserContext);
  const [holdings, setHoldings] = useState([]);

  useEffect(() => {
    firebase
      .firestore()
      .collection("users")
      .doc(`${userContext.userState.user.user.uid}`)
      .collection("holdings")
      .where("quantity", ">", 0)
      .onSnapshot((snapshot) =>
        setHoldings(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
  }, []);

  const marketValue = () => {
    let value = 0;

    for (let i = 0; i < holdings.length; i++) {
      value +=
        parseFloat(holdings[i].data.price) *
        parseInt(holdings[i].data.quantity);
    }
    return value;
  };

  const getMarketValue = () => {
    // fetch(
    //   `https://finnhub.io/api/v1/quote?symbol=${ticker.toUpperCase()}&token=${apiKey}`
    // )
    //   .then((response) => response.json())
    //   .then((data) => setCurrentPrice(data.c));

    // fetch(`https://finnhub.io/api/v1/search?q=${ticker}&token=${apiKey}`)
    //   .then((response) => response.json())
    //   .then((data) => setCompanyName(data.result[0]));
  };

  return (
    <View style={styles.container}>
      {holdings ? (
        <View>
          <Text style={styles.marketValue}>
            Amount Invested: {Numeral(marketValue()).format("$0,0.00")}
          </Text>
          <Button
            title="Market Value"
            buttonStyle={{ backgroundColor: "#4db20a", borderRadius: 10 }}
            onPress={getMarketValue}
          />
          <Text style={styles.title}>{holdings.length} holdings</Text>
        </View>
      ) : (
        <Text style={styles.title}>No holdings</Text>
      )}
      <ScrollView showsVerticalScrollIndicator={false}>
        {holdings.map(({ id, data }) => (
          <Holding
            key={id}
            desc={data.desc}
            price={data.price}
            quantity={data.quantity}
            symbol={data.symbol}
            timeStamp={data.timeStamp}
          />
        ))}
      </ScrollView>
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
  title: {
    marginBottom: 10,
    marginTop: 10,

    fontSize: 20,
    textAlign: "center",
  },
  marketValue: {
    marginBottom: 10,
    marginTop: 10,
    fontWeight: "bold",
    fontSize: 20,
  },
});
