// src/components/SignupForm.js
import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const handleSignup = () => {
    // TODO: Hook to backend / Firebase / Supabase
    console.log("Signup:", email, password);
    navigation.replace("Dashboard"); // redirect after signup
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
      <Button title="Sign Up" onPress={handleSignup} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: "100%" },
  input: { borderWidth: 1, padding: 10, marginVertical: 8, borderRadius: 5 },
});
