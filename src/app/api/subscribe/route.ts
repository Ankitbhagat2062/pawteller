import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import crypto from 'crypto';
import { connectToDatabase } from '@/lib/mongodb';
import Subscriber from '@/models/subscriber';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    if (!email) return NextResponse.json({ error: 'Email is required' }, { status: 400 });

    await connectToDatabase();

    const token = crypto.randomBytes(32).toString('hex');
    const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/verify?token=${token}`;

    // Find existing unverified user or create a new entry
    await Subscriber.findOneAndUpdate(
      { email: email.toLowerCase() },
      { verificationToken: token, isVerified: false },
      { upsert: true, new: true }
    );

    // Send the Verification Email via Resend
    await resend.emails.send({
      from: 'Newsletter <newsletter@yourdomain.com>',
      to: email,
      subject: 'Verify your subscription',
      html: `
        <p>Please click the link below to verify your email address and subscribe:</p>
        <a href="${verificationUrl}">Click here to verify</a>
      `,
    });

    return NextResponse.json({ success: true, message: 'Verification email sent!' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
