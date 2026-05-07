import React, { useContext, useMemo } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
  SafeAreaView,
  ScrollView,
} from "react-native";
import colors from "../theme/colors";
import { BookingContext } from "../context/BookingContext";

export default function ProfileScreen({ navigation }) {
  const { bookings = [] } = useContext(BookingContext);

  /* 🔢 DERIVED STATS (REAL DATA) */
  const stats = useMemo(() => {
    const totalSpent = bookings.reduce(
      (sum, b) => sum + (b.price || 0),
      0
    );

    return {
      totalBookings: bookings.length,
      rating: bookings.length > 0 ? "5★" : "—",
      spent: totalSpent,
    };
  }, [bookings]);

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Logout",
          style: "destructive",
          onPress: () => navigation.replace("Login"),
        },
      ]
    );
  };

  const showPrivacy = () => {
    Alert.alert(
      "Privacy & Data Protection",
      "Smart Parking Pro respects your privacy.\n\n• No personal data is shared\n• All bookings are stored locally\n• Location is used only to show parking area\n• Card details are never saved\n\nThis app is for academic/demo purposes only."
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* 👤 PROFILE HEADER */}
        <View style={styles.header}>
          <Text style={styles.name}>Jawad Shabbir</Text>
          <Text style={styles.email}>jawad@gmail.com</Text>

          <View style={styles.badge}>
            <Text style={styles.badgeText}>⭐ Premium User</Text>
          </View>
        </View>

        {/* 📊 USAGE STATS */}
        <View style={styles.statsBox}>
          <View style={styles.stat}>
            <Text style={styles.statValue}>
              {stats.totalBookings}
            </Text>
            <Text style={styles.statLabel}>Bookings</Text>
          </View>

          <View style={styles.stat}>
            <Text style={styles.statValue}>{stats.rating}</Text>
            <Text style={styles.statLabel}>Rating</Text>
          </View>

          <View style={styles.stat}>
            <Text style={styles.statValue}>
              Rs {stats.spent}
            </Text>
            <Text style={styles.statLabel}>Spent</Text>
          </View>
        </View>

        {/* ACTION CARDS */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("EditProfile")}
        >
          <Text style={styles.icon}>👤</Text>
          <Text style={styles.cardText}>Edit Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("MyBookings")}
        >
          <Text style={styles.icon}>🧾</Text>
          <Text style={styles.cardText}>My Bookings</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() =>
            Alert.alert("Settings", "Settings screen is demo only")
          }
        >
          <Text style={styles.icon}>⚙️</Text>
          <Text style={styles.cardText}>Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={showPrivacy}>
          <Text style={styles.icon}>🔒</Text>
          <Text style={styles.cardText}>Privacy Policy</Text>
        </TouchableOpacity>

        {/* 🚪 LOGOUT */}
        <TouchableOpacity
          style={[styles.card, styles.logout]}
          onPress={handleLogout}
        >
          <Text style={styles.icon}>🚪</Text>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

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
    backgroundColor: colors.bg,
  },
  container: {
    padding: 20,
  },

  /* HEADER */
  header: {
    alignItems: "center",
    marginBottom: 26,
  },
  name: {
    color: colors.text,
    fontSize: 22,
    fontWeight: "800",
  },
  email: {
    color: colors.muted,
    fontSize: 13,
    marginTop: 4,
  },
  badge: {
    marginTop: 10,
    backgroundColor: "rgba(34,197,94,0.15)",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#22C55E",
  },
  badgeText: {
    color: "#22C55E",
    fontSize: 12,
    fontWeight: "700",
  },

  /* STATS */
  statsBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 26,
  },
  stat: {
    backgroundColor: "#1F2937",
    borderRadius: 16,
    paddingVertical: 14,
    width: "30%",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#334155",
  },
  statValue: {
    color: "#22C55E",
    fontSize: 16,
    fontWeight: "800",
  },
  statLabel: {
    color: colors.muted,
    fontSize: 11,
    marginTop: 4,
  },

  /* CARDS */
  card: {
    backgroundColor: "#1F2937",
    paddingVertical: 18,
    paddingHorizontal: 16,
    borderRadius: 18,
    marginBottom: 14,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#334155",
  },
  icon: {
    fontSize: 18,
    marginRight: 12,
  },
  cardText: {
    color: colors.text,
    fontSize: 15,
    fontWeight: "600",
  },

  logout: {
    backgroundColor: "#020617",
    borderColor: "#7F1D1D",
  },
  logoutText: {
    color: "#F87171",
    fontSize: 15,
    fontWeight: "700",
  },

  footer: {
    color: "#6B7280",
    fontSize: 12,
    textAlign: "center",
    marginTop: 20,
  },
});
