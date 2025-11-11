"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  CreditCard, 
  Download, 
  Search,
  ArrowLeft,
  Calendar,
  DollarSign,
  Receipt,
  AlertCircle
} from "lucide-react";
import { SDBPayment } from "@/types";
import logoDark from "@/../public/qv_logo_h_white_bk.png";

// Mock payment data
const mockPayments: SDBPayment[] = [
  {
    id: "1",
    member_id: "1",
    subscription_id: "1",
    amount: 50000,
    currency: "THB",
    payment_method: "CREDIT_CARD",
    status: "COMPLETED",
    transaction_id: "TXN123456789",
    payment_date: "2024-01-15",
    description: "Premium Vault Package - Annual Payment"
  },
  {
    id: "2",
    member_id: "1",
    booking_id: "1",
    amount: 2000,
    currency: "THB",
    payment_method: "CREDIT_CARD",
    status: "COMPLETED",
    transaction_id: "TXN987654321",
    payment_date: "2024-12-01",
    description: "Executive Meeting Room - 2 hours"
  },
  {
    id: "3",
    member_id: "1",
    subscription_id: "1",
    amount: 50000,
    currency: "THB",
    payment_method: "BANK_TRANSFER",
    status: "PENDING",
    transaction_id: "TXN456789123",
    payment_date: "2024-12-15",
    description: "Premium Vault Package - Renewal Payment"
  },
  {
    id: "4",
    member_id: "1",
    booking_id: "2",
    amount: 3000,
    currency: "THB",
    payment_method: "CREDIT_CARD",
    status: "FAILED",
    transaction_id: "TXN789123456",
    payment_date: "2024-11-20",
    description: "Conference Room A - 2 hours"
  }
];

export default function PaymentPage() {
  const [payments, setPayments] = useState<SDBPayment[]>([]);
  const [filteredPayments, setFilteredPayments] = useState<SDBPayment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [methodFilter, setMethodFilter] = useState("all");

  useEffect(() => {
    // In real app, fetch payments from API
    setTimeout(() => {
      setPayments(mockPayments);
      setFilteredPayments(mockPayments);
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = payments;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(payment =>
        payment.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.transaction_id?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter(payment => payment.status === statusFilter);
    }

    // Filter by payment method
    if (methodFilter !== "all") {
      filtered = filtered.filter(payment => payment.payment_method === methodFilter);
    }

    setFilteredPayments(filtered);
  }, [payments, searchTerm, statusFilter, methodFilter]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'PENDING':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'FAILED':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'REFUNDED':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getMethodIcon = (method: string) => {
    switch (method) {
      case 'CREDIT_CARD':
        return <CreditCard className="h-4 w-4" />;
      case 'BANK_TRANSFER':
        return <DollarSign className="h-4 w-4" />;
      case 'CASH':
        return <DollarSign className="h-4 w-4" />;
      default:
        return <CreditCard className="h-4 w-4" />;
    }
  };

  const handleDownloadReceipt = async (paymentId: string) => {
    try {
      // In real app, generate and download receipt
      console.log("Downloading receipt for payment:", paymentId);
    } catch (error) {
      console.error("Failed to download receipt:", error);
    }
  };

  const totalAmount = payments
    .filter(p => p.status === 'COMPLETED')
    .reduce((sum, payment) => sum + payment.amount, 0);

  const pendingAmount = payments
    .filter(p => p.status === 'PENDING')
    .reduce((sum, payment) => sum + payment.amount, 0);

  if (isLoading) {
     return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-white via-qv-ivory/80 to-qv-gold/25">
        <p className="font-secondary text-muted-foreground/80">Loading payment history…</p>
      </div>
     );
   }
 
   return (
    <div className="min-h-screen bg-gradient-to-br from-white via-qv-ivory/80 to-qv-gold/25">
      {/* Navigation */}
      <nav className="border-b border-qv-gold/30 bg-white/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <Image src={logoDark} alt="Quantum Vault" width={160} height={44} className="h-10 w-auto" />
          </Link>
          <Link href="/member">
            <Button variant="ghost" className="font-primary text-[0.68rem] uppercase tracking-[0.28em] text-primary hover:bg-qv-gold/10">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </nav>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 space-y-3">
          <p className="font-primary text-xs uppercase tracking-[0.3em] text-secondary">
            Concierge Billing
          </p>
          <h1 className="font-primary text-3xl tracking-[0.24em] text-primary">
            Payment History
          </h1>
          <p className="font-secondary text-base text-muted-foreground/90">
            View and manage your payment transactions across subscriptions and facility bookings.
          </p>
        </div>

        {/* Summary Cards */}
        <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          <Card className="border-qv-gold/25 bg-white/90 text-foreground shadow-qv-soft">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="font-primary text-sm tracking-[0.3em] text-primary">
                Total Paid
              </CardTitle>
              <DollarSign className="h-5 w-5 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="font-primary text-2xl tracking-[0.22em] text-secondary">
                {totalAmount.toLocaleString()} THB
              </div>
              <p className="font-secondary text-xs text-muted-foreground/80">
                Completed transactions
              </p>
            </CardContent>
          </Card>

          <Card className="border-qv-gold/25 bg-white/90 text-foreground shadow-qv-soft">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="font-primary text-sm tracking-[0.3em] text-primary">
                Pending
              </CardTitle>
              <AlertCircle className="h-5 w-5 text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="font-primary text-2xl tracking-[0.22em] text-amber-600">
                {pendingAmount.toLocaleString()} THB
              </div>
              <p className="font-secondary text-xs text-muted-foreground/80">
                Awaiting confirmation
              </p>
            </CardContent>
          </Card>

          <Card className="border-qv-gold/25 bg-white/90 text-foreground shadow-qv-soft">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="font-primary text-sm tracking-[0.3em] text-primary">
                Total Transactions
              </CardTitle>
              <Receipt className="h-5 w-5 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="font-primary text-2xl tracking-[0.22em] text-secondary">
                {payments.length}
              </div>
              <p className="font-secondary text-xs text-muted-foreground/80">
                All transactions
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-8 border-qv-gold/25 bg-white/90 text-foreground shadow-qv-soft">
          <CardContent className="p-6">
            <div className="flex flex-col gap-4 md:flex-row">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/60" />
                  <Input
                    placeholder="Search transactions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="COMPLETED">Completed</SelectItem>
                    <SelectItem value="PENDING">Pending</SelectItem>
                    <SelectItem value="FAILED">Failed</SelectItem>
                    <SelectItem value="REFUNDED">Refunded</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={methodFilter} onValueChange={setMethodFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Methods</SelectItem>
                    <SelectItem value="CREDIT_CARD">Credit Card</SelectItem>
                    <SelectItem value="BANK_TRANSFER">Bank Transfer</SelectItem>
                    <SelectItem value="CASH">Cash</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment List */}
        <div className="space-y-4">
          {filteredPayments.length > 0 ? (
            filteredPayments.map((payment) => (
              <Card key={payment.id} className="border-qv-gold/25 bg-white/90 text-foreground shadow-qv-soft">
                <CardContent className="flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex flex-1 items-start gap-4">
                    <div className="rounded-xl border border-qv-gold/30 bg-qv-gold/10 p-3 text-secondary">
                      {getMethodIcon(payment.payment_method)}
                    </div>
                    <div>
                      <h4 className="font-primary text-base tracking-[0.2em] text-primary uppercase">
                        {payment.description}
                      </h4>
                      <div className="mt-1 flex flex-wrap items-center gap-4 text-xs text-muted-foreground/70">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3" />
                          <span>{new Date(payment.payment_date).toLocaleDateString()}</span>
                        </div>
                        {payment.transaction_id && (
                          <div className="flex items-center space-x-1">
                            <span>ID: {payment.transaction_id}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="font-primary text-sm tracking-[0.18em] text-primary">
                        {payment.amount.toLocaleString()} {payment.currency}
                      </p>
                      <Badge className={getStatusColor(payment.status)}>
                        {payment.status}
                      </Badge>
                    </div>
                    <Button
                      onClick={() => handleDownloadReceipt(payment.id)}
                      variant="outline"
                      size="sm"
                      className="border-qv-gold/30 text-primary hover:bg-qv-gold/10"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Receipt
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card className="border-qv-gold/25 bg-white/90 text-foreground shadow-qv-soft">
              <CardContent className="py-12 text-center">
                <Receipt className="mx-auto mb-4 h-12 w-12 text-muted-foreground/60" />
                <h3 className="font-primary text-lg tracking-[0.24em] text-primary">
                  No payments found
                </h3>
                <p className="mt-2 font-secondary text-sm text-muted-foreground/80">
                  {searchTerm || statusFilter !== "all" || methodFilter !== "all"
                    ? "No payments match your current filters."
                    : "You don't have any payment history yet."
                  }
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
