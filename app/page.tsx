"use client"

import Link from "next/link"
import Image from "next/image"
import { Menu, X, ArrowUpRight, CheckCircle2, Timer, AlertTriangle, MessageSquare, Shield } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Card, CardContent } from "@/components/ui/Card"
import { useState } from "react"
import ElectricBorder from "@/components/ui/ElectricBorder"
import ScrollStack, { ScrollStackItem } from "@/components/ui/ScrollStack"
import DarkVeil from "@/components/ui/DarkVeil"

export default function LandingPage() {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <main className="relative bg-background text-foreground overflow-hidden">
            {/* Navbar */}
            <div className="fixed top-0 inset-x-0 z-50 flex justify-center pt-5 px-4 pointer-events-none">
                <nav className="pointer-events-auto flex items-center justify-between w-full max-w-5xl">
                    {/* Left: Logo */}
                    <Link href="/" className="flex items-center gap-2 shrink-0">
                        <Image src="/lexai-logo.svg" alt="LexAI" width={120} height={30} className="h-7 w-auto" priority />
                    </Link>

                    {/* Center: Glass pill nav links */}
                    <div className="hidden md:flex items-center">
                        <div className="flex items-center gap-1 bg-white/[0.06] backdrop-blur-xl border border-white/[0.08] rounded-full px-2 py-1.5 shadow-[0_4px_30px_rgba(0,0,0,0.3)]">
                            <Link href="/" className="text-[13px] font-medium text-gray-400 hover:text-white transition-colors px-4 py-1.5 rounded-full hover:bg-white/[0.06]" style={{ fontFamily: 'var(--font-display)' }}>Home</Link>
                            <Link href="#features" className="text-[13px] font-medium text-gray-400 hover:text-white transition-colors px-4 py-1.5 rounded-full hover:bg-white/[0.06]" style={{ fontFamily: 'var(--font-display)' }}>Features</Link>
                            <Link href="#pricing" className="text-[13px] font-medium text-gray-400 hover:text-white transition-colors px-4 py-1.5 rounded-full hover:bg-white/[0.06]" style={{ fontFamily: 'var(--font-display)' }}>Pricing</Link>
                            <Link href="#about" className="text-[13px] font-medium text-gray-400 hover:text-white transition-colors px-4 py-1.5 rounded-full hover:bg-white/[0.06]" style={{ fontFamily: 'var(--font-display)' }}>About</Link>
                        </div>
                    </div>

                    {/* Right: Button */}
                    <div className="hidden md:block shrink-0">
                        <Button className="bg-primary text-primary-foreground font-medium rounded-full hover:brightness-110 h-9 px-5 text-[13px]" style={{ fontFamily: 'var(--font-display)' }} asChild>
                            <Link href="/analyze">Get Started</Link>
                        </Button>
                    </div>

                    {/* Mobile Menu Icon */}
                    <button className="md:hidden text-white" onClick={() => setMobileOpen(!mobileOpen)}>
                        {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </nav>
            </div>

            {/* Mobile Nav Dropdown */}
            {mobileOpen && (
                <div className="fixed inset-0 z-40 bg-background/95 backdrop-blur flex flex-col items-center justify-center gap-8">
                    <Link href="/" onClick={() => setMobileOpen(false)} className="text-lg font-medium text-muted-foreground hover:text-white" style={{ fontFamily: 'var(--font-display)' }}>Home</Link>
                    <Link href="#features" onClick={() => setMobileOpen(false)} className="text-lg font-medium text-muted-foreground hover:text-white" style={{ fontFamily: 'var(--font-display)' }}>Features</Link>
                    <Link href="#pricing" onClick={() => setMobileOpen(false)} className="text-lg font-medium text-muted-foreground hover:text-white" style={{ fontFamily: 'var(--font-display)' }}>Pricing</Link>
                    <Link href="#about" onClick={() => setMobileOpen(false)} className="text-lg font-medium text-muted-foreground hover:text-white" style={{ fontFamily: 'var(--font-display)' }}>About</Link>
                    <Button className="bg-primary text-primary-foreground rounded-full hover:brightness-110 mt-4 px-8" style={{ fontFamily: 'var(--font-display)' }} onClick={() => setMobileOpen(false)} asChild>
                        <Link href="/analyze">Get Started</Link>
                    </Button>
                </div>
            )}

            {/* Hero Section */}
            <section className="relative h-screen w-full flex flex-col justify-center items-center px-4 z-10">
                <div className="max-w-[680px] w-full flex flex-col items-center text-center">
                    <h1 className="text-[36px] md:text-[50px] lg:text-[66px] font-semibold leading-[1.05] mb-6 tracking-tight text-white">
                        Know what you&apos;re signing before you sign
                    </h1>
                    <p className="text-muted-foreground max-w-[520px] mb-8 text-sm md:text-base leading-relaxed">
                        LexAI reads any contract in 30 seconds and tells you exactly what to watch out for — hidden clauses, unfair terms, and everything in between.
                    </p>

                    {/* Tagline above the CTA buttons */}
                    <div className="border border-white/10 text-muted-foreground text-xs rounded-full px-4 py-1.5 mb-8 flex items-center gap-2 bg-white/5 backdrop-blur-sm" style={{ fontFamily: 'var(--font-display)' }}>
                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                        AI-Powered Contract Intelligence
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
                        <Button className="bg-primary text-primary-foreground hover:brightness-110 rounded-full h-[52px] px-8 text-[16px] w-full sm:w-auto font-medium flex items-center gap-2" style={{ fontFamily: 'var(--font-display)' }} asChild>
                            <Link href="/analyze">
                                <ArrowUpRight className="w-5 h-5" />
                                Analyze a Contract
                            </Link>
                        </Button>
                        <Button className="bg-white text-black hover:bg-gray-200 rounded-full h-[52px] px-8 text-[16px] w-full sm:w-auto font-medium" style={{ fontFamily: 'var(--font-display)' }} asChild>
                            <Link href="#pricing">
                                See Pricing
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* DarkVeil Background for the whole page */}
            <div className="fixed inset-0 z-[1] pointer-events-none" style={{ opacity: 0.4 }}>
                <DarkVeil hueShift={73} noiseIntensity={0.06} scanlineIntensity={0.3} speed={0.15} scanlineFrequency={15} warpAmount={0.04} resolutionScale={0.8} />
            </div>

            {/* ScrollStack Sections */}
            <div className="relative z-10 w-full" id="features">
                <ScrollStack useWindowScroll={true} stackPosition="12%" scaleEndPosition="8%">

                    {/* Features Item */}
                    <ScrollStackItem itemClassName="min-h-[500px]">
                        <div className="bg-card w-full h-full min-h-[500px] border border-border/20 rounded-[40px] p-12 lg:p-20 flex flex-col justify-center items-center text-center shadow-2xl">
                            <div className="w-16 h-1 bg-primary mb-12 rounded-full hidden" />
                            <div className="grid md:grid-cols-3 gap-16 max-w-5xl mx-auto w-full">
                                <div className="flex flex-col items-center">
                                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                                        <Timer className="w-6 h-6 text-primary" />
                                    </div>
                                    <h3 className="text-xl md:text-2xl font-semibold mb-4 text-white">30-Second Verdict</h3>
                                    <p className="text-muted-foreground text-sm md:text-base leading-relaxed">Don&apos;t wait days for a lawyer. Get instant clarity on whether you should sign, negotiate, or run.</p>
                                </div>
                                <div className="flex flex-col items-center">
                                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                                        <AlertTriangle className="w-6 h-6 text-primary" />
                                    </div>
                                    <h3 className="text-xl md:text-2xl font-semibold mb-4 text-white">Red Flag Detection</h3>
                                    <p className="text-muted-foreground text-sm md:text-base leading-relaxed">We find hidden IP grabs, unfair termination clauses, and predatory payment terms.</p>
                                </div>
                                <div className="flex flex-col items-center">
                                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                                        <MessageSquare className="w-6 h-6 text-primary" />
                                    </div>
                                    <h3 className="text-xl md:text-2xl font-semibold mb-4 text-white">Negotiation Ready</h3>
                                    <p className="text-muted-foreground text-sm md:text-base leading-relaxed">We draft professional pushback emails for every bad clause we find, so you can negotiate like a pro.</p>
                                </div>
                            </div>
                        </div>
                    </ScrollStackItem>

                    {/* Pricing Item */}
                    <ScrollStackItem itemClassName="min-h-[700px]" id="pricing">
                        <div className="bg-background w-full h-full min-h-[750px] border border-border/20 rounded-[40px] pt-24 pb-12 px-12 lg:pt-28 lg:pb-16 lg:px-20 flex flex-col justify-start items-center shadow-2xl relative overflow-hidden">

                            <div className="text-center mb-8 relative z-10">
                                <h2 className="text-2xl md:text-4xl font-bold mb-4 tracking-tight text-white">Simple, transparent pricing.</h2>
                                <p className="text-muted-foreground text-base md:text-lg">Never sign blindly again.</p>
                            </div>

                            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto w-full relative z-10 items-stretch">
                                {/* Free Tier */}
                                <Card className="border-border/30 bg-card/60 backdrop-blur-xl">
                                    <CardContent className="p-8 flex flex-col h-full">
                                        <h3 className="text-xl font-semibold mb-2 text-white">Free</h3>
                                        <div className="mb-4">
                                            <span className="text-4xl font-bold text-white">$0</span>
                                            <span className="text-muted-foreground text-sm">/month</span>
                                        </div>
                                        <ul className="space-y-4 mb-8 flex-1">
                                            <li className="flex items-center gap-3 text-sm text-gray-300">
                                                <CheckCircle2 className="w-5 h-5 text-primary opacity-80" /> 3 analyses per month
                                            </li>
                                            <li className="flex items-center gap-3 text-sm text-gray-300">
                                                <CheckCircle2 className="w-5 h-5 text-primary opacity-80" /> Basic risk scoring
                                            </li>
                                            <li className="flex items-center gap-3 text-sm text-gray-300">
                                                <CheckCircle2 className="w-5 h-5 text-primary opacity-80" /> Plain English translations
                                            </li>
                                        </ul>
                                        <Button variant="outline" className="w-full bg-white/5 hover:bg-white/10 text-white rounded-full h-12" style={{ fontFamily: 'var(--font-display)' }} asChild>
                                            <Link href="/analyze">Start Free</Link>
                                        </Button>
                                    </CardContent>
                                </Card>

                                {/* Pro Tier - Middle Card using ElectricBorder */}
                                <ElectricBorder color="#00E68A" speed={0.5} chaos={0.03} borderRadius={24} className="h-full z-10 md:-translate-y-4">
                                    <Card className="border-transparent bg-background/80 h-full relative z-10 backdrop-blur-2xl">
                                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider" style={{ fontFamily: 'var(--font-display)' }}>
                                            Most Popular
                                        </div>
                                        <CardContent className="p-8 flex flex-col h-full pt-10">
                                            <h3 className="text-xl font-semibold mb-2 text-white">Pro</h3>
                                            <div className="mb-4">
                                                <span className="text-4xl font-bold text-white">$29</span>
                                                <span className="text-muted-foreground text-sm">/month</span>
                                            </div>
                                            <ul className="space-y-4 mb-8 flex-1">
                                                <li className="flex items-center gap-3 text-sm text-gray-300">
                                                    <CheckCircle2 className="w-5 h-5 text-primary" /> Unlimited analyses
                                                </li>
                                                <li className="flex items-center gap-3 text-sm text-gray-300">
                                                    <CheckCircle2 className="w-5 h-5 text-primary" /> Advanced red flag detection
                                                </li>
                                                <li className="flex items-center gap-3 text-sm text-gray-300">
                                                    <CheckCircle2 className="w-5 h-5 text-primary" /> Negotiation email generator
                                                </li>
                                                <li className="flex items-center gap-3 text-sm text-gray-300">
                                                    <CheckCircle2 className="w-5 h-5 text-primary" /> Contract history dashboard
                                                </li>
                                            </ul>
                                            <Button className="w-full bg-primary text-primary-foreground font-medium hover:brightness-110 rounded-full h-12" style={{ fontFamily: 'var(--font-display)' }} asChild>
                                                <Link href="/signup">Upgrade to Pro</Link>
                                            </Button>
                                        </CardContent>
                                    </Card>
                                </ElectricBorder>

                                {/* Team Tier */}
                                <Card className="border-border/30 bg-card/60 backdrop-blur-xl">
                                    <CardContent className="p-8 flex flex-col h-full">
                                        <h3 className="text-xl font-semibold mb-2 text-white">Team</h3>
                                        <div className="mb-4">
                                            <span className="text-4xl font-bold text-white">$79</span>
                                            <span className="text-muted-foreground text-sm">/month</span>
                                        </div>
                                        <ul className="space-y-4 mb-8 flex-1">
                                            <li className="flex items-center gap-3 text-sm text-gray-300">
                                                <CheckCircle2 className="w-5 h-5 text-primary opacity-80" /> 5 team seats
                                            </li>
                                            <li className="flex items-center gap-3 text-sm text-gray-300">
                                                <CheckCircle2 className="w-5 h-5 text-primary opacity-80" /> Everything in Pro
                                            </li>
                                            <li className="flex items-center gap-3 text-sm text-gray-300">
                                                <CheckCircle2 className="w-5 h-5 text-primary opacity-80" /> Shared contract library
                                            </li>
                                        </ul>
                                        <Button variant="outline" className="w-full bg-white/5 hover:bg-white/10 text-white rounded-full h-12" style={{ fontFamily: 'var(--font-display)' }} asChild>
                                            <Link href="/signup">Start Free Trial</Link>
                                        </Button>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </ScrollStackItem>
                </ScrollStack>
            </div>

            {/* Footer / About Section */}
            <footer id="about" className="relative z-10 w-full bg-[#0A0A0A] border-t border-white/5 pt-20 pb-10 px-6 md:px-12 mt-20">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                        {/* Column 1 - Brand */}
                        <div className="flex flex-col gap-4">
                            <Link href="/" className="flex items-center gap-2">
                                <Image src="/lexai-logo.svg" alt="LexAI" width={120} height={30} className="h-7 w-auto" />
                            </Link>
                            <p className="text-gray-400 text-sm mt-2" style={{ fontFamily: 'var(--font-display)' }}>
                                Know what you&apos;re signing.
                            </p>
                            <div className="mt-6 text-sm text-gray-500">
                                <p>Built by Us &copy; 2026</p>
                                <p>All rights reserved.</p>
                            </div>
                        </div>

                        {/* Column 2 - Product */}
                        <div className="flex flex-col gap-4">
                            <h4 className="text-white font-semibold mb-2" style={{ fontFamily: 'var(--font-display)' }}>Product</h4>
                            <Link href="#how-it-works" className="text-gray-400 hover:text-white transition-colors text-sm">How It Works</Link>
                            <Link href="#features" className="text-gray-400 hover:text-white transition-colors text-sm">Features</Link>
                            <Link href="#pricing" className="text-gray-400 hover:text-white transition-colors text-sm">Pricing</Link>
                            <Link href="/analyze" className="text-brand hover:text-brand/80 transition-colors text-sm font-medium">Try It Free</Link>
                        </div>

                        {/* Column 3 - Legal */}
                        <div className="flex flex-col gap-4">
                            <h4 className="text-white font-semibold mb-2" style={{ fontFamily: 'var(--font-display)' }}>Legal</h4>
                            <Link href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Privacy Policy</Link>
                            <Link href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Terms of Service</Link>
                            <Link href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Cookie Policy</Link>
                            <Link href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Security</Link>
                        </div>

                        {/* Column 4 - Social */}
                        <div className="flex flex-col gap-4">
                            <h4 className="text-white font-semibold mb-2" style={{ fontFamily: 'var(--font-display)' }}>Follow Us</h4>
                            <Link href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Twitter / X</Link>
                            <Link href="#" className="text-gray-400 hover:text-white transition-colors text-sm">LinkedIn</Link>
                            <Link href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Product Hunt</Link>
                            <Link href="#" className="text-gray-400 hover:text-white transition-colors text-sm">GitHub</Link>
                        </div>
                    </div>

                    {/* Bottom Bar */}
                    <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
                        <p className="flex items-center gap-1">
                            <Shield className="w-3 h-3 text-safe" /> Your contracts are never stored or shared.
                        </p>
                        <div className="flex items-center gap-4">
                            <span>Made with ❤️ by Us</span>
                            <span className="hidden md:inline">|</span>
                            <span>&copy; LexAI 2026</span>
                        </div>
                    </div>
                </div>
            </footer>
        </main>
    )
}
