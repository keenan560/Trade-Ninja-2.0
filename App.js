import React, { useReducer } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Welcome from "./components/Welcome";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

const Stack = createStackNavigator();
export const UserContext = React.createContext();

const user = { user: null, isLogged: false };

const userReducer = (state, action) => {
  switch (action.type) {
    case "login":
      return action.payload;
    case "logout":
      return { user: null, isLogged: false };
    default:
      return user;
  }
};

export default function App() {
  const [user, userDispatch] = useReducer(userReducer, user);
  return (
    <UserContext.Provider
      value={{ userState: user, userDispatch: userDispatch }}
    >
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Welcome" component={Welcome} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
