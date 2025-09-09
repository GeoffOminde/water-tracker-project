import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./src/screens/LoginScreen";
import HomeScreen from "./src/screens/HomeScreen";
import PropertyScreen from "./src/screens/PropertyScreen";
import MeterScreen from "./src/screens/MeterScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Properties" component={PropertyScreen} />
        <Stack.Screen name="Meters" component={MeterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
