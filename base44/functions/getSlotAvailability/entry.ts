import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

// Capacity per hour based on subExperience name (case-insensitive keyword match)
function getCapacityForSubExperience(subExperience) {
  if (!subExperience) return null;
  const s = subExperience.toLowerCase();
  if (s.includes('pour')) return 14;
  if (s.includes('splash')) return 20; // covers "Splash", "Group Splash (Big Canvas)"
  return null;
}

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { experienceSlug, date, subExperience } = await req.json();

    if (!date) {
      return Response.json({ error: 'Missing date' }, { status: 400 });
    }

    const maxCapacity = getCapacityForSubExperience(subExperience);

    if (maxCapacity === null) {
      // No capacity constraint for this sub-experience
      return Response.json({ bookedPerSlot: {}, maxCapacity: null });
    }

    // Fetch all non-cancelled bookings for this date
    const allBookings = await base44.asServiceRole.entities.Booking.list('', 500);
    const relevant = allBookings.filter(b => {
      if (b.date !== date || b.status === 'cancelled') return false;
      // Match by subExperience keyword
      const cap = getCapacityForSubExperience(b.subExperience);
      return cap === maxCapacity;
    });

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