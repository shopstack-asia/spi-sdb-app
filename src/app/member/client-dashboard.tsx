'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Shield, Calendar, CreditCard, Settings, Plus, ArrowRight, Coins, TrendingUp, TrendingDown, Ticket } from 'lucide-react';
import Link from 'next/link';
import { SDBBooking, SDBSubscription, SDBPayment } from '@/types';

interface User {
  id: string;
  first_name: string;
  member_level: string;
}

interface PointHistory {
  id: string;
  type: 'EARN' | 'REDEEM';
  points: number;
  description: string;
  date: string;
}

interface Coupon {
  id: string;
  code: string;
  name: string;
  description: string;
  discount_type: 'PERCENTAGE' | 'FIXED';
  discount_value: number;
  status: 'AVAILABLE' | 'USED' | 'EXPIRED' | 'REDEEM';
  expiry_date?: string;
  used_date?: string;
  redeem_date?: string;
}

export default function ClientDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [bookings, setBookings] = useState<SDBBooking[]>([]);
  const [subscriptions, setSubscriptions] = useState<SDBSubscription[]>([]);
  const [payments, setPayments] = useState<SDBPayment[]>([]);
  const [totalPoints, setTotalPoints] = useState<number>(0);
  const [pointHistory, setPointHistory] = useState<PointHistory[]>([]);
  const [showPointHistory, setShowPointHistory] = useState(false);
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [showCoupons, setShowCoupons] = useState(false);
  const [couponFilter, setCouponFilter] = useState<'ALL' | 'AVAILABLE' | 'USED' | 'EXPIRED' | 'REDEEM'>('ALL');

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

    // Mock point data
    const mockTotalPoints = 1250;
    const mockPointHistory: PointHistory[] = [
      {
        id: 'ph-001',
        type: 'EARN',
        points: 100,
        description: 'Monthly subscription bonus',
        date: '2025-01-15T10:00:00Z'
      },
      {
        id: 'ph-002',
        type: 'EARN',
        points: 50,
        description: 'Facility booking reward',
        date: '2025-01-10T14:30:00Z'
      },
      {
        id: 'ph-003',
        type: 'REDEEM',
        points: -200,
        description: 'Redeemed for discount voucher',
        date: '2025-01-05T09:15:00Z'
      },
      {
        id: 'ph-004',
        type: 'EARN',
        points: 300,
        description: 'Welcome bonus',
        date: '2025-01-01T08:00:00Z'
      }
    ];

    setUser(mockUser);
    setBookings(mockBookings);
    setSubscriptions(mockSubscriptions);
    setPayments(mockPayments);
    // Mock coupon data
    const mockCoupons: Coupon[] = [
      {
        id: 'cpn-001',
        code: 'WELCOME10',
        name: 'Welcome Discount',
        description: '10% off on first booking',
        discount_type: 'PERCENTAGE',
        discount_value: 10,
        status: 'AVAILABLE',
        expiry_date: '2025-12-31T23:59:59Z'
      },
      {
        id: 'cpn-002',
        code: 'SAVE500',
        name: 'Save 500 THB',
        description: '500 THB discount on subscription',
        discount_type: 'FIXED',
        discount_value: 500,
        status: 'USED',
        used_date: '2025-01-10T14:30:00Z',
        expiry_date: '2025-06-30T23:59:59Z'
      },
      {
        id: 'cpn-003',
        code: 'SUMMER20',
        name: 'Summer Sale',
        description: '20% off on all bookings',
        discount_type: 'PERCENTAGE',
        discount_value: 20,
        status: 'EXPIRED',
        expiry_date: '2024-12-31T23:59:59Z'
      },
      {
        id: 'cpn-004',
        code: 'POINTS100',
        name: 'Points Reward',
        description: 'Redeemed with 100 points',
        discount_type: 'FIXED',
        discount_value: 200,
        status: 'REDEEM',
        redeem_date: '2025-01-05T09:15:00Z',
        expiry_date: '2025-12-31T23:59:59Z'
      },
      {
        id: 'cpn-005',
        code: 'VIP15',
        name: 'VIP Discount',
        description: '15% off for VIP members',
        discount_type: 'PERCENTAGE',
        discount_value: 15,
        status: 'AVAILABLE',
        expiry_date: '2025-06-30T23:59:59Z'
      }
    ];

    setTotalPoints(mockTotalPoints);
    setPointHistory(mockPointHistory);
    setCoupons(mockCoupons);
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
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
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

          <Card style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', border: '1px solid rgba(229, 231, 235, 0.2)', color: 'white' }}>
            <CardHeader style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <CardTitle style={{ fontSize: '0.875rem', fontWeight: '500' }}>Total Points</CardTitle>
              <Coins style={{ height: '1rem', width: '1rem', color: '#d4af37' }} />
            </CardHeader>
            <CardContent>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#d4af37' }}>{totalPoints.toLocaleString()}</div>
              <p style={{ fontSize: '0.75rem', color: '#e5e7eb' }}>
                Available points
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
                <button 
                  onClick={() => setShowPointHistory(true)}
                  style={{ 
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
                  <Coins style={{ height: '1rem', width: '1rem', marginRight: '0.5rem' }} />
                  Show Point History
                </button>
                <button 
                  onClick={() => setShowCoupons(true)}
                  style={{ 
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
                  <Ticket style={{ height: '1rem', width: '1rem', marginRight: '0.5rem' }} />
                  My Coupon
                </button>
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

        {/* Point History Dialog */}
        <Dialog open={showPointHistory} onOpenChange={setShowPointHistory}>
          <DialogContent className="bg-[#0a1a2f] border-[rgba(229,231,235,0.2)] text-white max-w-[600px]" style={{ backgroundColor: '#0a1a2f', border: '1px solid rgba(229, 231, 235, 0.2)', color: 'white', maxWidth: '600px' }}>
            <DialogHeader>
              <DialogTitle style={{ color: 'white', fontSize: '1.5rem', fontWeight: 'bold' }}>Point History</DialogTitle>
              <DialogDescription style={{ color: '#e5e7eb', marginTop: '0.5rem' }}>
                View your total points, earn, and redeem history
              </DialogDescription>
            </DialogHeader>
            <div style={{ marginTop: '1.5rem' }}>
              {/* Total Points Summary */}
              <Card style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', border: '1px solid rgba(229, 231, 235, 0.2)', color: 'white', marginBottom: '1.5rem' }}>
                <CardContent style={{ padding: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                      <p style={{ fontSize: '0.875rem', color: '#e5e7eb', marginBottom: '0.5rem' }}>Total Points</p>
                      <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#d4af37' }}>
                        {totalPoints.toLocaleString()}
                      </div>
                    </div>
                    <Coins style={{ height: '3rem', width: '3rem', color: '#d4af37' }} />
                  </div>
                </CardContent>
              </Card>

              {/* Point History List */}
              <div style={{ marginTop: '1.5rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: '600', color: 'white', marginBottom: '1rem' }}>Transaction History</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '400px', overflowY: 'auto' }}>
                  {pointHistory.length > 0 ? (
                    pointHistory.map((history) => (
                      <div 
                        key={history.id}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '1rem',
                          backgroundColor: 'rgba(255, 255, 255, 0.05)',
                          borderRadius: '0.5rem',
                          border: '1px solid rgba(229, 231, 235, 0.1)'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
                          <div style={{
                            padding: '0.5rem',
                            backgroundColor: history.type === 'EARN' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                            borderRadius: '0.5rem'
                          }}>
                            {history.type === 'EARN' ? (
                              <TrendingUp style={{ height: '1.25rem', width: '1.25rem', color: '#4ade80' }} />
                            ) : (
                              <TrendingDown style={{ height: '1.25rem', width: '1.25rem', color: '#f87171' }} />
                            )}
                          </div>
                          <div style={{ flex: 1 }}>
                            <h4 style={{ fontWeight: '500', color: 'white', marginBottom: '0.25rem' }}>
                              {history.description}
                            </h4>
                            <p style={{ fontSize: '0.875rem', color: '#e5e7eb' }}>
                              {new Date(history.date).toLocaleDateString()} • {new Date(history.date).toLocaleTimeString()}
                            </p>
                          </div>
                        </div>
                        <div style={{ 
                          fontSize: '1.125rem', 
                          fontWeight: 'bold',
                          color: history.type === 'EARN' ? '#4ade80' : '#f87171'
                        }}>
                          {history.type === 'EARN' ? '+' : ''}{history.points.toLocaleString()}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div style={{ textAlign: 'center', padding: '2rem', color: '#e5e7eb' }}>
                      <Coins style={{ height: '3rem', width: '3rem', color: '#e5e7eb', margin: '0 auto 1rem', opacity: 0.5 }} />
                      <p>No point history available</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Summary Stats */}
              <div style={{ marginTop: '1.5rem', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                <Card style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)', border: '1px solid rgba(34, 197, 94, 0.3)', color: 'white' }}>
                  <CardContent style={{ padding: '1rem' }}>
                    <p style={{ fontSize: '0.875rem', color: '#e5e7eb', marginBottom: '0.5rem' }}>Total Earned</p>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#4ade80' }}>
                      +{pointHistory.filter(h => h.type === 'EARN').reduce((sum, h) => sum + h.points, 0).toLocaleString()}
                    </div>
                  </CardContent>
                </Card>
                <Card style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', color: 'white' }}>
                  <CardContent style={{ padding: '1rem' }}>
                    <p style={{ fontSize: '0.875rem', color: '#e5e7eb', marginBottom: '0.5rem' }}>Total Redeemed</p>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#f87171' }}>
                      {pointHistory.filter(h => h.type === 'REDEEM').reduce((sum, h) => sum + Math.abs(h.points), 0).toLocaleString()}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Coupon Dialog */}
        <Dialog open={showCoupons} onOpenChange={setShowCoupons}>
          <DialogContent className="bg-[#0a1a2f] border-[rgba(229,231,235,0.2)] text-white max-w-[700px]" style={{ backgroundColor: '#0a1a2f', border: '1px solid rgba(229, 231, 235, 0.2)', color: 'white', maxWidth: '700px' }}>
            <DialogHeader>
              <DialogTitle style={{ color: 'white', fontSize: '1.5rem', fontWeight: 'bold' }}>My Coupons</DialogTitle>
              <DialogDescription style={{ color: '#e5e7eb', marginTop: '0.5rem' }}>
                View and manage your coupons
              </DialogDescription>
            </DialogHeader>
            <div style={{ marginTop: '1.5rem' }}>
              {/* Filter Tabs */}
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                {(['ALL', 'AVAILABLE', 'USED', 'EXPIRED', 'REDEEM'] as const).map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setCouponFilter(filter)}
                    style={{
                      padding: '0.5rem 1rem',
                      borderRadius: '0.375rem',
                      border: '1px solid rgba(229, 231, 235, 0.2)',
                      backgroundColor: couponFilter === filter ? '#d4af37' : 'transparent',
                      color: couponFilter === filter ? '#0a1a2f' : '#e5e7eb',
                      cursor: 'pointer',
                      fontSize: '0.875rem',
                      fontWeight: couponFilter === filter ? '600' : '400'
                    }}
                  >
                    {filter}
                  </button>
                ))}
              </div>

              {/* Coupon List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '500px', overflowY: 'auto' }}>
                {coupons.filter(coupon => couponFilter === 'ALL' || coupon.status === couponFilter).length > 0 ? (
                  coupons
                    .filter(coupon => couponFilter === 'ALL' || coupon.status === couponFilter)
                    .map((coupon) => {
                      const getStatusColor = (status: string) => {
                        switch (status) {
                          case 'AVAILABLE': return { bg: 'rgba(34, 197, 94, 0.2)', color: '#4ade80', border: 'rgba(34, 197, 94, 0.3)' };
                          case 'USED': return { bg: 'rgba(156, 163, 175, 0.2)', color: '#9ca3af', border: 'rgba(156, 163, 175, 0.3)' };
                          case 'EXPIRED': return { bg: 'rgba(239, 68, 68, 0.2)', color: '#f87171', border: 'rgba(239, 68, 68, 0.3)' };
                          case 'REDEEM': return { bg: 'rgba(234, 179, 8, 0.2)', color: '#facc15', border: 'rgba(234, 179, 8, 0.3)' };
                          default: return { bg: 'rgba(229, 231, 235, 0.2)', color: '#e5e7eb', border: 'rgba(229, 231, 235, 0.3)' };
                        }
                      };
                      const statusColor = getStatusColor(coupon.status);
                      
                      return (
                        <Card 
                          key={coupon.id}
                          style={{
                            backgroundColor: 'rgba(255, 255, 255, 0.05)',
                            border: `1px solid ${statusColor.border}`,
                            borderRadius: '0.5rem',
                            padding: '1rem'
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between', gap: '1rem' }}>
                            <div style={{ flex: 1 }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                                <h4 style={{ fontWeight: '600', color: 'white', fontSize: '1rem' }}>{coupon.name}</h4>
                                <Badge style={{
                                  backgroundColor: statusColor.bg,
                                  color: statusColor.color,
                                  border: `1px solid ${statusColor.border}`,
                                  fontSize: '0.75rem',
                                  padding: '0.25rem 0.5rem'
                                }}>
                                  {coupon.status}
                                </Badge>
                              </div>
                              <p style={{ fontSize: '0.875rem', color: '#e5e7eb', marginBottom: '0.5rem' }}>
                                {coupon.description}
                              </p>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                  <span style={{ fontSize: '0.875rem', color: '#e5e7eb', fontWeight: '600' }}>Code:</span>
                                  <span style={{ 
                                    fontSize: '0.875rem', 
                                    color: '#d4af37', 
                                    fontWeight: 'bold',
                                    fontFamily: 'monospace',
                                    backgroundColor: 'rgba(212, 175, 55, 0.1)',
                                    padding: '0.25rem 0.5rem',
                                    borderRadius: '0.25rem'
                                  }}>
                                    {coupon.code}
                                  </span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                  <span style={{ fontSize: '0.875rem', color: '#e5e7eb' }}>Discount:</span>
                                  <span style={{ fontSize: '0.875rem', color: '#d4af37', fontWeight: '600' }}>
                                    {coupon.discount_type === 'PERCENTAGE' 
                                      ? `${coupon.discount_value}%` 
                                      : `${coupon.discount_value} THB`}
                                  </span>
                                </div>
                              </div>
                              {coupon.expiry_date && (
                                <p style={{ fontSize: '0.75rem', color: '#9ca3af', marginTop: '0.5rem' }}>
                                  {coupon.status === 'EXPIRED' ? 'Expired' : 'Expires'}: {new Date(coupon.expiry_date).toLocaleDateString()}
                                </p>
                              )}
                              {coupon.used_date && (
                                <p style={{ fontSize: '0.75rem', color: '#9ca3af', marginTop: '0.5rem' }}>
                                  Used: {new Date(coupon.used_date).toLocaleDateString()}
                                </p>
                              )}
                              {coupon.redeem_date && (
                                <p style={{ fontSize: '0.75rem', color: '#9ca3af', marginTop: '0.5rem' }}>
                                  Redeemed: {new Date(coupon.redeem_date).toLocaleDateString()}
                                </p>
                              )}
                            </div>
                            <Ticket style={{ height: '2rem', width: '2rem', color: '#d4af37', opacity: 0.7 }} />
                          </div>
                        </Card>
                      );
                    })
                ) : (
                  <div style={{ textAlign: 'center', padding: '2rem', color: '#e5e7eb' }}>
                    <Ticket style={{ height: '3rem', width: '3rem', color: '#e5e7eb', margin: '0 auto 1rem', opacity: 0.5 }} />
                    <p>No {couponFilter === 'ALL' ? '' : couponFilter.toLowerCase()} coupons available</p>
                  </div>
                )}
              </div>

              {/* Summary Stats */}
              <div style={{ marginTop: '1.5rem', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem' }}>
                <Card style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)', border: '1px solid rgba(34, 197, 94, 0.3)', color: 'white' }}>
                  <CardContent style={{ padding: '0.75rem' }}>
                    <p style={{ fontSize: '0.75rem', color: '#e5e7eb', marginBottom: '0.25rem' }}>Available</p>
                    <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#4ade80' }}>
                      {coupons.filter(c => c.status === 'AVAILABLE').length}
                    </div>
                  </CardContent>
                </Card>
                <Card style={{ backgroundColor: 'rgba(156, 163, 175, 0.1)', border: '1px solid rgba(156, 163, 175, 0.3)', color: 'white' }}>
                  <CardContent style={{ padding: '0.75rem' }}>
                    <p style={{ fontSize: '0.75rem', color: '#e5e7eb', marginBottom: '0.25rem' }}>Used</p>
                    <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#9ca3af' }}>
                      {coupons.filter(c => c.status === 'USED').length}
                    </div>
                  </CardContent>
                </Card>
                <Card style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', color: 'white' }}>
                  <CardContent style={{ padding: '0.75rem' }}>
                    <p style={{ fontSize: '0.75rem', color: '#e5e7eb', marginBottom: '0.25rem' }}>Expired</p>
                    <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#f87171' }}>
                      {coupons.filter(c => c.status === 'EXPIRED').length}
                    </div>
                  </CardContent>
                </Card>
                <Card style={{ backgroundColor: 'rgba(234, 179, 8, 0.1)', border: '1px solid rgba(234, 179, 8, 0.3)', color: 'white' }}>
                  <CardContent style={{ padding: '0.75rem' }}>
                    <p style={{ fontSize: '0.75rem', color: '#e5e7eb', marginBottom: '0.25rem' }}>Redeem</p>
                    <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#facc15' }}>
                      {coupons.filter(c => c.status === 'REDEEM').length}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
