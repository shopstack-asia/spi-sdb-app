"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Shield, 
  Calendar as CalendarIcon, 
  Clock, 
  Users, 
  MapPin,
  ArrowLeft,
  Plus,
  Trash2,
  CheckCircle,
  AlertCircle,
  Edit,
  Save,
  X
} from "lucide-react";
import { toast } from "sonner";
import { SDBBooking } from "@/types";

const visitorSchema = z.object({
  full_name: z.string().min(2, "Full name is required"),
  id_type: z.enum(["PASSPORT", "NATIONAL_ID", "DRIVER_LICENSE"]),
  id_number: z.string().min(5, "ID number is required"),
  relationship: z.string().min(2, "Relationship is required"),
  visit_purpose: z.string().min(5, "Visit purpose is required"),
});


type VisitorForm = z.infer<typeof visitorSchema>;

// Mock booking data
const mockBooking: SDBBooking = {
  id: "1",
  member_id: "1",
  facility_id: "1",
  booking_date: "2024-12-15",
  start_time: "09:00",
  end_time: "11:00",
  status: "CONFIRMED",
  total_cost: 2000,
  currency: "THB",
  purpose: "Business meeting with international clients",
  visitors: [
    {
      id: "1",
      booking_id: "1",
      full_name: "John Smith",
      id_type: "PASSPORT",
      id_number: "P123456789",
      relationship: "Client",
      visit_purpose: "Business discussion",
      check_in_time: "2024-12-15T09:00:00Z",
      check_out_time: "2024-12-15T11:00:00Z",
      status: "CHECKED_OUT"
    },
    {
      id: "2",
      booking_id: "1",
      full_name: "Sarah Johnson",
      id_type: "PASSPORT",
      id_number: "P987654321",
      relationship: "Client",
      visit_purpose: "Business discussion",
      check_in_time: "2024-12-15T09:15:00Z",
      check_out_time: undefined,
      status: "CHECKED_IN"
    }
  ],
  facility: {
    id: "1",
    name: "Executive Meeting Room",
    type: "MEETING_ROOM",
    capacity: 8,
    description: "Premium meeting room with AV equipment and presentation tools",
    hourly_rate: 1000,
    currency: "THB",
    is_active: true
  },
  created_at: "2024-12-01T10:00:00Z",
  updated_at: "2024-12-01T10:00:00Z"
};

export default function BookingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [booking, setBooking] = useState<SDBBooking | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const form = useForm<VisitorForm>({
    resolver: zodResolver(visitorSchema),
    defaultValues: {
      full_name: "",
      id_type: "PASSPORT",
      id_number: "",
      relationship: "",
      visit_purpose: "",
    },
  });

  useEffect(() => {
    // In real app, fetch booking from API
    const fetchBooking = async () => {
      await params;
      setTimeout(() => {
        setBooking(mockBooking);
        setIsLoading(false);
      }, 1000);
    };
    fetchBooking();
  }, [params]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'CONFIRMED':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'PENDING':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'COMPLETED':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'CANCELLED':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getVisitorStatusColor = (status: string) => {
    switch (status) {
      case 'CHECKED_IN':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'CHECKED_OUT':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'PENDING':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const handleCheckIn = async (visitorId: string) => {
    try {
      // In real app, call API to check in visitor
      console.log("Checking in visitor:", visitorId);
      toast.success("Visitor checked in successfully");
    } catch {
      toast.error("Failed to check in visitor");
    }
  };

  const handleCheckOut = async (visitorId: string) => {
    try {
      // In real app, call API to check out visitor
      console.log("Checking out visitor:", visitorId);
      toast.success("Visitor checked out successfully");
    } catch {
      toast.error("Failed to check out visitor");
    }
  };

  const handleAddVisitor = async (data: VisitorForm) => {
    try {
      setIsSaving(true);
      // In real app, call API to add visitor
      console.log("Adding visitor:", data);
      toast.success("Visitor added successfully");
      form.reset();
    } catch {
      toast.error("Failed to add visitor");
    } finally {
      setIsSaving(false);
    }
  };

  const handleRemoveVisitor = async (visitorId: string) => {
    try {
      // In real app, call API to remove visitor
      console.log("Removing visitor:", visitorId);
      toast.success("Visitor removed successfully");
    } catch {
      toast.error("Failed to remove visitor");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-spi-navy via-spi-navy to-spi-dark flex items-center justify-center">
        <div className="text-white">Loading booking details...</div>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-spi-navy via-spi-navy to-spi-dark flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-spi-silver mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-white mb-2">Booking Not Found</h2>
          <p className="text-spi-silver mb-4">The booking you&apos;re looking for doesn&apos;t exist.</p>
          <Button onClick={() => router.push("/booking")} className="bg-spi-gold hover:bg-spi-gold/90 text-spi-navy">
            Back to Bookings
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-spi-navy via-spi-navy to-spi-dark">
      {/* Navigation */}
      <nav className="border-b border-spi-silver/20 bg-spi-navy/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-spi-gold" />
              <span className="ml-2 text-xl font-bold text-white">SPI Safe Deposit</span>
            </div>
            <Button variant="ghost" onClick={() => router.back()} className="text-white hover:bg-spi-silver/20">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Booking Details
              </h1>
              <p className="text-spi-silver">
                {booking.facility.name} • {new Date(booking.booking_date).toLocaleDateString()}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Badge className={getStatusColor(booking.status)}>
                {booking.status}
              </Badge>
              <Button
                variant="outline"
                onClick={() => setIsEditing(!isEditing)}
                className="border-spi-silver text-spi-silver hover:bg-spi-silver/10"
              >
                <Edit className="h-4 w-4 mr-2" />
                {isEditing ? "Cancel" : "Edit"}
              </Button>
            </div>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-white/10 border-spi-silver/20">
            <TabsTrigger value="overview" className="text-white data-[state=active]:bg-spi-gold data-[state=active]:text-spi-navy">
              Overview
            </TabsTrigger>
            <TabsTrigger value="visitors" className="text-white data-[state=active]:bg-spi-gold data-[state=active]:text-spi-navy">
              Visitors ({booking.visitors.length})
            </TabsTrigger>
            <TabsTrigger value="add-visitor" className="text-white data-[state=active]:bg-spi-gold data-[state=active]:text-spi-navy">
              Add Visitor
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Booking Information */}
              <Card className="bg-white/10 border-spi-silver/20 text-white">
                <CardHeader>
                  <CardTitle className="text-white">Booking Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-spi-silver" />
                      <span className="text-spi-silver">Facility:</span>
                    </div>
                    <span className="text-white font-medium">{booking.facility.name}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <CalendarIcon className="h-4 w-4 text-spi-silver" />
                      <span className="text-spi-silver">Date:</span>
                    </div>
                    <span className="text-white">
                      {new Date(booking.booking_date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-spi-silver" />
                      <span className="text-spi-silver">Time:</span>
                    </div>
                    <span className="text-white">
                      {booking.start_time} - {booking.end_time}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-spi-silver">Purpose:</span>
                    </div>
                    <span className="text-white">{booking.purpose}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-spi-silver">Cost:</span>
                    </div>
                    <span className="text-white font-medium">
                      {booking.total_cost.toLocaleString()} {booking.currency}
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Facility Information */}
              <Card className="bg-white/10 border-spi-silver/20 text-white">
                <CardHeader>
                  <CardTitle className="text-white">Facility Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-spi-silver">Type:</span>
                    <span className="text-white">{booking.facility.type.replace('_', ' ')}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-spi-silver">Capacity:</span>
                    <span className="text-white">{booking.facility.capacity} people</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-spi-silver">Hourly Rate:</span>
                    <span className="text-white">
                      {booking.facility.hourly_rate.toLocaleString()} {booking.facility.currency}/hour
                    </span>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-spi-silver">{booking.facility.description}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Visitors Tab */}
          <TabsContent value="visitors" className="space-y-6">
            <Card className="bg-white/10 border-spi-silver/20 text-white">
              <CardHeader>
                <CardTitle className="text-white">Visitor Management</CardTitle>
                <CardDescription className="text-spi-silver">
                  Manage visitors for this booking
                </CardDescription>
              </CardHeader>
              <CardContent>
                {booking.visitors.length === 0 ? (
                  <div className="text-center py-8">
                    <Users className="h-12 w-12 text-spi-silver mx-auto mb-4" />
                    <p className="text-spi-silver mb-4">No visitors added yet</p>
                    <Button
                      onClick={() => setIsEditing(true)}
                      className="bg-spi-gold hover:bg-spi-gold/90 text-spi-navy"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Visitor
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {booking.visitors.map((visitor) => (
                      <div key={visitor.id} className="p-4 bg-white/5 rounded-lg border border-spi-silver/20">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h4 className="text-white font-medium">{visitor.full_name}</h4>
                            <p className="text-sm text-spi-silver">
                              {visitor.id_type} • {visitor.id_number}
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge className={getVisitorStatusColor(visitor.status)}>
                              {visitor.status}
                            </Badge>
                            {isEditing && (
                              <Button
                                onClick={() => handleRemoveVisitor(visitor.id)}
                                variant="ghost"
                                size="sm"
                                className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-spi-silver">Relationship:</span>
                            <span className="text-white ml-2">{visitor.relationship}</span>
                          </div>
                          <div>
                            <span className="text-spi-silver">Purpose:</span>
                            <span className="text-white ml-2">{visitor.visit_purpose}</span>
                          </div>
                          {visitor.check_in_time && (
                            <div>
                              <span className="text-spi-silver">Check-in:</span>
                              <span className="text-white ml-2">
                                {new Date(visitor.check_in_time).toLocaleString()}
                              </span>
                            </div>
                          )}
                          {visitor.check_out_time && (
                            <div>
                              <span className="text-spi-silver">Check-out:</span>
                              <span className="text-white ml-2">
                                {new Date(visitor.check_out_time).toLocaleString()}
                              </span>
                            </div>
                          )}
                        </div>

                        {visitor.status === 'PENDING' && (
                          <div className="flex justify-end mt-4 space-x-2">
                            <Button
                              onClick={() => handleCheckIn(visitor.id)}
                              size="sm"
                              className="bg-green-600 hover:bg-green-700 text-white"
                            >
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Check In
                            </Button>
                          </div>
                        )}

                        {visitor.status === 'CHECKED_IN' && (
                          <div className="flex justify-end mt-4 space-x-2">
                            <Button
                              onClick={() => handleCheckOut(visitor.id)}
                              size="sm"
                              variant="outline"
                              className="border-spi-silver text-spi-silver hover:bg-spi-silver/10"
                            >
                              Check Out
                            </Button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Add Visitor Tab */}
          <TabsContent value="add-visitor" className="space-y-6">
            <Card className="bg-white/10 border-spi-silver/20 text-white">
              <CardHeader>
                <CardTitle className="text-white">Add New Visitor</CardTitle>
                <CardDescription className="text-spi-silver">
                  Add a visitor to this booking
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(handleAddVisitor)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="full_name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Full Name</FormLabel>
                            <FormControl>
                              <Input
                                className="bg-white/10 border-spi-silver/20 text-white placeholder:text-spi-silver"
                                placeholder="Enter full name"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="id_type"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">ID Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="bg-white/10 border-spi-silver/20 text-white">
                                  <SelectValue placeholder="Select ID type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="PASSPORT">Passport</SelectItem>
                                <SelectItem value="NATIONAL_ID">National ID</SelectItem>
                                <SelectItem value="DRIVER_LICENSE">Driver License</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="id_number"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">ID Number</FormLabel>
                            <FormControl>
                              <Input
                                className="bg-white/10 border-spi-silver/20 text-white placeholder:text-spi-silver"
                                placeholder="Enter ID number"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="relationship"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Relationship</FormLabel>
                            <FormControl>
                              <Input
                                className="bg-white/10 border-spi-silver/20 text-white placeholder:text-spi-silver"
                                placeholder="e.g., Colleague, Client, Family"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="visit_purpose"
                        render={({ field }) => (
                          <FormItem className="md:col-span-2">
                            <FormLabel className="text-white">Visit Purpose</FormLabel>
                            <FormControl>
                              <Textarea
                                className="bg-white/10 border-spi-silver/20 text-white placeholder:text-spi-silver"
                                placeholder="Describe the purpose of their visit..."
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="flex justify-end space-x-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => form.reset()}
                        className="border-spi-silver text-spi-silver hover:bg-spi-silver/10"
                      >
                        <X className="h-4 w-4 mr-2" />
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        disabled={isSaving}
                        className="bg-spi-gold hover:bg-spi-gold/90 text-spi-navy"
                      >
                        {isSaving ? (
                          <>
                            <Save className="h-4 w-4 mr-2" />
                            Adding Visitor...
                          </>
                        ) : (
                          <>
                            <Plus className="h-4 w-4 mr-2" />
                            Add Visitor
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
