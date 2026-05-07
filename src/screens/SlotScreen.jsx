import React, { useContext } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { BookingContext } from "../context/BookingContext";

export default function SlotScreen({ route, navigation }) {
  const { area } = route.params;
  const { bookings = [] } = useContext(BookingContext);

  const slots = Array.from({ length: 12 }).map((_, i) => {
    const name = `S-${i + 1}`;
    const booked = bookings.some(
      (b) => b.slot === name && b.area === area 
    );
    const isVIP = [1, 5, 9].includes(i + 1); // 🏆 VIP logic

    return { id: name, name, booked, isVIP };
  });

  const freeCount = slots.filter((s) => !s.booked).length;
  const vipCount = slots.filter((s) => s.isVIP).length;
  const occupiedCount = slots.length - freeCount;

  return (
    <View style={styles.container}>
      {/* 🔹 HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>{area}</Text>
        <Text style={styles.subtitle}>
          {freeCount} / {slots.length} Slots Available
        </Text>
      </View>

      {/* 📊 SUMMARY BAR */}
      <View style={styles.summaryRow}>
        <Text style={styles.summaryText}>🟢 Free: {freeCount}</Text>
        <Text style={styles.summaryText}>🔴 Occupied: {occupiedCount}</Text>
        <Text style={styles.summaryText}>👑 VIP: {vipCount}</Text>
      </View>

      {/* 🔹 LEGEND */}
      <View style={styles.legendRow}>
        <Legend color="#14532D" label="Free" />
        <Legend color="#7F1D1D" label="Occupied" />
        <Legend color="#FACC15" label="VIP" />
      </View>

      {/* 🔹 SLOTS GRID */}
      <FlatList
        numColumns={3}
        data={slots}
        keyExtractor={(i) => i.id}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            disabled={item.booked}
            style={[
              styles.slot,
              item.booked ? styles.occupied : styles.free,
              item.isVIP && styles.vipSlot,
            ]}
            onPress={() =>
              navigation.navigate("BookingDetails", {
                slot: item,
                area,
              })
            }
          >
            <Text style={styles.slotText}>{item.name}</Text>

            <Text style={styles.status}>
              {item.booked
                ? "Occupied"
                : item.isVIP
                ? "VIP Slot"
                : "Tap to Book"}
            </Text>

            {item.booked && <Text style={styles.lock}>🔒</Text>}
            {item.isVIP && !item.booked && (
              <Text style={styles.crown}>👑</Text>
            )}
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

/* 🔹 SMALL LEGEND COMPONENT */
const Legend = ({ color, label }) => (
  <View style={styles.legendItem}>
    <View style={[styles.dot, { backgroundColor: color }]} />
    <Text style={styles.legendText}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B1220",
    padding: 14,
  },

  header: {
    alignItems: "center",
    marginBottom: 6,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "900",
  },

  subtitle: {
    color: "#9CA3AF",
    fontSize: 13,
    marginTop: 2,
  },

  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },

  summaryText: {
    color: "#CBD5E1",
    fontSize: 12,
    fontWeight: "700",
  },

  legendRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
  },

  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
  },

  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 6,
  },

  legendText: {
    color: "#CBD5E1",
    fontSize: 12,
  },

  slot: {
    flex: 1,
    margin: 6,
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },

  free: {
    backgroundColor: "#14532D",
    borderWidth: 1,
    borderColor: "#22C55E",
  },

  occupied: {
    backgroundColor: "#7F1D1D",
    borderWidth: 1,
    borderColor: "#EF4444",
  },

  vipSlot: {
    borderWidth: 2,
    borderColor: "#FACC15",
  },

  slotText: {
    color: "#FFFFFF",
    fontWeight: "800",
    fontSize: 15,
  },

  status: {
    color: "#E5E7EB",
    fontSize: 11,
    marginTop: 4,
  },

  lock: {
    position: "absolute",
    bottom: 6,
    right: 6,
    fontSize: 12,
  },

  crown: {
    position: "absolute",
    top: 6,
    right: 6,
    fontSize: 14,
  },
});
