import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Subscriber from '@/models/subscriber';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');

  if (!token) return NextResponse.json({ error: 'Missing verification token' }, { status: 400 });

  try {
    await connectToDatabase();

    // Find and update subscriber if the token matches
    const subscriber = await Subscriber.findOneAndUpdate(
      { verificationToken: token },
      { isVerified: true },
      { new: true }
    );

    if (!subscriber) {
      return NextResponse.json({ error: 'Invalid or expired token' }, { status: 400 });
    }

    // Deliver the Welcome Email and Features Overview
    await resend.emails.send({
      from: 'Welcome <hello@yourdomain.com>',
      to: subscriber.email,
      subject: 'Welcome to our Newsletter!',
      html: `
        <h2>You are now officially verified! 🎉</h2>
        <p>Thanks for subscribing. Here is what you can look forward to:</p>
        <ul>
          <li><strong>Automated Newsletter:</strong> Monthly industry roundups.</li>
          <li><strong>Feature Updates:</strong> Real-time beta logs on our platform features.</li>
        </ul>
      `,
    });

    // Redirect to a specific confirmation page
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/subscribed-success`);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
