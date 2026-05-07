import { useContext, useEffect, useMemo, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { BookingContext } from "../context/BookingContext";
import { auth } from "../firebase/firebase";
import { getUserBookings } from "../services/bookingService";

export default function MyBookingsScreen() {
  const { bookings: contextBookings = [] } = useContext(BookingContext);

  const [now, setNow] = useState(Date.now());
  const [remoteBookings, setRemoteBookings] = useState([]);

  // 🔥 LOAD BOOKINGS FROM FIREBASE
  useEffect(() => {
    const load = async () => {
      if (!auth.currentUser) return;
      const data = await getUserBookings(auth.currentUser.uid);
      setRemoteBookings(data);
    };
    load();
  }, []);

  // ⏱ live timer
  useEffect(() => {
    const timer = setInterval(() => {
      setNow(Date.now());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // ⏱ elapsed time calculator
  const getElapsed = (startTime) => {
    if (!startTime) return "00:00";

    const parsed =
      typeof startTime === "number"
        ? startTime
        : new Date(startTime).getTime();

    if (isNaN(parsed)) return "00:00";

    const diff = Math.floor((now - parsed) / 1000);
    const min = String(Math.max(0, Math.floor(diff / 60))).padStart(2, "0");
    const sec = String(Math.max(0, diff % 60)).padStart(2, "0");
    return `${min}:${sec}`;
  };

  // ✅ PRIORITY: Firebase bookings → fallback to context
  const allBookings =
    remoteBookings.length > 0 ? remoteBookings : contextBookings;

  // 🔥 latest booking first
  const sortedBookings = useMemo(() => {
    return [...allBookings].reverse();
  }, [allBookings]);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>My Bookings</Text>

        {sortedBookings.length === 0 ? (
          <Text style={styles.empty}>
            No bookings found yet 🚗{"\n"}
            Book a parking slot to see it here.
          </Text>
        ) : (
          <FlatList
            data={sortedBookings}
            keyExtractor={(item, index) =>
              item.id ? item.id.toString() : index.toString()
            }
            contentContainerStyle={{ paddingBottom: 24 }}
            renderItem={({ item, index }) => {
              const isActive = item.status === "ACTIVE";

              return (
                <View
                  style={[
                    styles.card,
                    isActive && styles.activeCard,
                  ]}
                >
                  {isActive && (
                    <Text style={styles.activeBadge}>ACTIVE</Text>
                  )}

                  <Text style={styles.area}>
                    {item.area || "Unknown Area"}
                  </Text>

                  <Text style={styles.text}>
                    Slot: {item.slot || "N/A"}
                  </Text>

                  <Text style={styles.text}>
                    Selected Time: {item.selectedTime || "N/A"}
                  </Text>

                  <Text style={styles.text}>
                    Start Time:{" "}
                    {item.startTime
                      ? new Date(item.startTime).toLocaleTimeString("en-PK")
                      : "N/A"}
                  </Text>

                  <Text style={styles.text}>
                    ⏱ Elapsed: {getElapsed(item.startTime)}
                  </Text>

                  <Text style={styles.price}>
                    Rs {item.price || 0}
                  </Text>
                </View>
              );
            }}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#0B1220",
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "800",
    textAlign: "center",
    marginTop: 8,
    marginBottom: 14,
  },
  card: {
    backgroundColor: "#1F2937",
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#334155",
  },
  activeCard: {
    borderColor: "#22C55E",
    backgroundColor: "#022C22",
  },
  activeBadge: {
    alignSelf: "flex-start",
    color: "#022C22",
    backgroundColor: "#22C55E",
    fontSize: 10,
    fontWeight: "800",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    marginBottom: 6,
  },
  area: {
    color: "#60A5FA",
    fontSize: 16,
    fontWeight: "800",
  },
  text: {
    color: "#CBD5E1",
    marginTop: 4,
    fontSize: 13,
  },
  price: {
    color: "#22C55E",
    marginTop: 8,
    fontWeight: "800",
    fontSize: 15,
  },
  empty: {
    color: "#9CA3AF",
    textAlign: "center",
    marginTop: 60,
    fontSize: 14,
    lineHeight: 20,
  },
});
