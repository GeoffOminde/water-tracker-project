import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Text } from "react-native";
import api from "../api/api";

export default function LoginScreen({ navigation }) {
  const [phone, setPhone] = useState("");

  const handleLogin = async () => {
    try {
      const response = await api.post("/users/", { name: "Test User", phone });
      console.log(response.data);
      navigation.navigate("Home", { user: response.data });
    } catch (error) {
      console.log(error.response?.data || error.message);
      alert("Login failed");
    }
  };

  return (
    <View style={styles.container}>
      <Text>Enter your phone to login:</Text>
      <TextInput
        style={styles.input}
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
        placeholder="Phone"
      />
      <Button title="Login / Register" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  input: { borderWidth: 1, borderColor: "#ccc", width: "80%", margin: 10, padding: 10 },
});
