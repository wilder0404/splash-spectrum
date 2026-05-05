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

  // Fall back to slug BEFORE generic splash check
  if (slug.includes('phone-case') || slug.includes('phone')) return { key: 'phone_case', capacity: 12 };
  if (slug.includes('spin')) return { key: 'spin', capacity: 4 };
  if (slug.includes('group-splash')) return { key: 'group_splash', capacity: 15 };
  if (slug.includes('figurine') || slug.includes('pour') || slug.includes('custom-art')) return { key: 'pour', capacity: 12 };
  if (slug.includes('open-paint') || slug.includes('open_paint')) return { key: 'splash', capacity: 30 };

  // Generic splash check last (so group-splash slug is already handled above)
  if (sub.includes('splash')) return { key: 'splash', capacity: 30 };
  if (slug.includes('splash')) return { key: 'splash', capacity: 30 };

  return { key: null, capacity: null };
}

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const payload = await req.json();
    const { experienceSlug, experienceName, subExperience, date, time, people, name, email, phone, userId, status } = payload;

    if (!date || !time || !people) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const requestedPeople = parseInt(people) || 0;
    const { key: activityKey, capacity: maxCapacity } = getActivityKey(subExperience, experienceSlug);

    // If this activity has a capacity constraint, validate atomically
    if (activityKey !== null && maxCapacity !== null) {
      // Fetch fresh bookings at moment of booking — atomic check
      const allBookings = await base44.asServiceRole.entities.Booking.list('', 500);
      const relevant = allBookings.filter(b => {
        if (b.date !== date || b.time !== time || b.status === 'cancelled') return false;
        const { key } = getActivityKey(b.subExperience, b.experienceSlug);
        return key === activityKey;
      });

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