"use client";

import { useState, useEffect } from "react";
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
  const [selectedFacility, setSelectedFacility] = useState<string>("");
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

  const filteredBookings = selectedFacility 
    ? bookings.filter(booking => booking.facility_id === selectedFacility)
    : bookings;

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
            <div className="flex items-center space-x-4">
              <Link href="/member">
                <Button variant="ghost" className="text-white hover:bg-spi-silver/20">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Facility Booking
          </h1>
          <p className="text-spi-silver">
            Book meeting rooms, conference facilities, and vault access
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <Card className="bg-white/10 border-spi-silver/20 text-white">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <label className="text-sm font-medium text-white mb-2 block">
                    Filter by Facility
                  </label>
                  <Select value={selectedFacility} onValueChange={setSelectedFacility}>
                    <SelectTrigger className="bg-white/10 border-spi-silver/20 text-white">
                      <SelectValue placeholder="All facilities" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All facilities</SelectItem>
                      {facilities.map((facility) => (
                        <SelectItem key={facility.id} value={facility.id}>
                          {facility.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex-1">
                  <label className="text-sm font-medium text-white mb-2 block">
                    Select Date
                  </label>
                  <Popover open={showCalendar} onOpenChange={setShowCalendar}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left bg-white/10 border-spi-silver/20 text-white hover:bg-white/20"
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
                    <Button className="bg-spi-gold hover:bg-spi-gold/90 text-spi-navy">
                      <Plus className="h-4 w-4 mr-2" />
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
              <Card key={booking.id} className="bg-white/10 border-spi-silver/20 text-white">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-spi-gold/20 rounded-lg">
                        {getFacilityTypeIcon(booking.facility.type)}
                      </div>
                      <div>
                        <CardTitle className="text-white">{booking.facility.name}</CardTitle>
                        <CardDescription className="text-spi-silver">
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
                        <Users className="h-4 w-4 text-spi-silver" />
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
                    {booking.visitors && booking.visitors.length > 0 && (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Users className="h-4 w-4 text-spi-silver" />
                          <span className="text-spi-silver">Visitors:</span>
                        </div>
                        <span className="text-white">{booking.visitors.length} visitor(s)</span>
                      </div>
                    )}
                  </div>
                  <div className="flex justify-end mt-4">
                    <Link href={`/booking/${booking.id}`}>
                      <Button variant="outline" className="border-spi-silver text-spi-silver hover:bg-spi-silver/10">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full">
              <Card className="bg-white/10 border-spi-silver/20 text-white">
                <CardContent className="text-center py-12">
                  <CalendarIcon className="h-12 w-12 text-spi-silver mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-white mb-2">No bookings found</h3>
                  <p className="text-spi-silver mb-6">
                    {selectedFacility 
                      ? "No bookings found for the selected facility and date."
                      : "You don't have any bookings yet."
                    }
                  </p>
                  <Link href="/booking/new">
                    <Button className="bg-spi-gold hover:bg-spi-gold/90 text-spi-navy">
                      <Plus className="h-4 w-4 mr-2" />
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
          <h2 className="text-2xl font-bold text-white mb-6">Available Facilities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {facilities.map((facility) => (
              <Card key={facility.id} className="bg-white/10 border-spi-silver/20 text-white">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-spi-gold/20 rounded-lg">
                      {getFacilityTypeIcon(facility.type)}
                    </div>
                    <div>
                      <CardTitle className="text-white">{facility.name}</CardTitle>
                      <CardDescription className="text-spi-silver">
                        {facility.type.replace('_', ' ')}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-spi-silver">Capacity:</span>
                      <span className="text-white">{facility.capacity} people</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-spi-silver">Rate:</span>
                      <span className="text-white font-medium">
                        {facility.hourly_rate.toLocaleString()} {facility.currency}/hour
                      </span>
                    </div>
                    <p className="text-sm text-spi-silver mt-3">
                      {facility.description}
                    </p>
                  </div>
                  <div className="mt-4">
                    <Link href={`/booking/new?facility=${facility.id}`}>
                      <Button className="w-full bg-spi-gold hover:bg-spi-gold/90 text-spi-navy">
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
