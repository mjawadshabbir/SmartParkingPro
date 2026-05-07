import { useContext, useEffect, useRef, useState } from "react";
import {
  Alert,
  Animated,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { BookingContext } from "../context/BookingContext";

// 🔥 FIREBASE IMPORTS (ADDED)
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";

export default function PaymentScreen({ navigation, route }) {
  const { booking } = route.params || {};
  const { addBooking } = useContext(BookingContext);

  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const bgAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(bgAnim, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: false,
        }),
        Animated.timing(bgAnim, {
          toValue: 0,
          duration: 3000,
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, []);

  const backgroundColor = bgAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["#0B1220", "#111827"],
  });

  const formatCard = (text) => {
    const cleaned = text.replace(/\D/g, "").slice(0, 16);
    return cleaned.replace(/(.{4})/g, "$1 ").trim();
  };

  const formatExpiry = (text) => {
    const cleaned = text.replace(/\D/g, "").slice(0, 4);
    return cleaned.length >= 3
      ? cleaned.slice(0, 2) + "/" + cleaned.slice(2)
      : cleaned;
  };

  // 🔥 FINAL PAYMENT HANDLER (Firebase + Context)
  const handlePay = async () => {
    if (
      cardNumber.replace(/\s/g, "").length !== 16 ||
      expiry.length !== 5 ||
      cvv.length !== 3
    ) {
      Alert.alert("Invalid Card", "Please enter valid card details");
      return;
    }

    const finalBooking = {
      ...booking,
      userId: auth.currentUser.uid,
      startTime: Date.now(),
      status: "ACTIVE",
      paymentMethod: "Card",
      cardLast4: cardNumber.slice(-4),
      createdAt: serverTimestamp(),
    };

    try {
      // 🔥 1️⃣ SAVE TO FIRESTORE (REAL DATABASE)
      await addDoc(collection(db, "bookings"), finalBooking);

      // 🔁 2️⃣ SAVE TO CONTEXT (LOCAL STATE)
      addBooking(finalBooking);

      Alert.alert("Success 🎉", "Payment Successful");
      navigation.replace("Success");
    } catch (e) {
      Alert.alert("Payment Error", e.message);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <Animated.View style={[styles.container, { backgroundColor }]}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.cardPreview}>
            <Text style={styles.bank}>SmartParking Bank</Text>
            <Text style={styles.cardNumberPreview}>
              {cardNumber || "•••• •••• •••• ••••"}
            </Text>

            <View style={styles.cardRow}>
              <Text style={styles.cardLabel}>
                EXP {expiry || "MM/YY"}
              </Text>
              <Text style={styles.cardChip}>💳</Text>
            </View>
          </View>

          <View style={styles.formCard}>
            <Text style={styles.title}>Secure Payment</Text>

            <Text style={styles.summary}>
              {booking?.area} • Slot {booking?.slot}
            </Text>
            <Text style={styles.amount}>Rs {booking?.price}</Text>

            <TextInput
              style={styles.input}
              placeholder="Card Number"
              placeholderTextColor="#9CA3AF"
              keyboardType="numeric"
              value={cardNumber}
              onChangeText={(t) => setCardNumber(formatCard(t))}
              maxLength={19}
            />

            <View style={styles.row}>
              <TextInput
                style={[styles.input, { flex: 1 }]}
                placeholder="MM/YY"
                placeholderTextColor="#9CA3AF"
                keyboardType="numeric"
                value={expiry}
                onChangeText={(t) => setExpiry(formatExpiry(t))}
                maxLength={5}
              />
              <TextInput
                style={[styles.input, { flex: 1 }]}
                placeholder="CVV"
                placeholderTextColor="#9CA3AF"
                keyboardType="numeric"
                secureTextEntry
                value={cvv}
                onChangeText={(t) =>
                  setCvv(t.replace(/\D/g, "").slice(0, 3))
                }
                maxLength={3}
              />
            </View>

            <TouchableOpacity style={styles.payBtn} onPress={handlePay}>
              <Text style={styles.payText}>Pay Securely 🔒</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Animated.View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  cardPreview: {
    backgroundColor: "#020617",
    marginHorizontal: 24,
    marginBottom: 20,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "#334155",
  },
  bank: { color: "#94A3B8", fontSize: 12, marginBottom: 14 },
  cardNumberPreview: {
    color: "#E5E7EB",
    fontSize: 20,
    letterSpacing: 2,
    fontWeight: "700",
    marginBottom: 16,
  },
  cardRow: { flexDirection: "row", justifyContent: "space-between" },
  cardLabel: { color: "#CBD5E1", fontSize: 12 },
  cardChip: { fontSize: 22 },
  formCard: {
    backgroundColor: "#111827",
    padding: 24,
    borderRadius: 20,
    marginHorizontal: 20,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 10,
  },
  summary: { color: "#9CA3AF", textAlign: "center", fontSize: 13 },
  amount: {
    color: "#22C55E",
    fontSize: 22,
    fontWeight: "800",
    textAlign: "center",
    marginVertical: 12,
  },
  input: {
    backgroundColor: "#020617",
    color: "#FFFFFF",
    padding: 14,
    borderRadius: 14,
    marginTop: 12,
    borderWidth: 1,
    borderColor: "#334155",
  },
  row: { flexDirection: "row", gap: 10 },
  payBtn: {
    backgroundColor: "#22C55E",
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
    marginTop: 22,
  },
  payText: { color: "#022C22", fontSize: 16, fontWeight: "800" },
});
