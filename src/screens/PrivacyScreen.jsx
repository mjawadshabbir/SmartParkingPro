import { ScrollView, Text, View, StyleSheet } from "react-native";

export default function PrivacyScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Privacy Policy</Text>

      <Text style={styles.sectionTitle}>1. Introduction</Text>
      <Text style={styles.text}>
        Smart Parking Pro respects your privacy. This application is created as
        a university project and does not collect or store any real personal
        data.
      </Text>

      <Text style={styles.sectionTitle}>2. Information Usage</Text>
      <Text style={styles.text}>
        Any information shown in the app such as bookings, slots, payments, or
        profiles is used only for demonstration purposes. No real transactions
        occur.
      </Text>

      <Text style={styles.sectionTitle}>3. Location & Parking Data</Text>
      <Text style={styles.text}>
        Location and parking data displayed in this app is simulated. It is
        designed only to demonstrate how a smart parking system could work in a
        real-world scenario.
      </Text>

      <Text style={styles.sectionTitle}>4. Payments & Security</Text>
      <Text style={styles.text}>
        Payment screens in this app are for demo use only. No real card or
        payment details are processed, stored, or transmitted.
      </Text>

      <Text style={styles.sectionTitle}>5. User Responsibility</Text>
      <Text style={styles.text}>
        Users are advised not to enter real personal or financial information
        while using this demo application.
      </Text>

      <Text style={styles.sectionTitle}>6. Contact</Text>
      <Text style={styles.text}>
        For any queries regarding this demo project, please contact:
        {"\n"}support@smartparking.demo
      </Text>

      <Text style={styles.footer}>
        © 2026 Smart Parking Pro — Demo Application
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B1220",
    padding: 20,
  },

  title: {
    color: "#22C55E",
    fontSize: 26,
    fontWeight: "800",
    marginBottom: 20,
    textAlign: "center",
  },

  sectionTitle: {
    color: "#60A5FA",
    fontSize: 16,
    fontWeight: "700",
    marginTop: 16,
    marginBottom: 6,
  },

  text: {
    color: "#CBD5E1",
    fontSize: 14,
    lineHeight: 22,
  },

  footer: {
    color: "#9CA3AF",
    fontSize: 12,
    textAlign: "center",
    marginTop: 30,
    marginBottom: 10,
  },
});
