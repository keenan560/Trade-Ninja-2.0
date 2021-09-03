import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { Button } from "react-native-elements";
import { LinearGradient } from "expo-linear-gradient";
import emailjs from "emailjs-com";

const serviceId = "service_j6qfxwb";
const templates = {
  welcome: "tradeninja_welcome",
};
const userId = "user_LRqtj1mrCOcxMgcKoBG3X";

function PasswordReset({ navigation }) {
  const [email, setEmail] = useState("");
  const [pin, setPin] = useState("");
  const templateParams = {
    name: "James",
    notes: "Check this out!",
  };

  const handleSubmit = () => {
    setPin(randomPin());
  };

  function sendEmail() {
    // e.preventDefault();

    emailjs.sendForm(serviceId, templates.welcome, userId).then(
      (result) => {
        console.log(result.text);
      },
      (error) => {
        console.log(error.text);
      }
    );
  }

  const randomPin = () => {
    let pin = "";
    for (let i = 0; i < 4; i++) {
      pin += Math.floor(Math.random() * 10);
    }
    return pin;
  };
  return (
    <View style={styles.container}>
      <LinearGradient
        // Background Linear Gradient
        colors={["#E50914", "transparent"]}
        style={styles.background}
      >
        <Text style={styles.title}>
          Please send an email to keenan560@gmail.com with the email address
          used to register your trade ninja account. Once sent you will receive
          an email with a link to reset your password from Trade Ninja support.
        </Text>
        <Button
          buttonStyle={styles.button}
          titleStyle={{ color: "#fff", fontWeight: "bold" }}
          title="Login"
          onPress={() => navigation.navigate("Login")}
        />
      </LinearGradient>
    </View>
  );
}

export default PasswordReset;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  background: {
    width: "100%",
    flex: 1,
    alignItems: "center",
  },

  title: {
    color: "#fff",
    marginTop: 100,
    marginBottom: 50,
    fontSize: 20,
    padding: 12,
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
    backgroundColor: "#141414",
    width: 275,
    height: 65,
    marginBottom: 10,
    borderRadius: 10,
    marginTop: 75,
  },
});
