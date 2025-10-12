import { loginAction } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Mail, Lock } from 'lucide-react';

export default function LoginForm() {
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
        <form action={loginAction} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-white">Email Address</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-spi-silver" />
              <Input
                id="email"
                name="email"
                type="email"
                required
                className="bg-white/10 border-spi-silver/20 text-white placeholder:text-spi-silver pl-10"
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-white">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-spi-silver" />
              <Input
                id="password"
                name="password"
                type="password"
                required
                className="bg-white/10 border-spi-silver/20 text-white placeholder:text-spi-silver pl-10"
                placeholder="Enter your password"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <a href="/forgot-password" className="text-spi-silver hover:text-white text-sm">
              Forgot your password?
            </a>
          </div>

          <Button
            type="submit"
            className="w-full bg-spi-gold hover:bg-spi-gold/90 text-spi-navy"
          >
            Sign In
          </Button>

        </form>
      </CardContent>
    </Card>
  );
}
