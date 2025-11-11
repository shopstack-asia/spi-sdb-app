import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
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
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-qv-midnight-gradient px-6 py-12">
      <div className="pointer-events-none absolute inset-0 -z-10 seed-pod-pattern opacity-60" />
      <div className="w-full max-w-lg space-y-8">
        <div>
          <Link href="/">
            <Button
              variant="ghost"
              className="font-primary text-[0.62rem] uppercase tracking-[0.3em] text-muted-foreground/80 hover:text-primary"
            >
              <ArrowLeft className="mr-3 h-4 w-4" />
              Back to Vault
            </Button>
          </Link>
        </div>

        <div className="text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-qv-gold/50 bg-white/5 shadow-qv-gold">
            <Image
              src="/qv_logo_white_bk.png"
              alt="Quantum Vault"
              width={72}
              height={72}
            />
          </div>
          <h1 className="font-primary text-2xl tracking-[0.3em] text-secondary-foreground">
            Client Authentication
          </h1>
          <p className="mt-3 font-secondary text-sm text-muted-foreground/80">
            Quantum-grade credentialing for private members.
          </p>
        </div>

        {params.error && (
          <div className="golden-outline rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-center">
            <p className="font-secondary text-sm text-red-200">
              {params.error === "invalid-credentials"
                ? "Invalid email or password. Please try again."
                : params.error === "login-failed"
                ? "Login failed. Please try again."
                : "An error occurred. Please try again."}
            </p>
          </div>
        )}

        {params.message && (
          <div className="golden-outline rounded-xl border border-qv-gold/30 bg-qv-gold/10 p-4 text-center">
            <p className="font-secondary text-sm text-secondary-foreground">
              {params.message === "registration-successful"
                ? "Registration successful! Please sign in with your credentials."
                : params.message}
            </p>
          </div>
        )}

        <ClientLoginForm />

        <div className="text-center">
          <p className="font-secondary text-xs text-muted-foreground/80">
            Don&apos;t have an access covenant?{" "}
            <Link
              href="/register"
              className="font-primary text-[0.62rem] uppercase tracking-[0.3em] text-qv-gold hover:text-qv-gold/80"
            >
              Initiate Membership
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}