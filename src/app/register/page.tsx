import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Shield, ArrowLeft } from "lucide-react";
import ClientRegisterForm from "./client-register-form";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-spi-navy via-spi-dark to-spi-navy flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
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

        {/* Register Form */}
        <ClientRegisterForm />
      </div>
    </div>
  );
}