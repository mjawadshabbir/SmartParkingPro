import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "../screens/HomeScreen";
import ParkingListScreen from "../screens/ParkingListScreen";
import MyBookingsScreen from "../screens/MyBookingsScreen";
import NotificationsScreen from "../screens/NotificationsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import HelpScreen from "../screens/HelpScreen";

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#0B1220",
          borderTopColor: "#1F2937",
        },
        tabBarActiveTintColor: "#22C55E",
        tabBarInactiveTintColor: "#9CA3AF",

        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } 
          else if (route.name === "Parking") {
            iconName = focused ? "car" : "car-outline";
          } 
          else if (route.name === "Bookings") {
            iconName = focused ? "calendar" : "calendar-outline";
          } 
          else if (route.name === "Notifications") {
            iconName = focused ? "notifications" : "notifications-outline";
          } 
          else if (route.name === "Help") {
            iconName = focused ? "help-circle" : "help-circle-outline";
          } 
          else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          }

          return <Ionicons name={iconName} size={22} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Parking" component={ParkingListScreen} />
      <Tab.Screen name="Bookings" component={MyBookingsScreen} />
      <Tab.Screen name="Notifications" component={NotificationsScreen} />
      <Tab.Screen name="Help" component={HelpScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
