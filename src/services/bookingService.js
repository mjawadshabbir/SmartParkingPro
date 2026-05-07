import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { db } from "../firebase/firebase";

export const getUserBookings = async (userId) => {
  try {
    const q = query(
      collection(db, "bookings"),
      where("userId", "==", userId),
      orderBy("createdAt", "desc")
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (e) {
    console.log("Booking fetch error:", e);
    return [];
  }
};
