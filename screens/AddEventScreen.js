import React, { useEffect, useState, useRef } from "react";
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	ScrollView,
	SafeAreaView,
	TextInput,
} from "react-native";

export default function AddScreen({ navigation }) {
	//create a state variable to keep track of the text input
	const [title, setTitle] = useState("");
	const [location, setLocation] = useState("");
	const [date, setDate] = useState("");
	const [startTime, setStartTime] = useState("");
	const [endTime, setEndTime] = useState("");
	const [bring, setBring] = useState("");
	const [attire, setAttire] = useState("");
	const [notes, setNotes] = useState("");

	const [events, setEvents] = useState([]);

	// { title: "Math Test", startingTime: "10:00" }

	function addEvent() {
		console.log("\nOld events array:\n", events);
		setEvents([
			...events,
			{
				title: title,
        date: date,
				startTime: startTime,
				endingTime: endTime,
				location: location,
				bring: bring,
				attire: attire,
				notes: notes,
			},
		]);
	}

	// https://www.codegrepper.com/code-examples/javascript/callback+after+setstate+hook

	// this flag is used to check if this screen is being rendered for the first time
	const isFirstRender = useRef(true);

	// this is executed whenever "events" is updated, but we need to prevent it from also executing when the screen is first rendered
	// this is done by checking the value of the flag "isFirstRender"
	// true -> do not execute the code
	// false -> return & pass the updated "events" to previous screen
	useEffect(() => {
		if (!isFirstRender.current) {
			console.log("\n'events' state was updated");
			console.log("\nUpdated events array:\n", events);
			navigation.navigate("EventsHome", events); // events is JS Array
		}
	}, [events]);

	// after the screen is rendered for the first time, we set isFirstRender flag to false
	useEffect(() => {
		console.log("\nScreen rendered");
		isFirstRender.current = false; // toggle flag after first render/mounting
	}, []);

	return (
		<SafeAreaView style={styles.containerBody}>
			<ScrollView>
				<View>
					<Text style={styles.label}> Title: </Text>
					<TextInput
						style={styles.textInput}
						value={title}
						onChangeText={(newText) => setTitle(newText)}
					/>
				</View>
				<View>
					<Text style={styles.label}> Location: </Text>
					<TextInput
						style={styles.textInput}
						value={location}
						onChangeText={(newText) => setLocation(newText)}
					/>
				</View>
				<View>
					<Text style={styles.label}> Date: </Text>
					<TextInput
						style={styles.textInput}
						value={date}
						onChangeText={(newText) => setDate(newText)}
					/>
				</View>
				<View>
					<Text style={styles.label}> Start Time: </Text>
					<TextInput
						style={styles.textInput}
						value={startTime}
						onChangeText={(newText) => setStartTime(newText)}
					/>
				</View>
				<View>
					<Text style={styles.label}> End Time: </Text>
					<TextInput
						style={styles.textInput}
						value={endTime}
						onChangeText={(newText) => setEndTime(newText)}
					/>
				</View>
				<View>
					<Text style={styles.label}> To Bring: </Text>
					<TextInput
						style={styles.textInput}
						value={bring}
						onChangeText={(newText) => setBring(newText)}
					/>
				</View>
				<View>
					<Text style={styles.label}> Attire: </Text>
					<TextInput
						style={styles.textInput}
						value={attire}
						onChangeText={(newText) => setAttire(newText)}
					/>
				</View>
				<View>
					<Text style={styles.label}> Notes: </Text>
					<TextInput
						style={styles.textInput}
						value={notes}
						onChangeText={(newText) => setNotes(newText)}
					/>
				</View>
				<TouchableOpacity onPress={addEvent}>
					<Text style={styles.addButton}> Add Event </Text>
				</TouchableOpacity>
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	screenTitle: {
		textAlign: "center",
		marginTop: 20,
		marginBottom: 20,
		fontWeight: "bold",
	},
	containerBody: {
		backgroundColor: "#E3EBEE",
	},
	textInput: {
		marginLeft: 30,
		borderWidth: 1,
		width: "83%",
		padding: 10,
		borderColor: "#ccc",
		height: 35,
	},
	label: {
		marginTop: 30,
		marginLeft: 30,
	},
	addButton: {
		backgroundColor: "#0D532F",
		color: "white",
		textAlign: "center",
		padding: 10,
		marginLeft: 130,
		marginRight: 130,
		marginTop: 30,
		borderRadius: 15,
		marginBottom: 30,
	},
});

// 	return (
// 		<View
// 			style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
// 		>
// 			<Text style={styles.label}>Add your event</Text>
// 			{/* value in this case is a controlled component because u cant change its value once its assigned to {text} if we don't do ath with onChangeText. Removing value={text} will make this an uncontrolled variable */}
// 			{/* controlled manner */}
// 			<TextInput
// 				placeholder="Title"
// 				style={styles.textInput}
// 				value={text}
// 				onChangeText={(newText) => {
// 					setText(newText);
// 				}}
// 			/>
// 			<TextInput
// 				placeholder="Start Time"
// 				style={styles.textInput}
// 				value={startTime}
// 				onChangeText={(newText) => {
// 					setStartTime(newText);
// 				}}
// 			/>
// 			{/* onChangeText allow u to update the text input */}
// 			{/* navigation.goback dismiss the popup */}
// 			<View style={styles.buttons}>
// 				<TouchableOpacity
// 					style={[styles.button, styles.submitButton]}
// 					onPress={addEvent}
// 				>
// 					<Text style={styles.buttonText}>Add</Text>
// 				</TouchableOpacity>
// 				<TouchableOpacity
// 					style={[styles.button, styles.cancelButton]}
// 					onPress={() => navigation.goBack()}
// 				>
// 					<Text style={styles.buttonText}>Cancel</Text>
// 				</TouchableOpacity>
// 			</View>

// 			{/* <Text style={{ marginTop: 40, color: "grey" }}>
//         This is what you typed:
//       </Text>
//       <Text style={{ color: "#333", marginTop: 10 }}>{text}</Text> */}
// 		</View>
// 	);
// }
// const styles = StyleSheet.create({
// 	label: {
// 		fontWeight: "bold",
// 		fontSize: 24,
// 	},
// 	textInput: {
// 		margin: 20,
// 		borderWidth: 1,
// 		width: "80%",
// 		padding: 10,
// 		borderColor: "#ccc",
// 	},
// 	buttons: {
// 		flexDirection: "row",
// 	},
// 	button: {
// 		padding: 10,
// 		margin: 5,
// 	},
// 	buttonText: {
// 		fontWeight: "bold",
// 		color: "white",
// 	},
// 	submitButton: {
// 		backgroundColor: "orange",
// 	},
// 	cancelButton: {
// 		backgroundColor: "red",
// 	},
// });
