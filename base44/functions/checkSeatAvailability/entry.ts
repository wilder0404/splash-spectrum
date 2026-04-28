import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { date, time, activityName, requestedSeats } = await req.json();

    if (!date || !time || !activityName || !requestedSeats) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Get booking settings to find seat capacity
    const settingsList = await base44.asServiceRole.entities.BookingSettings.list();
    const settings = settingsList[0];

    if (!settings) {
      return Response.json({ error: 'Booking settings not configured' }, { status: 500 });
    }

    // Find activity in experience types
    let seatsPerHour = 20;
    for (const type of (settings.experienceTypes || [])) {
      const activity = (type.activities || []).find(a => a.name_en === activityName || a.name_ar === activityName);
      if (activity) {
        seatsPerHour = activity.seatsPerHour || 20;
        break;
      }
    }

    // Get all confirmed bookings for this date and time
    const bookings = await base44.asServiceRole.entities.Booking.list('', 1000);
    const bookedSeatsForSlot = bookings
      .filter(b => b.date === date && b.time === time && b.activityName === activityName && b.status !== 'cancelled')
      .reduce((sum, b) => sum + parseInt(b.people), 0);

    const availableSeats = seatsPerHour - bookedSeatsForSlot;
    const isAvailable = availableSeats >= requestedSeats;

    return Response.json({
      available: isAvailable,
      availableSeats,
      requestedSeats,
      bookedSeats: bookedSeatsForSlot,
      totalCapacity: seatsPerHour
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});