// App.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AuthPage from "./screens/AuthPage";
import Dashboard from "./screens/Dashboard";
import HomeScreen from "./src/screens/HomeScreen";
import PropertyScreen from "./src/screens/PropertyScreen";
import MeterScreen from "./src/screens/MeterScreen";
import CheckoutPage from "./screens/CheckoutPage";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Auth">
        <Stack.Screen name="Auth" component={AuthPage} options={{ headerShown: false }} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Property" component={PropertyScreen} />
        <Stack.Screen name="Meter" component={MeterScreen} />
        <Stack.Screen name="Checkout" component={CheckoutPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
