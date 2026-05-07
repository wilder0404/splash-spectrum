import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

// Returns the activity key and max capacity for a given booking's subExperience/slug
// IMPORTANT: Check all inputs to ensure proper detection regardless of language
function getActivityKey(subExperience, experienceSlug, experienceTitle = '') {
  const sub = (subExperience || '').toLowerCase();
  const slug = (experienceSlug || '').toLowerCase();
  const title = (experienceTitle || '').toLowerCase();
  
  // Combine all inputs for comprehensive checking
  const allText = `${sub} ${slug} ${title}`.toLowerCase();

  // SPIN - 4 seats (highest priority check - check all inputs)
  // Check for various spin-related keywords in English and Arabic
  const spinKeywords = ['spin', 'سبين', 'spinning', 'دوران', 'spin-art', 'spinart', 'سبين آرت', 'سبين ارت'];
  if (spinKeywords.some(kw => allText.includes(kw))) {
    return { key: 'spin', capacity: 4 };
  }
  
  // Phone Case - 12 seats (English + Arabic keywords)
  if (allText.includes('phone') || allText.includes('كفر') || allText.includes('جوال') || allText.includes('هاتف')) {
    return { key: 'phone_case', capacity: 12 };
  }
  
  // Pouring/Figurines - 12 seats (English + Arabic keywords)
  if (allText.includes('pour') || allText.includes('figurine') || allText.includes('bear') || allText.includes('custom-art') || allText.includes('صب') || allText.includes('مجسم') || allText.includes('دب')) {
    return { key: 'pour', capacity: 12 };
  }
  
  // Group Splash/Big Canvas - 15 seats (English + Arabic keywords)
  if (allText.includes('group') || allText.includes('big canvas') || allText.includes('كبير') || allText.includes('مجموعة') || allText.includes('جماعي')) {
    return { key: 'group_splash', capacity: 15 };
  }
  
  // Open Paint Sessions - 30 seats
  if (allText.includes('open-paint') || allText.includes('open_paint') || allText.includes('open-session') || allText.includes('open paint')) {
    return { key: 'splash', capacity: 30 };
  }

  // Generic splash check last (default for splash experiences)
  if (allText.includes('splash') || allText.includes('سبلاش') || allText.includes('رش')) {
    return { key: 'splash', capacity: 30 };
  }

  return { key: null, capacity: null };
}

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { experienceSlug, experienceTitle, date, subExperience } = await req.json();

    console.log('[getSlotAvailability] Input:', JSON.stringify({ experienceSlug, experienceTitle, date, subExperience }));

    if (!date) {
      return Response.json({ error: 'Missing date' }, { status: 400 });
    }

    const { key: activityKey, capacity: maxCapacity } = getActivityKey(subExperience, experienceSlug, experienceTitle);
    console.log('[getSlotAvailability] Detected activity:', JSON.stringify({ activityKey, maxCapacity }));

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
