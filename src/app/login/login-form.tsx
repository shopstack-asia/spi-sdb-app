import { loginAction } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Mail, Lock } from 'lucide-react';

export default function LoginForm() {
  return (
    <Card className="border-qv-gold/25 bg-white/90 shadow-qv-soft">
      <CardHeader className="text-center space-y-3">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-qv-gold/40 bg-qv-gold/10">
          <Shield className="h-8 w-8 text-secondary" />
        </div>
        <CardTitle className="font-primary text-sm tracking-[0.3em] text-primary">
          Welcome Back
        </CardTitle>
        <CardDescription className="font-secondary text-xs text-muted-foreground/80">
          Sign in to your Quantum Vault account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={loginAction} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-muted-foreground/90">Email Address</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-secondary" />
              <Input
                id="email"
                name="email"
                type="email"
                required
                className="pl-10"
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-muted-foreground/90">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-secondary" />
              <Input
                id="password"
                name="password"
                type="password"
                required
                className="pl-10"
                placeholder="Enter your password"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <a href="/forgot-password" className="font-primary text-[0.62rem] uppercase tracking-[0.28em] text-muted-foreground/70 hover:text-primary">
              Forgot your password?
            </a>
          </div>

          <Button
            type="submit"
            className="w-full"
          >
            Sign In
          </Button>

        </form>
      </CardContent>
    </Card>
  );
}
