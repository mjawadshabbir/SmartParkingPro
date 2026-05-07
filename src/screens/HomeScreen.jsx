import { Ionicons } from "@expo/vector-icons";

import React, { useRef, useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Animated,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { BookingContext } from "../context/BookingContext";

export default function HomeScreen({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  const { bookings = [] } = useContext(BookingContext);

  const [freeSlots, setFreeSlots] = useState(24);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        friction: 6,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setFreeSlots((prev) => (prev > 18 ? prev - 1 : 24));
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const activeBooking = bookings[bookings.length - 1];
  const recentBookings = bookings.slice(-3).reverse();

  return (
    <ImageBackground
      source={require("../../assets/home-bg.jpg")}
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.overlay} />

      <Animated.View
        style={[
          styles.content,
          { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
        ]}
      >
        {/* 🏠 HOME ICON */}
        <View style={{ alignItems: "center", marginBottom: 10 }}>
          <Ionicons name="home" size={42} color="#22C55E" />
        </View>

        {/* 🔰 TITLE */}
        <Text style={styles.title}>
          Smart<Text style={styles.highlight}>Parking</Text>
        </Text>
        <Text style={styles.subtitle}>
          Live • Smart • Secure 🚗
        </Text>

        {/* 🔴 LIVE BADGE */}
        <View style={styles.liveBadge}>
          <View style={styles.dot} />
          <Text style={styles.liveText}>Live Availability</Text>
        </View>

        {/* 📊 STATS */}
        <View style={styles.statsRow}>
          <View style={styles.glassCard}>
            <Text style={styles.statValue}>{freeSlots}</Text>
            <Text style={styles.statLabel}>Free Slots</Text>
          </View>

          <TouchableOpacity
            style={styles.glassCard}
            onPress={() => navigation.navigate("MyBookings")}
          >
            <Text style={styles.statValue}>{bookings.length}</Text>
            <Text style={styles.statLabel}>My Bookings</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.glassCard, styles.vipCard]}
            onPress={() =>
              navigation.navigate("Parking", { type: "VIP" })
            }
          >
            <Text style={styles.statValue}>VIP</Text>
            <Text style={styles.statLabel}>Premium</Text>
          </TouchableOpacity>
        </View>

        {/* 🧾 ACTIVE BOOKING */}
        <View style={styles.activeBox}>
          <Text style={styles.sectionTitle}>🚘 Active Booking</Text>

          {activeBooking ? (
            <TouchableOpacity
              style={styles.activeCard}
              onPress={() =>
                navigation.navigate("BookingDetails", {
                  slot: { name: activeBooking.slot },
                  area: activeBooking.area,
                })
              }
            >
              <Text style={styles.activeText}>{activeBooking.area}</Text>
              <Text style={styles.activeSub}>
                Slot {activeBooking.slot} • Rs {activeBooking.price}
              </Text>
            </TouchableOpacity>
          ) : (
            <Text style={styles.noBooking}>No active booking</Text>
          )}
        </View>

        {/* 🧩 RECENT BOOKINGS */}
        {recentBookings.length > 0 && (
          <View style={styles.recentBox}>
            <Text style={styles.sectionTitle}>🧾 Recent Bookings</Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {recentBookings.map((b) => (
                <TouchableOpacity
                  key={b.id}
                  style={styles.recentChip}
                  onPress={() =>
                    navigation.navigate("BookingDetails", {
                      slot: { name: b.slot },
                      area: b.area,
                    })
                  }
                >
                  <Text style={styles.recentText}>{b.area}</Text>
                  <Text style={styles.recentSub}>
                    {b.slot} • Rs {b.price}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        {/* 🚀 ACTION */}
        <TouchableOpacity
          style={styles.primaryBtn}
          onPress={() => navigation.navigate("Parking")}
        >
          <Text style={styles.primaryText}>🚗 Find Parking Now</Text>
        </TouchableOpacity>
      </Animated.View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(2,6,23,0.82)",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    padding: 22,
  },

  title: {
    fontSize: 36,
    fontWeight: "900",
    color: "#E5F6FF",
    textAlign: "center",
  },
  highlight: { color: "#38BDF8" },
  subtitle: {
    fontSize: 14,
    color: "#94A3B8",
    textAlign: "center",
    marginBottom: 20,
  },

  liveBadge: {
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
    backgroundColor: "rgba(56,189,248,0.15)",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 999,
    marginBottom: 22,
    borderWidth: 1,
    borderColor: "#38BDF8",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#22C55E",
    marginRight: 8,
  },
  liveText: {
    color: "#38BDF8",
    fontSize: 12,
    fontWeight: "700",
  },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 22,
  },
  glassCard: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 18,
    borderRadius: 18,
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
  },
  vipCard: {
    borderColor: "#FACC15",
    backgroundColor: "rgba(250,204,21,0.15)",
  },
  statValue: {
    fontSize: 20,
    fontWeight: "900",
    color: "#22C55E",
  },
  statLabel: {
    fontSize: 11,
    color: "#CBD5E1",
    marginTop: 4,
  },

  activeBox: {
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 18,
    padding: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#334155",
  },
  sectionTitle: {
    color: "#E5E7EB",
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 8,
  },
  activeCard: {
    backgroundColor: "#020617",
    padding: 14,
    borderRadius: 14,
  },
  activeText: {
    color: "#38BDF8",
    fontWeight: "800",
    fontSize: 14,
  },
  activeSub: {
    color: "#CBD5E1",
    fontSize: 12,
    marginTop: 2,
  },
  noBooking: {
    color: "#9CA3AF",
    fontSize: 12,
  },

  recentBox: {
    marginBottom: 18,
  },
  recentChip: {
    backgroundColor: "#020617",
    padding: 12,
    borderRadius: 14,
    marginRight: 10,
    minWidth: 140,
  },
  recentText: {
    color: "#38BDF8",
    fontWeight: "700",
    fontSize: 13,
  },
  recentSub: {
    color: "#CBD5E1",
    fontSize: 11,
    marginTop: 2,
  },

  primaryBtn: {
    backgroundColor: "#22C55E",
    paddingVertical: 18,
    borderRadius: 20,
  },
  primaryText: {
    color: "#022C22",
    fontSize: 17,
    fontWeight: "900",
    textAlign: "center",
  },
});
