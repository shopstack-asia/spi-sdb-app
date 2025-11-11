"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Shield,
  Calendar as CalendarIcon,
  Clock,
  Users,
  MapPin,
  Plus,
  ArrowLeft
} from "lucide-react";
import { format } from "date-fns";
import { SDBFacility, SDBBooking } from "@/types";
import logoDark from "@/../public/qv_logo_h_white_bk.png";

// Mock data
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

const mockBookings: SDBBooking[] = [
  {
    id: "1",
    member_id: "1",
    facility_id: "1",
    booking_date: "2024-12-15",
    start_time: "09:00",
    end_time: "11:00",
    status: "CONFIRMED",
    total_cost: 2000,
    currency: "THB",
    purpose: "Business meeting",
    visitors: [],
    facility: mockFacilities[0],
    created_at: "2024-12-01T10:00:00Z",
    updated_at: "2024-12-01T10:00:00Z"
  },
  {
    id: "2",
    member_id: "1",
    facility_id: "2",
    booking_date: "2024-12-20",
    start_time: "14:00",
    end_time: "16:00",
    status: "PENDING",
    total_cost: 3000,
    currency: "THB",
    purpose: "Team presentation",
    visitors: [],
    facility: mockFacilities[1],
    created_at: "2024-12-01T10:00:00Z",
    updated_at: "2024-12-01T10:00:00Z"
  }
];

export default function BookingPage() {
  const [facilities, setFacilities] = useState<SDBFacility[]>([]);
  const [bookings, setBookings] = useState<SDBBooking[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedFacility, setSelectedFacility] = useState<string>("all");
  const [showCalendar, setShowCalendar] = useState(false);

  useEffect(() => {
    // In real app, fetch data from API
    setFacilities(mockFacilities);
    setBookings(mockBookings);
  }, []);

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

  const getFacilityTypeIcon = (type: string) => {
    switch (type) {
      case 'MEETING_ROOM':
        return <Users className="h-4 w-4" />;
      case 'CONFERENCE_ROOM':
        return <Users className="h-4 w-4" />;
      case 'VAULT_ROOM':
        return <Shield className="h-4 w-4" />;
      default:
        return <MapPin className="h-4 w-4" />;
    }
  };

  const filteredBookings = selectedFacility === "all"
    ? bookings
    : bookings.filter(booking => booking.facility_id === selectedFacility);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-qv-ivory/75 to-qv-gold/25">
      {/* Navigation */}
      <nav className="border-b border-qv-gold/30 bg-white/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <Image src={logoDark} alt="Quantum Vault" width={160} height={44} className="h-10 w-auto" />
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/member">
              <Button variant="ghost" className="font-primary text-[0.68rem] uppercase tracking-[0.28em] text-primary hover:bg-qv-gold/20">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Button>
            </Link>
            <Link href="/booking/new">
              <Button size="sm" className="hidden sm:flex">
                <Plus className="mr-2 h-4 w-4" />
                New Booking
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-primary text-3xl tracking-[0.2em] text-primary mb-2 uppercase">
            Facility Booking
          </h1>
          <p className="font-secondary text-muted-foreground/90">
            Book meeting rooms, conference facilities, and vault access
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <Card className="border-qv-gold/25 bg-white/90 text-foreground shadow-qv-soft">
            <CardContent className="p-6">
              <div className="flex flex-col gap-4 md:flex-row">
                <div className="flex-1">
                  <label className="mb-2 block font-primary text-[0.68rem] uppercase tracking-[0.28em] text-muted-foreground/80">
                    Filter by Facility
                  </label>
                  <Select value={selectedFacility} onValueChange={setSelectedFacility}>
                    <SelectTrigger>
                      <SelectValue placeholder="All facilities" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All facilities</SelectItem>
                      {facilities.map((facility) => (
                        <SelectItem key={facility.id} value={facility.id}>
                          {facility.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex-1">
                  <label className="mb-2 block font-primary text-[0.68rem] uppercase tracking-[0.28em] text-muted-foreground/80">
                    Select Date
                  </label>
                  <Popover open={showCalendar} onOpenChange={setShowCalendar}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left border-qv-gold/30 text-primary hover:bg-qv-gold/10"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={(date) => {
                          setSelectedDate(date);
                          setShowCalendar(false);
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="flex items-end">
                  <Link href="/booking/new">
                    <Button variant="secondary" className="px-6">
                      <Plus className="mr-2 h-4 w-4" />
                      New Booking
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bookings List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredBookings.length > 0 ? (
            filteredBookings.map((booking) => (
              <Card key={booking.id} className="border-qv-gold/25 bg-white/90 text-foreground shadow-qv-soft">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="rounded-xl border border-qv-gold/30 bg-qv-gold/10 p-2 text-secondary">
                        {getFacilityTypeIcon(booking.facility.type)}
                      </div>
                      <div>
                        <CardTitle className="text-primary">{booking.facility.name}</CardTitle>
                        <CardDescription className="text-muted-foreground/80">
                          {booking.facility.description}
                        </CardDescription>
                      </div>
                    </div>
                    <Badge className={getStatusColor(booking.status)}>
                      {booking.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <CalendarIcon className="h-4 w-4 text-muted-foreground/70" />
                        <span className="text-muted-foreground/80">Date:</span>
                      </div>
                      <span className="text-foreground font-medium">
                        {new Date(booking.booking_date).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-muted-foreground/70" />
                        <span className="text-muted-foreground/80">Time:</span>
                      </div>
                      <span className="text-foreground font-medium">
                        {booking.start_time} - {booking.end_time}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-muted-foreground/70" />
                        <span className="text-muted-foreground/80">Purpose:</span>
                      </div>
                      <span className="text-foreground">{booking.purpose}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-muted-foreground/80">Cost:</span>
                      </div>
                      <span className="text-foreground font-semibold">
                        {booking.total_cost.toLocaleString()} {booking.currency}
                      </span>
                    </div>
                    {booking.visitors && booking.visitors.length > 0 && (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Users className="h-4 w-4 text-muted-foreground/70" />
                          <span className="text-muted-foreground/80">Visitors:</span>
                        </div>
                        <span className="text-foreground">{booking.visitors.length} visitor(s)</span>
                      </div>
                    )}
                  </div>
                  <div className="flex justify-end mt-4">
                    <Link href={`/booking/${booking.id}`}>
                      <Button variant="outline" className="border-qv-gold/30 text-primary hover:bg-qv-gold/10">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
             <div className="col-span-full">
              <Card className="border-qv-gold/25 bg-white/90 text-foreground shadow-qv-soft">
                <CardContent className="py-12 text-center">
                  <CalendarIcon className="mx-auto mb-4 h-12 w-12 text-muted-foreground/70" />
                  <h3 className="font-primary text-lg tracking-[0.2em] text-primary mb-2 uppercase">No bookings found</h3>
                  <p className="font-secondary text-muted-foreground/85 mb-6">
                    {selectedFacility !== "all"
                      ? "No bookings found for the selected facility and date."
                      : "You don't have any bookings yet."
                    }
                  </p>
                  <Link href="/booking/new">
                    <Button variant="secondary" className="px-6">
                      <Plus className="mr-2 h-4 w-4" />
                      Create Your First Booking
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        {/* Available Facilities */}
        <div className="mt-12">
          <h2 className="font-primary text-2xl tracking-[0.2em] text-primary uppercase mb-6">Available Facilities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {facilities.map((facility) => (
              <Card key={facility.id} className="border-qv-gold/25 bg-white/90 text-foreground shadow-qv-soft">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="rounded-xl border border-qv-gold/30 bg-qv-gold/10 p-2 text-secondary">
                      {getFacilityTypeIcon(facility.type)}
                    </div>
                    <div>
                      <CardTitle className="text-primary">{facility.name}</CardTitle>
                      <CardDescription className="text-muted-foreground/80">
                        {facility.type.replace('_', ' ')}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground/80">Capacity:</span>
                      <span className="text-foreground font-medium">{facility.capacity} people</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground/80">Rate:</span>
                      <span className="text-foreground font-semibold">
                        {facility.hourly_rate.toLocaleString()} {facility.currency}/hour
                      </span>
                    </div>
                    <p className="mt-3 text-sm text-muted-foreground/85">
                      {facility.description}
                    </p>
                  </div>
                  <div className="mt-4">
                    <Link href={`/booking/new?facility=${facility.id}`}>
                      <Button variant="secondary" className="w-full">
                        Book Now
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
