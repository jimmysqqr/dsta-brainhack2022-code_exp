import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import LoginScreen from "./screens/LoginScreen";
import HomeStack from "./screens/HomeScreen";
import CalendarScreen from "./screens/CalendarScreen";

// useful links
// icons.expo.fyi
// https://reactnavigation.org/docs/bottom-tab-navigator/
// https://reactnavigation.org/docs/nesting-navigators/

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            //Set the icon based on which route it is (name of the tab)
            if (route.name === "Home") {
              iconName = focused ? "ios-home" : "ios-home-outline";
            } else if (route.name === "Events") {
              iconName = focused ? "ios-calendar" : "ios-calendar-outline";
            } else if (route.name === "Login") {
              iconName = focused
                ? "person-circle-sharp"
                : "person-circle-outline";
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#0D532F",
          tabBarInactiveTintColor: "black",
          tabBarActiveBackgroundColor: "#9EC1A3",
          tabBarInactiveBackgroundColor: "#9EC1A3",
        })}
      >
        <Tab.Screen
          name="Home"
          options={{ headerShown: false }}
          component={HomeStack}
        />
        <Tab.Screen
          name="Events"
          options={{ headerShown: false }}
          component={CalendarScreen}
        />
        <Tab.Screen
          name="Login"
          options={{ headerShown: false }}
          component={LoginScreen}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
