import UpdateReservation from "@/app/_components/UpdateReservation";
import {
  getBooking,
  getCabin,
  getOtherBookedDates,
  getSettings,
} from "@/app/_lib/data-service";

async function page({ params: { reservationId } }) {
  const booking = await getBooking(reservationId);
  const { cabinId } = booking || {};
  const [bookedCabin, bookedDates, settings] = await Promise.all([
    getCabin(cabinId),
    getOtherBookedDates(cabinId, reservationId),
    getSettings(),
  ]);

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Edit Reservation #{reservationId}
      </h2>

      <UpdateReservation
        bookedCabin={bookedCabin}
        bookedDates={bookedDates}
        settings={settings}
        booking={booking}
      />
    </div>
  );
}

export default page;
