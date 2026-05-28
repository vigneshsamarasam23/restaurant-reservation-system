import { useState } from "react";
import tablesData from "../data/tablesData";
import TableCard from "../components/TableCard";
import { useReservations } from "../context/ReservationContext";
import { useAuth } from "../context/AuthContext";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";

function Reservations() {
  const { user } = useAuth();
  const { reservations, addReservation, cancelReservation } = useReservations();
  const [selectedTable, setSelectedTable] = useState(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleReserve = () => {
    if (!selectedTable || !date || !time) {
      alert("Please fill all fields");
      return;
    }

    const result = addReservation({
      tableId: selectedTable.id,
      tableNumber: selectedTable.tableNumber,
      seats: selectedTable.seats,
      date,
      time,
      userEmail: user.email,
    });

    if (!result.success) {
      alert(result.message);
      return;
    }

    alert("Reservation successful");
    setSelectedTable(null);
    setDate("");
    setTime("");
  };

  const userReservations = reservations.filter(
    (reservation) => reservation.userEmail === user.email,
  );

  return (
    <div className="px-6 py-10 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <header className="mb-10 space-y-4 rounded-[36px] border border-slate-200/70 bg-white/90 p-8 shadow-[0_25px_50px_rgba(15,23,42,0.08)]">
          <p className="inline-flex rounded-full bg-sky-100 px-4 py-2 text-sm font-semibold text-sky-700">
            Reserve with ease
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-slate-950">
            Book your table
          </h1>
          <p className="max-w-3xl text-base leading-7 text-slate-600">
            Choose an available table, set your date and time, and manage your
            upcoming reservations from a tidy dashboard.
          </p>
        </header>

        <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr]">
          <section className="space-y-6">
            <Card>
              <div className="space-y-5">
                <div>
                  <h2 className="text-2xl font-semibold text-slate-950">
                    Available Tables
                  </h2>
                  <p className="mt-2 text-sm text-slate-600">
                    Pick a table that fits your group size, then complete the
                    booking details.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {tablesData.map((table) => (
                    <TableCard
                      key={table.id}
                      table={table}
                      onReserve={setSelectedTable}
                    />
                  ))}
                </div>
              </div>
            </Card>

            <Card>
              <div className="space-y-5">
                <div>
                  <h2 className="text-2xl font-semibold text-slate-950">
                    Your Reservations
                  </h2>
                  <p className="mt-2 text-sm text-slate-600">
                    Review or cancel upcoming reservations booked with your
                    account.
                  </p>
                </div>

                {userReservations.length === 0 ? (
                  <div className="rounded-3xl border border-slate-200/80 bg-slate-50 p-6 text-slate-600">
                    No reservations yet. Reserve a table to see it here.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {userReservations.map((reservation) => (
                      <div
                        key={reservation.id}
                        className="rounded-3xl border border-slate-200/80 bg-slate-50 p-5"
                      >
                        <div className="flex items-center justify-between gap-4">
                          <div>
                            <h3 className="text-lg font-semibold text-slate-900">
                              Table {reservation.tableNumber}
                            </h3>
                            <p className="text-sm text-slate-600">
                              Seats: {reservation.seats}
                            </p>
                          </div>
                          <Button
                            onClick={() => cancelReservation(reservation.id)}
                            className="rounded-full px-4 py-2 text-sm"
                          >
                            Cancel
                          </Button>
                        </div>
                        <div className="mt-4 grid gap-2 sm:grid-cols-2">
                          <p className="text-sm text-slate-600">
                            <span className="font-semibold text-slate-900">
                              Date:
                            </span>{" "}
                            {reservation.date}
                          </p>
                          <p className="text-sm text-slate-600">
                            <span className="font-semibold text-slate-900">
                              Time:
                            </span>{" "}
                            {reservation.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Card>
          </section>

          <aside className="space-y-6">
            <Card>
              <div className="space-y-6">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-600">
                    Reservation details
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold text-slate-950">
                    Complete your booking
                  </h2>
                </div>

                <div className="rounded-3xl border border-slate-200/80 bg-slate-50 p-6">
                  {selectedTable ? (
                    <div className="space-y-3">
                      <p className="text-sm text-slate-600">
                        Selected table:{" "}
                        <span className="font-semibold text-slate-900">
                          {selectedTable.tableNumber}
                        </span>
                      </p>
                      <p className="text-sm text-slate-600">
                        Seats:{" "}
                        <span className="font-semibold text-slate-900">
                          {selectedTable.seats}
                        </span>
                      </p>
                    </div>
                  ) : (
                    <p className="text-sm text-slate-600">
                      Select a table from the available options to begin.
                    </p>
                  )}
                </div>

                <div className="grid gap-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Date
                    </label>
                    <Input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Time
                    </label>
                    <Input
                      type="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                    />
                  </div>
                  <Button onClick={handleReserve} className="w-full">
                    Confirm Reservation
                  </Button>
                </div>
              </div>
            </Card>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default Reservations;
