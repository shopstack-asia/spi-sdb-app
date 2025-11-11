"use client";

import { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { 
  Shield, 
  Calendar as CalendarIcon, 
  Clock, 
  Users, 
  MapPin,
  ArrowLeft,
  Plus,
  Trash2
} from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import { SDBFacility } from "@/types";
import logoDark from "@/../public/qv_logo_h_white_bk.png";

const bookingSchema = z.object({
  facility_id: z.string().min(1, "Please select a facility"),
  booking_date: z.string().min(1, "Please select a date"),
  start_time: z.string().min(1, "Please select start time"),
  end_time: z.string().min(1, "Please select end time"),
  purpose: z.string().min(5, "Please provide a purpose for the booking"),
  visitors: z.array(z.object({
    full_name: z.string().min(2, "Full name is required"),
    id_type: z.enum(["PASSPORT", "NATIONAL_ID", "DRIVER_LICENSE"]),
    id_number: z.string().min(5, "ID number is required"),
    relationship: z.string().min(2, "Relationship is required"),
    visit_purpose: z.string().min(5, "Visit purpose is required"),
  })).optional(),
});

type BookingForm = z.infer<typeof bookingSchema>;

// Mock facilities
const mockFacilities: SDBFacility[] = [
  {
    id: "1",
    name: "Executive Meeting Room",
    type: "MEETING_ROOM",
    capacity: 8,
    description: "Premium meeting room with AV equipment and presentation tools",
    hourly_rate: 1000,
    currency: "THB",
    is_active: true
  },
  {
    id: "2",
    name: "Conference Room A",
    type: "CONFERENCE_ROOM",
    capacity: 20,
    description: "Large conference room for business meetings and presentations",
    hourly_rate: 1500,
    currency: "THB",
    is_active: true
  },
  {
    id: "3",
    name: "Private Vault Room",
    type: "VAULT_ROOM",
    capacity: 4,
    description: "Private room for accessing your safe deposit box",
    hourly_rate: 500,
    currency: "THB",
    is_active: true
  }
];

const timeSlots = [
  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
  "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30"
];

function NewBookingPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [facilities, setFacilities] = useState<SDBFacility[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<BookingForm>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      facility_id: searchParams.get("facility") || "",
      booking_date: "",
      start_time: "",
      end_time: "",
      purpose: "",
      visitors: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "visitors",
  });

  useEffect(() => {
    // In real app, fetch facilities from API
    setFacilities(mockFacilities);
  }, []);

  const selectedFacility = facilities.find(f => f.id === form.watch("facility_id"));
  const startTime = form.watch("start_time");
  const endTime = form.watch("end_time");

  const calculateCost = () => {
    if (!selectedFacility || !startTime || !endTime) return 0;
    
    const start = new Date(`2000-01-01T${startTime}`);
    const end = new Date(`2000-01-01T${endTime}`);
    const hours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
    
    return Math.ceil(hours) * selectedFacility.hourly_rate;
  };

  const onSubmit = async (data: BookingForm) => {
    setIsLoading(true);
    try {
      // Here you would call your API
      console.log("Booking data:", data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success("Booking created successfully!");
      router.push("/booking");
    } catch {
      toast.error("Failed to create booking. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const addVisitor = () => {
    append({
      full_name: "",
      id_type: "PASSPORT",
      id_number: "",
      relationship: "",
      visit_purpose: "",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-qv-ivory/75 to-qv-gold/25">
      {/* Navigation */}
      <nav className="border-b border-qv-gold/30 bg-white/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Image src={logoDark} alt="Quantum Vault" width={160} height={44} className="h-10 w-auto" />
          </div>
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

      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 space-y-3">
          <p className="font-primary text-xs uppercase tracking-[0.3em] text-secondary">
            Concierge Scheduling
          </p>
          <h1 className="font-primary text-3xl tracking-[0.24em] text-primary">
            Create New Booking
          </h1>
          <p className="font-secondary text-base text-muted-foreground/90">
            Book a facility and orchestrate visitor access with Quantum Vault discretion.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Facility Selection */}
            <Card className="border-qv-gold/25 bg-white/90 text-foreground shadow-qv-soft">
              <CardHeader>
                <CardTitle className="font-primary text-sm tracking-[0.3em] text-primary">
                  Select Facility
                </CardTitle>
                <CardDescription className="font-secondary text-sm text-muted-foreground/80">
                  Choose the facility you want to book
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="facility_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-primary">Facility</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a facility" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {facilities.map((facility) => (
                            <SelectItem key={facility.id} value={facility.id}>
                              <div className="flex items-center space-x-2">
                                <MapPin className="h-4 w-4" />
                                <span>{facility.name}</span>
                                <span className="text-muted-foreground/70">
                                  ({facility.hourly_rate.toLocaleString()} THB/hour)
                                </span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {selectedFacility && (
                  <div className="mt-4 rounded-2xl border border-qv-gold/20 bg-white/80 p-4">
                    <h4 className="font-primary text-base tracking-[0.2em] text-primary uppercase">
                      {selectedFacility.name}
                    </h4>
                    <p className="mt-2 font-secondary text-sm text-muted-foreground/80">
                      {selectedFacility.description}
                    </p>
                    <div className="mt-4 flex justify-between text-sm">
                      <span className="font-secondary text-muted-foreground/70">Capacity</span>
                      <span className="font-secondary text-primary">
                        {selectedFacility.capacity} people
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="font-secondary text-muted-foreground/70">Rate</span>
                      <span className="font-primary text-sm tracking-[0.18em] text-primary">
                        {selectedFacility.hourly_rate.toLocaleString()} {selectedFacility.currency}/hour
                      </span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Date and Time Selection */}
            <Card className="border-qv-gold/25 bg-white/90 text-foreground shadow-qv-soft">
              <CardHeader>
                <CardTitle className="font-primary text-sm tracking-[0.3em] text-primary">
                  Date & Time
                </CardTitle>
                <CardDescription className="font-secondary text-sm text-muted-foreground/80">
                  Select your preferred date and time
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="booking_date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-primary">Booking Date</FormLabel>
                      <Popover open={showCalendar} onOpenChange={setShowCalendar}>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className="w-full justify-start text-left border-qv-gold/30 text-primary hover:bg-qv-gold/10"
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={(date) => {
                              setSelectedDate(date);
                              field.onChange(date ? format(date, "yyyy-MM-dd") : "");
                              setShowCalendar(false);
                            }}
                            disabled={(date) => date < new Date()}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="start_time"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-primary">Start Time</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select start time" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {timeSlots.map((time) => (
                              <SelectItem key={time} value={time}>
                                <div className="flex items-center space-x-2">
                                  <Clock className="h-4 w-4" />
                                  <span>{time}</span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="end_time"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-primary">End Time</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select end time" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {timeSlots.map((time) => (
                              <SelectItem key={time} value={time}>
                                <div className="flex items-center space-x-2">
                                  <Clock className="h-4 w-4" />
                                  <span>{time}</span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {startTime && endTime && selectedFacility && (
                  <div className="rounded-2xl border border-qv-gold/30 bg-qv-gold/10 p-4">
                    <div className="flex items-center justify-between">
                      <span className="font-primary text-sm tracking-[0.18em] text-primary">
                        Estimated Cost
                      </span>
                      <span className="font-primary text-lg tracking-[0.22em] text-secondary">
                        {calculateCost().toLocaleString()} {selectedFacility.currency}
                      </span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Purpose */}
            <Card className="border-qv-gold/25 bg-white/90 text-foreground shadow-qv-soft">
              <CardHeader>
                <CardTitle className="font-primary text-sm tracking-[0.3em] text-primary">
                  Booking Purpose
                </CardTitle>
                <CardDescription className="font-secondary text-sm text-muted-foreground/80">
                  Describe the purpose of your booking
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="purpose"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-primary">Purpose</FormLabel>
                      <FormControl>
                        <Textarea
                          className="min-h-[120px]"
                          placeholder="Describe the purpose of your booking..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Visitor Management */}
            <Card className="border-qv-gold/25 bg-white/90 text-foreground shadow-qv-soft">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="font-primary text-sm tracking-[0.3em] text-primary">
                      Visitors
                    </CardTitle>
                    <CardDescription className="font-secondary text-sm text-muted-foreground/80">
                      Add visitors who will accompany you
                    </CardDescription>
                  </div>
                  <Button
                    type="button"
                    onClick={addVisitor}
                    variant="secondary"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Visitor
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {fields.length === 0 ? (
                  <div className="py-8 text-center">
                    <Users className="mx-auto mb-4 h-12 w-12 text-muted-foreground/60" />
                    <p className="font-secondary text-sm text-muted-foreground/80">
                      No visitors added yet
                    </p>
                    <Button
                      type="button"
                      onClick={addVisitor}
                      variant="outline"
                      className="mt-4 border-qv-gold/30 text-primary hover:bg-qv-gold/10"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Your First Visitor
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {fields.map((field, index) => (
                      <div
                        key={field.id}
                        className="rounded-2xl border border-qv-gold/20 bg-white/80 p-4 shadow-sm"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-primary text-sm tracking-[0.24em] text-primary">
                            Visitor {index + 1}
                          </h4>
                          <Button
                            type="button"
                            onClick={() => remove(index)}
                            variant="ghost"
                            size="sm"
                            className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name={`visitors.${index}.full_name`}
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
                            name={`visitors.${index}.id_type`}
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
                            name={`visitors.${index}.id_number`}
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
                            name={`visitors.${index}.relationship`}
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
                            name={`visitors.${index}.visit_purpose`}
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
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                className="border-qv-gold/30 text-primary hover:bg-qv-gold/10"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                variant="secondary"
                className="px-8"
              >
                {isLoading ? "Creating Booking..." : "Create Booking"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default function NewBookingPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-white via-qv-ivory/80 to-qv-gold/25">
          <p className="font-secondary text-muted-foreground/80">Preparing booking concierge…</p>
        </div>
      }
    >
      <NewBookingPageContent />
    </Suspense>
  );
}
