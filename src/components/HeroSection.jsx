"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import {
  ShieldCheck,
  Microscope,
  BadgeCheck,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Sparkles,
  Award,
  Activity,
  FlaskConical,
  PhoneCall,
  Clock,
  CheckCircle2,
} from "lucide-react";

export default function HeroSection({ city }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [dbHero, setDbHero] = useState(null);

  // District Routing
  const districtSlug = city
    ? city.toLowerCase().replace(/\s+/g, "-")
    : "";

  const makeLink = (path) => {
    return districtSlug ? `/${districtSlug}${path}` : path;
  };

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const snap = await getDoc(
          doc(db, "websites", "centralbiomedicals", "pages", "home")
        );
        if (snap.exists() && snap.data()?.title) {
          setDbHero(snap.data());
        }
      } catch (error) {
        console.error("Error fetching hero data:", error);
      }
    };

    fetchHeroData();
  }, []);

  const slides = [
    {
      id: 1,
      badge: "✨ Next-Gen Healthcare Technology",
      badgeIcon: <Sparkles size={16} className="text-amber-400 animate-pulse" />,
      title: dbHero?.title || "Advanced Diagnostic Systems & Laboratory Solutions",
      subtitle: dbHero?.description || "Empower your medical facility with high-precision biochemistry, hematology, and electrolyte analyzers engineered for accurate diagnostic performance.",
      highlights: [
        "100% Quality Assured Systems",
        "Fast Calibration & High Throughput",
        "Nationwide Technical Installation",
      ],
      primaryBtnText: dbHero?.button1Text || "Explore Equipment",
      primaryBtnLink: makeLink("/items"),
      secondaryBtnText: dbHero?.button2Text || "Get Quick Quote",
      secondaryBtnLink: makeLink("/contact"),
      gradientBg: "from-slate-950 via-slate-900 to-slate-950",
      accentGlow: "bg-cyan-500/20",
      glowPosition: "-top-32 left-1/4",
      cardBadge: "Flagship Technology",
      stats: [
        { label: "Accuracy Rate", val: "99.9%" },
        { label: "Diagnostic Labs", val: "500+" },
      ],
      visualIcon: <Microscope className="w-24 h-24 text-cyan-400/90" />
    },
    {
      id: 2,
      badge: "🧪 Premium Diagnostic Reagents & Kits",
      badgeIcon: <FlaskConical size={16} className="text-emerald-400" />,
      title: "High-Purity Pathology Reagents & Rapid Diagnostic Kits",
      subtitle: "Certified calibrators, electrolyte fluids, and instant rapid test kits delivered with guaranteed cold-chain integrity across laboratories in India.",
      highlights: [
        "Roche & ERBA Compatible Supplies",
        "Strict Cold-Chain Temperature Control",
        "Bulk Ready Emergency Dispatch",
      ],
      primaryBtnText: "View Reagent Range",
      primaryBtnLink: makeLink("/items"),
      secondaryBtnText: "Request Reagent Price",
      secondaryBtnLink: makeLink("/contact"),
      gradientBg: "from-slate-950 via-blue-950 to-slate-900",
      accentGlow: "bg-emerald-500/20",
      glowPosition: "bottom-0 right-1/4",
      cardBadge: "Certified Quality",
      stats: [
        { label: "Products Delivered", val: "10,000+" },
        { label: "Quality Assurance", val: "ISO 13485" },
      ],
      visualIcon: <Activity className="w-24 h-24 text-emerald-400/90" />
    },
    {
      id: 3,
      badge: "🛠️ 24/7 Technical Service & AMC",
      badgeIcon: <Clock size={16} className="text-amber-400" />,
      title: "Turnkey Laboratory Setup & Complete AMC Maintenance",
      subtitle: "Prevent costly lab downtime with 24-hour emergency engineer response, preventative servicing, genuine spare parts, and expert NABL consultation.",
      highlights: [
        "24-Hour On-site Response Guarantee",
        "Preventative AMC & Servicing",
        "Original Factory Replacement Parts",
      ],
      primaryBtnText: "Explore AMC Support",
      primaryBtnLink: makeLink("/services"),
      secondaryBtnText: "Contact Technical Support",
      secondaryBtnLink: makeLink("/contact"),
      gradientBg: "from-slate-950 via-slate-900 to-indigo-950",
      accentGlow: "bg-amber-500/20",
      glowPosition: "top-1/4 right-10",
      cardBadge: "24/7 Support",
      stats: [
        { label: "Years Experience", val: "10+ Years" },
        { label: "Service Uptime", val: "99.8%" },
      ],
      visualIcon: <Award className="w-24 h-24 text-amber-400/90" />
    },
  ];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(timer);
  }, [nextSlide, isPaused]);

  const slide = slides[currentSlide];

  return (
    <section 
      className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-slate-950 text-white py-20 lg:py-24"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Dynamic Gradients */}
      <div className="absolute inset-0 bg-slate-950">
        <div className={`absolute inset-0 bg-gradient-to-br ${slide.gradientBg} transition-all duration-1000`} />
        
        {/* Glow Spheres */}
        <div className={`absolute ${slide.glowPosition} h-[550px] w-[550px] rounded-full ${slide.accentGlow} blur-[140px] transition-all duration-1000`} />
        <div className="absolute top-1/2 -left-40 h-[450px] w-[450px] rounded-full bg-blue-600/15 blur-[150px]" />
        
        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.15) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="container-custom relative z-10 w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center"
          >
            {/* Left Content Column (7 cols) */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              {/* Badge Header */}
              <div className="inline-flex items-center gap-2.5 rounded-full border border-slate-700/80 bg-slate-900/90 px-5 py-2 text-sm font-semibold text-slate-200 shadow-xl backdrop-blur-md">
                {slide.badgeIcon}
                <span>{slide.badge}</span>
                {city && (
                  <span className="ml-1 pl-2 border-l border-slate-700 text-amber-300 font-bold">
                    Serving {city}
                  </span>
                )}
              </div>

              {/* Slide Title */}
              <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.12]">
                {slide.title}
              </h1>

              {/* Subtitle */}
              <p className="mt-6 text-lg sm:text-xl text-slate-300 leading-relaxed max-w-2xl font-normal">
                {slide.subtitle}
              </p>

              {/* Highlights Checklist */}
              <div className="mt-8 flex flex-wrap gap-y-3 gap-x-6">
                {slide.highlights.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm font-medium text-slate-200">
                    <CheckCircle2 size={18} className="text-emerald-400 flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Link href={slide.primaryBtnLink}>
                  <button className="group flex h-14 items-center gap-3 rounded-2xl bg-gradient-to-r from-blue-600 via-teal-500 to-cyan-500 px-8 font-bold text-white shadow-[0_0_30px_rgba(14,165,233,0.4)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(14,165,233,0.6)]">
                    <span>{slide.primaryBtnText}</span>
                    <ArrowRight size={19} className="transition group-hover:translate-x-1.5" />
                  </button>
                </Link>

                <Link href={slide.secondaryBtnLink}>
                  <button className="flex h-14 items-center gap-2.5 rounded-2xl border border-slate-700 bg-slate-900/80 px-7 font-bold text-slate-100 transition-all duration-300 hover:border-amber-400/60 hover:bg-slate-800 hover:text-white">
                    <PhoneCall size={18} className="text-amber-400" />
                    <span>{slide.secondaryBtnText}</span>
                  </button>
                </Link>
              </div>
            </div>

            {/* Right Card / Visual Showcase (5 cols) */}
            <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
              {/* Main Visual Frame */}
              <div className="relative w-full max-w-md rounded-3xl border border-slate-700/60 bg-slate-900/80 p-8 backdrop-blur-xl shadow-2xl shadow-slate-950/80">
                {/* Decorative Top Accent */}
                <div className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
                
                {/* Floating Badge */}
                <div className="inline-flex items-center gap-2 rounded-xl bg-slate-800/90 px-4 py-1.5 text-xs font-bold text-amber-300 border border-slate-700 mb-6">
                  <ShieldCheck size={14} className="text-amber-400" />
                  {slide.cardBadge}
                </div>

                {/* Central Icon Illustration Box */}
                <div className="relative h-48 w-full rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-950 to-slate-900/90 flex flex-col items-center justify-center p-6 shadow-inner overflow-hidden">
                  <div className="absolute inset-0 bg-cyan-500/5 blur-xl" />
                  <div className="relative z-10 transition duration-500 hover:scale-110">
                    {slide.visualIcon}
                  </div>
                  <p className="relative z-10 mt-3 text-xs font-semibold tracking-wider text-slate-400 uppercase">
                    Raj Biosis Private Limited
                  </p>
                </div>

                {/* Live Stats Row */}
                <div className="mt-6 grid grid-cols-2 gap-4">
                  {slide.stats.map((st, i) => (
                    <div key={i} className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4 text-center">
                      <h4 className="text-2xl font-black text-amber-400">{st.val}</h4>
                      <p className="mt-1 text-xs font-medium text-slate-400">{st.label}</p>
                    </div>
                  ))}
                </div>

                {/* Trust Footer line */}
                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <BadgeCheck size={15} className="text-teal-400" />
                    ISO 9001:2015 Certified
                  </span>
                  <span className="font-semibold text-slate-300">Fast Delivery</span>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Carousel Navigation Bar */}
        <div className="mt-14 flex flex-wrap items-center justify-between gap-6 pt-8 border-t border-slate-800/80">
          {/* Slide Dots / Indicators */}
          <div className="flex items-center gap-3">
            {slides.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => setCurrentSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`group relative h-3 rounded-full transition-all duration-500 ${
                  currentSlide === idx ? "w-10 bg-gradient-to-r from-cyan-400 to-teal-400" : "w-3 bg-slate-700 hover:bg-slate-500"
                }`}
              >
                {currentSlide === idx && (
                  <span className="absolute inset-0 rounded-full bg-cyan-400/40 animate-ping" />
                )}
              </button>
            ))}
            <span className="ml-3 text-xs font-semibold text-slate-400">
              0{currentSlide + 1} / 0{slides.length}
            </span>
          </div>

          {/* Quick Stats Grid Pill */}
          <div className="hidden md:flex items-center gap-8 text-xs font-semibold text-slate-300 bg-slate-900/60 px-6 py-3 rounded-full border border-slate-800">
            <div><strong className="text-white font-bold">10+ Years</strong> Experience</div>
            <div className="h-3 w-[1px] bg-slate-700" />
            <div><strong className="text-white font-bold">500+</strong> Labs Serviced</div>
            <div className="h-3 w-[1px] bg-slate-700" />
            <div><strong className="text-white font-bold">24/7</strong> AMC Support</div>
          </div>

          {/* Prev / Next Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={prevSlide}
              aria-label="Previous slide"
              className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-700 bg-slate-900 text-slate-200 transition-all hover:border-cyan-400 hover:bg-slate-800 hover:text-white"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Next slide"
              className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-700 bg-slate-900 text-slate-200 transition-all hover:border-cyan-400 hover:bg-slate-800 hover:text-white"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}