// SDB Member Types
export interface SDBMember {
  id: string;
  member_type: 'INDIVIDUAL' | 'CORPORATE';
  member_level: 'BASIC' | 'PREMIUM' | 'VIP';
  national_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  postal_code: string;
  date_of_birth?: string;
  occupation?: string;
  company_name?: string;
  registration_date: string;
  status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';
  expiry_date?: string;
}

// SDB Package Types
export interface SDBPackage {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  duration_months: number;
  features: string[];
  max_meeting_hours?: number;
  max_vault_access?: number;
  is_active: boolean;
}

// SDB Subscription Types
export interface SDBSubscription {
  id: string;
  member_id: string;
  package_id: string;
  start_date: string;
  end_date: string;
  status: 'ACTIVE' | 'EXPIRED' | 'CANCELLED';
  auto_renew: boolean;
  package: SDBPackage;
}

// SDB Facility Types
export interface SDBFacility {
  id: string;
  name: string;
  type: 'MEETING_ROOM' | 'VAULT_ROOM' | 'CONFERENCE_ROOM';
  capacity: number;
  description: string;
  hourly_rate: number;
  currency: string;
  is_active: boolean;
}

// SDB Booking Types
export interface SDBBooking {
  id: string;
  member_id: string;
  facility_id: string;
  booking_date: string;
  start_time: string;
  end_time: string;
  status: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';
  total_cost: number;
  currency: string;
  purpose: string;
  visitors: SDBVisitor[];
  facility: SDBFacility;
  created_at: string;
  updated_at: string;
}

// SDB Visitor Types
export interface SDBVisitor {
  id: string;
  booking_id: string;
  full_name: string;
  id_type: 'PASSPORT' | 'NATIONAL_ID' | 'DRIVER_LICENSE';
  id_number: string;
  relationship: string;
  visit_purpose: string;
  check_in_time?: string;
  check_out_time?: string;
  status: 'PENDING' | 'CHECKED_IN' | 'CHECKED_OUT';
}

// SDB Payment Types
export interface SDBPayment {
  id: string;
  member_id: string;
  subscription_id?: string;
  booking_id?: string;
  amount: number;
  currency: string;
  payment_method: 'CREDIT_CARD' | 'BANK_TRANSFER' | 'CASH';
  status: 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED';
  transaction_id?: string;
  payment_date: string;
  description: string;
}

// KYC Record Types
export interface SDBKYC {
  id: string;
  member_id: string;
  document_type: 'PASSPORT' | 'NATIONAL_ID' | 'DRIVER_LICENSE';
  document_number: string;
  document_image_url: string;
  verification_status: 'PENDING' | 'VERIFIED' | 'REJECTED';
  submitted_at: string;
  verified_at?: string;
  notes?: string;
}

// API Response Types
export interface APIResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export interface LoginResponse {
  token: string;
  user: AuthUser;
}

export interface RegisterResponse {
  id: string;
  message: string;
}

// Form Types
export interface RegistrationForm {
  member_type: 'INDIVIDUAL' | 'CORPORATE';
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  password: string;
  confirm_password: string;
  address: string;
  city: string;
  country: string;
  postal_code: string;
  date_of_birth?: string;
  occupation?: string;
  company_name?: string;
}

export interface KYCForm {
  document_type: 'PASSPORT' | 'NATIONAL_ID' | 'DRIVER_LICENSE';
  document_number: string;
  document_image: File;
}

export interface BookingForm {
  facility_id: string;
  booking_date: string;
  start_time: string;
  end_time: string;
  purpose: string;
  visitors: VisitorForm[];
}

export interface VisitorForm {
  full_name: string;
  id_type: 'PASSPORT' | 'NATIONAL_ID' | 'DRIVER_LICENSE';
  id_number: string;
  relationship: string;
  visit_purpose: string;
}

// Auth Types
export interface AuthUser {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  member_type: 'INDIVIDUAL' | 'CORPORATE';
  member_level: 'BASIC' | 'PREMIUM' | 'VIP';
  is_verified: boolean;
}

export interface LoginForm {
  email: string;
  password: string;
}

export interface OTPForm {
  email: string;
  otp: string;
}
