'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Shield, Mail, Lock } from 'lucide-react';
import { toast } from 'sonner';

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function ClientLoginForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsSubmitting(true);

    try {
      console.log('🟡 Client Login - Submitting:', data);
      
      // Call Next.js API route instead of server action
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log('🟡 Client Login - Result:', result);
      console.log('🟡 Client Login - Response Status:', response.status);
      console.log('🟡 Client Login - Response OK:', response.ok);
      
      if (result.success) {
        console.log('🟢 Login successful, redirecting to member dashboard...');
        console.log('🔵 Client - Response data:', result.data);
        toast.success('Login successful!');
        // Wait for cookies to be set, then redirect
        setTimeout(() => {
          console.log('🔄 Redirecting to member dashboard...');
          window.location.href = '/member';
        }, 100);
      } else {
        console.log('🔴 Login failed:', result.error);
        toast.error(result.error || 'Login failed. Please try again.');
      }
    } catch (error) {
      console.error("Client-side login error:", error);
      toast.error("Login failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="bg-white/10 border-spi-silver/20 backdrop-blur-sm">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-spi-gold/20 rounded-full">
            <Shield className="h-8 w-8 text-spi-gold" />
          </div>
        </div>
        <CardTitle className="text-2xl font-bold text-white">
          Welcome Back
        </CardTitle>
        <CardDescription className="text-spi-silver">
          Sign in to your SPI Safe Deposit account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Email Address</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-spi-silver" />
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        {...field}
                        className="pl-10 bg-white/10 border-spi-silver/20 text-white placeholder:text-spi-silver"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-spi-silver" />
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        {...field}
                        className="pl-10 bg-white/10 border-spi-silver/20 text-white placeholder:text-spi-silver"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center justify-between">
              <a href="/forgot-password" className="text-spi-silver hover:text-white text-sm">
                Forgot your password?
              </a>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-spi-gold hover:bg-spi-gold/90 text-spi-navy disabled:opacity-50"
            >
              {isSubmitting ? 'Signing In...' : 'Sign In'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
