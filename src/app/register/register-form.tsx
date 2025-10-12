import { registerAction } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Shield, User, Building2 } from 'lucide-react';

export default function RegisterForm() {
  return (
    <Card className="bg-white/10 border-spi-silver/20 backdrop-blur-sm">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-spi-gold/20 rounded-full">
            <Shield className="h-8 w-8 text-spi-gold" />
          </div>
        </div>
        <CardTitle className="text-2xl font-bold text-white">
          Create Account
        </CardTitle>
        <CardDescription className="text-spi-silver">
          Join SPI Safe Deposit community
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={registerAction} className="space-y-6">
          {/* Member Type */}
          <div className="space-y-2">
            <Label htmlFor="member_type" className="text-white">Member Type</Label>
            <Select name="member_type" required>
              <SelectTrigger className="bg-white/10 border-spi-silver/20 text-white">
                <SelectValue placeholder="Select member type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="INDIVIDUAL">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    Individual
                  </div>
                </SelectItem>
                <SelectItem value="CORPORATE">
                  <div className="flex items-center">
                    <Building2 className="h-4 w-4 mr-2" />
                    Corporate
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Personal Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="first_name" className="text-white">First Name</Label>
              <Input
                id="first_name"
                name="first_name"
                required
                className="bg-white/10 border-spi-silver/20 text-white placeholder:text-spi-silver"
                placeholder="Enter first name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="last_name" className="text-white">Last Name</Label>
              <Input
                id="last_name"
                name="last_name"
                required
                className="bg-white/10 border-spi-silver/20 text-white placeholder:text-spi-silver"
                placeholder="Enter last name"
              />
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-white">Email Address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              className="bg-white/10 border-spi-silver/20 text-white placeholder:text-spi-silver"
              placeholder="Enter email address"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-white">Phone Number</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              required
              className="bg-white/10 border-spi-silver/20 text-white placeholder:text-spi-silver"
              placeholder="Enter phone number"
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label htmlFor="password" className="text-white">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              className="bg-white/10 border-spi-silver/20 text-white placeholder:text-spi-silver"
              placeholder="Enter password"
            />
          </div>

          {/* Address */}
          <div className="space-y-2">
            <Label htmlFor="address" className="text-white">Address</Label>
            <Textarea
              id="address"
              name="address"
              required
              className="bg-white/10 border-spi-silver/20 text-white placeholder:text-spi-silver"
              placeholder="Enter full address"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city" className="text-white">City</Label>
              <Input
                id="city"
                name="city"
                required
                className="bg-white/10 border-spi-silver/20 text-white placeholder:text-spi-silver"
                placeholder="Enter city"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="country" className="text-white">Country</Label>
              <Input
                id="country"
                name="country"
                required
                className="bg-white/10 border-spi-silver/20 text-white placeholder:text-spi-silver"
                placeholder="Enter country"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="postal_code" className="text-white">Postal Code</Label>
              <Input
                id="postal_code"
                name="postal_code"
                required
                className="bg-white/10 border-spi-silver/20 text-white placeholder:text-spi-silver"
                placeholder="Enter postal code"
              />
            </div>
          </div>

          {/* Additional Information */}
          <div className="space-y-2">
            <Label htmlFor="date_of_birth" className="text-white">Date of Birth</Label>
            <Input
              id="date_of_birth"
              name="date_of_birth"
              type="date"
              required
              className="bg-white/10 border-spi-silver/20 text-white placeholder:text-spi-silver"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="occupation" className="text-white">Occupation</Label>
            <Input
              id="occupation"
              name="occupation"
              required
              className="bg-white/10 border-spi-silver/20 text-white placeholder:text-spi-silver"
              placeholder="Enter occupation"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="company_name" className="text-white">Company Name</Label>
            <Input
              id="company_name"
              name="company_name"
              className="bg-white/10 border-spi-silver/20 text-white placeholder:text-spi-silver"
              placeholder="Enter company name (optional)"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-spi-gold hover:bg-spi-gold/90 text-spi-navy"
          >
            Create Account
          </Button>

          <div className="text-center">
            <span className="text-spi-silver text-sm">
              Already have an account?{" "}
              <a href="/login" className="text-spi-gold hover:text-spi-gold/80 font-medium">
                Sign in here
              </a>
            </span>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
