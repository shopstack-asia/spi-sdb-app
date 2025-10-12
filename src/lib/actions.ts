'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { ServerCSAPI } from './server-api';
import { AuthUser, LoginResponse } from '@/types';

export async function loginAction(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  try {
    const response = await ServerCSAPI.login({ email, password });
    
    if (response.success && (response.data as LoginResponse).token) {
      const loginData = response.data as LoginResponse;
        // Set access token cookie
        const cookieStore = await cookies();
        cookieStore.set('access_token', loginData.token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 60 * 60 * 24 * 7, // 7 days
        });

      // Set user data cookie
      cookieStore.set('user_data', JSON.stringify(loginData.user), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });

      revalidatePath('/member');
      redirect('/member');
    } else {
      revalidatePath('/login');
      redirect('/login?error=invalid-credentials');
    }
  } catch (error) {
    console.error('Login error:', error);
    revalidatePath('/login');
    redirect('/login?error=login-failed');
  }
}

export async function registerAction(formData: FormData) {
  const registrationData = {
    member_type: formData.get('member_type') as string,
    first_name: formData.get('first_name') as string,
    last_name: formData.get('last_name') as string,
    email: formData.get('email') as string,
    phone: formData.get('phone') as string,
    password: formData.get('password') as string,
    address: formData.get('address') as string,
    city: formData.get('city') as string,
    country: formData.get('country') as string,
    postal_code: formData.get('postal_code') as string,
    date_of_birth: formData.get('date_of_birth') as string,
    occupation: formData.get('occupation') as string,
    company_name: formData.get('company_name') as string,
  };

  try {
    console.log('🟡 Register Action - Data:', registrationData);
    const response = await ServerCSAPI.register(registrationData);
    console.log('🟡 Register Action - Response:', response);
    
    if (response.success) {
      console.log('🟢 Registration successful');
      revalidatePath('/register');
      return { success: true, message: 'Registration successful! Please check your email for verification.' };
    } else {
      console.log('🔴 Registration failed');
      revalidatePath('/register');
      return { success: false, error: 'Registration failed. Please try again.' };
    }
  } catch (error) {
    console.error('🔴 Registration error:', error);
    revalidatePath('/register');
    return { success: false, error: 'Registration failed. Please try again.' };
  }
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete('access_token');
  cookieStore.delete('user_data');
  redirect('/login');
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  try {
    const cookieStore = await cookies();
    const userData = cookieStore.get('user_data')?.value;
    
    console.log('🔵 getCurrentUser - userData:', userData ? 'SET' : 'NOT SET');
    
    if (userData) {
      const parsed = JSON.parse(userData);
      console.log('🔵 getCurrentUser - parsed user:', parsed);
      return parsed;
    }
    
    console.log('🔵 getCurrentUser - No user data found');
    return null;
  } catch (error) {
    console.error('🔴 getCurrentUser error:', error);
    return null;
  }
}

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get('access_token')?.value;
  console.log('🔵 isAuthenticated - token:', token ? 'SET' : 'NOT SET');
  return !!token;
}

export async function requireAuth() {
  const isAuth = await isAuthenticated();
  if (!isAuth) {
    redirect('/login');
  }
}
