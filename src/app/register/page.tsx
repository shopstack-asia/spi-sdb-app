import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import ClientRegisterForm from "./client-register-form";

export default function RegisterPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-qv-midnight-gradient px-6 py-16">
      <div className="pointer-events-none absolute inset-0 -z-10 quantum-curve opacity-80" />
      <div className="w-full max-w-3xl space-y-10">
        <div>
          <Link href="/">
            <Button
              variant="ghost"
              className="font-primary text-[0.62rem] uppercase tracking-[0.3em] text-muted-foreground/80 hover:text-primary"
            >
              <ArrowLeft className="mr-3 h-4 w-4" />
              Return to Vault
            </Button>
          </Link>
        </div>

        <div className="text-center">
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full border border-qv-gold/50 bg-white/5 shadow-qv-gold">
            <Image
              src="/qv_logo_white_bk.png"
              alt="Quantum Vault Logo"
              width={90}
              height={90}
            />
          </div>
          <h1 className="font-primary text-2xl tracking-[0.3em] text-secondary-foreground">
            Membership Covenant
          </h1>
          <p className="mt-3 font-secondary text-sm text-muted-foreground/80">
            Submit credentials for bespoke custody onboarding and concierge verification.
          </p>
        </div>

        <ClientRegisterForm />
      </div>
    </div>
  );
}