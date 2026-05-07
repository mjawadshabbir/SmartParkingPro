import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from "react-native";

export default function ParkingListScreen({ navigation }) {
  const parkingAreas = [
    { id: "1", name: "Airport Parking", tag: "24/7 Available" },
    { id: "2", name: "Mall Parking", tag: "High Demand" },
    { id: "3", name: "Office Parking", tag: "Working Hours" },
    { id: "4", name: "Stadium Parking", tag: "Event Based" },
    { id: "5", name: "Hotel Parking", tag: "Premium" },
    { id: "6", name: "Hospital Parking", tag: "Emergency Access" },
    { id: "7", name: "University Parking", tag: "Students Zone" },
    { id: "8", name: "Event Parking", tag: "Limited Slots" },
    { id: "9", name: "Train Station Parking", tag: "24/7 Available" },
    { id: "10", name: "City Center Parking", tag: "Busy Area" },
    { id: "11", name: "Residential Parking", tag: "Night Safe" },
    { id: "12", name: "Park & Ride", tag: "Low Cost" },
    { id: "13", name: "Cinema Parking", tag: "Evening Rush" },
    { id: "14", name: "Studio Park Parking", tag: "Premium Zone" },
  ];

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#0B1220" />

      <View style={styles.container}>
        <Text style={styles.title}>Choose Parking Area</Text>
        <Text style={styles.subTitle}>
          Smart • Secure • Real-Time Parking
        </Text>

        <FlatList
          data={parkingAreas}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              activeOpacity={0.85}
              onPress={() =>
                navigation.navigate("SlotScreen", { area: item.name })
              }
            >
              <View>
                <Text style={styles.cardText}>{item.name}</Text>
                <Text style={styles.tag}>{item.tag}</Text>
              </View>

              <Text style={styles.arrow}>›</Text>
            </TouchableOpacity>
          )}
        />
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
    fontSize: 24,
    fontWeight: "800",
    textAlign: "center",
    marginTop: 10,
  },

  subTitle: {
    color: "#9CA3AF",
    fontSize: 13,
    textAlign: "center",
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#1F2937",
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderRadius: 18,
    marginBottom: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },

  cardText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },

  tag: {
    color: "#60A5FA",
    fontSize: 12,
    marginTop: 4,
  },

  arrow: {
    color: "#22C55E",
    fontSize: 26,
    fontWeight: "700",
  },
});
