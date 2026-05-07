import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { auth, db } from "../firebase/firebase";

export default function SignupScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      await setDoc(doc(db, "users", res.user.uid), {
        name,
        email,
        createdAt: serverTimestamp(),
      });

      Alert.alert("Account Created 🎉", "Welcome to Smart Parking Pro", [
        { text: "Continue", onPress: () => navigation.replace("Main") },
      ]);
    } catch (e) {
      Alert.alert("Signup Error", e.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>

      <TextInput style={styles.input} placeholder="Full Name" onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Email" onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry onChangeText={setPassword} />

      <TouchableOpacity style={styles.btn} onPress={handleSignup}>
        <Text style={styles.btnText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#1E293B",
    color: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 15,
  },
  btn: {
    backgroundColor: "#2232c5",
    padding: 15,
    borderRadius: 12,
    marginTop: 10,
  },
  btnText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  link: {
    color: "#60A5FA",
    textAlign: "center",
    marginTop: 20,
  },
});
