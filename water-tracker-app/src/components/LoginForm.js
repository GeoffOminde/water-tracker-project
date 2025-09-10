// src/components/LoginForm.js
import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const handleLogin = () => {
    // TODO: Integrate authentication (Firebase, Supabase, API, etc.)
    console.log("Login:", email, password);
    navigation.replace("Dashboard"); // redirect after login
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: "100%" },
  input: { borderWidth: 1, padding: 10, marginVertical: 8, borderRadius: 5 },
});
