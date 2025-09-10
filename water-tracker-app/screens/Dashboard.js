// screens/Dashboard.js
import React, { useState, useEffect } from "react";
import { View, Text, Button, TextInput, StyleSheet, ScrollView, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { predictWater } from "../src/services/aiService";

export default function Dashboard() {
  const navigation = useNavigation();
  const [age, setAge] = useState("28");
  const [weight, setWeight] = useState("70");
  const [activity, setActivity] = useState("2");
  const [recentAvg, setRecentAvg] = useState("3.5");
  const [daysNoSupply, setDaysNoSupply] = useState("1");
  const [recommendation, setRecommendation] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    const stored = await AsyncStorage.getItem("waterHistory");
    if (stored) setHistory(JSON.parse(stored));
  };

  const saveToHistory = async (entry) => {
    const updated = [entry, ...history];
    setHistory(updated);
    await AsyncStorage.setItem("waterHistory", JSON.stringify(updated));
  };

  const handlePredict = async () => {
    try {
      const liters = await predictWater({
        age: parseInt(age),
        weight: parseFloat(weight),
        activity: parseInt(activity),
        recent_avg: parseFloat(recentAvg),
        days_no_supply: parseInt(daysNoSupply),
      });
      setRecommendation(liters);
      saveToHistory({ date: new Date().toISOString(), liters });
    } catch (err) {
      setRecommendation("⚠️ Error fetching prediction");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🎉 Welcome to the Dashboard</Text>

      {/* Navigation */}
      <Button title="Go to Home" onPress={() => navigation.navigate("Home")} />
      <Button title="Go to Property" onPress={() => navigation.navigate("Property")} />
      <Button title="Go to Meter" onPress={() => navigation.navigate("Meter")} />
      <Button title="Go to Checkout" onPress={() => navigation.navigate("Checkout")} />

      <View style={styles.separator} />

      {/* AI Section */}
      <Text style={styles.subtitle}>💧 AI Water Recommendation</Text>

      <TextInput style={styles.input} value={age} onChangeText={setAge} placeholder="Age" keyboardType="numeric" />
      <TextInput style={styles.input} value={weight} onChangeText={setWeight} placeholder="Weight (kg)" keyboardType="numeric" />
      <TextInput style={styles.input} value={activity} onChangeText={setActivity} placeholder="Activity (0-3)" keyboardType="numeric" />
      <TextInput style={styles.input} value={recentAvg} onChangeText={setRecentAvg} placeholder="Recent Avg (liters/day)" keyboardType="numeric" />
      <TextInput style={styles.input} value={daysNoSupply} onChangeText={setDaysNoSupply} placeholder="Days No Supply" keyboardType="numeric" />

      <Button title="Get Recommendation" onPress={handlePredict} />

      {recommendation && (
        <Text style={styles.result}>Recommended: {recommendation} liters/day</Text>
      )}

      <View style={styles.separator} />

      {/* History */}
      <Text style={styles.subtitle}>📜 History</Text>
      <FlatList
        data={history}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text style={styles.historyItem}>
            {new Date(item.date).toLocaleString()} → {item.liters} liters
          </Text>
        )}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, justifyContent: "center", backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 15, textAlign: "center" },
  subtitle: { fontSize: 18, fontWeight: "600", marginVertical: 15, textAlign: "center" },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, marginVertical: 5, borderRadius: 5 },
  result: { marginTop: 20, fontSize: 18, fontWeight: "600", textAlign: "center", color: "#0077cc" },
  separator: { marginVertical: 20, borderBottomWidth: 1, borderBottomColor: "#ddd" },
  historyItem: { fontSize: 16, paddingVertical: 4, borderBottomColor: "#eee", borderBottomWidth: 1 },
});
