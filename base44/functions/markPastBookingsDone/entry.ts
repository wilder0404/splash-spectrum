import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

// Parse a time string like "6:00 PM" or "10:00 PM" into hours (24h)
function parseTimeToHours(timeStr) {
  if (!timeStr) return null;
  const match = timeStr.match(/(\d+):(\d+)\s*(AM|PM)/i);
  if (!match) return null;
  let hours = parseInt(match[1]);
  const minutes = parseInt(match[2]);
  const period = match[3].toUpperCase();
  if (period === 'PM' && hours !== 12) hours += 12;
  if (period === 'AM' && hours === 12) hours = 0;
  return hours + minutes / 60;
}

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);

    // Current time in Riyadh (UTC+3)
    const nowUTC = new Date();
    const nowRiyadh = new Date(nowUTC.getTime() + 3 * 60 * 60 * 1000);

    const todayStr = nowRiyadh.toISOString().slice(0, 10); // YYYY-MM-DD
    const currentHours = nowRiyadh.getUTCHours() + nowRiyadh.getUTCMinutes() / 60;

    const bookings = await base44.asServiceRole.entities.Booking.list('-created_date', 1000);

    let updatedCount = 0;

    for (const booking of bookings) {
      if (booking.status !== 'confirmed') continue;

      const bookingDate = booking.date; // YYYY-MM-DD string

      if (bookingDate < todayStr) {
        // Past date — mark done
        await base44.asServiceRole.entities.Booking.update(booking.id, { status: 'done' });
        updatedCount++;
      } else if (bookingDate === todayStr) {
        // Same day — check if the time slot has passed
        const bookingHour = parseTimeToHours(booking.time);
        if (bookingHour !== null && currentHours >= bookingHour + 1) {
          // Session started at least 1 hour ago
          await base44.asServiceRole.entities.Booking.update(booking.id, { status: 'done' });
          updatedCount++;
        }
      }
    }

    return Response.json({
      success: true,
      message: `Marked ${updatedCount} past bookings as done`,
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});