import { createContext, useContext, useState, useEffect } from "react";

const ReservationContext = createContext();

export function ReservationProvider({ children }) {
  const [reservations, setReservations] = useState(() => {
    const savedReservations = localStorage.getItem("reservations");

    return savedReservations ? JSON.parse(savedReservations) : [];
  });

  useEffect(() => {
    localStorage.setItem("reservations", JSON.stringify(reservations));
  }, [reservations]);

  const addReservation = (reservation) => {
    const alreadyBooked = reservations.find(
      (item) =>
        item.tableId === reservation.tableId &&
        item.date === reservation.date &&
        item.time === reservation.time,
    );

    if (alreadyBooked) {
      return {
        success: false,
        message: "Table already booked for this time.",
      };
    }

    setReservations((prev) => [
      ...prev,
      {
        ...reservation,
        id: Date.now(),
      },
    ]);

    return {
      success: true,
    };
  };

  const cancelReservation = (id) => {
    setReservations((prev) =>
      prev.filter((reservation) => reservation.id !== id),
    );
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
