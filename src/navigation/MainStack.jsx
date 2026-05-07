import { createNativeStackNavigator } from "@react-navigation/native-stack";

import BottomTabs from "./BottomTabs";

import ParkingListScreen from "../screens/ParkingListScreen";
import SlotScreen from "../screens/SlotScreen";
import BookingDetailsScreen from "../screens/BookingDetailsScreen";
import PaymentScreen from "../screens/PaymentScreen";
import BookingSuccessScreen from "../screens/BookingSuccessScreen";
import MyBookingsScreen from "../screens/MyBookingsScreen";

import EditProfileScreen from "../screens/EditProfileScreen";
import SettingsScreen from "../screens/SettingsScreen";
import PrivacyScreen from "../screens/PrivacyScreen";
import HelpScreen from "../screens/HelpScreen";

const Stack = createNativeStackNavigator();

export default function MainStack() {
  return (
    <Stack.Navigator>

      {/* MAIN APP ENTRY */}
      <Stack.Screen
        name="Tabs"
        component={BottomTabs}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="ParkingList"
        component={ParkingListScreen}
        options={{ title: "Parking Areas" }}
      />

      <Stack.Screen
        name="SlotScreen"
        component={SlotScreen}
        options={{ title: "Parking Slots" }}
      />

      <Stack.Screen
        name="BookingDetails"
        component={BookingDetailsScreen}
        options={{ title: "Booking Details" }}
      />

      <Stack.Screen
        name="Payment"
        component={PaymentScreen}
        options={{ title: "Payment" }}
      />

      <Stack.Screen
        name="Success"
        component={BookingSuccessScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="MyBookings"
        component={MyBookingsScreen}
        options={{ title: "My Bookings" }}
      />

      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{ title: "Edit Profile" }}
      />

      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ title: "Settings" }}
      />

      <Stack.Screen
        name="Privacy"
        component={PrivacyScreen}
        options={{ title: "Privacy Policy" }}
      />

      <Stack.Screen
        name="Help"
        component={HelpScreen}
        options={{ title: "Help & Support" }}
      />

    </Stack.Navigator>
  );
}
