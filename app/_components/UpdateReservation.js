"use client";
import { useState } from "react";
import EditDateSelector from "./EditDateSelector";
import UpdateReservationForm from "./UpdateReservationForm";
import { parseISO } from "date-fns";

function UpdateReservation({ bookedCabin, bookedDates, settings, booking }) {
  const [range, setRange] = useState({
    from: new Date(parseISO(booking.startDate)),
    to: new Date(parseISO(booking.endDate)),
  });

  return (
    <div className="grid grid-cols-2">
      <EditDateSelector
        cabin={bookedCabin}
        bookedDates={bookedDates}
        settings={settings}
        range={range}
        setRange={setRange}
      />

      <UpdateReservationForm
        range={range}
        cabin={bookedCabin}
        booking={booking}
      />
    </div>
  );
}

export default UpdateReservation;
