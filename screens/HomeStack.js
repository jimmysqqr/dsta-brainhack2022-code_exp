import React from "react";
import HomeScreen from "./HomeScreen";
import AnnouncementScreen from "./AnnouncementScreen";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AnnouncementHome"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Announcement Details"
        component={AnnouncementScreen}
        options={{ headerShown: true }}
      />
    </Stack.Navigator>
  );
}