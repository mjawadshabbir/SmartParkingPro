import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import colors from "../theme/colors";

export default function ParkingCard({ item, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.slot}>Slots: {item.slots}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    margin: 12,
    padding: 16,
    borderRadius: 12,
  },
  name: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "600",
  },
  slot: {
    color: colors.success,
    marginTop: 4,
  },
});
