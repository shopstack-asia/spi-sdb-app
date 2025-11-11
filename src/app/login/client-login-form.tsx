'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Mail, LockKeyhole } from 'lucide-react';
import { toast } from 'sonner';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function ClientLoginForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsSubmitting(true);

    try {
      console.log('🟡 Client Login - Submitting:', data);

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
        setTimeout(() => {
          console.log('🔄 Redirecting to member dashboard...');
          window.location.href = '/member';
        }, 100);
      } else {
        console.log('🔴 Login failed:', result.error);
        toast.error(result.error || 'Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Client-side login error:', error);
      toast.error('Login failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="border-qv-gold/25 bg-white/90 shadow-qv-soft">
      <CardHeader className="space-y-3 text-center">
        <CardTitle className="font-primary text-sm tracking-[0.3em] text-primary">
          Vault Entry Verification
        </CardTitle>
        <CardDescription className="font-secondary text-xs text-muted-foreground/80">
          Credentials remain encrypted within the Quantum Vault perimeter.
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
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-secondary" />
                      <Input
                        type="email"
                        placeholder="member@quantumvault.com"
                        className="pl-11"
                        {...field}
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
                  <FormLabel>Secure Passphrase</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-secondary" />
                      <Input
                        type="password"
                        placeholder="••••••••"
                        className="pl-11"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="text-right">
              <a
                href="/forgot-password"
                className="font-primary text-[0.62rem] uppercase tracking-[0.28em] text-muted-foreground/70 hover:text-primary"
              >
                Reset Credentials
              </a>
            </div>

            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? 'Authorising...' : 'Enter Vault'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
