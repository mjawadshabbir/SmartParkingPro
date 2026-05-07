import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
} from "react-native";
import AnimatedButton from "../components/AnimatedButton";

export default function OnboardingScreen({ navigation }) {
  const bgAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(bgAnim, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: false,
        }),
        Animated.timing(bgAnim, {
          toValue: 0,
          duration: 3000,
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, []);

  const backgroundColor = bgAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["#0B1220", "#1E293B"],
  });

  return (
    <Animated.View style={[styles.container, { backgroundColor }]}>
      <Text style={styles.title}>Smart Parking Pro 🚗</Text>
      <Text style={styles.sub}>
        Find, book & manage parking easily
      </Text>

      <AnimatedButton
        title="Get Started"
        onPress={() => navigation.replace("Login")}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 12,
  },
  sub: {
    fontSize: 15,
    color: "#CBD5E1",
    textAlign: "center",
    marginBottom: 40,
  },
});
