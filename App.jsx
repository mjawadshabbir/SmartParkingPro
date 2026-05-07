import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { BookingProvider } from "./src/context/BookingContext";
import AuthStack from "./src/navigation/AuthStack";

export default function App() {
  return (
    <BookingProvider>
      <NavigationContainer>
        <AuthStack />
      </NavigationContainer>
    </BookingProvider>
  );
}
