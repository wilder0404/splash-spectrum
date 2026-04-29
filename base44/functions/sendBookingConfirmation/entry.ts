import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);

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

    // Format date nicely (e.g., "22 April")
    const dateObj = new Date(booking.date + 'T00:00:00');
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const formattedDate = `${dateObj.getDate()} ${monthNames[dateObj.getMonth()]}`;

    const isAr = booking.experienceName && booking.experienceName.match(/[\u0600-\u06FF]/);

    const subject = isAr 
      ? '✨ تم تأكيد حجزك في Splash Spectrum' 
      : '✨ Your Booking Confirmation';

    const body = isAr
      ? `مرحباً ${booking.name} 👋\n\nتم تأكيد حجزك في ${booking.experienceName} بنجاح.\n\n📅 التاريخ: ${formattedDate}\n⏰ الوقت: ${booking.time}\n👥 عدد الضيوف: ${booking.people} أشخاص\n📱 رقم هاتفك: ${booking.phone}\n\nنتطلع لاستضافتك وإنشاء تجربة لا تُنسى 🎉\n\nإذا احتجت إلى أي تعديلات أو لديك أي أسئلة، يمكنك التواصل معنا في أي وقت.`
      : `Hi ${booking.name} 👋\n\nYour booking for the ${booking.experienceName} has been successfully confirmed.\n\n📅 Date: ${formattedDate}\n⏰ Time: ${booking.time}\n👥 Guests: ${booking.people} people\n📱 Phone number: ${booking.phone}\n\nWe're looking forward to hosting you and making it a memorable experience 🎉\n\nIf you need any changes or have any questions, feel free to reach out anytime.`;

    // Send email via Core integration (using service role for external emails)
    await base44.asServiceRole.integrations.Core.SendEmail({
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