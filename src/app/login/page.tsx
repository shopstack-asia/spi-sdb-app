import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Shield, ArrowLeft } from "lucide-react";
import ClientLoginForm from "./client-login-form";

interface LoginPageProps {
  searchParams: Promise<{
    error?: string;
    message?: string;
  }>;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  return (
    <div className="min-h-screen bg-gradient-to-br from-spi-navy via-spi-dark to-spi-navy flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back to Home */}
        <div className="mb-6">
          <Link href="/">
            <Button variant="ghost" className="text-spi-silver hover:text-white hover:bg-spi-silver/20">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-spi-gold/20 rounded-full">
              <Shield className="h-12 w-12 text-spi-gold" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">SPI Safe Deposit</h1>
          <p className="text-spi-silver">Secure. Private. Intelligent.</p>
        </div>

        {/* Error/Success Messages */}
        {params.error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg">
            <p className="text-red-400 text-center">
              {params.error === 'invalid-credentials'
                ? 'Invalid email or password. Please try again.'
                : params.error === 'login-failed'
                ? 'Login failed. Please try again.'
                : 'An error occurred. Please try again.'}
            </p>
          </div>
        )}

        {params.message && (
          <div className="mb-6 p-4 bg-green-500/20 border border-green-500/30 rounded-lg">
            <p className="text-green-400 text-center">
              {params.message === 'registration-successful'
                ? 'Registration successful! Please sign in with your credentials.'
                : params.message}
            </p>
          </div>
        )}

        {/* Login Form */}
        <ClientLoginForm />

        {/* Additional Links */}
        <div className="mt-6 text-center">
          <p className="text-spi-silver text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-spi-gold hover:text-spi-gold/80 font-medium">
              Create one here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}