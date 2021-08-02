import React, { useContext } from "react";
import { View, StyleSheet, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { FontAwesome5 } from "@expo/vector-icons";
import Trade from "./Trade";
import Stash from "./Stash";
import Settings from "./Settings";
import Activity from "./Activity";
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

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function Dashboard({ navigation }) {
  const userContext = useContext(UserContext);
  console.log(userContext.userState.user.user.uid);

  return (
    <Tab.Navigator
      initialRouteName="Trade"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Trade") {
            iconName = focused ? "user-ninja" : "exchange-alt";
            color = "#0F59E0";
          }

          if (route.name === "Stash") {
            iconName = focused ? "shopping-bag" : "chart-pie";
            color = "#DFA40D";
          }

          if (route.name === "Activity") {
            iconName = focused ? "history" : "chart-line";
            color = "#DD0012";
          }
          if (route.name === "Settings") {
            iconName = focused ? "cogs" : "cog";
            color = "#385C67";
          }
          // You can return any component that you like here!
          return <FontAwesome5 name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "#fff",
        inactiveTintColor: "gray",
        style: { backgroundColor: "#141414" },
      }}
    >
      <Tab.Screen
        name="Trade"
        component={Trade}
        options={{ tabBarBadge: null }}
      />
      <Tab.Screen
        name="Stash"
        component={Stash}
        options={{ tabBarBadge: null }}
      />
      <Tab.Screen
        name="Activity"
        component={Activity}
        options={{ tabBarBadge: null }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{ tabBarBadge: null }}
      />
    </Tab.Navigator>
  );
}

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#141414",
  },
});
