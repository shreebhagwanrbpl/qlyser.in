import Image from "next/image";
import Link from "next/link";
import PageBanner from "@/components/PageBanner";
import SectionTitle from "@/components/SectionTitle";
import CTASection from "@/components/CTASection";
import rajbiosisLogo from "@/components/img/rajbiosis-logo.png";
import {
  ShieldCheck,
  Award,
  Users,
  Activity,
  CheckCircle2,
  Clock,
  ArrowRight,
  Building2,
  Sparkles,
} from "lucide-react";

export default function AboutPage() {
  const pillars = [
    {
      icon: <ShieldCheck className="w-8 h-8 text-blue-500" />,
      title: "Certified Excellence",
      desc: "Every biomedical device, reagent, and diagnostic kit complies with ISO 13485 and international health standards.",
    },
    {
      icon: <Activity className="w-8 h-8 text-teal-400" />,
      title: "Diagnostic Precision",
      desc: "Our analyzers ensure repeatable, accurate results for routine and critical pathology testing.",
    },
    {
      icon: <Clock className="w-8 h-8 text-amber-400" />,
      title: "24/7 AMC & Technical Support",
      desc: "Dedicated service engineers provide rapid 24-hour on-site visits to prevent laboratory downtime.",
    },
    {
      icon: <Users className="w-8 h-8 text-cyan-400" />,
      title: "Nationwide Supply Network",
      desc: "Fast, reliable cold-chain shipping ensuring reagents and consumables arrive at peak stability.",
    },
  ];

  const milestones = [
    { number: "10+", label: "Years Industry Leadership" },
    { number: "500+", label: "Diagnostic Labs Serviced" },
    { number: "10,000+", label: "Reagents Delivered" },
    { number: "99.8%", label: "Lab Service Uptime" },
  ];

  return (
    <>
      {/* Page Banner */}
      <PageBanner
        title="About Raj Biosis Private Limited"
        subtitle="Empowering healthcare institutions, pathology laboratories, and diagnostic centers with world-class biomedical systems and dedicated service support."
      />

      {/* Main About Story Section */}
      <section className="relative overflow-hidden bg-white py-24">
        {/* Background Glow */}
        <div className="absolute top-1/4 left-0 h-[450px] w-[450px] rounded-full bg-blue-100/40 blur-[140px] pointer-events-none" />
        <div className="absolute bottom-10 right-0 h-[350px] w-[350px] rounded-full bg-teal-100/40 blur-[130px] pointer-events-none" />

        <div className="container-custom relative z-10 grid items-center gap-16 lg:grid-cols-2">
          {/* Left Visual Column - New Raj Biosis Logo Image */}
          <div className="relative">
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-b from-slate-50 to-slate-100 p-10 shadow-xl shadow-slate-200/60 flex items-center justify-center min-h-[440px]">
              <Image
                src={rajbiosisLogo}
                alt="Raj Biosis Private Limited Logo"
                width={500}
                height={500}
                className="max-h-[380px] w-auto object-contain transition duration-500 hover:scale-105"
                priority
              />
            </div>

            {/* Experience Floating Badge */}
            <div className="absolute -bottom-6 left-6 hidden rounded-2xl border border-slate-200 bg-slate-900 p-6 text-white shadow-2xl lg:block">
              <h3 className="text-4xl font-black text-amber-400">10+</h3>
              <p className="mt-1 text-xs font-bold text-slate-300 uppercase tracking-wider">
                Years of Excellence
              </p>
            </div>

            {/* Registered Trademark Badge */}
            <div className="absolute -top-4 right-6 hidden rounded-full bg-teal-600 px-5 py-2 text-xs font-bold text-white shadow-lg border border-teal-400/40 lg:flex items-center gap-2">
              <Award size={16} />
              <span>Registered Trademark ®</span>
            </div>
          </div>

          {/* Right Text Column */}
          <div>
            <SectionTitle
              badge="Who We Are"
              title="Your Trusted Partner in Biomedical Technology"
              description="Raj Biosis Private Limited is a premier provider of automated biochemistry analyzers, hematology instruments, electrolyte testing systems, and high-purity clinical reagents."
            />

            <p className="mt-6 text-base sm:text-lg leading-relaxed text-slate-700 font-normal">
              For over a decade, Raj Biosis Private Limited has partnered with hospitals, diagnostic labs, and medical centers across India to supply state-of-the-art diagnostic machinery. Our focus is delivering reliable equipment backed by quick technical response and preventive maintenance.
            </p>

            <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-700 font-normal">
              Whether setting up a new pathology lab or maintaining high-volume biochemistry testing, our team of trained biomedical engineers ensures maximum diagnostic precision and minimum downtime.
            </p>

            {/* Quick Checklist */}
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {[
                "Authorized Equipment Supplier",
                "Cold-Chain Reagent Delivery",
                "Annual Maintenance Contracts (AMC)",
                "NABL Standard Compliance",
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-sm font-bold text-slate-800">
                  <CheckCircle2 size={18} className="text-teal-600 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* Action Call */}
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link href="/services">
                <button className="flex h-13 items-center gap-2 rounded-xl bg-slate-900 px-7 text-sm font-bold text-white shadow-lg transition hover:bg-blue-600 hover:scale-105">
                  <span>Explore Our Services</span>
                  <ArrowRight size={16} />
                </button>
              </Link>
              <Link href="/contact">
                <button className="flex h-13 items-center gap-2 rounded-xl border border-slate-300 bg-white px-7 text-sm font-bold text-slate-800 hover:bg-slate-50">
                  Contact Us
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values / Pillars Section - Fixed Dark Contrast */}
      <section className="bg-slate-900 py-24 text-white relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-1/4 h-[400px] w-[400px] rounded-full bg-blue-500/10 blur-[150px] pointer-events-none" />

        <div className="container-custom relative z-10">
          {/* Passed dark={true} to fix invisible text */}
          <SectionTitle
            badge="Our Core Pillars"
            title="Driven by Precision & Quality"
            description="Our commitment to excellence guides everything we do, from equipment selection to technical AMC support."
            center
            dark={true}
          />

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {pillars.map((item, idx) => (
              <div
                key={idx}
                className="group rounded-3xl border border-slate-800 bg-slate-950/80 p-8 shadow-xl transition-all duration-300 hover:-translate-y-2 hover:border-slate-700 hover:bg-slate-900"
              >
                <div className="mb-6 inline-flex rounded-2xl bg-slate-900 p-4 border border-slate-800 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-white">{item.title}</h3>
                <p className="mt-3 text-sm text-slate-200 leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Counter Section */}
      <section className="py-20 bg-slate-50 border-y border-slate-200">
        <div className="container-custom">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {milestones.map((ms, idx) => (
              <div key={idx} className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-lg">
                <h3 className="text-4xl lg:text-5xl font-black text-slate-900">{ms.number}</h3>
                <p className="mt-2 text-sm font-bold text-slate-600 uppercase tracking-wider">{ms.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection />
    </>
  );
}