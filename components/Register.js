import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TextInput,
  Alert,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { Button } from "react-native-elements";
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

function Register({ navigation }) {
  const [users, setUsers] = useState([]);
  const [password1, setPassword1] = useState("");

  const [password2, setPassword2] = useState("");
  const [taken, setTaken] = useState(false);
  useEffect(() => {
    firebase
      .firestore()
      .collection("users")
      .onSnapshot((snapshot) =>
        setUsers(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const checkNames = (text) => {
    setTaken(false);
    if (
      users.find(
        (user) =>
          user.data.displayName.toLowerCase().trim() ===
          text.toLowerCase().trim()
      )
    ) {
      setTaken(true);
      return true;
    }
    return false;
  };

  const onSubmit = (data, event) => {
    event.preventDefault();

    if (
      !checkNames(data.displayName) &&
      password1.toLowerCase() === password2.toLowerCase()
    ) {
      alert("passwords match && username ok");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20, marginBottom: 20, marginTop: 20 }}>
        Enter your details below.
      </Text>
      <ScrollView showsVerticalScrollIndicator={false} style={{ width: 320 }}>
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
              placeholder="First Name"
            />
          )}
          name="firstName"
          defaultValue=""
        />
        {errors.firstName && (
          <Text style={styles.error}>This is required.</Text>
        )}

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
              placeholder="Last Name"
            />
          )}
          name="lastName"
          defaultValue=""
        />
        {errors.lastName && <Text style={styles.error}>This is required.</Text>}
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
              placeholder="Display Name"
            />
          )}
          name="displayName"
          defaultValue=""
        />
        {errors.displayName && (
          <Text style={styles.error}>This is required.</Text>
        )}
        {taken && <Text style={styles.error}>Cannot use display name</Text>}

        <Controller
          control={control}
          rules={{
            maxLength: 100,
            required: true,
            pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Email Address"
            />
          )}
          name="email"
          defaultValue=""
        />
        {errors.email && (
          <Text style={styles.error}>Please enter a valid email.</Text>
        )}
        <TextInput
          style={styles.input}
          onChangeText={(text) => setPassword1(text)}
          value={password1}
          placeholder="Password"
          secureTextEntry
        />

        <TextInput
          style={styles.input}
          onChangeText={(text) => setPassword2(text)}
          value={password2}
          placeholder="Re-enter Password"
          secureTextEntry
        />
        {password2.toLowerCase() !== password1.toLowerCase() && (
          <Text style={styles.error}>Passwords do not match</Text>
        )}
      </ScrollView>
      <Button
        buttonStyle={styles.button}
        title="Register"
        onPress={handleSubmit(onSubmit)}
        disabled={
          password1.toLowerCase() !== password2.toLowerCase() ||
          password1.length === 0 ||
          password2.length === 0
            ? true
            : false
        }
      />
    </View>
  );
}

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    fontSize: 18,
    height: 90,
    width: 320,
    borderBottomColor: "#141414",
    borderBottomWidth: 1,
    marginBottom: 10,
    marginTop: 10,
  },
  error: {
    color: "#E50914",
  },
  button: {
    backgroundColor: "#141414",
    width: 275,
    height: 65,
    marginBottom: 50,
    borderRadius: 10,
    marginTop: 75,
  },
});
