import { getBookedDatesByCabinId, getCabin } from "@/app/_lib/data-service";

// FUNCTION name should be http verbs: GET, POST, PATCH, DELETE, PUT

export async function GET(req, arg) {
  const { cabinId } = arg.params;

  try {
    const [cabin, bookedDates] = await Promise.all([
      getCabin(cabinId),
      getBookedDatesByCabinId(cabinId),
    ]);

    return Response.json({ cabin, bookedDates });
  } catch {
    return Response.json({ message: "Cabin not found" });
  }
}
