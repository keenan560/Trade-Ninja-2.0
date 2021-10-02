import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TextInput } from "react-native";
import Numeral from "numeral";
import { Button, Overlay } from "react-native-elements";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome5 } from "@expo/vector-icons";

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

function Holding({ desc, price, quantity, symbol, timeStamp, newPrice }) {
  const priceDelta = () => {
    let results = parseFloat(newPrice) - parseFloat(price);

    switch (true) {
      case results > 0:
        return (
          <View style={styles.arrow}>
            <FontAwesome5 name="level-up-alt" size={20} color="green" style />
          </View>
        );
      case results < 0:
        return (
          <View style={styles.arrow}>
            <FontAwesome5
              style={styles.arrow}
              name="level-down-alt"
              size={20}
              color="red"
            />
          </View>
        );
      case newPrice === price:
        return (
          <View style={styles.arrow}>
            <FontAwesome5 name="balance-scale" size={24} color="black" />
          </View>
        );
    }
  };

  const deltaColor = () => {
    let delta = parseFloat(newPrice) - parseFloat(price);
    switch (true) {
      case delta > 0:
        return (
          <Text style={styles.price}>
            Delta{" "}
            <Text style={styles.priceGreen}>
              {" "}
              {Numeral(delta).format("$0,0.00")}
            </Text>
          </Text>
        );
      case delta < 0:
        return (
          <Text style={styles.price}>
            Delta{" "}
            <Text style={styles.priceRed}>
              {" "}
              {Numeral(delta).format("$0,0.00")}
            </Text>
          </Text>
        );
    }
  };

  const analyze = (price, newPrice) => {
    let delta = parseFloat(newPrice) - parseFloat(price);
    let deltaPercent = delta / parseFloat(price);
    console.log(delta, deltaPercent);

    switch (true) {
      case delta < 0:
        return <Text style={styles.sell}>SELL</Text>;

      case delta === 0:
        return <Text style={styles.hold}>HOLD</Text>;

      case deltaPercent >= 0.2:
        return <Text style={styles.cashOut}>CASH OUT</Text>;

      case deltaPercent <= 0.05:
        return <Text style={styles.buy}>BUY</Text>;
      default:
        return <Text style={styles.wait}>WAIT</Text>;
    }
  };

  const buttonRouter = () => {
    let delta = parseFloat(newPrice) - parseFloat(price);
    let deltaPercent = delta / parseFloat(price);
    switch (true) {
      case delta < 0:
        return (
          <Button
            title="Sell"
            buttonStyle={styles.buttonSell}
            onPress={toggleOverlay}
          />
        );

      case deltaPercent >= 0.2:
        return (
          <Button
            title="Cash Out"
            buttonStyle={styles.buttonCashOut}
            onPress={toggleOverlay}
          />
        );

      case deltaPercent <= 0.05:
        return (
          <Button
            title="Buy"
            buttonStyle={styles.buttonBuy}
            onPress={toggleOverlay}
          />
        );
    }
  };

  const [visible, setVisible] = useState(false);
  const [shareCount, setShareCount] = useState(quantity);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const incrementShareCount = () => {
    setShareCount((previousCount) => previousCount + 1);
  };
  const decrementShareCount = () => {
    setShareCount((previousCount) => previousCount - 1);
  };

  return (
    <View style={styles.container}>
      <Overlay
        isVisible={visible}
        onBackdropPress={toggleOverlay}
        overlayStyle={{ width: 360, height: 275 }}
      >
        <View
          style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
        >
          <Text style={{ fontSize: 18, marginBottom: 20 }}>
            How many shares?{" "}
          </Text>
          <View style={styles.shareCountContainer}>
            <TextInput style={styles.input}/>
            {/* <Button
              type="solid"=
              title="+"
              buttonStyle={styles.increment}
              onPress={incrementShareCount}
              disabled={shareCount === quantity}
            />
            <Text style={styles.shareCount}>{shareCount}</Text>
            <Button
              type="solid"
              title="-"
              buttonStyle={styles.decrement}
              onPress={decrementShareCount}
              disabled={shareCount === 1}
            /> */}
          </View>
          {buttonRouter()}
        </View>
      </Overlay>
      <LinearGradient
        // Background Linear Gradient
        colors={["#DFA40D", "transparent"]}
        style={styles.background}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={styles.symbol}>
            {symbol} {newPrice && <Text>{priceDelta()}</Text>}
          </Text>
          {newPrice && analyze(price, newPrice)}
        </View>
        <Text style={styles.desc}>{desc}</Text>
        <Text style={styles.price}>
          Brought at {Numeral(price).format("$0,0.00")}
        </Text>
        {newPrice && (
          <Text style={styles.price}>
            Currently at {Numeral(newPrice).format("$0,0.00")}
          </Text>
        )}

        {newPrice && deltaColor()}

        <Text style={styles.timestamp}>
          {new Date(timeStamp).toLocaleDateString()}
        </Text>

        <Text style={{ textAlign: "right", paddingRight: 10 }}>QTY:</Text>
        <View
          style={{
            flexDirection: "row",
            justifyConten: "space-evenly",
            width: "100%",
          }}
        >
          {newPrice && buttonRouter()}
          <Text style={styles.quantity}>{Numeral(quantity).format("0,0")}</Text>
        </View>
      </LinearGradient>
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
    // borderWidth: 0.5,
    padding: 10,
  },
  background: {
    borderRadius: 12,
  },
  symbol: {
    fontSize: 30,
    alignItems: "center",
    textAlign: "left",
    fontWeight: "bold",
    paddingLeft: 10,
    paddingTop: 10,
  },
  desc: {
    textAlign: "left",
    paddingLeft: 10,
    paddingTop: 10,
  },
  quantity: {
    textAlign: "right",
    fontWeight: "500",
    fontSize: 40,
    paddingRight: 10,
    flex: 1,
  },
  price: {
    textAlign: "left",
    fontWeight: "bold",
    // fontSize: 20,
    paddingLeft: 10,
    // paddingTop: 10,
  },
  priceGreen: {
    textAlign: "left",
    fontWeight: "bold",
    // fontSize: 20,
    paddingLeft: 10,
    // paddingTop: 10,
    color: "green",
  },
  priceRed: {
    textAlign: "left",
    fontWeight: "bold",
    // fontSize: 20,
    paddingLeft: 10,
    // paddingTop: 10,
    color: "red",
  },
  timestamp: {
    textAlign: "left",
    paddingLeft: 10,
  },

  arrow: {
    padding: 10,
  },

  sell: {
    textAlign: "right",
    fontWeight: "500",
    fontSize: 20,
    paddingRight: 15,
    paddingTop: 10,
    color: "red",
  },
  cashOut: {
    textAlign: "right",
    fontWeight: "500",
    fontSize: 20,
    paddingRight: 15,
    paddingTop: 10,
    color: "green",
  },
  buy: {
    textAlign: "right",
    fontWeight: "500",
    fontSize: 20,
    paddingRight: 15,
    paddingTop: 10,
    color: "green",
  },
  wait: {
    textAlign: "right",
    fontWeight: "500",
    fontSize: 20,
    paddingRight: 15,
    paddingTop: 10,
    color: "black",
  },
  hold: {
    textAlign: "right",
    fontWeight: "500",
    fontSize: 20,
    paddingRight: 15,
    paddingTop: 10,
    color: "black",
  },

  buttonSell: {
    width: 160,
    height: 50,
    // backgroundColor: "#1f1f1f",
    backgroundColor: "red",
    borderRadius: 5,
    marginLeft: 2,
  },

  buttonBuy: {
    width: 160,
    height: 50,
    // backgroundColor: "#0F59E0",
    backgroundColor: "green",
    borderRadius: 5,
    marginLeft: 2,
  },
  buttonCashOut: {
    width: 160,
    height: 50,
    // backgroundColor: "#0F59E0",
    backgroundColor: "green",
    borderRadius: 5,
    marginLeft: 2,
  },

  shareCountContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
    marginBottom: 30,
  },

  shareCount: {
    fontSize: 40,
    // marginRight: 25,
    // marginleft: 25,
  },
  increment: {
    width: 75,
    height: 50,
    borderRadius: 5,
  },
  decrement: {
    width: 75,
    height: 50,
    height: 50,
  },
  input: {
    fontSize: 40,
    height: 90,
    width: 320,
    borderBottomColor: "#141414",
    borderBottomWidth: 1,
    marginBottom: 10,
    marginTop: 10,
    textAlign: "center",
  },
});
