import { NextRequest, NextResponse } from 'next/server';
import { ServerCSAPI } from '@/lib/server-api';

interface LoginResponseData {
  token: string;
  profile: Record<string, unknown>;
}

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
      const loginData = response.data as unknown as LoginResponseData;
      if (loginData.token) {
        nextResponse.cookies.set('access_token', loginData.token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 60 * 60 * 24 * 7, // 7 days
        });
        console.log('🔵 Set access_token cookie:', loginData.token.substring(0, 20) + '...');
      }

      // Set user data cookie - create mock user data if profile not available
      const userData = loginData.profile || {
        id: "test-user-id",
        first_name: "Test",
        last_name: "User",
        email: email,
        member_level: "Gold Member"
      };
      
      nextResponse.cookies.set('user_data', JSON.stringify(userData), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });
      console.log('🔵 Set user_data cookie:', userData);

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
