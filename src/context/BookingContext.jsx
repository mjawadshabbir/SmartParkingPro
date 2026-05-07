import React, {
  createContext,
  useState,
  useMemo,
  useCallback,
  useEffect,
} from "react";
import { Alert } from "react-native";

export const BookingContext = createContext(null);

export function BookingProvider({ children }) {
  const [bookings, setBookings] = useState([]);

  const addBooking = useCallback((booking) => {
    setBookings((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        createdAt: Date.now(),
        status: "ACTIVE",
        endNotified: false,
        ...booking,
      },
    ]);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setBookings((prev) =>
        prev.map((b) => {
          if (
            b.status === "ACTIVE" &&
            b.endTime &&
            Date.now() >= b.endTime
          ) {
            if (!b.endNotified) {
              Alert.alert(
                "⏰ Parking Time Ended",
                `Your booking for slot ${b.slot} has ended.\nSlot is now free.`
              );
            }

            return {
              ...b,
              status: "COMPLETED",
              endNotified: true,
            };
          }
          return b;
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const clearBookings = useCallback(() => {
    setBookings([]);
  }, []);

  const activeBooking = useMemo(() => {
    return bookings.find((b) => b.status === "ACTIVE") || null;
  }, [bookings]);

  const stats = useMemo(() => {
    return {
      total: bookings.length,
      active: bookings.filter((b) => b.status === "ACTIVE").length,
    };
  }, [bookings]);

  const value = useMemo(
    () => ({
      bookings,
      addBooking,
      clearBookings,
      activeBooking,
      stats,
    }),
    [bookings, addBooking, clearBookings, activeBooking, stats]
  );

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
}
