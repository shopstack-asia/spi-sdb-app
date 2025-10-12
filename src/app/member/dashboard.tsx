import { getCurrentUser } from '@/lib/actions';
import { getBookings, getSubscriptions, getPayments } from '@/lib/data-actions';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Calendar, CreditCard, Settings, Plus, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { SDBBooking, SDBSubscription, SDBPayment } from '@/types';

export default async function Dashboard() {
  // Get user data from server-side
  const user = await getCurrentUser();
  
  if (!user) {
    return (
      <div className="text-center py-12">
        <div className="text-white">Please log in to view your dashboard.</div>
      </div>
    );
  }

  // Add mock user level
  const userWithLevel = {
    ...user,
    member_level: "Gold Member"
  };

  // Mock data for demonstration
  const mockBookings = [
    {
      id: "book-001",
      member_id: user.id,
      facility: {
        id: "fac-mr-a",
        name: "Meeting Room A",
        type: "MEETING_ROOM"
      },
      booking_date: "2025-10-15",
      start_time: "10:00",
      end_time: "11:00",
      status: "CONFIRMED"
    },
    {
      id: "book-002", 
      member_id: user.id,
      facility: {
        id: "fac-pv-1",
        name: "Private Vault Room 1",
        type: "PRIVATE_VAULT"
      },
      booking_date: "2025-10-20",
      start_time: "14:00",
      end_time: "15:30",
      status: "PENDING"
    }
  ];

  const mockSubscriptions = [
    {
      id: "sub-001",
      member_id: user.id,
      package: {
        id: "pkg-premium",
        name: "Premium Vault Package",
        price: 12000,
        currency: "THB"
      },
      start_date: "2025-01-01T00:00:00Z",
      end_date: "2026-01-01T00:00:00Z",
      status: "ACTIVE",
      auto_renew: true
    }
  ];

  const mockPayments = [
    {
      id: "pay-001",
      member_id: user.id,
      amount: 12000,
      currency: "THB",
      payment_date: "2025-01-01T10:30:00Z",
      description: "Premium Vault Package Renewal",
      status: "COMPLETED",
      payment_method: "Credit Card"
    },
    {
      id: "pay-002",
      member_id: user.id,
      amount: 500,
      currency: "THB", 
      payment_date: "2025-09-10T14:00:00Z",
      description: "Meeting Room A Booking",
      status: "COMPLETED",
      payment_method: "Bank Transfer"
    }
  ];

  // Use mock data instead of API calls
  const bookings = mockBookings;
  const subscriptions = mockSubscriptions;
  const payments = mockPayments;

  console.log('🔵 Dashboard - bookings:', bookings);
  console.log('🔵 Dashboard - subscriptions:', subscriptions);
  console.log('🔵 Dashboard - payments:', payments);
  console.log('🔵 Dashboard - user:', userWithLevel);
  console.log('🔵 Dashboard - activeSubscription:', activeSubscription);

  const activeSubscription = (subscriptions as SDBSubscription[] || []).find((sub: SDBSubscription) => sub.status === 'ACTIVE');
  const upcomingBookings = (bookings as SDBBooking[] || []).filter((booking: SDBBooking) => 
    new Date(booking.booking_date) >= new Date()
  );

  return (
    <div 
      className="min-h-screen bg-spi-navy text-white" 
      style={{ 
        backgroundColor: '#0a1a2f', 
        color: 'white',
        minHeight: '100vh'
      }}
    >
      <div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
        style={{
          maxWidth: '80rem',
          margin: '0 auto',
          padding: '2rem 1rem'
        }}
      >
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Welcome back, {userWithLevel.first_name}!
          </h1>
          <p className="text-spi-silver">
            Manage your safe deposit box membership and bookings
          </p>
        </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-white/10 border-spi-silver/20 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Membership Status</CardTitle>
            <Shield className="h-4 w-4 text-spi-gold" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-spi-gold">{userWithLevel.member_level}</div>
            <p className="text-xs text-spi-silver">
              {activeSubscription ? `Expires: ${new Date(activeSubscription.end_date).toLocaleDateString()}` : 'No active subscription'}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white/10 border-spi-silver/20 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Bookings</CardTitle>
            <Calendar className="h-4 w-4 text-spi-gold" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-spi-gold">{upcomingBookings.length}</div>
            <p className="text-xs text-spi-silver">
              Upcoming meetings
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white/10 border-spi-silver/20 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Payment</CardTitle>
            <CreditCard className="h-4 w-4 text-spi-gold" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-spi-gold">
              {activeSubscription ? `${activeSubscription.package.price.toLocaleString()} THB` : 'N/A'}
            </div>
            <p className="text-xs text-spi-silver">
              {activeSubscription ? `Due: ${new Date(activeSubscription.end_date).toLocaleDateString()}` : 'No active subscription'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Quick Actions */}
        <div className="lg:col-span-1">
          <Card className="bg-white/10 border-spi-silver/20 text-white mb-6">
            <CardHeader>
              <CardTitle className="text-white">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <Link href="/booking">
                <button className="w-full bg-spi-gold hover:bg-spi-gold/90 text-spi-navy px-4 py-3 rounded-md flex items-center justify-center mb-2">
                  <Plus className="h-4 w-4 mr-2" />
                  Book Facility
                </button>
              </Link>
              <Link href="/subscription">
                <button className="w-full border border-spi-silver text-spi-silver hover:bg-spi-silver/10 px-4 py-3 rounded-md flex items-center justify-center mb-2">
                  <Settings className="h-4 w-4 mr-2" />
                  Manage Subscription
                </button>
              </Link>
              <Link href="/payment">
                <button className="w-full border border-spi-silver text-spi-silver hover:bg-spi-silver/10 px-4 py-3 rounded-md flex items-center justify-center">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Payment History
                </button>
              </Link>
            </CardContent>
          </Card>

          {/* Subscription Info */}
          {activeSubscription && (
            <Card className="bg-white/10 border-spi-silver/20 text-white">
              <CardHeader>
                <CardTitle className="text-white">Current Subscription</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-spi-silver">Package:</span>
                    <span className="text-white font-medium">{activeSubscription.package.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-spi-silver">Status:</span>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                      {activeSubscription.status}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-spi-silver">Expires:</span>
                    <span className="text-white">{new Date(activeSubscription.end_date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-spi-silver">Auto Renew:</span>
                    <span className="text-white">{activeSubscription.auto_renew ? 'Yes' : 'No'}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Column - Recent Activity */}
        <div className="lg:col-span-2">
          {/* Upcoming Bookings */}
          <Card className="bg-white/10 border-spi-silver/20 text-white mb-6">
            <CardHeader>
              <CardTitle className="text-white">Upcoming Bookings</CardTitle>
              <CardDescription className="text-spi-silver">
                Your scheduled facility bookings
              </CardDescription>
            </CardHeader>
            <CardContent>
              {upcomingBookings.length > 0 ? (
                <div className="space-y-4">
                  {upcomingBookings.slice(0, 3).map((booking: SDBBooking) => (
                    <div key={booking.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-spi-gold/20 rounded-lg">
                          <Calendar className="h-5 w-5 text-spi-gold" />
                        </div>
                        <div>
                          <h4 className="font-medium text-white">{booking.facility.name}</h4>
                          <p className="text-sm text-spi-silver">
                            {new Date(booking.booking_date).toLocaleDateString()} • {booking.start_time} - {booking.end_time}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={
                          booking.status === 'CONFIRMED' ? 'bg-green-500/20 text-green-400 border-green-500/30' :
                          booking.status === 'PENDING' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' :
                          'bg-gray-500/20 text-gray-400 border-gray-500/30'
                        }>
                          {booking.status}
                        </Badge>
                        <Link href={`/booking/${booking.id}`}>
                          <button className="text-spi-gold hover:text-spi-gold/80">
                            <ArrowRight className="h-4 w-4" />
                          </button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Calendar className="h-12 w-12 text-spi-silver mx-auto mb-4" />
                  <p className="text-spi-silver mb-4">No upcoming bookings</p>
                  <Link href="/booking">
                    <button className="bg-spi-gold hover:bg-spi-gold/90 text-spi-navy px-4 py-2 rounded-md">
                      Book a Facility
                    </button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Payments */}
          <Card className="bg-white/10 border-spi-silver/20 text-white">
            <CardHeader>
              <CardTitle className="text-white">Recent Payments</CardTitle>
              <CardDescription className="text-spi-silver">
                Your payment history
              </CardDescription>
            </CardHeader>
            <CardContent>
              {(payments as SDBPayment[] || []).length > 0 ? (
                <div className="space-y-4">
                  {(payments as SDBPayment[] || []).slice(0, 3).map((payment: SDBPayment) => (
                    <div key={payment.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-spi-gold/20 rounded-lg">
                          <CreditCard className="h-5 w-5 text-spi-gold" />
                        </div>
                        <div>
                          <h4 className="font-medium text-white">{payment.description}</h4>
                          <p className="text-sm text-spi-silver">
                            {new Date(payment.payment_date).toLocaleDateString()} • {payment.payment_method}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-white font-medium">
                          {payment.amount.toLocaleString()} {payment.currency}
                        </span>
                        <Badge className={
                          payment.status === 'COMPLETED' ? 'bg-green-500/20 text-green-400 border-green-500/30' :
                          payment.status === 'PENDING' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' :
                          'bg-red-500/20 text-red-400 border-red-500/30'
                        }>
                          {payment.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <CreditCard className="h-12 w-12 text-spi-silver mx-auto mb-4" />
                  <p className="text-spi-silver">No payment history</p>
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
