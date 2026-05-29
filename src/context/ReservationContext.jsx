import { createContext, useContext, useState, useEffect } from "react";
import {
  fetchReservations,
  createReservation as createReservationAPI,
  cancelReservation as cancelReservationAPI,
} from "../services/api";
import { useAuth } from "./AuthContext";

const ReservationContext = createContext();

export function ReservationProvider({ children }) {
  const { user } = useAuth();
  const [reservations, setReservations] = useState([]);

  // Fetch reservations when user changes
  useEffect(() => {
    if (user && user.email) {
      fetchUserReservations();
    } else {
      setReservations([]);
    }
  }, [user]);

  const fetchUserReservations = async () => {
    try {
      const data = await fetchReservations(user.email);
      setReservations(data);
    } catch (error) {
      console.error("Error fetching reservations:", error);
    }
  };

  const addReservation = async (reservation) => {
    try {
      const response = await createReservationAPI(reservation);
      if (response.success) {
        setReservations((prev) => [...prev, response.reservation]);
        return { success: true };
      } else {
        return {
          success: false,
          message: response.message || "Reservation failed",
        };
      }
    } catch (error) {
      console.error("Error creating reservation:", error);
      return {
        success: false,
        message: error.message || "Reservation failed",
      };
    }
  };

  const cancelReservation = async (id) => {
    try {
      await cancelReservationAPI(id);
      setReservations((prev) =>
        prev.filter((reservation) => reservation.id !== id),
      );
    } catch (error) {
      console.error("Error canceling reservation:", error);
    }
  };

  return (
    <ReservationContext.Provider
      value={{
        reservations,
        addReservation,
        cancelReservation,
      }}
    >
      {children}
    </ReservationContext.Provider>
  );
}

export function useReservations() {
  return useContext(ReservationContext);
}
