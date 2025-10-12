import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Lock, Users, Clock, Star, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-spi-navy via-spi-navy to-spi-dark">
      {/* Navigation */}
      <nav className="border-b border-spi-silver/20 bg-spi-navy/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-spi-gold" />
              <span className="ml-2 text-xl font-bold text-white">SPI Safe Deposit</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/login">
                <Button variant="ghost" className="text-white hover:bg-spi-silver/20">
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button className="bg-spi-gold hover:bg-spi-gold/90 text-spi-navy">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Secure Your Most
              <span className="text-spi-gold block">Valuable Assets</span>
            </h1>
            <p className="text-xl text-spi-silver mb-8 max-w-3xl mx-auto">
              Premium safe deposit box services with state-of-the-art security, 
              exclusive member benefits, and professional vault facilities in Thailand.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button size="lg" className="bg-spi-gold hover:bg-spi-gold/90 text-spi-navy text-lg px-8 py-4">
                  Start Your Membership
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="border-spi-silver text-spi-silver hover:bg-spi-silver/10 text-lg px-8 py-4">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Why Choose SPI Safe Deposit?
            </h2>
            <p className="text-xl text-spi-silver max-w-2xl mx-auto">
              Experience the highest level of security and service with our premium vault facilities.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-white/10 border-spi-silver/20 text-white">
              <CardHeader>
                <Shield className="h-12 w-12 text-spi-gold mb-4" />
                <CardTitle>Bank-Level Security</CardTitle>
                <CardDescription className="text-spi-silver">
                  State-of-the-art vault systems with 24/7 monitoring and access control.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white/10 border-spi-silver/20 text-white">
              <CardHeader>
                <Lock className="h-12 w-12 text-spi-gold mb-4" />
                <CardTitle>Private Access</CardTitle>
                <CardDescription className="text-spi-silver">
                  Exclusive member access with personalized service and privacy protection.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white/10 border-spi-silver/20 text-white">
              <CardHeader>
                <Users className="h-12 w-12 text-spi-gold mb-4" />
                <CardTitle>Meeting Facilities</CardTitle>
                <CardDescription className="text-spi-silver">
                  Professional meeting rooms and conference facilities for business needs.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white/10 border-spi-silver/20 text-white">
              <CardHeader>
                <Clock className="h-12 w-12 text-spi-gold mb-4" />
                <CardTitle>Flexible Access</CardTitle>
                <CardDescription className="text-spi-silver">
                  Extended hours and convenient booking system for your schedule.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white/10 border-spi-silver/20 text-white">
              <CardHeader>
                <Star className="h-12 w-12 text-spi-gold mb-4" />
                <CardTitle>Premium Service</CardTitle>
                <CardDescription className="text-spi-silver">
                  Dedicated concierge service and exclusive member benefits.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white/10 border-spi-silver/20 text-white">
              <CardHeader>
                <Shield className="h-12 w-12 text-spi-gold mb-4" />
                <CardTitle>Insurance Coverage</CardTitle>
                <CardDescription className="text-spi-silver">
                  Comprehensive insurance coverage for your stored valuables.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Ready to Secure Your Valuables?
          </h2>
          <p className="text-xl text-spi-silver mb-8">
            Join thousands of satisfied members who trust SPI with their most valuable assets.
          </p>
          <Link href="/register">
            <Button size="lg" className="bg-spi-gold hover:bg-spi-gold/90 text-spi-navy text-lg px-8 py-4">
              Become a Member Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-spi-silver/20 bg-spi-navy/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <Shield className="h-6 w-6 text-spi-gold" />
              <span className="ml-2 text-lg font-semibold text-white">SPI Safe Deposit</span>
            </div>
            <div className="text-spi-silver text-sm">
              © 2024 SPI Safe Deposit Box. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
