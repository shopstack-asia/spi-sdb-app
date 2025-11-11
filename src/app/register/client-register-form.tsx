'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import {
  User,
  Building2,
  Mail,
  Phone,
  LockKeyhole,
  MapPin,
  CalendarDays,
  Briefcase,
} from 'lucide-react';
import { toast } from 'sonner';

const registrationSchema = z
  .object({
    member_type: z.enum(['INDIVIDUAL', 'CORPORATE'], {
      message: 'Please select a member type.',
    }),
    first_name: z.string().min(2, 'First name must be at least 2 characters'),
    last_name: z.string().min(2, 'Last name must be at least 2 characters'),
    email: z.string().email('Please enter a valid email address'),
    phone: z.string().min(10, 'Phone number must be at least 10 digits'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    address: z.string().min(5, 'Address must be at least 5 characters'),
    city: z.string().min(2, 'City must be at least 2 characters'),
    country: z.string().min(2, 'Country must be at least 2 characters'),
    postal_code: z.string().min(4, 'Postal code must be at least 4 characters'),
    date_of_birth: z.string().optional(),
    occupation: z.string().optional(),
    company_name: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.member_type === 'INDIVIDUAL') {
      if (!data.date_of_birth) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Date of birth is required for individual members.',
          path: ['date_of_birth'],
        });
      }
      if (!data.occupation) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Occupation is required for individual members.',
          path: ['occupation'],
        });
      }
    } else if (data.member_type === 'CORPORATE') {
      if (!data.company_name) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Company name is required for corporate members.',
          path: ['company_name'],
        });
      }
    }
  });

type RegistrationFormValues = z.infer<typeof registrationSchema>;

export default function ClientRegisterForm() {
  const [memberType, setMemberType] = useState<'INDIVIDUAL' | 'CORPORATE'>('INDIVIDUAL');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      member_type: 'INDIVIDUAL',
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      password: '',
      address: '',
      city: '',
      country: '',
      postal_code: '',
      date_of_birth: '',
      occupation: '',
      company_name: '',
    },
  });

  const onSubmit = async (data: RegistrationFormValues) => {
    setIsSubmitting(true);

    try {
      console.log('🟡 Client Register - Submitting:', data);

      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log('🟡 Client Register - Result:', result);
      console.log('🟡 Client Register - Response Status:', response.status);
      console.log('🟡 Client Register - Response OK:', response.ok);

      if (result.success) {
        console.log('🟢 Registration successful, showing toast and redirecting...');
        toast.success(result.message);
        form.reset();
        setTimeout(() => {
          console.log('🔄 Redirecting to login page...');
          window.location.href = '/login';
        }, 2000);
      } else {
        console.log('🔴 Registration failed:', result.error);
        toast.error(result.error);
      }
    } catch (error) {
      console.error('Client-side registration error:', error);
      toast.error('Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="border-qv-gold/25 bg-white/90 text-foreground shadow-qv-soft">
      <CardHeader className="space-y-3 text-center">
        <CardTitle className="font-primary text-sm tracking-[0.3em] text-primary">
          Establish Membership
        </CardTitle>
        <CardDescription className="font-secondary text-xs text-muted-foreground/80">
          Enter the credentials required for bespoke custodial access.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7">
            <FormField
              control={form.control}
              name="member_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Member Type</FormLabel>
                  <Select
                    onValueChange={(value: 'INDIVIDUAL' | 'CORPORATE') => {
                      field.onChange(value);
                      setMemberType(value);
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a member type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="INDIVIDUAL">
                        <span className="flex items-center gap-2 font-secondary text-sm">
                          <User className="h-4 w-4 text-secondary" /> Individual
                        </span>
                      </SelectItem>
                      <SelectItem value="CORPORATE">
                        <span className="flex items-center gap-2 font-secondary text-sm">
                          <Building2 className="h-4 w-4 text-secondary" /> Corporate
                        </span>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-secondary" />
                      <Input type="email" placeholder="john.doe@example.com" className="pl-11" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Phone className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-secondary" />
                      <Input type="tel" placeholder="+66 0000 0000" className="pl-11" {...field} />
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
                      <Input type="password" placeholder="********" className="pl-11" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <MapPin className="pointer-events-none absolute left-4 top-4 h-4 w-4 text-secondary" />
                        <Textarea placeholder="123 Private Vault Lane" className="pl-11" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input placeholder="Bangkok" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <Input placeholder="Thailand" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="postal_code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Postal Code</FormLabel>
                    <FormControl>
                      <Input placeholder="10110" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {memberType === 'INDIVIDUAL' && (
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="date_of_birth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date of Birth</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <CalendarDays className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-secondary" />
                          <Input type="date" className="pl-11" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="occupation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Occupation</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Briefcase className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-secondary" />
                          <Input placeholder="Principal" className="pl-11" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {memberType === 'CORPORATE' && (
              <FormField
                control={form.control}
                name="company_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Building2 className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-secondary" />
                        <Input placeholder="Quantum Holdings" className="pl-11" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? 'Creating Account...' : 'Register'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
