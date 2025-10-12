'use server';

import { ServerCSAPI } from './server-api';
import { requireAuth } from './actions';

// Member actions
export async function getMemberData(memberId: string) {
  await requireAuth();
  try {
    const response = await ServerCSAPI.getMember(memberId);
    return response.data;
  } catch (error) {
    console.error('Get member error:', error);
    throw new Error('Failed to fetch member data');
  }
}

export async function updateMemberData(memberId: string, data: Record<string, unknown>) {
  await requireAuth();
  try {
    const response = await ServerCSAPI.updateMember(memberId, data);
    return response.data;
  } catch (error) {
    console.error('Update member error:', error);
    throw new Error('Failed to update member data');
  }
}

// Package actions
export async function getPackages() {
  await requireAuth();
  try {
    const response = await ServerCSAPI.getPackages();
    return response.data;
  } catch (error) {
    console.error('Get packages error:', error);
    throw new Error('Failed to fetch packages');
  }
}

// Subscription actions
export async function getSubscriptions(memberId: string) {
  await requireAuth();
  try {
    const response = await ServerCSAPI.getSubscriptions(memberId);
    return response.data;
  } catch (error) {
    console.error('Get subscriptions error:', error);
    throw new Error('Failed to fetch subscriptions');
  }
}

export async function createSubscription(data: Record<string, unknown>) {
  await requireAuth();
  try {
    const response = await ServerCSAPI.createSubscription(data);
    return response.data;
  } catch (error) {
    console.error('Create subscription error:', error);
    throw new Error('Failed to create subscription');
  }
}

// Facility actions
export async function getFacilities() {
  await requireAuth();
  try {
    const response = await ServerCSAPI.getFacilities();
    return response.data;
  } catch (error) {
    console.error('Get facilities error:', error);
    throw new Error('Failed to fetch facilities');
  }
}

// Booking actions
export async function getBookings(memberId: string) {
  await requireAuth();
  try {
    const response = await ServerCSAPI.getBookings(memberId);
    return response.data;
  } catch (error) {
    console.error('Get bookings error:', error);
    throw new Error('Failed to fetch bookings');
  }
}

export async function createBooking(data: Record<string, unknown>) {
  await requireAuth();
  try {
    const response = await ServerCSAPI.createBooking(data);
    return response.data;
  } catch (error) {
    console.error('Create booking error:', error);
    throw new Error('Failed to create booking');
  }
}

export async function updateBooking(bookingId: string, data: Record<string, unknown>) {
  await requireAuth();
  try {
    const response = await ServerCSAPI.updateBooking(bookingId, data);
    return response.data;
  } catch (error) {
    console.error('Update booking error:', error);
    throw new Error('Failed to update booking');
  }
}

// Payment actions
export async function getPayments(memberId: string) {
  await requireAuth();
  try {
    const response = await ServerCSAPI.getPayments(memberId);
    return response.data;
  } catch (error) {
    console.error('Get payments error:', error);
    throw new Error('Failed to fetch payments');
  }
}

export async function createPayment(data: Record<string, unknown>) {
  await requireAuth();
  try {
    const response = await ServerCSAPI.createPayment(data);
    return response.data;
  } catch (error) {
    console.error('Create payment error:', error);
    throw new Error('Failed to create payment');
  }
}

// KYC actions
export async function submitKYC(data: Record<string, unknown>) {
  await requireAuth();
  try {
    const response = await ServerCSAPI.submitKYC(data);
    return response.data;
  } catch (error) {
    console.error('Submit KYC error:', error);
    throw new Error('Failed to submit KYC');
  }
}
