import { cookies } from 'next/headers';
import { APIResponse } from '@/types';

const CS_API_BASE_URL = process.env.CS_API_BASE_URL || 'http://localhost:3000/api';

class ServerAPIError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ServerAPIError';
  }
}

async function handleServerResponse<T>(response: Response): Promise<APIResponse<T>> {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
    throw new ServerAPIError(response.status, errorData.message || 'Request failed');
  }
  
  return response.json();
}

export class ServerCSAPI {
  private static async getAuthHeaders(): Promise<HeadersInit> {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('access_token')?.value;
    const appKey = process.env.CS_APP_KEY;
    const secretKey = process.env.CS_SECRET_KEY;
    
    console.log('🔵 Environment Variables:', {
      CS_APP_KEY: appKey ? 'SET' : 'NOT SET',
      CS_SECRET_KEY: secretKey ? 'SET' : 'NOT SET',
      CS_API_BASE_URL: process.env.CS_API_BASE_URL || 'NOT SET'
    });
    
    // Basic Auth for CS API (for unauthenticated requests)
    const basicAuth = appKey && secretKey 
      ? `Basic ${Buffer.from(`${appKey}:${secretKey}`).toString('base64')}`
      : null;
    
    // Bearer token for authenticated requests
    const bearerToken = accessToken ? `Bearer ${accessToken}` : null;
    
    console.log('🔵 Basic Auth:', basicAuth ? 'SET' : 'NOT SET');
    console.log('🔵 Bearer Token:', bearerToken ? 'SET' : 'NOT SET');
    
    return {
      'Content-Type': 'application/json',
      ...(basicAuth && { Authorization: basicAuth }),
      ...(bearerToken && { Authorization: bearerToken }),
    };
  }

  // Auth endpoints - Use correct CS API endpoint
  static async login(credentials: { email: string; password: string }) {
    console.log('🔵 Login API Call:', {
      url: `${CS_API_BASE_URL}/auth/login`,
      method: 'POST',
      credentials: credentials
    });

    // Login endpoint needs Basic Auth (API Key + Secret Key)
    const appKey = process.env.CS_APP_KEY;
    const secretKey = process.env.CS_SECRET_KEY;
    const basicAuth = appKey && secretKey 
      ? `Basic ${Buffer.from(`${appKey}:${secretKey}`).toString('base64')}`
      : null;

    const headers = {
      'Content-Type': 'application/json',
      ...(basicAuth && { Authorization: basicAuth }),
    };
    
    console.log('🔵 Headers:', headers);

    try {
      const response = await fetch(`${CS_API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers,
        body: JSON.stringify(credentials),
      });

      console.log('🔵 Response Status:', response.status);
      console.log('🔵 Response Headers:', Object.fromEntries(response.headers.entries()));

      const result = await handleServerResponse(response);
      console.log('🔵 Response Data:', result);
      
      // CS API returns data directly, wrap it in success format
      return {
        success: true,
        data: result
      };
    } catch (error) {
      console.error('🔴 Login API Error:', error);
      throw error;
    }
  }

  static async sendOTP(email: string) {
    const response = await fetch(`${CS_API_BASE_URL}/auth/send-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    return handleServerResponse(response);
  }

  static async verifyOTP(email: string, otp: string) {
    const response = await fetch(`${CS_API_BASE_URL}/auth/verify-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, otp }),
    });
    return handleServerResponse(response);
  }

  static async register(data: Record<string, unknown>) {
    console.log('🔵 Register API Call:', {
      url: `${CS_API_BASE_URL}/sdb_member`,
      method: 'POST',
      data: data
    });

    // Register endpoint needs Basic Auth (API Key + Secret Key)
    const appKey = process.env.CS_APP_KEY;
    const secretKey = process.env.CS_SECRET_KEY;
    const basicAuth = appKey && secretKey 
      ? `Basic ${Buffer.from(`${appKey}:${secretKey}`).toString('base64')}`
      : null;

    const headers = {
      'Content-Type': 'application/json',
      ...(basicAuth && { Authorization: basicAuth }),
    };
    
    console.log('🔵 Headers:', headers);

    try {
      const response = await fetch(`${CS_API_BASE_URL}/sdb_member`, {
        method: 'POST',
        headers,
        body: JSON.stringify(data),
      });

      console.log('🔵 Response Status:', response.status);
      console.log('🔵 Response Headers:', Object.fromEntries(response.headers.entries()));

      const result = await handleServerResponse(response);
      console.log('🔵 Response Data:', result);
      return result;
    } catch (error) {
      console.error('🔴 Register API Error:', error);
      throw error;
    }
  }

  // Member endpoints
  static async getMember(id: string) {
    const headers = await this.getAuthHeaders();
    const response = await fetch(`${CS_API_BASE_URL}/sdb_member/${id}`, {
      headers,
    });
    return handleServerResponse(response);
  }

  static async updateMember(id: string, data: Record<string, unknown>) {
    const headers = await this.getAuthHeaders();
    const response = await fetch(`${CS_API_BASE_URL}/sdb_member/${id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(data),
    });
    return handleServerResponse(response);
  }

  // Package endpoints
  static async getPackages() {
    const headers = await this.getAuthHeaders();
    const response = await fetch(`${CS_API_BASE_URL}/sdb_package`, {
      headers,
    });
    return handleServerResponse(response);
  }

  // Subscription endpoints
  static async getSubscriptions(memberId: string) {
    const headers = await this.getAuthHeaders();
    const response = await fetch(`${CS_API_BASE_URL}/sdb_subscription?member_id=${memberId}`, {
      headers,
    });
    return handleServerResponse(response);
  }

  static async createSubscription(data: Record<string, unknown>) {
    const headers = await this.getAuthHeaders();
    const response = await fetch(`${CS_API_BASE_URL}/sdb_subscription`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    });
    return handleServerResponse(response);
  }

  // Facility endpoints
  static async getFacilities() {
    const headers = await this.getAuthHeaders();
    const response = await fetch(`${CS_API_BASE_URL}/sdb_facility`, {
      headers,
    });
    return handleServerResponse(response);
  }

  // Booking endpoints
  static async getBookings(memberId: string) {
    const headers = await this.getAuthHeaders();
    const response = await fetch(`${CS_API_BASE_URL}/sdb_booking?member_id=${memberId}`, {
      headers,
    });
    return handleServerResponse(response);
  }

  static async createBooking(data: Record<string, unknown>) {
    const headers = await this.getAuthHeaders();
    const response = await fetch(`${CS_API_BASE_URL}/sdb_booking`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    });
    return handleServerResponse(response);
  }

  static async updateBooking(id: string, data: Record<string, unknown>) {
    const headers = await this.getAuthHeaders();
    const response = await fetch(`${CS_API_BASE_URL}/sdb_booking/${id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(data),
    });
    return handleServerResponse(response);
  }

  // Payment endpoints
  static async getPayments(memberId: string) {
    const headers = await this.getAuthHeaders();
    const response = await fetch(`${CS_API_BASE_URL}/sdb_payment?member_id=${memberId}`, {
      headers,
    });
    return handleServerResponse(response);
  }

  static async createPayment(data: Record<string, unknown>) {
    const headers = await this.getAuthHeaders();
    const response = await fetch(`${CS_API_BASE_URL}/sdb_payment`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    });
    return handleServerResponse(response);
  }

  // KYC endpoints
  static async submitKYC(data: Record<string, unknown>) {
    const headers = await this.getAuthHeaders();
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value instanceof File) {
        formData.append(key, value);
      } else {
        formData.append(key, String(value));
      }
    });

    const response = await fetch(`${CS_API_BASE_URL}/sdb_kyc_record`, {
      method: 'POST',
      headers,
      body: formData,
    });
    return handleServerResponse(response);
  }
}

export { ServerAPIError };
