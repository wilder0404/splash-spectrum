import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

// Capacity per hour based on subExperience name (case-insensitive keyword match)
function getCapacityForSubExperience(subExperience) {
  if (!subExperience) return null;
  const s = subExperience.toLowerCase();
  if (s.includes('pour')) return 14;
  if (s.includes('splash')) return 20; // covers "Splash", "Group Splash (Big Canvas)"
  if (s.includes('spin')) return 6;
  return null;
}

function getCapacityForExperience(experienceSlug, subExperience) {
  if (subExperience) return getCapacityForSubExperience(subExperience);
  if (!experienceSlug) return null;
  const s = experienceSlug.toLowerCase();
  if (s.includes('pour')) return 14;
  if (s.includes('splash')) return 20;
  if (s.includes('spin')) return 6;
  return null;
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
    const maxCapacity = getCapacityForExperience(experienceSlug, subExperience);

    // If this experience has a capacity constraint, validate atomically
    if (maxCapacity !== null) {
      const allBookings = await base44.asServiceRole.entities.Booking.list('', 500);
      const relevant = allBookings.filter(b => {
        if (b.date !== date || b.time !== time || b.status === 'cancelled') return false;
        const cap = getCapacityForExperience(b.experienceSlug, b.subExperience);
        return cap === maxCapacity;
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