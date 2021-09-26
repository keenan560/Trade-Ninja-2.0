import React, { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Button } from "react-native-elements";
import { UserContext } from "../App";
import Holding from "./Holding";
import Numeral from "numeral";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

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
  const [marketV, setMarketV] = useState("");
  const [newHoldings, setNewHoldings] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    if (count > 0) {
      setTimeout(() => {
        setCount(0);
        setLoading(false);
      }, 5000);
    }
  }, [count]);

  const marketValue = () => {
    let value = 0;

    for (let i = 0; i < holdings.length; i++) {
      value +=
        parseFloat(holdings[i].data.price) *
        parseInt(holdings[i].data.quantity);
    }
    return value;
  };

  let mValue = 0;

  const getMarketValue = async () => {
    await setLoading(true);
    await setCount((previousCount) => previousCount + 1);
    let mHoldings = [];
    await holdings.map(({ id, data }) => {
      let price = 0;
      fetch(
        `https://finnhub.io/api/v1/quote?symbol=${data.symbol.toUpperCase()}&token=${apiKey}`
      )
        .then((response) => response.json())
        .then((api) => {
          mValue += parseInt(data.quantity) * parseFloat(api.c);
          setMarketV(mValue);
          mHoldings.push({
            price: api.c,
            quantity: data.quantity,
            symbol: data.symbol,
            desc: data.desc,
            timeStamp: data.timeStamp,
          });
        });
    });
    setNewHoldings(mHoldings);
  };
  const getNMV = async () => {
    let newMV = 0;
    await newHoldings.map((holding) => {
      newMV += parseInt(holding.quantity) * parseFloat(holding.price);
    });

    return newMV;
  };

  const mDiff = () => {
    let newValue = getNMV();

    let diff = parseFloat(newValue) - parseFloat(marketValue());

    switch (true) {
      case marketV > marketValue():
        return <FontAwesome5 name="level-up-alt" size={24} color="green" />;
      case marketV < marketValue():
        return <FontAwesome5 name="level-down-alt" size={24} color="red" />;
      default:
        return;
        <MaterialIcons name="trending-neutral" size={24} color="black" />;
    }
  };

  const newPrice = (symbol) => {
    for (let i = 0; i < newHoldings.length; i++) {
      if (newHoldings[i].symbol === symbol) {
        return newHoldings[i].price;
      }
    }
  };

  const delta = () => {
    let diff = marketV - marketValue();
    switch (true) {
      case diff > 0:
        return (
          <Text style={{ color: "green" }}>
            {Numeral(marketV - marketValue()).format("$0,0.00")}{" "}
            <FontAwesome5 name="rocket" size={24} color="green" />
          </Text>
        );
      case diff < 0:
        return (
          <Text style={{ color: "red" }}>
            {Numeral(marketV - marketValue()).format("$0,0.00")}{" "}
            <FontAwesome5 name="fire" size={24} color="red" />
          </Text>
        );
      case diff == 0:
        return (
          <Text style={{ color: "black" }}>
            {Numeral(marketV - marketValue()).format("$0,0.00")}{" "}
            <MaterialIcons name="linear-scale" size={24} color="black" />
          </Text>
        );
      default:
        <Text style={{ color: "black" }}>
          {Numeral(marketV - marketValue()).format("$0,0.00")}
        </Text>;
    }
  };

  return (
    <View style={styles.container}>
      {holdings.length > 0 ? (
        <View>
          <Text style={styles.marketValue}>
            Amount Invested: {Numeral(marketValue()).format("$0,0.00")}
          </Text>

          {marketV ? (
            <View>
              <Text style={styles.marketValue}>
                Market Value: {Numeral(marketV).format("$0,0.00")}{" "}
                <Text>{mDiff()}</Text>
              </Text>
              <Text style={styles.marketValue}>Delta: {delta()}</Text>
            </View>
          ) : (
            <Text></Text>
          )}

          <Button
            title="Analyze"
            // titleStyle={{color: "#000"}}
            // buttonStyle={{ backgroundColor: "#DFA40D", borderRadius: 10, }}
            buttonStyle={{ backgroundColor: "#4db20a", borderRadius: 10 }}
            onPress={getMarketValue}
            disabled={count > 0 && true}
            loading={loading}
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
            newPrice={newHoldings && newPrice(data.symbol)}
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
