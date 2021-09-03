import React, { useState, useContext, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, ScrollView } from "react-native";
import { useForm, Controller, set } from "react-hook-form";
import { Button } from "react-native-elements";
import { Picker } from "@react-native-picker/picker";
import { UserContext } from "../App";
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

function Trade({ navigation }) {
  const userContext = useContext(UserContext);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [userHoldings, setUserHoldings] = useState([]);
  const [inHoldings, setInHoldings] = useState(false);
  const [tickerHolding, setTickerHoldings] = useState(0);
  const [cashBal, setCashBal] = useState(0);

  useEffect(() => {
    firebase
      .firestore()
      .collection("users")
      .doc(`${userContext.userState.user.user.uid}`)
      .collection("holdings")
      .where("quantity", ">", 0)
      .onSnapshot((snapshot) =>
        setUserHoldings(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
  }, []);

  useEffect(() => {
    firebase
      .firestore()
      .collection("users")
      .doc(`${userContext.userState.user.user.uid}`)
      .onSnapshot((doc) => {
        console.log("Current data: ", doc.data());
        setCashBal(doc.data().cashBal);
      });
  }, []);

  const onSubmit = async (data, event) => {
    console.log(data);
    if (
      data.transactionType === "Buy" &&
      !inHoldings &&
      parseFloat(quantity * currentPrice).toFixed(2) <= cashBal
    ) {
      await firebase
        .firestore()
        .collection("users")
        .doc(`${userContext.userState.user.user.uid}`)
        .collection("trades")
        .add({
          timeStamp: `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,
          symbol: ticker.toUpperCase(),
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
        .doc(ticker.toUpperCase())
        .set({
          symbol: ticker.toUpperCase(),
          timeStamp: `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,
          price: currentPrice,
          quantity: firebase.firestore.FieldValue.increment(parseInt(quantity)),
          desc: companyName.description,
        });

      await firebase
        .firestore()
        .collection("users")
        .doc(`${userContext.userState.user.user.uid}`)
        .update({
          cashBal: firebase.firestore.FieldValue.increment(
            -parseFloat(quantity * currentPrice).toFixed(2)
          ),
        });

      setTicker("");
      setCompanyName("");
      setCurrentPrice("");
      setQuantity("");
      setInHoldings(false);
      reset({
        transactionType: "",
      });
    }
    if (
      data.transactionType === "Buy" &&
      inHoldings &&
      parseFloat(quantity * currentPrice).toFixed(2) <= cashBal
    ) {
      await firebase
        .firestore()
        .collection("users")
        .doc(`${userContext.userState.user.user.uid}`)
        .collection("trades")
        .add({
          timeStamp: `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,
          symbol: ticker.toUpperCase(),
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
        .doc(ticker.toUpperCase())
        .update({
          symbol: ticker.toUpperCase(),
          timeStamp: `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,
          price: currentPrice,
          quantity: firebase.firestore.FieldValue.increment(parseInt(quantity)),
          desc: companyName.description,
        });

      await firebase
        .firestore()
        .collection("users")
        .doc(`${userContext.userState.user.user.uid}`)
        .update({
          cashBal: firebase.firestore.FieldValue.increment(
            -parseFloat(quantity * currentPrice).toFixed(2)
          ),
        });

      setTicker("");
      setCompanyName("");
      setCurrentPrice("");
      setQuantity("");
      setInHoldings(false);
      reset({
        transactionType: "",
      });
    }
    if (
      data.transactionType === "Sell" &&
      inHoldings &&
      quantity <= parseInt(tickerHolding)
    ) {
      await firebase
        .firestore()
        .collection("users")
        .doc(`${userContext.userState.user.user.uid}`)
        .collection("trades")
        .add({
          timeStamp: `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,
          symbol: ticker.toUpperCase(),
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
        .doc(ticker.toUpperCase())
        .update({
          symbol: ticker.toUpperCase(),
          timeStamp: `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,
          price: currentPrice,
          quantity: firebase.firestore.FieldValue.increment(
            parseInt(-quantity)
          ),
          desc: companyName.description,
        });

      await firebase
        .firestore()
        .collection("users")
        .doc(`${userContext.userState.user.user.uid}`)
        .update({
          cashBal: firebase.firestore.FieldValue.increment(
            parseFloat(quantity * currentPrice).toFixed(2)
          ),
        });

      setTicker("");
      setCompanyName("");
      setCurrentPrice("");
      setQuantity("");
      setInHoldings(false);

      reset({
        transactionType: "",
      });
    }
    if (data.transactionType === "Sell" && !inHoldings) {
      alert("No quantity to sell.");
      setTicker("");
      setCompanyName("");
      setCurrentPrice("");
      setQuantity("");
      setInHoldings(false);

      reset({
        transactionType: "",
      });
    }

    if (
      data.transactionType === "Sell" &&
      inHoldings &&
      quantity > parseInt(tickerHolding)
    ) {
      alert(
        `Cannot sell more than ${tickerHolding} shares of ${ticker.toUpperCase()}`
      );
    }
    if (
      parseFloat(quantity * currentPrice).toFixed(2) > parseInt(cashBal) &&
      data.transactionType === "Buy"
    ) {
      alert("No cash available.");
      // setTicker("");
      // setCompanyName("");
      // setCurrentPrice("");
      // setQuantity("");
      // reset({
      //   transactionType: "",
      // });
    }
  };
  const [selectedTransType, setSelectedTransType] = useState("");
  const [ticker, setTicker] = useState("");
  const [currentPrice, setCurrentPrice] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [quantity, setQuantity] = useState("");

  const tickerSearch = (text) => {
    if (ticker) {
      checkHoldings(ticker);
      fetch(
        `https://finnhub.io/api/v1/quote?symbol=${ticker.toUpperCase()}&token=${apiKey}`
      )
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
      setInHoldings(false);
    }
  };

  const checkHoldings = (symbol) => {
    for (let i = 0; i < userHoldings.length; i++) {
      if (userHoldings[i].id.toUpperCase() === symbol.toUpperCase()) {
        return (
          setInHoldings(true), setTickerHoldings(userHoldings[i].data.quantity)
        );
      }
    }

    setInHoldings(false);
  };

  return (
    <View style={styles.container}>
      <Text
        style={{
          color: "#fff",
          fontSize: 18,
          left: 100,
          marginTop: 10,
        }}
      >
        Cash: {Numeral(cashBal).format("$0,0")}
      </Text>
      <ScrollView style={{ width: 320 }} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Order Form</Text>

        <TextInput
          style={styles.input}
          onChangeText={(text) => setTicker(text)}
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
            {currentPrice ? Numeral(currentPrice).format("$0,0.00") : "$0"}
          </Text>
        </Text>
        {inHoldings && (
          <Text style={{ color: "#0F59E0", fontSize: 14 }}>
            Currently own {tickerHolding} shares{" "}
          </Text>
        )}
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
            Total:{" "}
            {Numeral(parseFloat(quantity * currentPrice)).format("$0,0.00")}
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
