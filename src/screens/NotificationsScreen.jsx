import React, { useEffect, useState, useMemo } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";

export default function NotificationsScreen({ navigation }) {
  const [secondsLeft, setSecondsLeft] = useState(120);
  const [showReview, setShowReview] = useState(false);
  const [rating, setRating] = useState(0);

  // 🔵 NEW: unread tracking (POINT-4)
  const [seenNotifications, setSeenNotifications] = useState({});

  // ⏱ live countdown
  useEffect(() => {
    if (secondsLeft <= 0) return;

    const timer = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [secondsLeft]);

  const formatTime = () => {
    const min = Math.floor(secondsLeft / 60);
    const sec = secondsLeft % 60;
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };

  const notifications = useMemo(
    () => [
      {
        id: "1",
        type: "premium",
        title: "Premium Parking Available 🚘",
        message: "VIP Slot A1 is free – Rs 500/hour",
      },
      {
        id: "2",
        type: "slot",
        title: "Parking Slot Free ✅",
        message: "Slot F12 is now available",
      },
      {
        id: "3",
        type: "timer",
        title: "Parking Time Running Out ⏰",
        message: `Remaining Time: ${formatTime()}`,
      },
      {
        id: "4",
        type: "review",
        title: "Give Feedback ⭐",
        message: "Tap to rate your parking experience",
      },
    ],
    [secondsLeft]
  );

  const handlePress = (item) => {
    // 🔵 mark as seen
    setSeenNotifications((prev) => ({
      ...prev,
      [item.id]: true,
    }));

    if (item.type === "premium" || item.type === "slot") {
      navigation.navigate("SlotScreen", {
        area: "Premium Parking",
      });
    }

    if (item.type === "review") {
      setShowReview(true);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.header}>Notifications</Text>

        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 24 }}
          renderItem={({ item }) => {
            const unread = !seenNotifications[item.id];

            return (
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.card}
                onPress={() => handlePress(item)}
              >
                <View style={styles.row}>
                  <Text style={styles.title}>{item.title}</Text>

                  {/* 🔵 UNREAD DOT */}
                  {unread && <View style={styles.unreadDot} />}
                </View>

                <Text style={styles.message}>{item.message}</Text>
              </TouchableOpacity>
            );
          }}
        />

        {/* ⭐ REVIEW BOX */}
        {showReview && (
          <View style={styles.reviewBox}>
            <Text style={styles.reviewTitle}>
              Rate Your Parking Experience
            </Text>

            <View style={styles.stars}>
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity
                  key={star}
                  onPress={() => setRating(star)}
                >
                  <Text
                    style={[
                      styles.star,
                      rating >= star && styles.starActive,
                    ]}
                  >
                    ★
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {rating > 0 && (
              <Text style={styles.thanks}>
                Thanks for rating us {rating} star
                {rating > 1 ? "s" : ""} 🙏
              </Text>
            )}
          </View>
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
  header: {
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
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#38BDF8",
  },
  title: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },
  message: {
    color: "#9CA3AF",
    marginTop: 6,
    fontSize: 13,
  },
  reviewBox: {
    backgroundColor: "#111827",
    padding: 20,
    borderRadius: 18,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#334155",
  },
  reviewTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 10,
  },
  stars: {
    flexDirection: "row",
    justifyContent: "center",
  },
  star: {
    fontSize: 34,
    color: "#374151",
    marginHorizontal: 6,
  },
  starActive: {
    color: "#FACC15",
  },
  thanks: {
    color: "#22C55E",
    textAlign: "center",
    marginTop: 12,
    fontWeight: "700",
  },
});
