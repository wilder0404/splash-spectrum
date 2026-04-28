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

    // Map activity names to their seat capacities per hour
    const activityCapacities = {
      'Splash': 20,
      'سبلاش': 20,
      'Spin': 4,
      'سبين': 4,
      'Pouring': 14,
      'صب': 14,
      'Group Splash (Big Canvas)': 14,
      'سبلاش لوحة كبيرة (جماعي)': 14
    };
    
    let seatsPerHour = activityCapacities[activityName] || 20;

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