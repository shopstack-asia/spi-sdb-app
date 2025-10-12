"use client";

import { useState, useEffect } from "react";
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
      <div className="min-h-screen bg-gradient-to-br from-spi-navy via-spi-navy to-spi-dark flex items-center justify-center">
        <div className="text-white">Loading subscription information...</div>
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
            Subscription Management
          </h1>
          <p className="text-spi-silver">
            Manage your membership and subscription packages
          </p>
        </div>

        <Tabs defaultValue="current" className="space-y-6">
          <TabsList className="bg-white/10 border-spi-silver/20">
            <TabsTrigger value="current" className="text-white data-[state=active]:bg-spi-gold data-[state=active]:text-spi-navy">
              Current Subscription
            </TabsTrigger>
            <TabsTrigger value="packages" className="text-white data-[state=active]:bg-spi-gold data-[state=active]:text-spi-navy">
              Available Packages
            </TabsTrigger>
            <TabsTrigger value="history" className="text-white data-[state=active]:bg-spi-gold data-[state=active]:text-spi-navy">
              Subscription History
            </TabsTrigger>
          </TabsList>

          {/* Current Subscription Tab */}
          <TabsContent value="current" className="space-y-6">
            {subscription ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Current Subscription Details */}
                <Card className="bg-white/10 border-spi-silver/20 text-white">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-spi-gold/20 rounded-lg">
                          {getPackageIcon(subscription.package.id)}
                        </div>
                        <div>
                          <CardTitle className="text-white">{subscription.package.name}</CardTitle>
                          <CardDescription className="text-spi-silver">
                            {subscription.package.description}
                          </CardDescription>
                        </div>
                      </div>
                      <Badge className={getStatusColor(subscription.status)}>
                        {subscription.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-spi-silver">Start Date:</span>
                      <span className="text-white">{new Date(subscription.start_date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-spi-silver">End Date:</span>
                      <span className="text-white">{new Date(subscription.end_date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-spi-silver">Auto Renew:</span>
                      <span className="text-white">{subscription.auto_renew ? 'Yes' : 'No'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-spi-silver">Price:</span>
                      <span className="text-white font-medium">
                        {subscription.package.price.toLocaleString()} {subscription.package.currency}
                      </span>
                    </div>
                  </CardContent>
                </Card>

                {/* Package Features */}
                <Card className="bg-white/10 border-spi-silver/20 text-white">
                  <CardHeader>
                    <CardTitle className="text-white">Package Features</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {subscription.package.features.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-spi-gold" />
                          <span className="text-white">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-6 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-spi-silver">Meeting Hours:</span>
                        <span className="text-white">
                          {subscription.package.max_meeting_hours === -1 
                            ? 'Unlimited' 
                            : `${subscription.package.max_meeting_hours} hours/month`
                          }
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-spi-silver">Vault Access:</span>
                        <span className="text-white">
                          {subscription.package.max_vault_access === -1 
                            ? 'Unlimited' 
                            : `${subscription.package.max_vault_access} hours/month`
                          }
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Subscription Actions */}
                <Card className="bg-white/10 border-spi-silver/20 text-white lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="text-white">Subscription Actions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button
                        onClick={handleRenew}
                        className="bg-spi-gold hover:bg-spi-gold/90 text-spi-navy"
                      >
                        <Zap className="h-4 w-4 mr-2" />
                        Renew Subscription
                      </Button>
                      <Button
                        onClick={handleCancel}
                        variant="outline"
                        className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                      >
                        Cancel Subscription
                      </Button>
                      <Button
                        variant="outline"
                        className="border-spi-silver text-spi-silver hover:bg-spi-silver/10"
                      >
                        <Settings className="h-4 w-4 mr-2" />
                        Manage Auto-Renew
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card className="bg-white/10 border-spi-silver/20 text-white">
                <CardContent className="text-center py-12">
                  <AlertCircle className="h-12 w-12 text-spi-silver mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-white mb-2">No Active Subscription</h3>
                  <p className="text-spi-silver mb-6">
                    You don&apos;t have an active subscription. Choose a package to get started.
                  </p>
                  <Button className="bg-spi-gold hover:bg-spi-gold/90 text-spi-navy">
                    View Available Packages
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Available Packages Tab */}
          <TabsContent value="packages" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {packages.map((pkg) => (
                <Card key={pkg.id} className="bg-white/10 border-spi-silver/20 text-white">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-spi-gold/20 rounded-lg">
                          {getPackageIcon(pkg.id)}
                        </div>
                        <div>
                          <CardTitle className="text-white">{pkg.name}</CardTitle>
                          <CardDescription className="text-spi-silver">
                            {pkg.duration_months} months
                          </CardDescription>
                        </div>
                      </div>
                      {subscription?.package.id === pkg.id && (
                        <Badge className="bg-spi-gold/20 text-spi-gold border-spi-gold/30">
                          Current
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-spi-silver">{pkg.description}</p>
                    
                    <div className="text-center">
                      <div className="text-3xl font-bold text-spi-gold">
                        {pkg.price.toLocaleString()}
                      </div>
                      <div className="text-spi-silver">{pkg.currency}</div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-white font-medium">Features:</h4>
                      {pkg.features.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-spi-gold" />
                          <span className="text-sm text-white">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-spi-silver">Meeting Hours:</span>
                        <span className="text-white">
                          {pkg.max_meeting_hours === -1 
                            ? 'Unlimited' 
                            : `${pkg.max_meeting_hours}/month`
                          }
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-spi-silver">Vault Access:</span>
                        <span className="text-white">
                          {pkg.max_vault_access === -1 
                            ? 'Unlimited' 
                            : `${pkg.max_vault_access} hours/month`
                          }
                        </span>
                      </div>
                    </div>

                    <Button
                      onClick={() => handleSubscribe(pkg.id)}
                      className="w-full bg-spi-gold hover:bg-spi-gold/90 text-spi-navy"
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
            <Card className="bg-white/10 border-spi-silver/20 text-white">
              <CardHeader>
                <CardTitle className="text-white">Subscription History</CardTitle>
                <CardDescription className="text-spi-silver">
                  Your subscription history and payment records
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Calendar className="h-12 w-12 text-spi-silver mx-auto mb-4" />
                  <p className="text-spi-silver">No subscription history available</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
