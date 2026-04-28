import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    
    // Get all confirmed bookings
    const bookings = await base44.asServiceRole.entities.Booking.list('-created_date', 1000);
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    let updatedCount = 0;
    
    for (const booking of bookings) {
      if (booking.status === 'confirmed') {
        // Parse booking date (format: YYYY-MM-DD)
        const bookingDate = new Date(booking.date);
        bookingDate.setHours(0, 0, 0, 0);
        
        // If booking date is in the past, mark as done
        if (bookingDate < today) {
          await base44.asServiceRole.entities.Booking.update(booking.id, { status: 'done' });
          updatedCount++;
        }
      }
    }
    
    return Response.json({ 
      success: true, 
      message: `Marked ${updatedCount} past bookings as done` 
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});