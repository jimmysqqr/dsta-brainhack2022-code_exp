import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const ANNOUNCEMENTS = [
	{
		title: "Announcement Title 1",
		dateTime: "Thursday, 14 Jul 2022\n12pm",
		info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
		packingList: "Sports attire, insect repellent",
	},
	{
		title: "Announcement Title 2",
		dateTime: "Thursday, 5 Jul 2022\n3pm",
		info: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
		packingList: "Headdress, uniform, combat boots",
	},
];

const InfoBlock = ({ subject, text }) => (
	<View style={styles.containerInfoBlock}>
		<View style={styles.containerSubject}>
			<Text style={styles.subject}>{subject}</Text>
		</View>
		<View style={styles.containerText}>
			<Text style={styles.text}>{text}</Text>
		</View>
	</View>
);

export default function AnnouncementScreen({ route }) {
	const id = route.params.index;
	return (
		<View>
			<View style={styles.containerHeader}>
				<Text style={styles.header}>Announcement Details {id + 1}</Text>
			</View>
			<View style={styles.containerBody}>
				<View style={{ marginVertical: 10 }}>
					<Text style={styles.title}>{ANNOUNCEMENTS[id].title}</Text>
				</View>
				<View style={{ marginVertical: 10 }}>
					<Text style={styles.text}>
						{ANNOUNCEMENTS[id].dateTime}
					</Text>
				</View>
				<InfoBlock
					subject="Details"
					text={ANNOUNCEMENTS[id].info}
				></InfoBlock>
				<InfoBlock
					subject="Packing List"
					text={ANNOUNCEMENTS[id].packingList}
				></InfoBlock>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	containerHeader: {
		alignItems: "center",
		marginTop: 60,
	},
	containerBody: {
		marginTop: 30,
		backgroundColor: "#rgba(64, 121, 140, 0.15)",
		paddingHorizontal: 20,
		paddingTop: 10,
		paddingBottom: 30,
	},
	containerInfoBlock: {
		marginTop: 15,
		paddingBottom: 10,
		borderBottomColor: "grey",
		borderBottomWidth: 1,
	},
	header: {
		fontSize: 16,
		fontWeight: "bold",
	},
	title: {
		fontSize: 18,
		fontWeight: "bold",
	},
	subject: {
		fontSize: 17,
		fontWeight: "bold",
	},
	text: {
		fontSize: 15,
		color: "grey",
	},
});
