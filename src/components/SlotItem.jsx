import { Pressable, Text, View } from 'react-native';

export default function SlotItem({ slot, onPress }) {
  return (
    <Pressable onPress={onPress} disabled={!slot.available}>
      <View style={{ padding:15 }}>
        <Text>{slot.id} - {slot.price}</Text>
      </View>
    </Pressable>
  );
}
