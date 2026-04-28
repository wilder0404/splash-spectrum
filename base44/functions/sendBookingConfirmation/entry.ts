import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    
    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { bookingId } = await req.json();

    if (!bookingId) {
      return Response.json({ error: 'Missing bookingId' }, { status: 400 });
    }

    // Fetch the booking
    const bookings = await base44.asServiceRole.entities.Booking.list('', 100);
    const booking = bookings.find(b => b.id === bookingId);

    if (!booking) {
      return Response.json({ error: 'Booking not found' }, { status: 404 });
    }

    // Determine language based on booking content
    const isAr = booking.experienceName && booking.experienceName.match(/[\u0600-\u06FF]/);

    const subject = isAr 
      ? '✨ تم تأكيد حجزك في Splash Spectrum' 
      : '✨ Your Booking Confirmation at Splash Spectrum';

    const body = isAr
      ? `مرحباً ${booking.name},\n\nشكراً لحجزك معنا! فيما يلي تفاصيل حجزك:\n\n🎨 الخبرة: ${booking.experienceName}\n${booking.subExperience ? `📌 النشاط: ${booking.subExperience}\n` : ''}📅 التاريخ: ${booking.date}\n⏰ الوقت: ${booking.time}\n👥 عدد الأشخاص: ${booking.people}\n\nحجزك مؤكد الآن! نتطلع لرؤيتك قريباً.\n\nمع أطيب التحيات,\nفريق Splash Spectrum ✨`
      : `Hi ${booking.name},\n\nThank you for booking with us!\n\n🎨 Experience: ${booking.experienceName}\n${booking.subExperience ? `📌 Activity: ${booking.subExperience}\n` : ''}📅 Date: ${booking.date}\n⏰ Time: ${booking.time}\n👥 People: ${booking.people}\n\nYour booking has been confirmed. We hope to see you soon!\n\nBest regards,\nSplash Spectrum Team ✨`;

    // Send email via Core integration
    await base44.integrations.Core.SendEmail({
      to: booking.email,
      subject,
      body,
      from_name: 'Splash Spectrum',
    });

    return Response.json({ 
      success: true, 
      message: 'Booking confirmation email sent' 
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});