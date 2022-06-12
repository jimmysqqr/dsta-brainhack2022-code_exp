import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SectionList,
  SafeAreaView,
} from "react-native";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { FlatList } from "react-native-gesture-handler";
import AnnouncementScreen from "./AnnouncementScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

const EVENTS = [
  {
    title: "IPPT Test",
    date: "Thu, 14 July",
    time: "12pm to 1pm",
  },
  {
    title: "Event 2",
    date: "Fri, 15 July",
    time: "12pm to 1pm",
  },
  {
    title: "Event 3",
    date: "Mon, 18 July",
    time: "12pm to 3pm",
  },
];

const ANNOUNCEMENTS = [
  {
    title: "Announcement Title 1",
    info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    title: "Announcement Title 2",
    info: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
];

const EventsBlock = ({ title, date, time }) => (
  <View
    style={{
      backgroundColor: "rgba(158, 193, 163, 0.4)",
      padding: 30,
      marginLeft: 30,
      marginRight: 30,
      marginTop: 10,
      marginBottom: 10,
      flexDirection: "row",
      justifyContent: "space-between",
    }}
  >
    <View style={{ justifyContent: "center" }}>
      <Text style={{ fontSize: 20 }}>{title}</Text>
    </View>
    <View style={{ justifyContent: "center" }}>
      <Text style={{ fontSize: 15 }}>
        {date}
        {"\n"}
        {time}
      </Text>
    </View>
  </View>
);

const AnnouncementsBlock = ({ navigation, info, index, title }) => (
  <View
    style={{
      backgroundColor: "rgba(64, 121, 140, 0.15)",
      padding: 30,
      marginLeft: 30,
      marginRight: 30,
      marginTop: 10,
      marginBottom: 10,
      flexDirection: "row",
      justifyContent: "space-between",
    }}
  >
    <View>
      <Text style={{ fontSize: 20 }}>
        {title}
        {"\n"}
      </Text>
      <Text style={{ fontSize: 15 }} numberOfLines={2}>
        {info}
      </Text>
    </View>
    <View
      style={{
        position: "absolute",
        bottom: 5,
        right: 10,
        alignSelf: "flex-end",
      }}
    >
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("AnnouncementDetail", { index: index })
        }
      >
        <Text style={{ color: "#0D532F", fontWeight: "bold" }}>
          More details
        </Text>
      </TouchableOpacity>
    </View>
  </View>
);

function Home() {
  function renderEventItem({ item }) {
    return <EventsBlock title={item.title} date={item.date} time={item.time} />;
  }

  const navigation = useNavigation();

  function renderAnnouncementItem({ item, index }) {
    return (
      <AnnouncementsBlock
        navigation={navigation}
        info={item.info}
        title={item.title}
        index={index}
      />
    );
  }

  return (
    <SafeAreaView>
      <SectionList
        sections={[
          {
            title: "Upcoming Events",
            icon: (
              <FontAwesome
                name="bell"
                size={24}
                color="black"
                style={{ padding: 10 }}
              />
            ),
            data: EVENTS,
            renderItem: renderEventItem,
          },
          {
            title: "Announcements",
            icon: (
              <MaterialIcons
                name="announcement"
                size={32}
                color="black"
                style={{ padding: 10 }}
              />
            ),
            data: ANNOUNCEMENTS,
            renderItem: renderAnnouncementItem,
          },
        ]}
        style={styles.blockStyle}
        renderSectionHeader={({ section: { title, icon } }) => (
          <View style={styles.container}>
            {icon}
            <Text style={styles.textStyle}>{title}</Text>
          </View>
        )}
        stickySectionHeadersEnabled={false}
      />
    </SafeAreaView>
  );
}

const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AnnouncementHome"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AnnouncementDetail"
        component={AnnouncementScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  textStyle: {
    fontWeight: "bold",
    fontSize: 28,
  },
});
