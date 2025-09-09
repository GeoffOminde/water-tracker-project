import React, { useEffect, useState } from "react";
import { View, Text, Button, FlatList, StyleSheet } from "react-native";
import api from "../api/api";

export default function PropertyScreen({ navigation, route }) {
  const { user } = route.params;
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    api.get(`/properties/owner/${user.id}`)
      .then(res => setProperties(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <View style={styles.container}>
      <Text>Your Properties:</Text>
      <FlatList
        data={properties}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <Button
            title={item.address}
            onPress={() => navigation.navigate("Meters", { property: item })}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({ container: { flex: 1, padding: 20 } });
