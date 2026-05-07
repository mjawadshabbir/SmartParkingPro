import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function NotificationCard({ title, message, time }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
      <Text style={styles.time}>{time}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#1E2A47",
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
  },
  title: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
  message: {
    color: "#C7D2FE",
    marginTop: 4,
    fontSize: 13,
  },
  time: {
    color: "#8FA3FF",
    marginTop: 6,
    fontSize: 11,
    alignSelf: "flex-end",
  },
});
