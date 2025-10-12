"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Shield, 
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
      <div className="min-h-screen bg-gradient-to-br from-spi-navy via-spi-navy to-spi-dark flex items-center justify-center">
        <div className="text-white">Loading payment history...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-spi-navy via-spi-navy to-spi-dark">
      {/* Navigation */}
      <nav className="border-b border-spi-silver/20 bg-spi-navy/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center">
              <Shield className="h-8 w-8 text-spi-gold" />
              <span className="ml-2 text-xl font-bold text-white">SPI Safe Deposit</span>
            </Link>
            <Link href="/member">
              <Button variant="ghost" className="text-white hover:bg-spi-silver/20">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Payment History
          </h1>
          <p className="text-spi-silver">
            View and manage your payment transactions
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white/10 border-spi-silver/20 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Paid</CardTitle>
              <DollarSign className="h-4 w-4 text-spi-gold" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-spi-gold">
                {totalAmount.toLocaleString()} THB
              </div>
              <p className="text-xs text-spi-silver">
                Completed transactions
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-spi-silver/20 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <AlertCircle className="h-4 w-4 text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-400">
                {pendingAmount.toLocaleString()} THB
              </div>
              <p className="text-xs text-spi-silver">
                Awaiting confirmation
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-spi-silver/20 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
              <Receipt className="h-4 w-4 text-spi-gold" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-spi-gold">
                {payments.length}
              </div>
              <p className="text-xs text-spi-silver">
                All transactions
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="bg-white/10 border-spi-silver/20 text-white mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-spi-silver" />
                  <Input
                    placeholder="Search transactions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-white/10 border-spi-silver/20 text-white placeholder:text-spi-silver"
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40 bg-white/10 border-spi-silver/20 text-white">
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
                  <SelectTrigger className="w-40 bg-white/10 border-spi-silver/20 text-white">
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
              <Card key={payment.id} className="bg-white/10 border-spi-silver/20 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-spi-gold/20 rounded-lg">
                        {getMethodIcon(payment.payment_method)}
                      </div>
                      <div>
                        <h4 className="text-white font-medium">{payment.description}</h4>
                        <div className="flex items-center space-x-4 text-sm text-spi-silver">
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
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="text-white font-medium">
                          {payment.amount.toLocaleString()} {payment.currency}
                        </div>
                        <Badge className={getStatusColor(payment.status)}>
                          {payment.status}
                        </Badge>
                      </div>
                      <Button
                        onClick={() => handleDownloadReceipt(payment.id)}
                        variant="outline"
                        size="sm"
                        className="border-spi-silver text-spi-silver hover:bg-spi-silver/10"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Receipt
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card className="bg-white/10 border-spi-silver/20 text-white">
              <CardContent className="text-center py-12">
                <Receipt className="h-12 w-12 text-spi-silver mx-auto mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">No payments found</h3>
                <p className="text-spi-silver">
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
