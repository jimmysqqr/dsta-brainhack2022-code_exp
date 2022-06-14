import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import EventScreen from "./EventScreen";
import EventDetailScreen from "./EventDetailScreen";
import AddEventScreen from "./AddEventScreen";

//create another stack navigator for the modal screen (another screen that stacks ontop of the current screen)
const InnerStack = createStackNavigator();

export default function EventStack() {
  return (
    <InnerStack.Navigator>
      <InnerStack.Screen
        name="EventsHome"
        component={EventScreen}
        options={{
          headerTitle: "Events",
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 30,
          },
          headerStyle: {
            backgroundColor: "#fff",
            borderBottomColor: "#ccc",
            borderBottomWidth: 1,
          },
          headerTitleAlign: "center",
        }}
      />
      <InnerStack.Screen
        name="Event Details"
        component={EventDetailScreen}
        options={{ headerShown: true, headerTitleAlign: "center" }}
      />
      <InnerStack.Screen
        name="Add Event"
        component={AddEventScreen}
        options={{ headerTitleAlign: "center" }}
      />
    </InnerStack.Navigator>
  );
}

/**export default function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AnnouncementHome"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Announcement Details"
        component={AnnouncementScreen}
        options={{ headerShown: true }}
      />
    </Stack.Navigator>
  );
} */
