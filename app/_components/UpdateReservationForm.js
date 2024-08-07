import { differenceInDays } from "date-fns";
import { updateReservation } from "../_lib/actions";
import SubmitButton from "./SubmitButton";

function UpdateReservationForm({ cabin, booking, range }) {
  const { maxCapacity, regularPrice, discount } = cabin || {};
  const { observations, numGuests, id } = booking || {};
  const { from: startDate, to: endDate } = range;
  const numNights = differenceInDays(endDate, startDate);
  const cabinPrice = numNights * (regularPrice - discount);

  let isoStart;
  if (startDate) {
    isoStart = new Date(startDate.valueOf());
    isoStart.setMinutes(isoStart.getMinutes() - isoStart.getTimezoneOffset());
    isoStart = isoStart.toISOString();
  }

  let isoEnd;
  if (endDate) {
    isoEnd = new Date(endDate.valueOf());
    isoEnd.setMinutes(isoEnd.getMinutes() - isoEnd.getTimezoneOffset());
    isoEnd = isoEnd.toISOString();
  }

  const bookingData = {
    startDate: isoStart,
    endDate: isoEnd,
    numNights,
    cabinPrice,
  };

  return (
    <form
      action={async (formData) => {
        await updateReservation(bookingData, formData, id);
      }}
      className="bg-primary-900 pt-12 px-8 text-lg flex gap-6 flex-col"
    >
      <div className="space-y-6">
        <label htmlFor="numGuests">How many guests?</label>
        <select
          name="numGuests"
          id="numGuests"
          defaultValue={numGuests}
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          required
        >
          <option value="" key="">
            Select number of guests...
          </option>
          {Array.from({ length: maxCapacity }, (_, i) => i + 1).map(
            (guestAmount) => (
              <option value={guestAmount} key={guestAmount}>
                {guestAmount} {guestAmount === 1 ? "guest" : "guests"}
              </option>
            )
          )}
        </select>
      </div>

      <div className="space-y-2">
        <label htmlFor="observations">
          Anything we should know about your stay?
        </label>
        <textarea
          name="observations"
          defaultValue={observations}
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
        />
      </div>

      <div className="flex justify-end items-center gap-6 mt-auto mb-4">
        <SubmitButton pendingText={"Updating"}>Update Reservation</SubmitButton>
      </div>
    </form>
  );
}

export default UpdateReservationForm;
