import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Animated,
  Switch,
  Alert,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import AnimatedButton from "../components/AnimatedButton";

export default function EditProfileScreen() {
  const [name, setName] = useState("Jawad Shabbir");
  const [email, setEmail] = useState("jawad@gmail.com");
  const [phone, setPhone] = useState("+92 300 1234567");
  const [image, setImage] = useState(null);
  const [darkMode, setDarkMode] = useState(true);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSave = () => {
    Alert.alert("Demo", "Profile updated successfully");
  };

  const bg = darkMode ? "#0B1220" : "#F9FAFB";
  const card = darkMode ? "#1F2937" : "#FFFFFF";
  const text = darkMode ? "#FFFFFF" : "#111827";
  const muted = darkMode ? "#9CA3AF" : "#6B7280";

  return (
    <Animated.View style={[styles.container, { backgroundColor: bg, opacity: fadeAnim }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <Text style={[styles.title, { color: text }]}>Edit Profile</Text>

        <Text style={[styles.demoText, { color: muted }]}>
          This is a demo profile screen. Changes are not saved permanently.
        </Text>

        <TouchableOpacity style={styles.imageBox} onPress={pickImage}>
          {image ? (
            <Image source={{ uri: image }} style={styles.image} />
          ) : (
            <Text style={{ color: muted }}>Tap to add photo</Text>
          )}
        </TouchableOpacity>

        <View style={[styles.card, { backgroundColor: card }]}>
          <TextInput
            style={[styles.input, { color: text }]}
            value={name}
            onChangeText={setName}
            placeholder="Full Name"
            placeholderTextColor={muted}
          />

          <TextInput
            style={[styles.input, { color: text }]}
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            placeholderTextColor={muted}
          />

          <TextInput
            style={[styles.input, { color: text }]}
            value={phone}
            onChangeText={setPhone}
            placeholder="Phone"
            placeholderTextColor={muted}
          />
        </View>

        <View style={styles.toggleRow}>
          <Text style={{ color: text }}>Dark Mode</Text>
          <Switch value={darkMode} onValueChange={setDarkMode} />
        </View>

        <AnimatedButton title="Save Changes" onPress={handleSave} />
      </ScrollView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 6,
  },
  demoText: {
    fontSize: 13,
    textAlign: "center",
    marginBottom: 20,
  },
  imageBox: {
    alignSelf: "center",
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#374151",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  card: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: "#4B5563",
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 14,
  },
  toggleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
});
