import React, { useEffect, useState, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Linking,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function BookingDetailsScreen({ route, navigation }) {
  const params = route?.params || {};
  const slot = params.slot || {};
  const area = params.area || "Unknown Area";

  const parkingLocation = {
    latitude: 24.8607,
    longitude: 67.0011,
  };

  const userLocation = {
    latitude: 24.8649,
    longitude: 67.0094,
  };

  const timeSlots = [
    { label: "30 Min", minutes: 30, price: 100 },
    { label: "1 Hour", minutes: 60, price: 180 },
    { label: "2 Hours", minutes: 120, price: 320 },
    { label: "3 Hours", minutes: 180, price: 450 },
  ];

  const [selectedTime, setSelectedTime] = useState(null);
  const [customMinutes, setCustomMinutes] = useState("");
  const [price, setPrice] = useState(0);
  const [startTime, setStartTime] = useState(Date.now());
  const [endTime, setEndTime] = useState(null);
  const [remaining, setRemaining] = useState(null);
  const [alerted, setAlerted] = useState(false);

  const isPremium =
    slot?.name?.endsWith("1") || slot?.name?.endsWith("5");

  const { distanceText, etaText } = useMemo(() => {
    const toRad = (v) => (v * Math.PI) / 180;
    const R = 6371;

    const dLat = toRad(
      parkingLocation.latitude - userLocation.latitude
    );
    const dLon = toRad(
      parkingLocation.longitude - userLocation.longitude
    );

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(userLocation.latitude)) *
        Math.cos(toRad(parkingLocation.latitude)) *
        Math.sin(dLon / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const km = R * c;

    const distance =
      km < 1 ? `${Math.round(km * 1000)} m` : `${km.toFixed(1)} km`;

    const etaMinutes = Math.max(1, Math.round((km / 30) * 60));

    return {
      distanceText: distance,
      etaText: `${etaMinutes} min away`,
    };
  }, []);

  useEffect(() => {
    if (!endTime) return;

    const timer = setInterval(() => {
      const diff = Math.floor((endTime - Date.now()) / 1000);

      if (diff <= 300 && !alerted) {
        Alert.alert(
          "⏰ Time Ending Soon",
          "Your parking time will expire in 5 minutes"
        );
        setAlerted(true);
      }

      if (diff <= 0) {
        clearInterval(timer);
        setRemaining("00:00");
      } else {
        const min = String(Math.floor(diff / 60)).padStart(2, "0");
        const sec = String(diff % 60).padStart(2, "0");
        setRemaining(`${min}:${sec}`);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime]);

  const openMaps = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${parkingLocation.latitude},${parkingLocation.longitude}`;
    Linking.openURL(url);
  };

  const handleCustomTime = () => {
    const mins = parseInt(customMinutes);
    if (!mins || mins <= 0) {
      Alert.alert("Invalid Time", "Enter valid minutes");
      return;
    }

    let basePrice = Math.round((mins / 30) * 100);

    if (isPremium) basePrice *= 1.3;

    setSelectedTime(`${mins} Min (Custom)`);
    setPrice(Math.round(basePrice));
    setEndTime(startTime + mins * 60 * 1000);
    setAlerted(false);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          <Text style={styles.title}>Booking Details</Text>

          <View style={styles.mapBox}>
            <MapView
              pointerEvents="none"
              style={StyleSheet.absoluteFill}
              initialRegion={{
                latitude: parkingLocation.latitude,
                longitude: parkingLocation.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
            >
              <Marker coordinate={parkingLocation} title={area} />
            </MapView>

            <View style={styles.mapOverlay}>
              <Text style={styles.mapText}>📍 {distanceText}</Text>
              <Text style={styles.mapEta}>🕒 {etaText}</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.mapBtn} onPress={openMaps}>
            <Text style={styles.mapBtnText}>🧭 Open in Maps</Text>
          </TouchableOpacity>

          <View style={styles.card}>
            <Text style={styles.label}>Parking Area</Text>
            <Text style={styles.value}>{area}</Text>

            <Text style={styles.label}>Slot</Text>
            <Text style={styles.value}>
              {slot.name || "N/A"}{" "}
              {isPremium && <Text style={styles.premium}>🏆 Premium</Text>}
            </Text>

            <Text style={styles.label}>Quick Time</Text>

            <View style={styles.slotRow}>
              {timeSlots.map((t) => (
                <TouchableOpacity
                  key={t.label}
                  style={[
                    styles.timeBtn,
                    selectedTime === t.label && styles.activeTimeBtn,
                  ]}
                  onPress={() => {
                    setSelectedTime(t.label);
                    setPrice(t.price);
                    setEndTime(startTime + t.minutes * 60 * 1000);
                    setAlerted(false);
                  }}
                >
                  <Text style={styles.timeText}>{t.label}</Text>
                  <Text style={styles.priceText}>Rs {t.price}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.label}>Custom Time (minutes)</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter minutes (e.g. 45)"
              placeholderTextColor="#9CA3AF"
              keyboardType="numeric"
              value={customMinutes}
              onChangeText={setCustomMinutes}
            />

            <TouchableOpacity
              style={styles.customBtn}
              onPress={handleCustomTime}
            >
              <Text style={styles.customText}>Apply Custom Time</Text>
            </TouchableOpacity>

            {remaining && (
              <>
                <Text style={styles.label}>⏱ Remaining Time</Text>
                <Text style={[styles.value, { color: "#FACC15" }]}>
                  {remaining}
                </Text>
              </>
            )}

            <Text style={styles.label}>Amount</Text>
            <Text style={[styles.value, { color: "#22C55E" }]}>
              {price ? `Rs ${price}` : "Select time"}
            </Text>
          </View>

          <TouchableOpacity
            style={[styles.btn, !price && { opacity: 0.5 }]}
            disabled={!price}
            onPress={() =>
              navigation.navigate("Payment", {
                booking: {
                  area,
                  slot: slot.name,
                  selectedTime,
                  price,
                  startTime,
                  endTime,
                },
              })
            }
          >
            <Text style={styles.btnText}>Proceed to Payment</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0B1220", padding: 16 },
  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 12,
  },
  mapBox: {
    height: 180,
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 10,
  },
  mapOverlay: {
    position: "absolute",
    bottom: 8,
    left: 8,
    backgroundColor: "rgba(0,0,0,0.6)",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
  },
  mapText: { color: "#fff", fontSize: 12, fontWeight: "600" },
  mapEta: { color: "#FACC15", fontSize: 11, fontWeight: "700" },

  mapBtn: { alignSelf: "center", marginBottom: 12 },
  mapBtnText: { color: "#38BDF8", fontWeight: "700" },

  card: {
    backgroundColor: "#1F2937",
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
  },
  label: { color: "#9CA3AF", fontSize: 12, marginTop: 8 },
  value: { color: "#fff", fontSize: 16, fontWeight: "600" },
  premium: { color: "#FACC15", fontWeight: "800" },

  slotRow: { flexDirection: "row", flexWrap: "wrap", marginTop: 8 },
  timeBtn: {
    backgroundColor: "#020617",
    padding: 10,
    borderRadius: 12,
    marginRight: 8,
    marginTop: 6,
    alignItems: "center",
  },
  activeTimeBtn: { backgroundColor: "#22C55E" },
  timeText: { color: "#fff", fontSize: 12, fontWeight: "700" },
  priceText: { color: "#9CA3AF", fontSize: 11 },

  input: {
    backgroundColor: "#020617",
    color: "#fff",
    borderRadius: 12,
    padding: 12,
    marginTop: 6,
  },

  customBtn: {
    backgroundColor: "#38BDF8",
    padding: 12,
    borderRadius: 12,
    marginTop: 10,
    alignItems: "center",
  },
  customText: { color: "#022C22", fontWeight: "800" },

  btn: {
    backgroundColor: "#22C55E",
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
  },
  btnText: { color: "#022C22", fontWeight: "900" },
});
