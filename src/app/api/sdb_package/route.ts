import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // In real app, fetch packages from CS API
    const mockPackages = [
      {
        id: "1",
        name: "Basic Vault Package",
        description: "Essential safe deposit box access with basic amenities",
        price: 25000,
        currency: "THB",
        duration_months: 12,
        features: ["Safe deposit box access", "2 meeting room hours/month", "Basic support"],
        max_meeting_hours: 2,
        max_vault_access: 12,
        is_active: true
      },
      {
        id: "2",
        name: "Premium Vault Package",
        description: "Premium safe deposit box with enhanced services and meeting room access",
        price: 50000,
        currency: "THB",
        duration_months: 12,
        features: ["Safe deposit box access", "8 meeting room hours/month", "Priority support", "Concierge service"],
        max_meeting_hours: 8,
        max_vault_access: 24,
        is_active: true
      },
      {
        id: "3",
        name: "VIP Vault Package",
        description: "Exclusive VIP package with unlimited access and premium services",
        price: 100000,
        currency: "THB",
        duration_months: 12,
        features: ["Safe deposit box access", "Unlimited meeting room hours", "VIP support", "Personal concierge", "Priority booking"],
        max_meeting_hours: -1,
        max_vault_access: -1,
        is_active: true
      }
    ];

    return NextResponse.json({
      success: true,
      data: mockPackages
    });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch packages' },
      { status: 500 }
    );
  }
}
