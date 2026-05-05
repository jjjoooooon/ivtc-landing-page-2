import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, subject, message, turnstileToken } = body;

    // 1. Verify Turnstile Token with Cloudflare
    const formData = new FormData();
    formData.append('secret', process.env.TURNSTILE_SECRET_KEY);
    formData.append('response', turnstileToken);

    const cfResponse = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: formData,
    });

    const cfData = await cfResponse.json();

    if (!cfData.success) {
      return NextResponse.json(
        { status: 'error', message: 'Security verification failed. Please try again.' },
        { status: 400 }
      );
    }

    // 2. Forward Data to Laravel Backend
    // Note: Replace '/public/contact/submit' with your actual Laravel endpoint if different
    const laravelUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/public/contact`;
    
    const backendResponse = await fetch(laravelUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        subject,
        message,
        // We don't send the token to Laravel since we already verified it here
      }),
    });

    const backendData = await backendResponse.json();

    // 3. Return Backend Response to Frontend
    return NextResponse.json(backendData, { status: backendResponse.status });

  } catch (error) {
    console.error('Contact API Error:', error);
    return NextResponse.json(
      { status: 'error', message: 'Internal server error' },
      { status: 500 }
    );
  }
}
