import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, TextInput, ScrollView } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { Button } from "react-native-elements";
import { Picker } from "@react-native-picker/picker";
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

function Trade() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data, event) => {
    console.log(data);
    reset({
      price: "",
      ticker: "",
      quantity: "",
      transactionType: "",
    });
  };
  const [selectedTransType, setSelectedTransType] = useState("");
  const pickerRef = useRef();

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Order Form</Text>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Enter Ticker"
              placeholderTextColor="#fff"
            />
          )}
          name="ticker"
          defaultValue=""
        />
        {errors.ticker && <Text style={styles.error}>This is required.</Text>}

        <Controller
          control={control}
          rules={{
            maxLength: 100,
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Enter Desired Price"
              placeholderTextColor="#fff"
            />
          )}
          name="price"
          defaultValue=""
        />
        {errors.price && <Text style={styles.error}>This is required.</Text>}
        <Text style={{ color: "#fff", textAlign: "left", fontSize: 18 }}>
          Select Transaction Type{" "}
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
                // alignItems: "center",
                color: "#fff",
         
              }}
              selectedValue={value}
              onValueChange={onChange}
              onBlur={onBlur}
              value={value}
              itemStyle={styles.item}
            >
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

        <Controller
          control={control}
          rules={{
            maxLength: 100,
            minLength: 1,
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Quantity"
              placeholderTextColor="#fff"
            />
          )}
          name="quantity"
          defaultValue=""
        />
        {errors.quantity && (
          <Text style={styles.error}>Minimum of 6 characters.</Text>
        )}

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
    marginTop: 75,
  },
});
