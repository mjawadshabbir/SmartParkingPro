import { Animated, Text, Pressable } from 'react-native';
import { useRef, useEffect } from 'react';
import colors from '../theme/colors';

export default function AnimatedButton({ title, onPress }) {
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scale, { toValue: 1.05, duration: 800, useNativeDriver: true }),
        Animated.timing(scale, { toValue: 1, duration: 800, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  return (
    <Pressable onPress={onPress}>
      <Animated.View style={{
        transform: [{ scale }],
        backgroundColor: colors.primary,
        padding: 16,
        borderRadius: 12,
        marginTop: 20
      }}>
        <Text style={{ color: '#fff', textAlign: 'center', fontWeight: '600' }}>
          {title}
        </Text>
      </Animated.View>
    </Pressable>
  );
}
