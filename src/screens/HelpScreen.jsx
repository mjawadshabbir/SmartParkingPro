import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";

export default function HelpScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* 🔹 HEADER */}
        <Text style={styles.title}>Help & Support</Text>

        {/* 📧 CONTACT */}
        <View style={styles.card}>
          <Text style={styles.heading}>📧 Contact Support</Text>
          <Text style={styles.text}>
            Email: support@smartparking.demo
          </Text>
        </View>

        {/* ❓ FAQ */}
        <View style={styles.card}>
          <Text style={styles.heading}>
            ❓ Frequently Asked Questions
          </Text>
          <Text style={styles.text}>
            • How to book a parking slot?{"\n"}
            • How to cancel a booking?{"\n"}
            • How payments work?{"\n"}
            • What are premium slots?
          </Text>
        </View>

        {/* ⏰ HOURS */}
        <View style={styles.card}>
          <Text style={styles.heading}>⏰ Support Hours</Text>
          <Text style={styles.text}>
            Monday – Saturday{"\n"}
            9:00 AM – 9:00 PM
          </Text>
        </View>

        {/* 🔒 PRIVACY NOTE */}
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            🔒 Your privacy matters to us.{"\n"}
            We never share your personal or payment data.
          </Text>
        </View>

        {/* FOOTER */}
        <Text style={styles.footer}>
          Smart Parking Pro © 2026
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#0B1220",
  },
  container: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "800",
    textAlign: "center",
    marginTop: 8,      
    marginBottom: 22,
  },
  card: {
    backgroundColor: "#1F2937",
    borderRadius: 18,
    padding: 18,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#334155",
  },
  heading: {
    color: "#60A5FA",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 6,
  },
  text: {
    color: "#CBD5E1",
    fontSize: 14,
    lineHeight: 20,
  },
  infoBox: {
    backgroundColor: "rgba(34,197,94,0.12)",
    borderRadius: 16,
    padding: 16,
    marginTop: 6,
    borderWidth: 1,
    borderColor: "#22C55E",
  },
  infoText: {
    color: "#BBF7D0",
    fontSize: 13,
    lineHeight: 18,
    textAlign: "center",
    fontWeight: "600",
  },
  footer: {
    color: "#6B7280",
    fontSize: 12,
    textAlign: "center",
    marginTop: 26,
  },
});
