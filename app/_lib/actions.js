"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth, signIn, signOut } from "./auth";
import { getBooking, getBookings, getSettings } from "./data-service";
import { supabase } from "./supabase";

export async function createReservation(bookingData, formData) {
  const session = await auth();

  if (!session) throw new Error("User should be logged in to add reservation");

  const numGuests = Number(formData.get("numGuests"));
  const observations = formData.get("observations").slice(0, 1000);

  const newBooking = {
    ...bookingData,
    extrasPrice: 0,
    guestId: session.user.guestId,
    status: "unconfirmed",
    totalPrice: bookingData.cabinPrice,
    hasBreakfast: false,
    isPaid: false,
    numGuests,
    observations,
  };

  if (!newBooking.startDate || !newBooking.endDate)
    throw new Error("Please select reservation dates!");

  const { data, error } = await supabase.from("bookings").insert([newBooking]);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be created");
  }

  revalidatePath(`/cabins/${bookingData.cabinId}`);
  revalidatePath("/account/reservations");
  redirect("/cabins/thankyou");
}

export async function updateReservation(bookingData, formData, reservationId) {
  const session = await auth();

  if (!session)
    throw new Error("User should be logged in to update reservation");

  const booking = await getBooking(reservationId);
  const { guestId, hasBreakfast } = booking || {};
  const isValidBooking = guestId === session.user.guestId;

  if (!isValidBooking)
    throw new Error("You are not allowed to edit this reservation");

  const settings = await getSettings();
  const { breakfastPrice } = settings || {};
  const numGuests = Number(formData.get("numGuests"));
  const extrasPrice = hasBreakfast
    ? breakfastPrice * numGuests * bookingData.numNights
    : 0;
  const totalPrice = bookingData.cabinPrice + extrasPrice;

  const updatedReservationInfo = {
    ...bookingData,
    numGuests,
    observations: formData.get("observations").slice(0, 1000),
    extrasPrice,
    totalPrice,
  };

  if (!updatedReservationInfo.startDate || !updatedReservationInfo.endDate)
    throw new Error("Please select reservation dates!");

  const { data, error } = await supabase
    .from("bookings")
    .update(updatedReservationInfo)
    .eq("id", reservationId);

  if (error) {
    throw new Error("Reservation could not be updated");
  }

  revalidatePath("/account/reservations");
  revalidatePath(`/account/reservations/edit/${reservationId}`);
  redirect("/account/reservations");
}

export async function updateProfile(formData) {
  const nationalIDRegex = /^[a-zA-Z0-9]{6,12}$/;
  const session = await auth();

  if (!session)
    throw new Error("User should be logged in to update their profile");

  const [nationality, countryFlag] = formData.get("nationality").split("%");
  const nationalID = formData.get("nationalID");

  if (!nationalIDRegex.test(nationalID))
    throw new Error("Please provide a valid national ID!");

  const updatedGuestInfo = {
    nationality,
    countryFlag,
    nationalID,
  };

  // supabase call
  const { data, error } = await supabase
    .from("guests")
    .update(updatedGuestInfo)
    .eq("id", session.user.guestId);

  if (error) {
    throw new Error("Guest could not be updated");
  }

  revalidatePath("/account/profile");
}

export async function deleteReservation(bookingId) {
  // await new Promise((res) => setTimeout(res, 4000));

  const session = await auth();

  if (!session)
    throw new Error("User should be logged in to delete their booking");

  const guestBookings = await getBookings(session.user.guestId);
  const isValidBooking = guestBookings.some(
    (guestBooking) => guestBooking.id === bookingId
  );

  if (!isValidBooking)
    throw new Error("You are not allowed to delete this booking");

  const { data, error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }

  revalidatePath("/account/reservations");
}

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
