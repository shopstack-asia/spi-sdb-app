import { NextRequest, NextResponse } from 'next/server';
import { ServerCSAPI } from '@/lib/server-api';

export async function POST(request: NextRequest) {
  try {
    const registrationData = await request.json();
    console.log('🔵 API Route - Received data:', registrationData);

    // Call CS API for registration
    const response = await ServerCSAPI.register(registrationData);
    console.log('🔵 API Route - CS API response:', response);
    
    // Wrap response in success format
    return NextResponse.json({
      success: true,
      message: 'Registration successful! Please check your email for verification.',
      data: response
    });
  } catch (error) {
    console.error('🔴 Registration API error:', error);
    return NextResponse.json(
      { success: false, error: 'Registration failed' },
      { status: 500 }
    );
  }
}
