import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { Input, Button } from "react-native-elements";
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

function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const userContext = useContext(UserContext);

  const logIn = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        // Signed in
        // ...

        userContext.userDispatch({
          type: "login",
          payload: { user: user, isLogged: true },
        });

        setLoading(false);
        navigation.navigate("Dashboard", { name: "Dashboard" });
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
        setLoading(false);
      });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trade Ninja</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#fff"
        keyboardType="email-address"
        textContentType="emailAddress"
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#fff"
        textContentType="password"
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
      <Button
        title="Forgot Password"
        titleStyle={{ color: "#0F59E0", fontSize: 14 }}
        buttonStyle={{ textAlign: "left", backgroundColor: "#141414" }}
        containerStyle={{ left: 100 }}
        onPress={() => navigation.navigate("Password Reset")}
      />
      <Button
        buttonStyle={styles.button}
        titleStyle={{ color: "#141414", fontWeight: "bold" }}
        title="Login"
        onPress={logIn}
      />
    </View>
  );
}

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#141414",
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
  button: {
    backgroundColor: "#fff",
    width: 275,
    height: 65,
    marginBottom: 10,
    borderRadius: 10,
    marginTop: 75,
  },
  title: {
    fontSize: 60,
    color: "#E50914",
    textAlign: "center",
    marginBottom: 50,
    fontWeight: "bold",
  },
  forgot: {
    color: "#0F59E0",
    textAlign: "left",
  },
});
