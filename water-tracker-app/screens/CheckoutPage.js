import React, { useState } from "react";
import { View, Text, TextInput, Alert, StyleSheet } from "react-native";
import axios from "axios";
import PaymentButton from "../src/components/PaymentButton";

const API_URL = "http://localhost:5000/api/pay"; // replace with your backend URL

const CheckoutPage = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");

  // ✅ Paystack
  const handlePaystack = async () => {
    try {
      const response = await axios.post(`${API_URL}/paystack/initiate`, {
        email,
        amount,
      });

      if (response.data.data?.authorization_url) {
        Alert.alert("Redirecting...", "Opening Paystack checkout");
        // In real app: use WebView or Linking.openURL(response.data.data.authorization_url)
      } else {
        Alert.alert("Error", "Failed to initiate Paystack payment");
      }
    } catch (err) {
      Alert.alert("Error", err.message);
    }
  };

  // ✅ M-Pesa
  const handleMpesa = async () => {
    try {
      const response = await axios.post(`${API_URL}/mpesa/initiate`, {
        phone,
        amount,
      });

      Alert.alert("M-Pesa Request Sent", JSON.stringify(response.data));
    } catch (err) {
      Alert.alert("Error", err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>💧 Checkout</Text>

      <TextInput
        style={styles.input}
        placeholder="Email (Paystack)"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Phone (M-Pesa: 2547...)"
        value={phone}
        onChangeText={setPhone}
      />

      <TextInput
        style={styles.input}
        placeholder="Amount"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
      />

      <PaymentButton label="Pay with Paystack" onPress={handlePaystack} color="#3DCB84" />
      <PaymentButton label="Pay with M-Pesa" onPress={handleMpesa} color="#1A9F29" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
});

export default CheckoutPage;
