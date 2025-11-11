import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import ClientLoginForm from "./client-login-form";
import logoDark from "@/../public/qv_logo_h_white_bk.png";

interface LoginPageProps {
  searchParams: Promise<{
    error?: string;
    message?: string;
  }>;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-white via-qv-ivory/80 to-qv-gold/40 px-6 py-16">
      <div className="pointer-events-none absolute inset-0 -z-10 seed-pod-pattern opacity-70" />
      <div className="w-full max-w-xl space-y-10 rounded-3xl border border-qv-gold/30 bg-white/85 p-10 shadow-qv-soft backdrop-blur-xl">
        <div>
          <Link href="/">
            <Button
              variant="ghost"
              className="font-primary text-[0.62rem] uppercase tracking-[0.3em] text-primary/70 hover:text-primary"
            >
              <ArrowLeft className="mr-3 h-4 w-4" />
              Back to Vault
            </Button>
          </Link>
        </div>

        <div className="text-center">
          <Image src={logoDark} alt="Quantum Vault" width={160} height={44} className="mx-auto h-12 w-auto" />
          <h1 className="mt-6 font-primary text-2xl tracking-[0.3em] text-primary">
            Client Authentication
          </h1>
          <p className="mt-3 font-secondary text-sm text-muted-foreground/90">
            Quantum-grade credentialing for private members.
          </p>
        </div>

        {params.error && (
          <div className="golden-outline rounded-xl border border-red-500/25 bg-red-500/10 p-4 text-center">
            <p className="font-secondary text-sm text-red-600">
              {params.error === "invalid-credentials"
                ? "Invalid email or password. Please try again."
                : params.error === "login-failed"
                ? "Login failed. Please try again."
                : "An error occurred. Please try again."}
            </p>
          </div>
        )}

        {params.message && (
          <div className="golden-outline rounded-xl border border-qv-gold/40 bg-qv-gold/15 p-4 text-center">
            <p className="font-secondary text-sm text-primary">
              {params.message === "registration-successful"
                ? "Registration successful! Please sign in with your credentials."
                : params.message}
            </p>
          </div>
        )}

        <ClientLoginForm />

        <div className="text-center">
          <p className="font-secondary text-xs text-muted-foreground/90">
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