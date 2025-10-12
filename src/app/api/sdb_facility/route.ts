import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // In real app, fetch facilities from CS API
    const mockFacilities = [
      {
        id: "1",
        name: "Executive Meeting Room",
        type: "MEETING_ROOM",
        capacity: 8,
        description: "Premium meeting room with AV equipment and presentation tools",
        hourly_rate: 1000,
        currency: "THB",
        is_active: true
      },
      {
        id: "2",
        name: "Conference Room A",
        type: "CONFERENCE_ROOM",
        capacity: 20,
        description: "Large conference room for business meetings and presentations",
        hourly_rate: 1500,
        currency: "THB",
        is_active: true
      },
      {
        id: "3",
        name: "Private Vault Room",
        type: "VAULT_ROOM",
        capacity: 4,
        description: "Private room for accessing your safe deposit box",
        hourly_rate: 500,
        currency: "THB",
        is_active: true
      }
    ];

    return NextResponse.json({
      success: true,
      data: mockFacilities
    });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch facilities' },
      { status: 500 }
    );
  }
}
