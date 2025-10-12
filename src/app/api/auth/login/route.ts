import { NextRequest, NextResponse } from 'next/server';
import { ServerCSAPI } from '@/lib/server-api';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    console.log('🔵 Login API - Received data:', { email });

    // Call CS API for authentication
    const response = await ServerCSAPI.login({ email, password });
    console.log('🔵 Login API - CS API response:', response);
    
    if (response.success && response.data) {
      // Set authentication cookies
      const nextResponse = NextResponse.json({
        success: true,
        message: 'Login successful',
        data: response.data
      });

      // Set access token cookie (for Bearer token authentication)
      if (response.data.token) {
        nextResponse.cookies.set('access_token', response.data.token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 60 * 60 * 24 * 7, // 7 days
        });
        console.log('🔵 Set access_token cookie:', response.data.token.substring(0, 20) + '...');
      }

      // Set user data cookie
      if (response.data.profile) {
        nextResponse.cookies.set('user_data', JSON.stringify(response.data.profile), {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 60 * 60 * 24 * 7, // 7 days
        });
        console.log('🔵 Set user_data cookie:', response.data.profile);
      }

      console.log('🟢 Login successful, cookies set');
      return nextResponse;
    }

    console.log('🔴 Login failed, returning error');
    return NextResponse.json(
      { success: false, error: 'Invalid credentials' },
      { status: 401 }
    );
  } catch (error) {
    console.error('🔴 Login API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
