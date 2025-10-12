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
import { Shield, User, Building2, Mail, Phone, Lock, MapPin, CalendarDays, Briefcase } from 'lucide-react';
import { registerAction } from '@/lib/actions';
import { toast } from 'sonner';

const registrationSchema = z.object({
  member_type: z.enum(["INDIVIDUAL", "CORPORATE"], {
    message: "Please select a member type.",
  }),
  first_name: z.string().min(2, "First name must be at least 2 characters"),
  last_name: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  city: z.string().min(2, "City must be at least 2 characters"),
  country: z.string().min(2, "Country must be at least 2 characters"),
  postal_code: z.string().min(4, "Postal code must be at least 4 characters"),
  date_of_birth: z.string().optional(), // Optional for corporate
  occupation: z.string().optional(), // Optional for corporate
  company_name: z.string().optional(), // Optional for individual
}).superRefine((data, ctx) => {
  if (data.member_type === "INDIVIDUAL") {
    if (!data.date_of_birth) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Date of birth is required for individual members.",
        path: ['date_of_birth'],
      });
    }
    if (!data.occupation) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Occupation is required for individual members.",
        path: ['occupation'],
      });
    }
  } else if (data.member_type === "CORPORATE") {
    if (!data.company_name) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Company name is required for corporate members.",
        path: ['company_name'],
      });
    }
  }
});

type RegistrationFormValues = z.infer<typeof registrationSchema>;

export default function ClientRegisterForm() {
  const [memberType, setMemberType] = useState<"INDIVIDUAL" | "CORPORATE">("INDIVIDUAL");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      member_type: "INDIVIDUAL",
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      password: "",
      address: "",
      city: "",
      country: "",
      postal_code: "",
      date_of_birth: "",
      occupation: "",
      company_name: "",
    },
  });

  const onSubmit = async (data: RegistrationFormValues) => {
    setIsSubmitting(true);

    try {
      console.log('🟡 Client Register - Submitting:', data);
      
      // Call Next.js API route instead of server action
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
        // Reset form on success
        form.reset();
        // Redirect to login after success
        setTimeout(() => {
          console.log('🔄 Redirecting to login page...');
          window.location.href = '/login';
        }, 2000);
      } else {
        console.log('🔴 Registration failed:', result.error);
        toast.error(result.error);
      }
    } catch (error) {
      console.error("Client-side registration error:", error);
      toast.error("Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="bg-white/10 border-spi-silver/20 backdrop-blur-sm text-white">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-white">Create Your Account</CardTitle>
        <CardDescription className="text-spi-silver">
          Join SPI Safe Deposit for secure and intelligent storage solutions.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="member_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Member Type</FormLabel>
                  <Select onValueChange={(value: "INDIVIDUAL" | "CORPORATE") => {
                    field.onChange(value);
                    setMemberType(value);
                  }} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-spi-dark/50 border-spi-silver/30 text-white focus:ring-spi-gold">
                        <SelectValue placeholder="Select a member type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-spi-dark border-spi-silver/30 text-white">
                      <SelectItem value="INDIVIDUAL">
                        <div className="flex items-center">
                          <User className="mr-2 h-4 w-4" /> Individual
                        </div>
                      </SelectItem>
                      <SelectItem value="CORPORATE">
                        <div className="flex items-center">
                          <Building2 className="mr-2 h-4 w-4" /> Corporate
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John" {...field} className="bg-spi-dark/50 border-spi-silver/30 text-white focus:border-spi-gold" />
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
                    <FormLabel className="text-white">Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Doe" {...field} className="bg-spi-dark/50 border-spi-silver/30 text-white focus:border-spi-gold" />
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
                  <FormLabel className="text-white">Email Address</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-spi-silver" />
                      <Input type="email" placeholder="john.doe@example.com" {...field} className="pl-10 bg-spi-dark/50 border-spi-silver/30 text-white focus:border-spi-gold" />
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
                  <FormLabel className="text-white">Phone Number</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-spi-silver" />
                      <Input type="tel" placeholder="+1234567890" {...field} className="pl-10 bg-spi-dark/50 border-spi-silver/30 text-white focus:border-spi-gold" />
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
                      <Input type="password" placeholder="********" {...field} className="pl-10 bg-spi-dark/50 border-spi-silver/30 text-white focus:border-spi-gold" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Address</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-spi-silver" />
                        <Textarea placeholder="123 Main St" {...field} className="pl-10 bg-spi-dark/50 border-spi-silver/30 text-white focus:border-spi-gold" />
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
                    <FormLabel className="text-white">City</FormLabel>
                    <FormControl>
                      <Input placeholder="New York" {...field} className="bg-spi-dark/50 border-spi-silver/30 text-white focus:border-spi-gold" />
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
                    <FormLabel className="text-white">Country</FormLabel>
                    <FormControl>
                      <Input placeholder="USA" {...field} className="bg-spi-dark/50 border-spi-silver/30 text-white focus:border-spi-gold" />
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
                    <FormLabel className="text-white">Postal Code</FormLabel>
                    <FormControl>
                      <Input placeholder="10001" {...field} className="bg-spi-dark/50 border-spi-silver/30 text-white focus:border-spi-gold" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {memberType === "INDIVIDUAL" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="date_of_birth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Date of Birth</FormLabel>
                      <FormControl>
                        <Input 
                          type="date" 
                          {...field} 
                          className="bg-spi-dark/50 border-spi-silver/30 text-white focus:border-spi-gold"
                          style={{ colorScheme: 'dark' }}
                        />
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
                      <FormLabel className="text-white">Occupation</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-spi-silver" />
                          <Input placeholder="Engineer" {...field} className="pl-10 bg-spi-dark/50 border-spi-silver/30 text-white focus:border-spi-gold" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {memberType === "CORPORATE" && (
              <FormField
                control={form.control}
                name="company_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Company Name</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-spi-silver" />
                        <Input placeholder="SPI Corp" {...field} className="pl-10 bg-spi-dark/50 border-spi-silver/30 text-white focus:border-spi-gold" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-spi-gold hover:bg-spi-gold/90 text-spi-navy disabled:opacity-50"
            >
              {isSubmitting ? 'Creating Account...' : 'Register'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
