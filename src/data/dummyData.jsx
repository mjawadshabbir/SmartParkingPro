export const LoginScreen =[

  { id: "jawad.shabbir@gmail.com", username: "jawad", password: "pass1" },
  
];
const menuData = [
  { id: "1", title: "Login", screen: "Login" },
  { id: "2", title: "Signup", screen: "Signup" },
];

export const SignupScreen =[
  { id: "1", username: "newuser", email: "newuser@example.com" },
  { id: "2", username: "anotheruser", email: "anotheruser@example.com" }
];

export const parkingList = [
  { id: "1", name: "City Center Parking", slots: 6 },
  { id: "2", name: "Mall Parking", slots: 0 },
  { id: "3", name: "Airport Parking", slots: 12 },
    { id: "4", name: "University Parking", slots: 60 },

      { id: "5", name: "Cinema", slots: 12 },

        { id: "6", name: "Studio Park Parking", slots: 12 },
];

export const notifications = [
  { id: "1", text: "Booking confirmed 🎉" },
  { id: "2", text: "Slot expiring soon ⏰" },
  { id: "3", text: "New parking spot added 📍" },
  { id: "4", text: "Payment received 💳" },
  { id: "5", text: "Rate your last parking experience ⭐" },
  { id: "6", text: "Update available for the app ⬆️" },
];
const SlotScreen = [
  { id: "1", slot: "A1", status: "Available" },
  { id: "2", slot: "A2", status: "Occupied" },
  { id: "3", slot: "B1", status: "Available" },
  { id: "4", slot: "B2", status: "Occupied" },
];
const BookingDetails = [
  { id: "1", slot: "A1", duration: "2 hours", price: "$5" },
  { id: "2", slot: "B1", duration: "1 hour", price: "$3" },
];
export { menuData, SlotScreen, BookingDetails };
