import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import api from "../api/api";

export default function MeterScreen({ route }) {
  const { property } = route.params;
  const [meters, setMeters] = useState([]);

  useEffect(() => {
    api.get(`/meters/property/${property.id}`)
      .then(res => setMeters(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <View style={styles.container}>
      <Text>Meters for {property.address}:</Text>
      <FlatList
        data={meters}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => <Text>{item.meter_number}</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({ container: { flex: 1, padding: 20 } });
