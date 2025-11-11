'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Shield,
  Calendar,
  CreditCard,
  Settings,
  Plus,
  ArrowRight,
  Coins,
  TrendingUp,
  TrendingDown,
  Ticket,
} from 'lucide-react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { SDBBooking, SDBSubscription, SDBPayment } from '@/types';
import { cn } from '@/lib/utils';

import logoDark from '@/../public/qv_logo_h_white_bk.png';

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

type CouponFilter = 'ALL' | 'AVAILABLE' | 'USED' | 'EXPIRED' | 'REDEEM';

type StatusTone = {
  bg: string;
  text: string;
  border: string;
};

const bookingStatusTone: Record<string, StatusTone> = {
  CONFIRMED: {
    bg: 'bg-emerald-50',
    text: 'text-emerald-700',
    border: 'border-emerald-200',
  },
  PENDING: {
    bg: 'bg-amber-50',
    text: 'text-amber-700',
    border: 'border-amber-200',
  },
  COMPLETED: {
    bg: 'bg-sky-50',
    text: 'text-sky-700',
    border: 'border-sky-200',
  },
  CANCELLED: {
    bg: 'bg-rose-50',
    text: 'text-rose-700',
    border: 'border-rose-200',
  },
};

const couponStatusTone: Record<Coupon['status'], StatusTone> = {
  AVAILABLE: {
    bg: 'bg-emerald-50',
    text: 'text-emerald-700',
    border: 'border-emerald-200',
  },
  USED: {
    bg: 'bg-slate-100',
    text: 'text-slate-600',
    border: 'border-slate-200',
  },
  EXPIRED: {
    bg: 'bg-rose-50',
    text: 'text-rose-700',
    border: 'border-rose-200',
  },
  REDEEM: {
    bg: 'bg-amber-50',
    text: 'text-amber-700',
    border: 'border-amber-200',
  },
};

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
  const [couponFilter, setCouponFilter] = useState<CouponFilter>('ALL');

  useEffect(() => {
    const mockUser: User = {
      id: 'test-user-id',
      first_name: 'Test',
      member_level: 'Gold Member',
    };

    const mockBookings: SDBBooking[] = [
      {
        id: 'book-001',
        member_id: mockUser.id,
        facility_id: 'fac-mr-a',
        facility: {
          id: 'fac-mr-a',
          name: 'Meeting Room A',
          type: 'MEETING_ROOM',
          capacity: 10,
          description: 'Spacious meeting room with projector',
          hourly_rate: 1000,
          currency: 'THB',
          is_active: true,
        },
        booking_date: '2025-10-15',
        start_time: '10:00',
        end_time: '11:00',
        status: 'CONFIRMED',
        total_cost: 1000,
        currency: 'THB',
        purpose: 'Business meeting',
        visitors: [],
        created_at: '2025-01-01T10:00:00Z',
        updated_at: '2025-01-01T10:00:00Z',
      },
    ];

    const mockSubscriptions: SDBSubscription[] = [
      {
        id: 'sub-001',
        member_id: mockUser.id,
        package_id: 'pkg-premium',
        package: {
          id: 'pkg-premium',
          name: 'Premium Vault Package',
          description: 'Premium vault access with meeting room privileges',
          price: 12000,
          currency: 'THB',
          duration_months: 12,
          features: ['Vault Access', 'Meeting Room', 'Priority Support'],
          max_meeting_hours: 20,
          max_vault_access: 10,
          is_active: true,
        },
        start_date: '2025-01-01T00:00:00Z',
        end_date: '2026-01-01T00:00:00Z',
        status: 'ACTIVE',
        auto_renew: true,
      },
    ];

    const mockPayments: SDBPayment[] = [
      {
        id: 'pay-001',
        member_id: mockUser.id,
        subscription_id: 'sub-001',
        amount: 12000,
        currency: 'THB',
        payment_method: 'CREDIT_CARD',
        status: 'COMPLETED',
        transaction_id: 'txn-001',
        payment_date: '2025-01-01T10:30:00Z',
        description: 'Premium Vault Package Renewal',
      },
    ];

    const mockTotalPoints = 1250;
    const mockPointHistory: PointHistory[] = [
      {
        id: 'ph-001',
        type: 'EARN',
        points: 100,
        description: 'Monthly subscription bonus',
        date: '2025-01-15T10:00:00Z',
      },
      {
        id: 'ph-002',
        type: 'EARN',
        points: 50,
        description: 'Facility booking reward',
        date: '2025-01-10T14:30:00Z',
      },
      {
        id: 'ph-003',
        type: 'REDEEM',
        points: -200,
        description: 'Redeemed for discount voucher',
        date: '2025-01-05T09:15:00Z',
      },
      {
        id: 'ph-004',
        type: 'EARN',
        points: 300,
        description: 'Welcome bonus',
        date: '2025-01-01T08:00:00Z',
      },
    ];

    const mockCoupons: Coupon[] = [
      {
        id: 'cpn-001',
        code: 'WELCOME10',
        name: 'Welcome Discount',
        description: '10% off on first booking',
        discount_type: 'PERCENTAGE',
        discount_value: 10,
        status: 'AVAILABLE',
        expiry_date: '2025-12-31T23:59:59Z',
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
        expiry_date: '2025-06-30T23:59:59Z',
      },
      {
        id: 'cpn-003',
        code: 'SUMMER20',
        name: 'Summer Sale',
        description: '20% off on all bookings',
        discount_type: 'PERCENTAGE',
        discount_value: 20,
        status: 'EXPIRED',
        expiry_date: '2024-12-31T23:59:59Z',
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
        expiry_date: '2025-12-31T23:59:59Z',
      },
      {
        id: 'cpn-005',
        code: 'VIP15',
        name: 'VIP Discount',
        description: '15% off for VIP members',
        discount_type: 'PERCENTAGE',
        discount_value: 15,
        status: 'AVAILABLE',
        expiry_date: '2025-06-30T23:59:59Z',
      },
    ];

    setUser(mockUser);
    setBookings(mockBookings);
    setSubscriptions(mockSubscriptions);
    setPayments(mockPayments);
    setTotalPoints(mockTotalPoints);
    setPointHistory(mockPointHistory);
    setCoupons(mockCoupons);
  }, []);

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-white via-qv-ivory/80 to-qv-gold/25">
        <p className="font-secondary text-muted-foreground">Loading member experience…</p>
      </div>
    );
  }

  const activeSubscription = subscriptions.find((sub) => sub.status === 'ACTIVE');
  const upcomingBookings = bookings.filter(
    (booking) => new Date(booking.booking_date) >= new Date()
  );

  const quickStats = [
    {
      title: 'Membership Status',
      value: user.member_level,
      subtitle: activeSubscription
        ? `Expires: ${new Date(activeSubscription.end_date).toLocaleDateString()}`
        : 'No active subscription',
      icon: Shield,
    },
    {
      title: 'Active Bookings',
      value: upcomingBookings.length.toString(),
      subtitle: 'Upcoming meetings',
      icon: Calendar,
    },
    {
      title: 'Next Payment',
      value: activeSubscription
        ? `${activeSubscription.package.price.toLocaleString()} THB`
        : '—',
      subtitle: activeSubscription
        ? `Due: ${new Date(activeSubscription.end_date).toLocaleDateString()}`
        : 'No upcoming payment',
      icon: CreditCard,
    },
    {
      title: 'Total Points',
      value: totalPoints.toLocaleString(),
      subtitle: 'Available points',
      icon: Coins,
    },
  ];

  const quickActions = [
    {
      label: 'Book Facility',
      description: 'Reserve meeting rooms or vault suites',
      icon: Plus,
      href: '/booking',
      variant: 'secondary' as const,
    },
    {
      label: 'Manage Subscription',
      description: 'Upgrade packages or adjust renewals',
      icon: Settings,
      href: '/subscription',
      variant: 'outline' as const,
    },
    {
      label: 'Payment History',
      description: 'Review invoices and receipts',
      icon: CreditCard,
      href: '/payment',
      variant: 'outline' as const,
    },
    {
      label: 'Show Point History',
      description: 'Track loyalty earnings and redemptions',
      icon: TrendingUp,
      action: () => setShowPointHistory(true),
      variant: 'outline' as const,
    },
    {
      label: 'My Coupons',
      description: 'Exclusive incentives for your vault suite',
      icon: Ticket,
      action: () => setShowCoupons(true),
      variant: 'outline' as const,
    },
  ];

  const filteredCoupons = coupons.filter(
    (coupon) => couponFilter === 'ALL' || coupon.status === couponFilter
  );

  const totalEarned = pointHistory
    .filter((item) => item.type === 'EARN')
    .reduce((sum, item) => sum + item.points, 0);
  const totalRedeemed = pointHistory
    .filter((item) => item.type === 'REDEEM')
    .reduce((sum, item) => sum + Math.abs(item.points), 0);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-white via-qv-ivory/80 to-qv-gold/25">
      <div className="pointer-events-none absolute inset-0 -z-10 seed-pod-pattern opacity-40" />

      <div className="relative mx-auto max-w-7xl px-6 py-12 space-y-12">
        <header className="flex flex-wrap items-start justify-between gap-6">
          <div className="max-w-3xl space-y-3">
            <p className="font-primary text-xs uppercase tracking-[0.3em] text-secondary">
              Member Control Centre
            </p>
            <h1 className="font-primary text-4xl tracking-[0.24em] text-primary">
              Welcome back, {user.first_name}!
            </h1>
            <p className="font-secondary text-base text-muted-foreground/90">
              Manage your bespoke custody membership, concierge bookings, and loyalty privileges within the Quantum Vault ecosystem.
            </p>
          </div>
          <Image src={logoDark} alt="Quantum Vault" width={200} height={56} className="h-12 w-auto" />
        </header>

        <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {quickStats.map((stat) => (
            <Card
              key={stat.title}
              className="border-qv-gold/25 bg-white/90 shadow-qv-soft"
            >
              <CardHeader className="flex flex-row items-start justify-between space-y-0">
                <CardTitle className="font-primary text-[0.7rem] uppercase tracking-[0.28em] text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-5 w-5 text-secondary" />
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="font-primary text-xl tracking-[0.2em] text-primary">
                  {stat.value}
                </p>
                <p className="font-secondary text-sm text-muted-foreground/80">
                  {stat.subtitle}
                </p>
              </CardContent>
            </Card>
          ))}
        </section>

        <section className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
          <div className="space-y-6">
            <Card className="border-qv-gold/25 bg-white/90 shadow-qv-soft">
              <CardHeader>
                <CardTitle className="font-primary text-sm tracking-[0.3em] text-primary">
                  Quick Actions
                </CardTitle>
                <CardDescription className="font-secondary text-sm text-muted-foreground/80">
                  Curated shortcuts for your most frequent concierge tasks
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {quickActions.map((action) => {
                  const Icon = action.icon;
                  const isPrimaryAction = action.variant === 'secondary';
                  const iconWrapperClass = cn(
                    'flex h-10 w-10 items-center justify-center rounded-full border px-0 text-secondary',
                    isPrimaryAction
                      ? 'border-white/30 bg-white/10 text-white'
                      : 'border-qv-gold/30 bg-qv-gold/10 text-secondary'
                  );
                  const labelClass = cn(
                    'font-primary text-xs uppercase tracking-[0.18em]',
                    isPrimaryAction ? 'text-white/90' : 'text-secondary'
                  );
                  const descriptionClass = cn(
                    'font-secondary text-[0.5rem] leading-relaxed',
                    isPrimaryAction ? 'text-white/85' : 'text-primary/80'
                  );
                  const arrowClass = cn(
                    'h-5 w-5 self-center hidden',
                    isPrimaryAction ? 'text-white/80' : 'text-primary'
                  );

                  const button = action.href ? (
                    <Link key={action.label} href={action.href}>
                      <Button
                        variant={action.variant}
                        className={cn(
                          'flex w-full items-center justify-between gap-4 rounded-2xl border-qv-gold/30 px-5 py-5 text-left shadow-sm transition hover:shadow-lg p-8 m-2',
                          isPrimaryAction
                            ? 'bg-qv-gold/90 text-white hover:bg-qv-gold'
                            : 'bg-white text-primary hover:bg-qv-gold/10'
                        )}
                      >
                        <span className="flex flex-1 items-center gap-4">
                          <span className={iconWrapperClass}>
                            <Icon className="h-5 w-5" />
                          </span>
                          <span className="flex flex-col">
                            <span className={labelClass}>{action.label}</span>
                            <span className={descriptionClass}>{action.description}</span>
                          </span>
                        </span>
                        <ArrowRight className={arrowClass} />
                      </Button>
                    </Link>
                  ) : (
                    <Button
                      key={action.label}
                      variant={action.variant}
                      onClick={action.action}
                      className={cn(
                        'flex w-full items-center justify-between gap-4 rounded-2xl border-qv-gold/30 px-5 py-5 text-left shadow-sm transition hover:shadow-lg p-8 m-2',
                        isPrimaryAction
                          ? 'bg-qv-gold/90 text-white hover:bg-qv-gold'
                          : 'bg-white text-primary hover:bg-qv-gold/10'
                      )}
                    >
                      <span className="flex flex-1 items-center gap-4">
                        <span className={iconWrapperClass}>
                          <Icon className="h-5 w-5" />
                        </span>
                        <span className="flex flex-col">
                          <span className={labelClass}>{action.label}</span>
                          <span className={descriptionClass}>{action.description}</span>
                        </span>
                      </span>
                      <ArrowRight className={arrowClass} />
                    </Button>
                  );

                  return button;
                })}
              </CardContent>
            </Card>

            {activeSubscription && (
              <Card className="border-qv-gold/25 bg-white/90 shadow-qv-soft">
                <CardHeader>
                  <CardTitle className="font-primary text-sm tracking-[0.3em] text-primary">
                    Current Subscription
                  </CardTitle>
                  <CardDescription className="font-secondary text-sm text-muted-foreground/80">
                    Overview of your active custody programme
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-secondary text-sm text-muted-foreground/80">Package</span>
                    <span className="font-primary text-sm tracking-[0.2em] text-primary uppercase">
                      {activeSubscription.package.name}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-secondary text-sm text-muted-foreground/80">Status</span>
                    <Badge className="rounded-full border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                      {activeSubscription.status}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-secondary text-sm text-muted-foreground/80">Expires</span>
                    <span className="font-secondary text-sm text-primary">
                      {new Date(activeSubscription.end_date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-secondary text-sm text-muted-foreground/80">Auto Renew</span>
                    <span className="font-secondary text-sm text-primary">
                      {activeSubscription.auto_renew ? 'Enabled' : 'Disabled'}
                    </span>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="space-y-6">
            <Card className="border-qv-gold/25 bg-white/90 shadow-qv-soft">
              <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <CardTitle className="font-primary text-sm tracking-[0.3em] text-primary">
                    Upcoming Bookings
                  </CardTitle>
                  <CardDescription className="font-secondary text-sm text-muted-foreground/80">
                    Your scheduled facility bookings
                  </CardDescription>
                </div>
                <Link href="/booking">
                  <Button variant="ghost" className="text-primary hover:bg-qv-gold/10">
                    View All
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                {upcomingBookings.length > 0 ? (
                  <div className="space-y-4">
                    {upcomingBookings.slice(0, 3).map((booking) => {
                      const tone = bookingStatusTone[booking.status] ?? bookingStatusTone.CONFIRMED;
                      return (
                        <div
                          key={booking.id}
                          className="rounded-2xl border border-qv-gold/20 bg-white/80 p-4 shadow-sm"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex flex-1 items-start gap-4">
                              <div className="rounded-xl border border-qv-gold/30 bg-qv-gold/10 p-3 text-secondary">
                                <Calendar className="h-5 w-5" />
                              </div>
                              <div>
                                <h4 className="font-primary text-base tracking-[0.2em] text-primary uppercase">
                                  {booking.facility.name}
                                </h4>
                                <p className="font-secondary text-sm text-muted-foreground/80">
                                  {new Date(booking.booking_date).toLocaleDateString()} · {booking.start_time} –{' '}
                                  {booking.end_time}
                                </p>
                              </div>
                            </div>
                            <Badge
                              className={cn(
                                'rounded-full px-3 py-1 text-xs font-medium',
                                tone.bg,
                                tone.text,
                                tone.border,
                                'border'
                              )}
                            >
                              {booking.status}
                            </Badge>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="rounded-2xl border border-dashed border-qv-gold/30 bg-white/70 p-10 text-center">
                    <Calendar className="mx-auto h-12 w-12 text-muted-foreground/60" />
                    <p className="mt-4 font-secondary text-sm text-muted-foreground/80">
                      No upcoming bookings
                    </p>
                    <Link href="/booking">
                      <Button className="mt-6 px-6">
                        Book a Facility
                      </Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="border-qv-gold/25 bg-white/90 shadow-qv-soft">
              <CardHeader>
                <CardTitle className="font-primary text-sm tracking-[0.3em] text-primary">
                  Recent Payments
                </CardTitle>
                <CardDescription className="font-secondary text-sm text-muted-foreground/80">
                  Concierge billing and subscription history
                </CardDescription>
              </CardHeader>
              <CardContent>
                {payments.length > 0 ? (
                  <div className="space-y-4">
                    {payments.slice(0, 4).map((payment) => (
                      <div
                        key={payment.id}
                        className="rounded-2xl border border-qv-gold/20 bg-white/80 p-4 shadow-sm"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-4">
                          <div className="flex items-start gap-4">
                            <div className="rounded-xl border border-qv-gold/30 bg-qv-gold/10 p-3 text-secondary">
                              <CreditCard className="h-5 w-5" />
                            </div>
                            <div>
                              <h4 className="font-primary text-base tracking-[0.2em] text-primary uppercase">
                                {payment.description}
                              </h4>
                              <p className="font-secondary text-sm text-muted-foreground/80">
                                {new Date(payment.payment_date).toLocaleDateString()} · {payment.payment_method}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="font-primary text-sm tracking-[0.18em] text-primary">
                              {payment.amount.toLocaleString()} {payment.currency}
                            </span>
                            <Badge className="rounded-full border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                              {payment.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center font-secondary text-sm text-muted-foreground/80">
                    No payment history available yet.
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </section>
      </div>

      <Dialog open={showPointHistory} onOpenChange={setShowPointHistory}>
        <DialogContent className="max-w-2xl border-qv-gold/25 bg-white/95 text-foreground shadow-qv-soft">
          <DialogHeader>
            <DialogTitle className="font-primary text-lg tracking-[0.28em] text-primary">
              Loyalty Point History
            </DialogTitle>
            <DialogDescription className="font-secondary text-sm text-muted-foreground/80">
              Review your earned and redeemed Quantum Vault loyalty points.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-6 space-y-6">
            <Card className="border-qv-gold/25 bg-white/90 shadow-qv-soft">
              <CardContent className="flex items-center justify-between gap-6 py-6">
                <div>
                  <p className="font-secondary text-sm text-muted-foreground/80">Total Points</p>
                  <p className="font-primary text-3xl tracking-[0.24em] text-primary">
                    {totalPoints.toLocaleString()}
                  </p>
                </div>
                <Coins className="h-10 w-10 text-secondary" />
              </CardContent>
            </Card>

            <div className="grid gap-4 sm:grid-cols-2">
              <Card className="border-emerald-200 bg-emerald-50 text-emerald-800">
                <CardContent className="py-5">
                  <p className="font-secondary text-xs uppercase tracking-[0.3em]">Earned</p>
                  <p className="mt-2 font-primary text-2xl tracking-[0.24em]">
                    +{totalEarned.toLocaleString()}
                  </p>
                </CardContent>
              </Card>
              <Card className="border-rose-200 bg-rose-50 text-rose-800">
                <CardContent className="py-5">
                  <p className="font-secondary text-xs uppercase tracking-[0.3em]">Redeemed</p>
                  <p className="mt-2 font-primary text-2xl tracking-[0.24em]">
                    -{totalRedeemed.toLocaleString()}
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <h3 className="font-primary text-sm tracking-[0.28em] text-primary">
                Transaction History
              </h3>
              <div className="max-h-80 space-y-3 overflow-y-auto pr-2">
                {pointHistory.length ? (
                  pointHistory.map((history) => {
                    const isEarn = history.type === 'EARN';
                    return (
                      <Card key={history.id} className="border-qv-gold/20 bg-white/90 shadow-sm">
                        <CardContent className="flex items-center justify-between gap-4 py-4">
                          <div className="flex items-center gap-4">
                            <div
                              className={cn(
                                'rounded-xl p-3',
                                isEarn ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                              )}
                            >
                              {isEarn ? <TrendingUp className="h-5 w-5" /> : <TrendingDown className="h-5 w-5" />}
                            </div>
                            <div>
                              <p className="font-primary text-sm tracking-[0.18em] text-primary">
                                {history.description}
                              </p>
                              <p className="font-secondary text-xs text-muted-foreground/70">
                                {new Date(history.date).toLocaleDateString()} ·{' '}
                                {new Date(history.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </p>
                            </div>
                          </div>
                          <span
                            className={cn(
                              'font-primary text-sm tracking-[0.18em]',
                              isEarn ? 'text-emerald-700' : 'text-rose-700'
                            )}
                          >
                            {isEarn ? '+' : ''}
                            {history.points.toLocaleString()}
                          </span>
                        </CardContent>
                      </Card>
                    );
                  })
                ) : (
                  <div className="rounded-xl border border-dashed border-qv-gold/30 bg-white/70 p-12 text-center">
                    <Coins className="mx-auto h-12 w-12 text-muted-foreground/60" />
                    <p className="mt-4 font-secondary text-sm text-muted-foreground/80">
                      No point history available.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showCoupons} onOpenChange={setShowCoupons}>
        <DialogContent className="max-w-3xl border-qv-gold/25 bg-white/95 text-foreground shadow-qv-soft">
          <DialogHeader>
            <DialogTitle className="font-primary text-lg tracking-[0.28em] text-primary">
              My Coupons
            </DialogTitle>
            <DialogDescription className="font-secondary text-sm text-muted-foreground/80">
              Exclusive incentives and rewards curated for your Quantum Vault membership.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-6 space-y-6">
            <div className="flex flex-wrap gap-2">
              {(['ALL', 'AVAILABLE', 'USED', 'EXPIRED', 'REDEEM'] as CouponFilter[]).map((filter) => (
                <Button
                  key={filter}
                  variant={couponFilter === filter ? 'secondary' : 'outline'}
                  onClick={() => setCouponFilter(filter)}
                  className={cn(
                    'rounded-full px-4 py-2 text-xs font-primary tracking-[0.24em]',
                    couponFilter === filter
                      ? 'bg-qv-gold/90 text-white hover:bg-qv-gold'
                      : 'border-qv-gold/30 text-primary hover:bg-qv-gold/10'
                  )}
                >
                  {filter}
                </Button>
              ))}
            </div>

            <div className="max-h-[420px] space-y-4 overflow-y-auto pr-2">
              {filteredCoupons.length ? (
                filteredCoupons.map((coupon) => {
                  const tone = couponStatusTone[coupon.status];
                  return (
                    <Card key={coupon.id} className="border-qv-gold/20 bg-white/90 shadow-sm">
                      <CardContent className="flex flex-col gap-3 py-5 sm:flex-row sm:items-start sm:justify-between">
                        <div className="space-y-2">
                          <div className="flex flex-wrap items-center gap-3">
                            <h4 className="font-primary text-base tracking-[0.2em] text-primary uppercase">
                              {coupon.name}
                            </h4>
                            <Badge
                              className={cn(
                                'rounded-full px-3 py-1 text-xs font-medium',
                                tone.bg,
                                tone.text,
                                tone.border,
                                'border'
                              )}
                            >
                              {coupon.status}
                            </Badge>
                          </div>
                          <p className="font-secondary text-sm text-muted-foreground/80">
                            {coupon.description}
                          </p>
                          <div className="flex flex-wrap items-center gap-4 text-sm">
                            <span className="font-secondary text-muted-foreground/70">
                              Discount:{' '}
                              <span className="font-primary text-sm tracking-[0.18em] text-primary">
                                {coupon.discount_type === 'PERCENTAGE'
                                  ? `${coupon.discount_value}%`
                                  : `${coupon.discount_value.toLocaleString()} THB`}
                              </span>
                            </span>
                            <span className="font-secondary text-muted-foreground/70">
                              Code:{' '}
                              <span className="rounded-md border border-qv-gold/30 bg-qv-gold/10 px-2 py-0.5 font-mono text-xs text-secondary">
                                {coupon.code}
                              </span>
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-4 text-xs text-muted-foreground/70">
                            {coupon.expiry_date && (
                              <span>
                                {coupon.status === 'EXPIRED' ? 'Expired' : 'Expires'}:{' '}
                                {new Date(coupon.expiry_date).toLocaleDateString()}
                              </span>
                            )}
                            {coupon.used_date && (
                              <span>
                                Used: {new Date(coupon.used_date).toLocaleDateString()}
                              </span>
                            )}
                            {coupon.redeem_date && (
                              <span>
                                Redeemed: {new Date(coupon.redeem_date).toLocaleDateString()}
                              </span>
                            )}
                          </div>
                        </div>
                        <Ticket className="h-10 w-10 text-secondary" />
                      </CardContent>
                    </Card>
                  );
                })
              ) : (
                <div className="rounded-xl border border-dashed border-qv-gold/30 bg-white/70 p-12 text-center">
                  <Ticket className="mx-auto h-12 w-12 text-muted-foreground/60" />
                  <p className="mt-4 font-secondary text-sm text-muted-foreground/80">
                    No {couponFilter === 'ALL' ? '' : couponFilter.toLowerCase()} coupons available right now.
                  </p>
                </div>
              )}
            </div>

            <div className="grid gap-4 sm:grid-cols-4">
              {Object.entries(couponStatusTone).map(([status, tone]) => (
                <Card
                  key={status}
                  className={cn('shadow-sm', tone.bg, tone.text, tone.border, 'border rounded-2xl')}
                >
                  <CardContent className="py-4 text-center">
                    <p className="font-secondary text-xs uppercase tracking-[0.3em]">
                      {status}
                    </p>
                    <p className="mt-2 font-primary text-lg tracking-[0.18em]">
                      {coupons.filter((coupon) => coupon.status === status).length}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
