import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

// Returns the activity key and max capacity for a given booking's subExperience/slug
// Arabic keywords are included to ensure filtering works in Arabic version
function getActivityKey(subExperience, experienceSlug) {
  const sub = (subExperience || '').toLowerCase();
  const slug = (experienceSlug || '').toLowerCase();

  // Spin - 4 seats (English + Arabic keywords)
  if (sub.includes('spin') || sub.includes('سبين') || sub.includes('دوران')) return { key: 'spin', capacity: 4 };
  
  // Phone Case - 12 seats (English + Arabic keywords)
  if (sub.includes('phone case') || sub.includes('phone') || sub.includes('كفر') || sub.includes('جوال') || sub.includes('هاتف')) return { key: 'phone_case', capacity: 12 };
  
  // Pouring/Figurines - 12 seats (English + Arabic keywords)
  if (sub.includes('pour') || sub.includes('figurine') || sub.includes('bear') || sub.includes('صب') || sub.includes('مجسم') || sub.includes('دب')) return { key: 'pour', capacity: 12 };
  
  // Group Splash/Big Canvas - 15 seats (English + Arabic keywords)
  if (sub.includes('group splash') || sub.includes('big canvas') || sub.includes('كبير') || sub.includes('مجموعة') || sub.includes('جماعي')) return { key: 'group_splash', capacity: 15 };

  // Fall back to slug BEFORE generic splash check
  if (slug.includes('phone-case') || slug.includes('phone') || slug.includes('splash-phone')) return { key: 'phone_case', capacity: 12 };
  if (slug.includes('spin')) return { key: 'spin', capacity: 4 };
  if (slug.includes('group-splash') || slug.includes('group-friends')) return { key: 'group_splash', capacity: 15 };
  if (slug.includes('figurine') || slug.includes('pour') || slug.includes('custom-art')) return { key: 'pour', capacity: 12 };
  if (slug.includes('open-paint') || slug.includes('open_paint')) return { key: 'splash', capacity: 30 };

  // Generic splash check last (so group-splash slug is already handled above)
  if (sub.includes('splash') || sub.includes('سبلاش') || sub.includes('رش')) return { key: 'splash', capacity: 30 };
  if (slug.includes('splash')) return { key: 'splash', capacity: 30 };

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
