"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Shield, 
  Calendar, 
  Settings,
  ArrowLeft,
  Star,
  CheckCircle,
  AlertCircle,
  Crown,
  Zap
} from "lucide-react";
import { SDBPackage, SDBSubscription } from "@/types";
import logoDark from "@/../public/qv_logo_h_white_bk.png";

// Mock data
const mockPackages: SDBPackage[] = [
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
    max_meeting_hours: -1, // Unlimited
    max_vault_access: -1, // Unlimited
    is_active: true
  }
];

const mockSubscription: SDBSubscription = {
  id: "1",
  member_id: "1",
  package_id: "2",
  start_date: "2024-01-15",
  end_date: "2025-01-15",
  status: "ACTIVE",
  auto_renew: true,
  package: mockPackages[1]
};

export default function SubscriptionPage() {
  const [packages, setPackages] = useState<SDBPackage[]>([]);
  const [subscription, setSubscription] = useState<SDBSubscription | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In real app, fetch data from API
    setTimeout(() => {
      setPackages(mockPackages);
      setSubscription(mockSubscription);
      setIsLoading(false);
    }, 1000);
  }, []);

  const getPackageIcon = (packageId: string) => {
    switch (packageId) {
      case "1":
        return <Shield className="h-6 w-6" />;
      case "2":
        return <Star className="h-6 w-6" />;
      case "3":
        return <Crown className="h-6 w-6" />;
      default:
        return <Shield className="h-6 w-6" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'EXPIRED':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'CANCELLED':
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const handleSubscribe = async (packageId: string) => {
    try {
      // In real app, call API to subscribe
      console.log("Subscribing to package:", packageId);
    } catch (error) {
      console.error("Failed to subscribe:", error);
    }
  };

  const handleRenew = async () => {
    try {
      // In real app, call API to renew subscription
      console.log("Renewing subscription");
    } catch (error) {
      console.error("Failed to renew subscription:", error);
    }
  };

  const handleCancel = async () => {
    try {
      // In real app, call API to cancel subscription
      console.log("Cancelling subscription");
    } catch (error) {
      console.error("Failed to cancel subscription:", error);
    }
  };

  if (isLoading) {
     return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-white via-qv-ivory/80 to-qv-gold/25">
        <p className="font-secondary text-muted-foreground/80">Loading subscription information…</p>
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
            Membership Programmes
          </p>
          <h1 className="font-primary text-3xl tracking-[0.24em] text-primary">
            Subscription Management
          </h1>
          <p className="font-secondary text-base text-muted-foreground/90">
            Manage your membership and subscription packages with concierge precision.
          </p>
        </div>
 
        <Tabs defaultValue="current" className="space-y-6">
          <TabsList className="inline-flex rounded-full border border-qv-gold/30 bg-white/80 p-1 shadow-sm">
            <TabsTrigger
              value="current"
              className="rounded-full px-4 py-2 font-primary text-[0.68rem] uppercase tracking-[0.28em] text-muted-foreground/80 transition-all data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Current Subscription
            </TabsTrigger>
            <TabsTrigger
              value="packages"
              className="rounded-full px-4 py-2 font-primary text-[0.68rem] uppercase tracking-[0.28em] text-muted-foreground/80 transition-all data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Available Packages
            </TabsTrigger>
            <TabsTrigger
              value="history"
              className="rounded-full px-4 py-2 font-primary text-[0.68rem] uppercase tracking-[0.28em] text-muted-foreground/80 transition-all data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Subscription History
            </TabsTrigger>
          </TabsList>

          {/* Current Subscription Tab */}
          <TabsContent value="current" className="space-y-6">
            {subscription ? (
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {/* Current Subscription Details */}
                <Card className="border-qv-gold/25 bg-white/90 text-foreground shadow-qv-soft">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="rounded-xl border border-qv-gold/30 bg-qv-gold/10 p-3 text-secondary">
                          {getPackageIcon(subscription.package.id)}
                        </div>
                        <div>
                          <CardTitle className="font-primary text-base tracking-[0.2em] text-primary uppercase">
                            {subscription.package.name}
                          </CardTitle>
                          <CardDescription className="font-secondary text-sm text-muted-foreground/80">
                            {subscription.package.description}
                          </CardDescription>
                        </div>
                      </div>
                      <Badge className={getStatusColor(subscription.status)}>
                        {subscription.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="font-secondary text-sm text-muted-foreground/80">Start Date</span>
                      <span className="font-secondary text-sm text-primary">
                        {new Date(subscription.start_date).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-secondary text-sm text-muted-foreground/80">End Date</span>
                      <span className="font-secondary text-sm text-primary">
                        {new Date(subscription.end_date).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-secondary text-sm text-muted-foreground/80">Auto Renew</span>
                      <span className="font-secondary text-sm text-primary">
                        {subscription.auto_renew ? 'Enabled' : 'Disabled'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-secondary text-sm text-muted-foreground/80">Price</span>
                      <span className="font-primary text-sm tracking-[0.18em] text-secondary">
                        {subscription.package.price.toLocaleString()} {subscription.package.currency}
                      </span>
                    </div>
                  </CardContent>
                </Card>

                {/* Package Features */}
                <Card className="border-qv-gold/25 bg-white/90 text-foreground shadow-qv-soft">
                  <CardHeader>
                    <CardTitle className="font-primary text-sm tracking-[0.3em] text-primary">
                      Package Features
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      {subscription.package.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-secondary" />
                          <span className="font-secondary text-sm text-primary">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-secondary text-sm text-muted-foreground/80">Meeting Hours</span>
                        <span className="font-secondary text-sm text-primary">
                          {subscription.package.max_meeting_hours === -1
                            ? 'Unlimited'
                            : `${subscription.package.max_meeting_hours} hours/month`}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-secondary text-sm text-muted-foreground/80">Vault Access</span>
                        <span className="font-secondary text-sm text-primary">
                          {subscription.package.max_vault_access === -1
                            ? 'Unlimited'
                            : `${subscription.package.max_vault_access} hours/month`}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Subscription Actions */}
                <Card className="border-qv-gold/25 bg-white/90 text-foreground shadow-qv-soft lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="font-primary text-sm tracking-[0.3em] text-primary">
                      Subscription Actions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col gap-4 sm:flex-row">
                      <Button onClick={handleRenew} variant="secondary" className="px-6">
                        <Zap className="mr-2 h-4 w-4" />
                        Renew Subscription
                      </Button>
                      <Button
                        onClick={handleCancel}
                        variant="outline"
                        className="border-rose-300 text-rose-600 hover:bg-rose-100"
                      >
                        Cancel Subscription
                      </Button>
                      <Button
                        variant="outline"
                        className="border-qv-gold/30 text-primary hover:bg-qv-gold/10"
                      >
                        <Settings className="mr-2 h-4 w-4" />
                        Manage Auto-Renew
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card className="border-qv-gold/25 bg-white/90 text-foreground shadow-qv-soft">
                <CardContent className="py-12 text-center">
                  <AlertCircle className="mx-auto mb-4 h-12 w-12 text-muted-foreground/60" />
                  <h3 className="font-primary text-lg tracking-[0.24em] text-primary">
                    No Active Subscription
                  </h3>
                  <p className="mt-2 font-secondary text-sm text-muted-foreground/80">
                    You don&apos;t have an active subscription. Choose a package to get started.
                  </p>
                  <Button variant="secondary" className="mt-6 px-6">
                    View Available Packages
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Available Packages Tab */}
          <TabsContent value="packages" className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {packages.map((pkg) => (
                <Card key={pkg.id} className="border-qv-gold/25 bg-white/90 text-foreground shadow-qv-soft">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="rounded-xl border border-qv-gold/30 bg-qv-gold/10 p-3 text-secondary">
                          {getPackageIcon(pkg.id)}
                        </div>
                        <div>
                          <CardTitle className="font-primary text-base tracking-[0.2em] text-primary uppercase">
                            {pkg.name}
                          </CardTitle>
                          <CardDescription className="font-secondary text-sm text-muted-foreground/80">
                            {pkg.duration_months} months
                          </CardDescription>
                        </div>
                      </div>
                      {subscription?.package.id === pkg.id && (
                        <Badge className="border-qv-gold/30 bg-qv-gold/15 text-secondary">
                          Current
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="font-secondary text-sm text-muted-foreground/80">{pkg.description}</p>
                    
                    <div className="text-center">
                      <div className="font-primary text-3xl tracking-[0.24em] text-secondary">
                        {pkg.price.toLocaleString()}
                      </div>
                      <div className="font-secondary text-sm text-muted-foreground/80">{pkg.currency}</div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-primary text-sm tracking-[0.3em] text-primary">
                        Features
                      </h4>
                      {pkg.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-secondary" />
                          <span className="font-secondary text-sm text-primary">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="font-secondary text-muted-foreground/80">Meeting Hours</span>
                        <span className="font-secondary text-primary">
                          {pkg.max_meeting_hours === -1 
                            ? 'Unlimited' 
                            : `${pkg.max_meeting_hours}/month`
                          }
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-secondary text-muted-foreground/80">Vault Access</span>
                        <span className="font-secondary text-primary">
                          {pkg.max_vault_access === -1 
                            ? 'Unlimited' 
                            : `${pkg.max_vault_access} hours/month`
                          }
                        </span>
                      </div>
                    </div>

                    <Button
                      onClick={() => handleSubscribe(pkg.id)}
                      variant="secondary"
                      className="w-full"
                      disabled={subscription?.package.id === pkg.id}
                    >
                      {subscription?.package.id === pkg.id ? 'Current Package' : 'Subscribe'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Subscription History Tab */}
          <TabsContent value="history" className="space-y-6">
            <Card className="border-qv-gold/25 bg-white/90 text-foreground shadow-qv-soft">
              <CardHeader>
                <CardTitle className="font-primary text-sm tracking-[0.3em] text-primary">
                  Subscription History
                </CardTitle>
                <CardDescription className="font-secondary text-sm text-muted-foreground/80">
                  Your subscription history and payment records
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="py-8 text-center">
                  <Calendar className="mx-auto mb-4 h-12 w-12 text-muted-foreground/60" />
                  <p className="font-secondary text-sm text-muted-foreground/80">
                    No subscription history available
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
