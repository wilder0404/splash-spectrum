import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

// Capacity per hour per activity slug
const CAPACITY = {
  splash: 20,
  pouring: 14,
};

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const payload = await req.json();
    const { experienceSlug, experienceName, subExperience, date, time, people, name, email, phone, userId, status } = payload;

    if (!experienceSlug || !date || !time || !people) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const slug = experienceSlug.toLowerCase();
    const requestedPeople = parseInt(people) || 0;
    const maxCapacity = CAPACITY[slug];

    // If this experience has a capacity constraint, validate atomically
    if (maxCapacity !== undefined) {
      // Fetch fresh bookings (real-time check — no cache)
      const allBookings = await base44.asServiceRole.entities.Booking.list('', 500);
      const relevant = allBookings.filter(b =>
        b.date === date &&
        b.time === time &&
        b.experienceSlug?.toLowerCase() === slug &&
        b.status !== 'cancelled'
      );

      const bookedCount = relevant.reduce((sum, b) => sum + (parseInt(b.people) || 0), 0);
      const remaining = maxCapacity - bookedCount;

      if (requestedPeople > remaining) {
        return Response.json({
          error: 'not_enough_seats',
          remaining,
          requested: requestedPeople,
          message: remaining <= 0
            ? `This slot is fully booked. Please choose a different time.`
            : `Only ${remaining} seat${remaining === 1 ? '' : 's'} left for this slot. You requested ${requestedPeople}.`,
        }, { status: 409 });
      }
    }

    // All good — create the booking
    const booking = await base44.asServiceRole.entities.Booking.create({
      experienceSlug,
      experienceName,
      subExperience,
      date,
      time,
      people,
      name,
      email,
      phone,
      userId: userId || '',
      status: status || 'confirmed',
    });

    return Response.json({ success: true, booking });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});