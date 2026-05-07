import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function BookingSuccessScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Booking Successful 🎉</Text>

      <Text style={styles.info}>
        Your parking has been booked successfully.
      </Text>

      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.replace("MyBookings")}
      >
        <Text style={styles.btnText}>View My Bookings</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.btn, { marginTop: 12 }]}
        onPress={() => navigation.replace("Tabs")}
      >
        <Text style={styles.btnText}>Go to Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B1220",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    color: "#22C55E",
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 12,
  },
  info: {
    color: "#CBD5E1",
    fontSize: 14,
    marginBottom: 20,
    textAlign: "center",
  },
  btn: {
    backgroundColor: "#1F2937",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 14,
  },
  btnText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
});
