import React from "react";
import { Text, View, TextInput, Alert, StyleSheet } from "react-native";
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
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data, event) => {
    event.preventDefault();
    firebase
      .auth()
      .createUserWithEmailAndPassword(data.email, data.password)
      .then((authUser) => {
        authUser.user.updateProfile({
          email: authUser.user.email,
          firstName: authUser.user.firstName,
          lastName: authUser.user.lastName,
        });
        console.log(authUser);

        firebase
          .firestore()
          .collection("users")
          .doc(`${authUser.user.uid}`)
          .set({
            id: authUser.user.uid,
            email: authUser.user.email,
            firstName: data.firstName,
            lastName: data.lastName,
          })
          .catch((error) => alert(error.message));
        alert("Please login " + data.firstName);
        navigation.navigate("Login");
      })
      .catch((error) => alert(error.message));

    reset({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    });
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20 }}>Enter your details below.</Text>
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
      {errors.firstName && <Text style={styles.error}>This is required.</Text>}

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

      <Controller
        control={control}
        rules={{
          maxLength: 100,
          minLength: 6,
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Password"
            secureTextEntry
          />
        )}
        name="password"
        defaultValue=""
      />
      {errors.password && (
        <Text style={styles.error}>Minimum of 6 characters.</Text>
      )}

      <Button
        buttonStyle={styles.button}
        title="Register"
        onPress={handleSubmit(onSubmit)}
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
    height: 100,
    width: 320,
    borderBottomColor: "#141414",
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  error: {
    color: "#E50914",
  },
  button: {
    backgroundColor: "#141414",
    width: 275,
    height: 65,
    marginBottom: 10,
    borderRadius: 10,
    marginTop: 75,
  },
});
