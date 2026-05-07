import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, View } from "react-native";
import AnimatedButton from "../components/AnimatedButton";
import { auth } from "../firebase/firebase";

export default function LoginScreen({ navigation }) {
  const [showForm, setShowForm] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);

      Alert.alert("Success", "Login successful");
      navigation.reset({
        index: 0,
        routes: [{ name: "Main" }],
      });
    } catch (e) {
      Alert.alert("Login Failed", e.message);
    }
  };

  return (
    
    <View style={styles.container}>
      
      <Text style={styles.heading}>Smart Parking Pro 🚗</Text>
      <Text style={styles.subHeading}>
        Secure login to manage your parking
      </Text>

      {!showForm ? (
        <>
          <AnimatedButton
            title="Login to Continue"
            onPress={() => setShowForm(true)}
          />
          <AnimatedButton
            title="Create New Account"
            onPress={() => navigation.navigate("Signup")}
          />
        </>
      ) : (
        <>
          <TextInput
            style={styles.input}
            placeholder="Email Address"
            placeholderTextColor="#9CA3AF"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#9CA3AF"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <AnimatedButton title="Confirm Login" onPress={handleLogin} />
        </>
      )}
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B1220",
    justifyContent: "center",
    padding: 24,
  },

  heading: {
    fontSize: 26,
    fontWeight: "800",
    color: "#c58922",
    textAlign: "center",
    marginBottom: 6,
  },

  subHeading: {
    fontSize: 14,
    color: "#9CA3AF",
    textAlign: "center",
    marginBottom: 32,
  },

  input: {
    backgroundColor: "#1F2937",
    color: "#FFFFFF",
    paddingVertical: 16,
    paddingHorizontal: 18,
    borderRadius: 14,
    fontSize: 16,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#334155",
  },

  demoText: {
    color: "#9CA3AF",
    fontSize: 13,
    textAlign: "center",
    marginTop: 18,
  },
});
