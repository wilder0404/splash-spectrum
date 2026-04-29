import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);

    const { bookingId } = await req.json();

    if (!bookingId) {
      return Response.json({ error: 'Missing bookingId' }, { status: 400 });
    }

    const bookings = await base44.asServiceRole.entities.Booking.list('', 100);
    const booking = bookings.find(b => b.id === bookingId);

    if (!booking) {
      return Response.json({ error: 'Booking not found' }, { status: 404 });
    }

    // Format date nicely (e.g., "22 April")
    const dateObj = new Date(booking.date + 'T00:00:00');
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const formattedDate = `${dateObj.getDate()} ${monthNames[dateObj.getMonth()]}`;

    const experienceLine = booking.subExperience
      ? `${booking.experienceName} — ${booking.subExperience}`
      : booking.experienceName;

    const subject = '✨ Your Booking Confirmation — Splash Spectrum';

    const textBody = `Hi ${booking.name} 👋\n\nYour booking for the ${experienceLine} has been successfully confirmed.\n\n📅 Date: ${formattedDate}\n⏰ Time: ${booking.time}\n👥 Guests: ${booking.people} people\n📱 Phone Number: ${booking.phone}\n\nWe're looking forward to hosting you and making it a memorable experience 🎉\n\nIf you need any changes or have any questions, feel free to reach out anytime.`;

    const htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 520px; margin: 0 auto; background: #050505; color: #f5f5f5; border-radius: 16px; overflow: hidden; border: 1px solid #222;">
        <div style="background: linear-gradient(135deg, #FF007F, #9D00FF); padding: 32px 32px 24px; text-align: center;">
          <h1 style="margin: 0; font-size: 26px; color: #fff; letter-spacing: -0.5px;">✨ Booking Confirmed</h1>
          <p style="margin: 8px 0 0; color: rgba(255,255,255,0.8); font-size: 14px;">Splash Spectrum</p>
        </div>
        <div style="padding: 32px;">
          <p style="font-size: 16px; color: #f5f5f5; margin-top: 0;">Hi <strong>${booking.name}</strong> 👋</p>
          <p style="color: #aaa; line-height: 1.6;">Your booking for the <strong style="color: #FF007F;">${experienceLine}</strong> has been successfully confirmed.</p>
          <div style="background: #111; border-radius: 12px; padding: 20px; margin: 24px 0; border: 1px solid #222;">
            <p style="margin: 0 0 10px; color: #f5f5f5;">📅 <strong>Date:</strong> ${formattedDate}</p>
            <p style="margin: 0 0 10px; color: #f5f5f5;">⏰ <strong>Time:</strong> ${booking.time}</p>
            <p style="margin: 0 0 10px; color: #f5f5f5;">👥 <strong>Guests:</strong> ${booking.people} people</p>
            <p style="margin: 0; color: #f5f5f5;">📱 <strong>Phone Number:</strong> ${booking.phone}</p>
          </div>
          <p style="color: #aaa; line-height: 1.6;">We're looking forward to hosting you and making it a memorable experience 🎉</p>
          <p style="color: #aaa; line-height: 1.6;">If you need any changes or have any questions, feel free to reach out anytime.</p>
        </div>
        <div style="padding: 16px 32px; border-top: 1px solid #222; text-align: center;">
          <p style="color: #555; font-size: 12px; margin: 0;">© ${new Date().getFullYear()} Splash Spectrum. All rights reserved.</p>
        </div>
      </div>
    `;

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Splash Spectrum <onboarding@resend.dev>',
        to: [booking.email],
        subject,
        text: textBody,
        html: htmlBody,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      return Response.json({ error: data.message || 'Failed to send email' }, { status: 500 });
    }

    return Response.json({ success: true, message: 'Booking confirmation email sent' });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});