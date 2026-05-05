import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

// Returns the activity key and max capacity for a given booking's subExperience/slug
function getActivityKey(subExperience, experienceSlug) {
  const sub = (subExperience || '').toLowerCase();
  const slug = (experienceSlug || '').toLowerCase();

  // Specific activity checks on subExperience first (most precise)
  if (sub.includes('spin')) return { key: 'spin', capacity: 4 };
  if (sub.includes('phone case') || sub.includes('phone')) return { key: 'phone_case', capacity: 12 };
  if (sub.includes('pour') || sub.includes('figurine') || sub.includes('bear')) return { key: 'pour', capacity: 12 };
  if (sub.includes('group splash') || sub.includes('big canvas')) return { key: 'group_splash', capacity: 15 };
  if (sub.includes('splash')) return { key: 'splash', capacity: 30 };

  // Fall back to slug
  if (slug.includes('phone-case') || slug.includes('phone')) return { key: 'phone_case', capacity: 12 };
  if (slug.includes('spin')) return { key: 'spin', capacity: 4 };
  if (slug.includes('group-splash')) return { key: 'group_splash', capacity: 15 };
  if (slug.includes('figurine') || slug.includes('pour')) return { key: 'pour', capacity: 12 };
  if (slug.includes('splash') || slug.includes('open-paint')) return { key: 'splash', capacity: 30 };

  return { key: null, capacity: null };
}

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { experienceSlug, date, subExperience } = await req.json();

    if (!date) {
      return Response.json({ error: 'Missing date' }, { status: 400 });
    }

    const { key: activityKey, capacity: maxCapacity } = getActivityKey(subExperience, experienceSlug);

    if (activityKey === null) {
      // No capacity constraint for this activity
      return Response.json({ bookedPerSlot: {}, maxCapacity: null });
    }

    // Fetch all non-cancelled bookings for this date
    const allBookings = await base44.asServiceRole.entities.Booking.list('', 500);
    const relevant = allBookings.filter(b => {
      if (b.date !== date || b.status === 'cancelled') return false;
      const { key } = getActivityKey(b.subExperience, b.experienceSlug);
      return key === activityKey;
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