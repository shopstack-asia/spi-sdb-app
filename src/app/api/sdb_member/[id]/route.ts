import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // In real app, fetch member from CS API
    const { id } = await params;
    const mockMember = {
      id,
      member_type: 'INDIVIDUAL',
      member_level: 'PREMIUM',
      national_id: '1234567890123',
      first_name: 'John',
      last_name: 'Doe',
      email: 'john.doe@example.com',
      phone: '+66 123 456 789',
      address: '123 Sukhumvit Road, Bangkok',
      city: 'Bangkok',
      country: 'Thailand',
      postal_code: '10110',
      registration_date: '2024-01-15',
      status: 'ACTIVE',
      expiry_date: '2025-01-15'
    };

    return NextResponse.json({
      success: true,
      data: mockMember
    });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch member' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const updateData = await request.json();
    const { id } = await params;

    // In real app, update member in CS API
    return NextResponse.json({
      success: true,
      data: { id, ...updateData },
      message: 'Member updated successfully'
    });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to update member' },
      { status: 500 }
    );
  }
}
