"use client";

import { differenceInDays } from "date-fns";
import { createReservation } from "../_lib/actions";
import { useReservationContext } from "./ReservationContext";
import SubmitButton from "./SubmitButton";

function ReservationForm({ cabin, user }) {
  const { range, resetRange } = useReservationContext();
  const { maxCapacity, regularPrice, discount, id } = cabin || {};

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
    cabinId: id,
    // extrasPrice: 0,
    // guestId: user.guestId,
    // status: "unconfirmed",
    // totalPrice: cabinPrice,
    // hasBreakfast: false,
    // isPaid: false,
    // numGuests, observations --> These will be taken from form directly
  };

  const createReservationWithData = createReservation.bind(null, bookingData);

  return (
    <div className="h-full flex flex-col">
      <div className="bg-primary-800 text-primary-300 px-16 py-2 flex justify-between items-center">
        <p>Logged in as</p>

        <div className="flex gap-4 items-center">
          <img
            src={user.image}
            alt={user.name}
            className="h-8 rounded-full"
            referrerPolicy="no-referrer"
          />
          <p>{user.name}</p>
        </div>
      </div>

      <form
        action={async (formData) => {
          await createReservationWithData(formData);
          resetRange();
        }}
        className="bg-primary-900 flex-1 px-16 pt-12 text-lg flex flex-col gap-5"
      >
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm"
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
            id="observations"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm"
            placeholder="Any pets, allergies, special requirements, etc.?"
          />
        </div>

        <div className="flex justify-end items-center gap-6">
          {!startDate || !endDate ? (
            <p className="text-primary-300 text-base">
              Start by selecting dates
            </p>
          ) : (
            <SubmitButton pendingText={"Reserving"}>Reserve now</SubmitButton>
          )}
        </div>
      </form>
    </div>
  );
}

export default ReservationForm;
