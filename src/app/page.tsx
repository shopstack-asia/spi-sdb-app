import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  LockKeyhole,
  Building2,
  Clock3,
  Sparkles,
  Fingerprint,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const featureHighlights = [
  {
    title: "Tier IV Vault Architecture",
    description:
      "Dual biometric authentication, seismic sensors, and quantum-grade encryption across every private suite.",
    icon: ShieldCheck,
  },
  {
    title: "Private Concierge Access",
    description:
      "Dedicated relationship managers orchestrate secure retrievals, notarizations, and bespoke logistics on demand.",
    icon: Sparkles,
  },
  {
    title: "Time-Lock Precision",
    description:
      "Chrono-balanced scheduling ensures discreet appointments with zero cross-traffic, morning or midnight.",
    icon: Clock3,
  },
  {
    title: "Intelligence-Ready Rooms",
    description:
      "Acoustically isolated briefing chambers and diplomatic-grade meeting salons within the vault perimeter.",
    icon: Building2,
  },
  {
    title: "Quantum Trace Monitoring",
    description:
      "Real-time telemetry with anomaly prediction shields assets against emerging threat vectors.",
    icon: Fingerprint,
  },
  {
    title: "Legacy Stewardship",
    description:
      "Estate custodianship programmes safeguard heirlooms and instruments across generations.",
    icon: LockKeyhole,
  },
];

const membershipTiers = [
  {
    title: "Signature Suites",
    summary:
      "For personal collections requiring temperature balance and biometric dual control.",
    detail:
      "Includes heirloom vaults, archival humidity regulation, and 24-hour concierge dispatch.",
  },
  {
    title: "Heritage Sovereign",
    summary:
      "Structured for multi-family offices with multi-signatory governance.",
    detail:
      "Dedicated strategy lounge, notarised custody workflows, and custom compliance reporting.",
  },
  {
    title: "Quantum Syndicate",
    summary:
      "Reserved for institutional vaulting with hybrid on/offshore custody orchestration.",
    detail:
      "Command theatre access, encrypted audit feeds, and sovereign liaison coordination.",
  },
];

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-qv-midnight-gradient" />
      <div className="pointer-events-none absolute inset-y-0 right-0 -z-10 hidden w-1/2 translate-x-1/4 rounded-full bg-qv-gold-gradient opacity-20 blur-3xl lg:block" />

      <header className="sticky top-0 z-40 border-b border-white/10 bg-background/80 backdrop-blur-2xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-3">
            <span className="relative flex h-12 w-36 items-center">
              <Image
                src="/qv_logo_white_bk.png"
                alt="Quantum Vault"
                fill
                priority
                className="object-contain"
              />
            </span>
          </Link>
          <div className="hidden items-center gap-10 text-xs uppercase tracking-[0.28em] text-muted-foreground/80 lg:flex">
            <Link href="/subscription" className="transition hover:text-primary">
              Vault Suites
            </Link>
            <Link href="/booking" className="transition hover:text-primary">
              Private Access
            </Link>
            <Link href="/member" className="transition hover:text-primary">
              Member Lounge
            </Link>
            <Link href="/payment" className="transition hover:text-primary">
              Concierge
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm" className="hidden lg:flex">
                Client Login
              </Button>
            </Link>
            <Link href="/register">
              <Button size="sm">Reserve a Suite</Button>
            </Link>
          </div>
        </nav>
      </header>

      <main className="relative">
        <section className="quantum-curve seed-pod-pattern">
          <div className="mx-auto flex max-w-7xl flex-col gap-16 px-6 py-24 lg:flex-row lg:items-center lg:py-32">
            <div className="flex-1 space-y-8">
              <div className="luxury-divider inline-flex flex-col gap-4">
                <span className="font-primary text-xs text-qv-gold/80">
                  Quantum Vault Corporate Private Banking
                </span>
                <h1 className="font-primary text-4xl leading-[1.1] tracking-[0.28em] text-secondary-foreground sm:text-5xl lg:text-[3.4rem]">
                  Custody Without Compromise
                </h1>
              </div>
              <p className="max-w-2xl font-secondary text-lg text-muted-foreground/90">
                Within Bangkok&apos;s most discreet vault, Quantum Vault orchestrates personalised custody suites, sovereign-grade security, and a concierge culture defined by silence and precision.
              </p>
              <div className="space-y-4">
                <p className="font-primary text-sm tracking-[0.32em] text-qv-gold">
                  Trust Beyond Time
                </p>
                <p className="font-secondary text-base text-muted-foreground">
                  ปกป้องเหนือกาลเวลา
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link href="/register">
                  <Button size="lg" className="px-10">
                    Begin Membership
                    <ArrowRight className="ml-3 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/booking">
                  <Button variant="outline" size="lg" className="border-qv-gold/70 text-secondary-foreground">
                    Schedule Private Tour
                  </Button>
                </Link>
              </div>
            </div>

            <div className="flex-1">
              <div className="golden-outline relative overflow-hidden rounded-3xl border border-white/5 bg-surface/70 p-1 shadow-qv-soft backdrop-blur-xl">
                <div className="relative overflow-hidden rounded-[1.4rem] border border-qv-chrome/30 bg-gradient-to-br from-[#112e47]/30 via-[#0E4066]/70 to-[#222221]/80 p-8">
                  <div className="flex flex-col gap-6">
                    <div className="flex items-center justify-between">
                      <span className="font-primary text-[0.62rem] tracking-[0.3em] text-qv-gold/80">
                        Executive Briefing Capsule
                      </span>
                      <ArrowRight className="h-4 w-4 text-qv-gold/70" />
                    </div>
                    <div className="space-y-3">
                      <h2 className="font-primary text-xl tracking-[0.26em] text-secondary-foreground">
                        Vault Intelligence
                      </h2>
                      <p className="font-secondary text-sm text-muted-foreground/85">
                        Immersive biometric vestibules with dual-factor resonance scanning insulate your assets from future unknowns.
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-xs uppercase tracking-[0.28em] text-muted-foreground/70">
                      <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                        <span className="block font-primary text-[0.58rem]">Quantum Trace</span>
                        <span className="mt-2 block font-secondary text-sm text-secondary-foreground">
                          24/7 Predictive Analytic
                        </span>
                      </div>
                      <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                        <span className="block font-primary text-[0.58rem]">Dual Custody</span>
                        <span className="mt-2 block font-secondary text-sm text-secondary-foreground">
                          Sovereign Clearance
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0E4066]/60 via-transparent to-transparent" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-white/10 bg-surface/60">
          <div className="mx-auto max-w-7xl px-6 py-20">
            <div className="luxury-divider text-center">
              <h2 className="font-primary text-2xl tracking-[0.28em] text-secondary-foreground">
                Precision Meets Presence
              </h2>
              <p className="mx-auto mt-6 max-w-3xl font-secondary text-base text-muted-foreground/85">
                Every interaction is orchestrated by former private banking specialists and security strategists, ensuring your collections, instruments, and archives remain impeccably preserved.
              </p>
            </div>

            <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {featureHighlights.map((feature) => (
                <Card key={feature.title} className="group border-transparent bg-background/40">
                  <CardHeader className="border-none px-7 pt-7">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-qv-gold/40 bg-white/5 text-qv-gold">
                      <feature.icon className="h-6 w-6" />
                    </span>
                  </CardHeader>
                  <CardContent className="space-y-3 px-7 pb-8">
                    <CardTitle className="text-left text-sm text-secondary-foreground">
                      {feature.title}
                    </CardTitle>
                    <CardDescription className="text-left text-sm text-muted-foreground/85">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-background/95">
          <div className="mx-auto max-w-7xl px-6 py-20">
            <div className="flex flex-col gap-16 lg:flex-row lg:items-start">
              <div className="flex-1 space-y-8">
                <span className="font-primary text-xs text-qv-gold/70">
                  Membership Architecture
                </span>
                <h3 className="font-primary text-3xl tracking-[0.28em] text-secondary-foreground">
                  Programmes Tailored to Legacy
                </h3>
                <p className="max-w-xl font-secondary text-base text-muted-foreground/85">
                  Quantum Vault curates multi-layered custody programmes that scale with dynastic estates, single-family offices, and sovereign portfolios.
                </p>
              </div>
              <div className="flex-1 space-y-6">
                {membershipTiers.map((tier) => (
                  <div
                    key={tier.title}
                    className="golden-outline rounded-2xl border border-white/5 bg-surface/80 p-6 shadow-qv-soft"
                  >
                    <p className="font-primary text-xs tracking-[0.3em] text-qv-gold/80">
                      {tier.title}
                    </p>
                    <p className="mt-3 font-secondary text-base text-secondary-foreground">
                      {tier.summary}
                    </p>
                    <p className="mt-2 font-secondary text-sm text-muted-foreground/75">
                      {tier.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-white/10 bg-surface/70">
          <div className="mx-auto max-w-7xl px-6 py-20">
            <div className="rounded-3xl border border-qv-gold/35 bg-gradient-to-br from-[#0E4066]/70 via-[#152f47]/80 to-[#222221]/80 p-10 text-center shadow-qv-soft">
              <p className="font-primary text-sm tracking-[0.32em] text-qv-gold">
                Discretion Engineered
              </p>
              <h4 className="mt-6 font-primary text-2xl tracking-[0.3em] text-secondary-foreground">
                Private viewings are curated after a confidential consultation with our custodial architects.
              </h4>
              <p className="mt-6 font-secondary text-base text-muted-foreground/85">
                Arrange a nightfall immersion or schedule a daylight survey. Our team coordinates travel, compliance, and bespoke hospitality for every visitation.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link href="/booking">
                  <Button size="lg" className="px-10">
                    Book a Confidential Tour
                  </Button>
                </Link>
                <Link href="/login">
                  <Button variant="ghost" size="lg" className="text-secondary-foreground">
                    Client Entrance
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-background/90">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-12 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <span className="relative flex h-8 w-28 items-center">
              <Image
                src="/qv_logo_white_bk.png"
                alt="Quantum Vault"
                fill
                className="object-contain"
              />
            </span>
            <div>
              <p className="font-primary text-[0.6rem] tracking-[0.3em] text-qv-gold">
                Trust Beyond Time
              </p>
              <p className="font-secondary text-xs text-muted-foreground/70">
                ปกป้องเหนือกาลเวลา
              </p>
            </div>
          </div>
          <div className="space-y-1 text-right text-xs text-muted-foreground/70">
            <p>© {new Date().getFullYear()} Quantum Vault Group Limited. All rights reserved.</p>
            <p>Charter Compliance • Private Banking Alliances • Sovereign Custody</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
