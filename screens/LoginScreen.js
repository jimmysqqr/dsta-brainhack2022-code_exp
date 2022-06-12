import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  TextInput,
} from "react-native";

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text
        style={{
          fontSize: 50,
          marginBottom: 80,
          fontFamily: "'Georgia', serif",
        }}
      >
        announcemeNS
      </Text>
      <Text style={styles.label}>LOGIN</Text>

      <Text style={{ fontSize: 18, fontWeight: "bold" }}>Username:</Text>
      <TextInput
        placeholder="Enter username"
        style={styles.textInput}
        value={username}
        onChangeText={(newText) => {
          setUsername(newText);
        }}
      />

      <Text style={{ fontSize: 18, fontWeight: "bold" }}>Password:</Text>
      <TextInput
        placeholder="Enter password"
        style={styles.textInput}
        value={password}
        onChangeText={(newText) => {
          setPassword(newText);
        }}
      />
      <View style={styles.buttons}>
        <TouchableOpacity
          style={[styles.button, styles.submitButton]}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  label: {
    fontSize: 28,
    fontFamily: "'Georgia', serif",
    marginBottom: 70,
  },
  textInput: {
    margin: 20,
    borderWidth: 1,
    width: "80%",
    padding: 10,
    borderColor: "#ccc",
    fontSize: 20,
    borderRadius: 10,
  },
  button: {
    padding: 10,
    margin: 5,
    marginTop: 25,
  },
  buttonText: {
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  submitButton: {
    backgroundColor: "#0D532F",
    borderRadius: 15,
    width: 130,
  },
});
