import React, { useState, useRef, useEffect } from "react";
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	TextInput,
} from "react-native";
import * as Font from "expo-font";
import LOGIN_CREDENTIALS from "./LOGIN_CREDENTIALS";

export default function LoginScreen({ navigation }) {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	let userGroup = -1;
	const [visible, setVisible] = useState(false); // to display error msg

	const LoginMsg = () => {
		if (userGroup === -1) {
			return (
				<View>
					<Text>Login failed. Please try again.</Text>
				</View>
			);
		} else {
			return (
				<View>
					<Text>Login success</Text>
				</View>
			);
		}
	};

	function authenticateUser() {
		setVisible(true);
		for (let i = 0; i < LOGIN_CREDENTIALS.length; i++) {
			if (
				username === LOGIN_CREDENTIALS[i].username &&
				password === LOGIN_CREDENTIALS[i].password
			) {
				setVisible(false);
				userGroup = LOGIN_CREDENTIALS[i].userGroup;
				navigation.navigate("AnnouncementHome", { userGroup });
			}
		}
	}

	return (
		<View
			style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
		>
			<Text
				style={{
					fontSize: 40,
					marginBottom: 80,
					//fontFamily: "'Georgia', serif",
				}}
			>
				announcemeNS
			</Text>
			<Text style={styles.label}>LOGIN</Text>

			{visible && <LoginMsg />}

			<Text
				style={{
					fontSize: 18,
					fontWeight: "bold",
				}}
			>
				Username:
			</Text>
			<TextInput
				placeholder="Enter username"
				style={styles.textInput}
				value={username}
				autoCapitalize="none"
				onChangeText={(newText) => {
					setUsername(newText);
				}}
			/>

			<Text
				style={{
					fontSize: 18,
					fontWeight: "bold",
				}}
			>
				Password:
			</Text>
			<TextInput
				placeholder="Enter password"
				style={styles.textInput}
				value={password}
				autoCapitalize="none"
				onChangeText={(newText) => {
					setPassword(newText);
				}}
				secureTextEntry={true}
			/>
			<View style={styles.button}>
				<TouchableOpacity
					style={[styles.button, styles.submitButton]}
					onPress={authenticateUser}
				>
					<Text style={styles.buttonText}>LOG IN</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}
const styles = StyleSheet.create({
	label: {
		fontSize: 28,
		//fontFamily: "'Georgia', serif",
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
		marginTop: 20,
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
