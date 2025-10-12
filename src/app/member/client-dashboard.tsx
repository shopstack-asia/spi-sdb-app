'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Calendar, CreditCard, Settings, Plus, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { SDBBooking, SDBSubscription, SDBPayment } from '@/types';

interface User {
  id: string;
  first_name: string;
  member_level: string;
}

export default function ClientDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [bookings, setBookings] = useState<SDBBooking[]>([]);
  const [subscriptions, setSubscriptions] = useState<SDBSubscription[]>([]);
  const [payments, setPayments] = useState<SDBPayment[]>([]);

  useEffect(() => {
    // Mock data for demonstration - only essential fields
    const mockUser: User = {
      id: "test-user-id",
      first_name: "Test",
      member_level: "Gold Member"
    };

    const mockBookings: SDBBooking[] = [
      {
        id: "book-001",
        member_id: mockUser.id,
        facility_id: "fac-mr-a",
        facility: {
          id: "fac-mr-a",
          name: "Meeting Room A",
          type: "MEETING_ROOM",
          capacity: 10,
          description: "Spacious meeting room with projector",
          hourly_rate: 1000,
          currency: "THB",
          is_active: true
        },
        booking_date: "2025-10-15",
        start_time: "10:00",
        end_time: "11:00",
        status: "CONFIRMED",
        total_cost: 1000,
        currency: "THB",
        purpose: "Business meeting",
        visitors: [],
        created_at: "2025-01-01T10:00:00Z",
        updated_at: "2025-01-01T10:00:00Z"
      }
    ];

    const mockSubscriptions: SDBSubscription[] = [
      {
        id: "sub-001",
        member_id: mockUser.id,
        package_id: "pkg-premium",
        package: {
          id: "pkg-premium",
          name: "Premium Vault Package",
          description: "Premium vault access with meeting room privileges",
          price: 12000,
          currency: "THB",
          duration_months: 12,
          features: ["Vault Access", "Meeting Room", "Priority Support"],
          max_meeting_hours: 20,
          max_vault_access: 10,
          is_active: true
        },
        start_date: "2025-01-01T00:00:00Z",
        end_date: "2026-01-01T00:00:00Z",
        status: "ACTIVE",
        auto_renew: true
      }
    ];

    const mockPayments: SDBPayment[] = [
      {
        id: "pay-001",
        member_id: mockUser.id,
        subscription_id: "sub-001",
        amount: 12000,
        currency: "THB",
        payment_method: "CREDIT_CARD",
        status: "COMPLETED",
        transaction_id: "txn-001",
        payment_date: "2025-01-01T10:30:00Z",
        description: "Premium Vault Package Renewal"
      }
    ];

    setUser(mockUser);
    setBookings(mockBookings);
    setSubscriptions(mockSubscriptions);
    setPayments(mockPayments);
  }, []);

  if (!user) {
    return (
      <div style={{ backgroundColor: '#0a1a2f', color: 'white', minHeight: '100vh', padding: '2rem' }}>
        <h1 style={{ color: 'white', fontSize: '2rem' }}>Loading...</h1>
      </div>
    );
  }

  const activeSubscription = subscriptions.find(sub => sub.status === 'ACTIVE');
  const upcomingBookings = bookings.filter(booking => 
    new Date(booking.booking_date) >= new Date()
  );

  return (
    <div style={{ backgroundColor: '#0a1a2f', color: 'white', minHeight: '100vh' }}>
      <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '2rem 1rem' }}>
        {/* Welcome Section */}
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ color: 'white', fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
            Welcome back, {user.first_name}!
          </h1>
          <p style={{ color: '#e5e7eb' }}>
            Manage your safe deposit box membership and bookings
          </p>
        </div>

        {/* Quick Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
          <Card style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', border: '1px solid rgba(229, 231, 235, 0.2)', color: 'white' }}>
            <CardHeader style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <CardTitle style={{ fontSize: '0.875rem', fontWeight: '500' }}>Membership Status</CardTitle>
              <Shield style={{ height: '1rem', width: '1rem', color: '#d4af37' }} />
            </CardHeader>
            <CardContent>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#d4af37' }}>{user.member_level}</div>
              <p style={{ fontSize: '0.75rem', color: '#e5e7eb' }}>
                {activeSubscription ? `Expires: ${new Date(activeSubscription.end_date).toLocaleDateString()}` : 'No active subscription'}
              </p>
            </CardContent>
          </Card>

          <Card style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', border: '1px solid rgba(229, 231, 235, 0.2)', color: 'white' }}>
            <CardHeader style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <CardTitle style={{ fontSize: '0.875rem', fontWeight: '500' }}>Active Bookings</CardTitle>
              <Calendar style={{ height: '1rem', width: '1rem', color: '#d4af37' }} />
            </CardHeader>
            <CardContent>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#d4af37' }}>{upcomingBookings.length}</div>
              <p style={{ fontSize: '0.75rem', color: '#e5e7eb' }}>
                Upcoming meetings
              </p>
            </CardContent>
          </Card>

          <Card style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', border: '1px solid rgba(229, 231, 235, 0.2)', color: 'white' }}>
            <CardHeader style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <CardTitle style={{ fontSize: '0.875rem', fontWeight: '500' }}>Next Payment</CardTitle>
              <CreditCard style={{ height: '1rem', width: '1rem', color: '#d4af37' }} />
            </CardHeader>
            <CardContent>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#d4af37' }}>
                {activeSubscription ? `${activeSubscription.package.price.toLocaleString()} THB` : 'N/A'}
              </div>
              <p style={{ fontSize: '0.75rem', color: '#e5e7eb' }}>
                {activeSubscription ? `Due: ${new Date(activeSubscription.end_date).toLocaleDateString()}` : 'No active subscription'}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {/* Left Column - Quick Actions */}
          <div>
            <Card style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', border: '1px solid rgba(229, 231, 235, 0.2)', color: 'white', marginBottom: '1.5rem' }}>
              <CardHeader>
                <CardTitle style={{ color: 'white' }}>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <Link href="/booking">
                  <button style={{ 
                    width: '100%', 
                    backgroundColor: '#d4af37', 
                    color: '#0a1a2f', 
                    padding: '0.75rem 1rem', 
                    borderRadius: '0.375rem', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    border: 'none',
                    cursor: 'pointer'
                  }}>
                    <Plus style={{ height: '1rem', width: '1rem', marginRight: '0.5rem' }} />
                    Book Facility
                  </button>
                </Link>
                <Link href="/subscription">
                  <button style={{ 
                    width: '100%', 
                    border: '1px solid #e5e7eb', 
                    color: '#e5e7eb', 
                    padding: '0.75rem 1rem', 
                    borderRadius: '0.375rem', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    backgroundColor: 'transparent',
                    cursor: 'pointer'
                  }}>
                    <Settings style={{ height: '1rem', width: '1rem', marginRight: '0.5rem' }} />
                    Manage Subscription
                  </button>
                </Link>
                <Link href="/payment">
                  <button style={{ 
                    width: '100%', 
                    border: '1px solid #e5e7eb', 
                    color: '#e5e7eb', 
                    padding: '0.75rem 1rem', 
                    borderRadius: '0.375rem', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    backgroundColor: 'transparent',
                    cursor: 'pointer'
                  }}>
                    <CreditCard style={{ height: '1rem', width: '1rem', marginRight: '0.5rem' }} />
                    Payment History
                  </button>
                </Link>
              </CardContent>
            </Card>

            {/* Subscription Info */}
            {activeSubscription && (
              <Card style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', border: '1px solid rgba(229, 231, 235, 0.2)', color: 'white' }}>
                <CardHeader>
                  <CardTitle style={{ color: 'white' }}>Current Subscription</CardTitle>
                </CardHeader>
                <CardContent>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#e5e7eb' }}>Package:</span>
                      <span style={{ color: 'white', fontWeight: '500' }}>{activeSubscription.package.name}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#e5e7eb' }}>Status:</span>
                      <Badge style={{ backgroundColor: 'rgba(34, 197, 94, 0.2)', color: '#4ade80', border: '1px solid rgba(34, 197, 94, 0.3)' }}>
                        {activeSubscription.status}
                      </Badge>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#e5e7eb' }}>Expires:</span>
                      <span style={{ color: 'white' }}>{new Date(activeSubscription.end_date).toLocaleDateString()}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#e5e7eb' }}>Auto Renew:</span>
                      <span style={{ color: 'white' }}>{activeSubscription.auto_renew ? 'Yes' : 'No'}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Recent Activity */}
          <div>
            {/* Upcoming Bookings */}
            <Card style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', border: '1px solid rgba(229, 231, 235, 0.2)', color: 'white', marginBottom: '1.5rem' }}>
              <CardHeader>
                <CardTitle style={{ color: 'white' }}>Upcoming Bookings</CardTitle>
                <CardDescription style={{ color: '#e5e7eb' }}>
                  Your scheduled facility bookings
                </CardDescription>
              </CardHeader>
              <CardContent>
                {upcomingBookings.length > 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {upcomingBookings.slice(0, 3).map((booking) => (
                      <div key={booking.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: '0.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                          <div style={{ padding: '0.5rem', backgroundColor: 'rgba(212, 175, 55, 0.2)', borderRadius: '0.5rem' }}>
                            <Calendar style={{ height: '1.25rem', width: '1.25rem', color: '#d4af37' }} />
                          </div>
                          <div>
                            <h4 style={{ fontWeight: '500', color: 'white' }}>{booking.facility.name}</h4>
                            <p style={{ fontSize: '0.875rem', color: '#e5e7eb' }}>
                              {new Date(booking.booking_date).toLocaleDateString()} • {booking.start_time} - {booking.end_time}
                            </p>
                          </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <Badge style={{
                            backgroundColor: booking.status === 'CONFIRMED' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(234, 179, 8, 0.2)',
                            color: booking.status === 'CONFIRMED' ? '#4ade80' : '#facc15',
                            border: booking.status === 'CONFIRMED' ? '1px solid rgba(34, 197, 94, 0.3)' : '1px solid rgba(234, 179, 8, 0.3)'
                          }}>
                            {booking.status}
                          </Badge>
                          <Link href={`/booking/${booking.id}`}>
                            <button style={{ color: '#d4af37' }}>
                              <ArrowRight style={{ height: '1rem', width: '1rem' }} />
                            </button>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{ textAlign: 'center', padding: '2rem' }}>
                    <Calendar style={{ height: '3rem', width: '3rem', color: '#e5e7eb', margin: '0 auto 1rem' }} />
                    <p style={{ color: '#e5e7eb', marginBottom: '1rem' }}>No upcoming bookings</p>
                    <Link href="/booking">
                      <button style={{ backgroundColor: '#d4af37', color: '#0a1a2f', padding: '0.5rem 1rem', borderRadius: '0.375rem' }}>
                        Book a Facility
                      </button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Recent Payments */}
            <Card style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', border: '1px solid rgba(229, 231, 235, 0.2)', color: 'white' }}>
              <CardHeader>
                <CardTitle style={{ color: 'white' }}>Recent Payments</CardTitle>
                <CardDescription style={{ color: '#e5e7eb' }}>
                  Your payment history
                </CardDescription>
              </CardHeader>
              <CardContent>
                {payments.length > 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {payments.slice(0, 3).map((payment) => (
                      <div key={payment.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: '0.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                          <div style={{ padding: '0.5rem', backgroundColor: 'rgba(212, 175, 55, 0.2)', borderRadius: '0.5rem' }}>
                            <CreditCard style={{ height: '1.25rem', width: '1.25rem', color: '#d4af37' }} />
                          </div>
                          <div>
                            <h4 style={{ fontWeight: '500', color: 'white' }}>{payment.description}</h4>
                            <p style={{ fontSize: '0.875rem', color: '#e5e7eb' }}>
                              {new Date(payment.payment_date).toLocaleDateString()} • {payment.payment_method}
                            </p>
                          </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <span style={{ color: 'white', fontWeight: '500' }}>
                            {payment.amount.toLocaleString()} {payment.currency}
                          </span>
                          <Badge style={{
                            backgroundColor: 'rgba(34, 197, 94, 0.2)',
                            color: '#4ade80',
                            border: '1px solid rgba(34, 197, 94, 0.3)'
                          }}>
                            {payment.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{ textAlign: 'center', padding: '2rem' }}>
                    <CreditCard style={{ height: '3rem', width: '3rem', color: '#e5e7eb', margin: '0 auto' }} />
                    <p style={{ color: '#e5e7eb' }}>No payment history</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
