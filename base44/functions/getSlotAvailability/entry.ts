import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

// Capacity per hour per activity slug
const CAPACITY = {
  splash: 20,
  spin: 4,
  pouring: 14,
};

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { experienceSlug, date } = await req.json();

    if (!experienceSlug || !date) {
      return Response.json({ error: 'Missing experienceSlug or date' }, { status: 400 });
    }

    const slug = experienceSlug.toLowerCase();
    const maxCapacity = CAPACITY[slug];

    if (maxCapacity === undefined) {
      // No capacity constraint for this experience — all slots open
      return Response.json({ availability: null, maxCapacity: null });
    }

    // Fetch all confirmed bookings for this experience + date
    const allBookings = await base44.asServiceRole.entities.Booking.list('', 500);
    const relevant = allBookings.filter(b =>
      b.date === date &&
      b.experienceSlug?.toLowerCase() === slug &&
      b.status !== 'cancelled'
    );

    // Sum people per time slot
    const bookedPerSlot = {};
    for (const b of relevant) {
      const people = parseInt(b.people) || 0;
      bookedPerSlot[b.time] = (bookedPerSlot[b.time] || 0) + people;
    }

    return Response.json({ bookedPerSlot, maxCapacity });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});