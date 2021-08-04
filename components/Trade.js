import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, TextInput, ScrollView } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { Button } from "react-native-elements";
import { Picker } from "@react-native-picker/picker";
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

const apiKey = "c43kis2ad3if0j0spuj0";

function Trade({ navigation }) {
  const userContext = useContext(UserContext);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data, event) => {
    console.log(data);

    await firebase
      .firestore()
      .collection("users")
      .doc(`${userContext.userState.user.user.uid}`)
      .collection("trades")
      .add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        symbol: ticker,
        desc: companyName.description,
        price: currentPrice,
        type: data.transactionType,
        quantity: quantity,
        total: parseFloat(quantity * currentPrice).toFixed(2),
      })
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });

    await firebase
      .firestore()
      .collection("users")
      .doc(`${userContext.userState.user.user.uid}`)
      .collection("holdings")
      .doc(ticker)
      .set({
        symbol: ticker,
        quantity: quantity,
        desc: companyName.description,
      });

    setTicker("");
    setCompanyName("");
    setCurrentPrice("");
    setQuantity("");
    reset({
      transactionType: "",
    });
  };
  const [selectedTransType, setSelectedTransType] = useState("");
  const [ticker, setTicker] = useState("");
  const [currentPrice, setCurrentPrice] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [quantity, setQuantity] = useState("");

  console.log(ticker);
  const tickerSearch = (text) => {
    if (ticker) {
      fetch(`https://finnhub.io/api/v1/quote?symbol=${ticker}&token=${apiKey}`)
        .then((response) => response.json())
        .then((data) => setCurrentPrice(data.c));

      fetch(`https://finnhub.io/api/v1/search?q=${ticker}&token=${apiKey}`)
        .then((response) => response.json())
        .then((data) => setCompanyName(data.result[0]));
    } else {
      setTicker("");
      setCurrentPrice("");
      setCompanyName("");
      setQuantity("");
    }
  };

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });

  console.log([companyName.description, currentPrice]);
  return (
    <View style={styles.container}>
      <ScrollView style={{ width: 320 }} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Order Form</Text>

        <TextInput
          style={styles.input}
          onChangeText={(text) => setTicker(text.toLocaleUpperCase())}
          onEndEditing={tickerSearch}
          value={ticker}
          placeholder="Enter Ticker"
          placeholderTextColor="#fff"
        />

        <Text
          style={{
            color: "#fff",
            textAlign: "left",
            fontSize: 18,
            marginTop: 50,
            marginBottom: 20,
          }}
        >
          <Text style={{ color: "#DFA40D", width: 320, fontSize: 18 }}>
            {companyName ? companyName.description : "None"}
          </Text>
        </Text>
        <Text
          style={{
            color: "#fff",
            textAlign: "left",
            fontSize: 50,
            marginBottom: 20,
          }}
        >
          <Text style={{ color: "#59e00f" }}>
            {currentPrice ? formatter.format(currentPrice) : "$0"}
          </Text>{" "}
        </Text>

        <Controller
          control={control}
          rules={{
            maxLength: 100,
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Picker
              style={{
                width: "100%",
                height: 150,

                color: "#fff",
              }}
              selectedValue={value}
              onValueChange={onChange}
              onBlur={onBlur}
              value={value}
              itemStyle={styles.item}
            >
              <Picker.Item label="Select Transaction Type" value={null} />
              <Picker.Item label="Buy" value="Buy" />
              <Picker.Item label="Sell" value="Sell" />
            </Picker>
          )}
          name="transactionType"
          defaultValue=""
        />
        {errors.transactionType && (
          <Text style={styles.error}>Please select transaction type.</Text>
        )}

        <TextInput
          style={styles.input}
          onChangeText={(text) => setQuantity(parseInt(text))}
          value={quantity}
          placeholder={"Quantity"}
          placeholderTextColor="#fff"
        />
        {!quantity && <Text style={styles.error}>Please enter a quanty.</Text>}
        {currentPrice && quantity ? (
          <Text style={{ color: "#fff", fontSize: 18 }}>
            Total:
            {formatter.format(parseFloat(quantity * currentPrice).toFixed(2))}
          </Text>
        ) : null}
        <Button
          buttonStyle={styles.button}
          title={"Trade"}
          onPress={handleSubmit(onSubmit)}
        />
      </ScrollView>
    </View>
  );
}

export default Trade;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#141414",
  },
  title: {
    color: "#fff",
    fontSize: 30,
    marginTop: 50,
  },
  input: {
    fontSize: 18,
    height: 100,
    width: 320,
    borderBottomColor: "#fff",
    borderBottomWidth: 1,
    marginBottom: 10,
    color: "#fff",
  },
  error: {
    color: "#E50914",
  },
  item: {
    backgroundColor: "#141414",
    color: "#fff",
    height: 100,
    width: "100%",
  },
  button: {
    backgroundColor: "#0F59E0",
    width: "100%",
    height: 65,
    marginBottom: 10,
    borderRadius: 10,
    marginTop: 65,
  },
});
