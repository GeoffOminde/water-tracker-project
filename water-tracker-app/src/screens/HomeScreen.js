import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export default function HomeScreen({ navigation, route }) {
  const { user } = route.params;

  return (
    <View style={styles.container}>
      <Text>Welcome, {user.name}</Text>
      <Button title="View Properties" onPress={() => navigation.navigate("Properties", { user })} />
    </View>
  );
}

const styles = StyleSheet.create({ container: { flex: 1, justifyContent: "center", alignItems: "center" } });
