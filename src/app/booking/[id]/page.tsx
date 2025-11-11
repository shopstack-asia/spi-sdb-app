"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
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
import logoDark from "@/../public/qv_logo_h_white_bk.png";

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
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-white via-qv-ivory/80 to-qv-gold/25">
        <p className="font-secondary text-muted-foreground/80">Loading booking details…</p>
      </div>
    );
  }
 
  if (!booking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-white via-qv-ivory/80 to-qv-gold/25">
        <div className="rounded-3xl border border-qv-gold/30 bg-white/90 p-10 text-center shadow-qv-soft">
          <AlertCircle className="mx-auto mb-4 h-12 w-12 text-muted-foreground/70" />
          <h2 className="font-primary text-lg tracking-[0.28em] text-primary">
            Booking Not Found
          </h2>
          <p className="mt-2 font-secondary text-sm text-muted-foreground/80">
            The booking you&apos;re looking for doesn&apos;t exist.
          </p>
          <Button onClick={() => router.push("/booking")} variant="secondary" className="mt-6 px-6">
            Back to Bookings
          </Button>
        </div>
      </div>
    );
  }
 
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-qv-ivory/75 to-qv-gold/25">
      {/* Navigation */}
      <nav className="border-b border-qv-gold/30 bg-white/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Image src={logoDark} alt="Quantum Vault" width={160} height={44} className="h-10 w-auto" />
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="font-primary text-[0.68rem] uppercase tracking-[0.28em] text-primary hover:bg-qv-gold/10"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </div>
      </nav>
 
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div className="space-y-3">
              <p className="font-primary text-xs uppercase tracking-[0.3em] text-secondary">
                Booking Reference
              </p>
              <h1 className="font-primary text-3xl tracking-[0.24em] text-primary">
                Booking Details
              </h1>
              <p className="font-secondary text-base text-muted-foreground/90">
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
                className="border-qv-gold/30 text-primary hover:bg-qv-gold/10"
              >
                <Edit className="h-4 w-4 mr-2" />
                {isEditing ? "Cancel" : "Edit"}
              </Button>
            </div>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="inline-flex rounded-full border border-qv-gold/30 bg-white/80 p-1 shadow-sm">
            <TabsTrigger
              value="overview"
              className="rounded-full px-4 py-2 font-primary text-[0.68rem] uppercase tracking-[0.28em] text-muted-foreground/80 transition-all data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="visitors"
              className="rounded-full px-4 py-2 font-primary text-[0.68rem] uppercase tracking-[0.28em] text-muted-foreground/80 transition-all data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Visitors ({booking.visitors.length})
            </TabsTrigger>
            <TabsTrigger
              value="add-visitor"
              className="rounded-full px-4 py-2 font-primary text-[0.68rem] uppercase tracking-[0.28em] text-muted-foreground/80 transition-all data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Add Visitor
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {/* Booking Information */}
              <Card className="border-qv-gold/25 bg-white/90 text-foreground shadow-qv-soft">
                <CardHeader>
                  <CardTitle className="font-primary text-sm tracking-[0.3em] text-primary">
                    Booking Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-muted-foreground/70" />
                      <span className="font-secondary text-sm text-muted-foreground/80">Facility:</span>
                    </div>
                    <span className="font-primary text-sm tracking-[0.18em] text-primary">
                      {booking.facility.name}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <CalendarIcon className="h-4 w-4 text-muted-foreground/70" />
                      <span className="font-secondary text-sm text-muted-foreground/80">Date:</span>
                    </div>
                    <span className="font-secondary text-sm text-primary">
                      {new Date(booking.booking_date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-muted-foreground/70" />
                      <span className="font-secondary text-sm text-muted-foreground/80">Time:</span>
                    </div>
                    <span className="font-secondary text-sm text-primary">
                      {booking.start_time} - {booking.end_time}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="font-secondary text-sm text-muted-foreground/80">Purpose:</span>
                    </div>
                    <span className="font-secondary text-sm text-primary">{booking.purpose}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="font-secondary text-sm text-muted-foreground/80">Cost:</span>
                    </div>
                    <span className="font-primary text-sm tracking-[0.18em] text-secondary">
                      {booking.total_cost.toLocaleString()} {booking.currency}
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Facility Information */}
              <Card className="border-qv-gold/25 bg-white/90 text-foreground shadow-qv-soft">
                <CardHeader>
                  <CardTitle className="font-primary text-sm tracking-[0.3em] text-primary">
                    Facility Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-secondary text-sm text-muted-foreground/80">Type:</span>
                    <span className="font-secondary text-sm text-primary">
                      {booking.facility.type.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-secondary text-sm text-muted-foreground/80">Capacity:</span>
                    <span className="font-secondary text-sm text-primary">
                      {booking.facility.capacity} people
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-secondary text-sm text-muted-foreground/80">Hourly Rate:</span>
                    <span className="font-primary text-sm tracking-[0.18em] text-primary">
                      {booking.facility.hourly_rate.toLocaleString()} {booking.facility.currency}/hour
                    </span>
                  </div>
                  <div className="mt-4">
                    <p className="font-secondary text-sm text-muted-foreground/80">
                      {booking.facility.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Visitors Tab */}
          <TabsContent value="visitors" className="space-y-6">
            <Card className="border-qv-gold/25 bg-white/90 text-foreground shadow-qv-soft">
              <CardHeader>
                <CardTitle className="font-primary text-sm tracking-[0.3em] text-primary">
                  Visitor Management
                </CardTitle>
                <CardDescription className="font-secondary text-sm text-muted-foreground/80">
                  Manage visitors for this booking
                </CardDescription>
              </CardHeader>
              <CardContent>
                {booking.visitors.length === 0 ? (
                  <div className="py-10 text-center">
                    <Users className="mx-auto mb-4 h-12 w-12 text-muted-foreground/60" />
                    <p className="font-secondary text-sm text-muted-foreground/80">
                      No visitors added yet
                    </p>
                    <Button
                      onClick={() => setIsEditing(true)}
                      variant="secondary"
                      className="mt-4 px-6"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Visitor
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {booking.visitors.map((visitor) => (
                      <div
                        key={visitor.id}
                        className="rounded-2xl border border-qv-gold/20 bg-white/80 p-4 shadow-sm"
                      >
                        <div className="mb-4 flex items-center justify-between">
                          <div>
                            <h4 className="font-primary text-sm tracking-[0.2em] text-primary uppercase">
                              {visitor.full_name}
                            </h4>
                            <p className="font-secondary text-sm text-muted-foreground/80">
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
                                className="text-rose-500 hover:bg-rose-100 hover:text-rose-700"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
                          <div>
                            <span className="font-secondary text-muted-foreground/70">Relationship:</span>
                            <span className="ml-2 font-secondary text-primary">{visitor.relationship}</span>
                          </div>
                          <div>
                            <span className="font-secondary text-muted-foreground/70">Purpose:</span>
                            <span className="ml-2 font-secondary text-primary">{visitor.visit_purpose}</span>
                          </div>
                          {visitor.check_in_time && (
                            <div>
                              <span className="font-secondary text-muted-foreground/70">Check-in:</span>
                              <span className="ml-2 font-secondary text-primary">
                                {new Date(visitor.check_in_time).toLocaleString()}
                              </span>
                            </div>
                          )}
                          {visitor.check_out_time && (
                            <div>
                              <span className="font-secondary text-muted-foreground/70">Check-out:</span>
                              <span className="ml-2 font-secondary text-primary">
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
                              variant="secondary"
                              className="bg-emerald-600 hover:bg-emerald-700"
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
                              className="border-qv-gold/30 text-primary hover:bg-qv-gold/10"
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
            <Card className="border-qv-gold/25 bg-white/90 text-foreground shadow-qv-soft">
              <CardHeader>
                <CardTitle className="font-primary text-sm tracking-[0.3em] text-primary">
                  Add New Visitor
                </CardTitle>
                <CardDescription className="font-secondary text-sm text-muted-foreground/80">
                  Record visitor information for secure access management
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
                            <FormLabel className="text-primary">Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter full name" {...field} />
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
                            <FormLabel className="text-primary">ID Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
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
                            <FormLabel className="text-primary">ID Number</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter ID number" {...field} />
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
                            <FormLabel className="text-primary">Relationship</FormLabel>
                            <FormControl>
                              <Input
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
                            <FormLabel className="text-primary">Visit Purpose</FormLabel>
                            <FormControl>
                              <Textarea
                                className="min-h-[120px]"
                                placeholder="Describe the purpose of their visit..."
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="flex justify-end space-x-3">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => form.reset()}
                        className="border-qv-gold/30 text-primary hover:bg-qv-gold/10"
                      >
                        Reset
                      </Button>
                      <Button
                        type="submit"
                        disabled={isSaving}
                        variant="secondary"
                        className="px-6"
                      >
                        {isSaving ? "Saving..." : "Add Visitor"}
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
