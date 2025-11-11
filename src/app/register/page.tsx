import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import ClientRegisterForm from "./client-register-form";
import logoDark from "@/../public/qv_logo_h_white_bk.png";

export default function RegisterPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-white via-qv-ivory/80 to-qv-gold/40 px-6 py-20">
      <div className="pointer-events-none absolute inset-0 -z-10 seed-pod-pattern opacity-70" />
      <div className="w-full max-w-3xl space-y-10 rounded-3xl border border-qv-gold/30 bg-white/85 p-12 shadow-qv-soft backdrop-blur-xl">
        <div>
          <Link href="/">
            <Button
              variant="ghost"
              className="font-primary text-[0.62rem] uppercase tracking-[0.3em] text-primary/70 hover:text-primary"
            >
              <ArrowLeft className="mr-3 h-4 w-4" />
              Return to Vault
            </Button>
          </Link>
        </div>

        <div className="text-center">
          <Image src={logoDark} alt="Quantum Vault Logo" width={200} height={56} className="mx-auto h-14 w-auto" />
          <h1 className="mt-6 font-primary text-2xl tracking-[0.3em] text-primary">
            Membership Covenant
          </h1>
          <p className="mt-3 font-secondary text-sm text-muted-foreground/90">
            Submit credentials for bespoke custody onboarding and concierge verification.
          </p>
        </div>

        <ClientRegisterForm />
      </div>
    </div>
  );
}