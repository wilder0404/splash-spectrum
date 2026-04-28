import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { date, time, experienceName, requestedSeats } = await req.json();

    if (!date || !time || !experienceName || !requestedSeats) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Get booking settings to find seat capacity
    const settingsList = await base44.asServiceRole.entities.BookingSettings.list();
    const settings = settingsList[0];

    if (!settings) {
      return Response.json({ error: 'Booking settings not configured' }, { status: 500 });
    }

    const experience = settings.experienceOptions.find(e => e.name_en === experienceName || e.name_ar === experienceName);
    if (!experience) {
      return Response.json({ error: 'Experience not found' }, { status: 404 });
    }

    const seatsPerHour = experience.seatsPerHour || 20;

    // Get all confirmed bookings for this date and time
    const bookings = await base44.asServiceRole.entities.Booking.list('', 1000);
    const bookedSeatsForSlot = bookings
      .filter(b => b.date === date && b.time === time && b.experienceName === experienceName && b.status !== 'cancelled')
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