import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
} from "react-native";
import colors from "../theme/colors";

export default function SplashScreen({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    // 🔹 Logo animation


    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 5,
        useNativeDriver: true,
      }),
    ]).start();

    // 🔹 Navigate after splash
    const timer = setTimeout(() => {
      navigation.replace("Auth");
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      {/* 🔹 APP LOGO / NAME */}
      <Animated.View
        style={[
          styles.logoBox,
          { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
        ]}
      >
        <Text style={styles.logo}>🚗</Text>
        <Text style={styles.title}>SmartParking Pro</Text>
        <Text style={styles.tagline}>
          Park Smart • Save Time • Go Easy
        </Text>
      </Animated.View>

      {/* 🔹 FOOTER */}
      <Text style={styles.footer}>Loading smart experience…</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#020617", // premium dark
    justifyContent: "center",
    alignItems: "center",
  },

  logoBox: {
    alignItems: "center",
  },

  logo: {
    fontSize: 60,
    marginBottom: 10,
  },

  title: {
    color: "#22C55E",
    fontSize: 28,
    fontWeight: "900",
    letterSpacing: 0.5,
  },

  tagline: {
    color: "#9CA3AF",
    fontSize: 13,
    marginTop: 6,
    letterSpacing: 0.3,
  },

  footer: {
    position: "absolute",
    bottom: 40,
    color: "#6B7280",
    fontSize: 12,
  },
});
