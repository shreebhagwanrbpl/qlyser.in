"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { fetchSiteDoc } from "@/lib/site-data-client";
import {
  ShieldCheck,
  Microscope,
  ArrowRight,
  Sparkles,
  PhoneCall,
  CheckCircle2,
  BadgeCheck,
} from "lucide-react";

export default function HeroSection({ city }) {
  const [dbHero, setDbHero] = useState(null);

  // District Routing
  const districtSlug = city
    ? city.toLowerCase().replace(/\s+/g, "-")
    : "";

  const makeLink = (path = "/") => {
    if (!path) return "/";
    const cleanPath = path.startsWith("/") ? path : `/${path}`;
    return districtSlug ? `/${districtSlug}${cleanPath}` : cleanPath;
  };

  useEffect(() => {
    let isMounted = true;
    const fetchHeroData = async () => {
      try {
        const snap = await fetchSiteDoc("home");
        if (isMounted && snap.exists()) {
          setDbHero(snap.data());
        }
      } catch (error) {
        console.error("Error fetching hero data:", error);
      }
    };

    fetchHeroData();
    return () => {
      isMounted = false;
    };
  }, []);

  // Dynamic values without fallback text
  const title = dbHero?.title || dbHero?.heroTitle || "";
  const description = dbHero?.description || dbHero?.heroDescription || dbHero?.subtitle || "";
  const button1Text = dbHero?.button1Text || dbHero?.btn1Text || dbHero?.primaryBtnText || "";
  const button2Text = dbHero?.button2Text || dbHero?.btn2Text || dbHero?.secondaryBtnText || "";

  // Dynamic Button Links (respecting district routing)
  const button1Link = makeLink(dbHero?.button1Link || dbHero?.btn1Link || "/items");
  const button2Link = makeLink(dbHero?.button2Link || dbHero?.btn2Link || "/contact");

  return (
    <section className="relative overflow-hidden bg-slate-950 text-white py-10 sm:py-12 lg:py-14 border-b border-slate-800/80">
      {/* Background Subtle Gradients & Grid */}
      <div className="absolute inset-0 bg-slate-950 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
        <div className="absolute top-0 left-1/4 h-72 w-72 rounded-full bg-cyan-500/10 blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-blue-600/10 blur-[90px]" />
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.15) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Content Column (7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="lg:col-span-7 flex flex-col items-start text-left"
          >
            {/* Badge Header */}
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-700/80 bg-slate-900/90 px-4 py-1.5 text-xs font-semibold text-slate-200 shadow-md backdrop-blur-md">
              <Sparkles size={14} className="text-amber-400" />
              <span>{dbHero?.badge || "Biomedical & Diagnostic Solutions"}</span>
              {city && (
                <span className="ml-1 pl-2 border-l border-slate-700 text-amber-300 font-bold">
                  Serving {city}
                </span>
              )}
            </div>

            {/* Dynamic Title (no fallback text) */}
            {title && (
              <h1 className="mt-4 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
                {title}
              </h1>
            )}

            {/* Dynamic Description (no fallback text) */}
            {description && (
              <p className="mt-3 sm:mt-4 text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl font-normal">
                {description}
              </p>
            )}

            {/* Key Trust Highlights */}
            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-medium text-slate-300">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={15} className="text-emerald-400" />
                Zero Testing Error Rate
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={15} className="text-cyan-400" />
                Fast On-Site Calibration
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={15} className="text-amber-400" />
                Pan-India Supply Network
              </span>
            </div>

            {/* Dynamic Buttons (no fallback text, dynamic links) */}
            {(button1Text || button2Text) && (
              <div className="mt-6 flex flex-wrap items-center gap-3.5">
                {button1Text && (
                  <Link href={button1Link}>
                    <button className="group flex h-11 sm:h-12 items-center gap-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-teal-500 to-cyan-500 px-6 text-sm font-bold text-white shadow-lg shadow-cyan-500/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-cyan-500/30">
                      <span>{button1Text}</span>
                      <ArrowRight size={17} className="transition-transform duration-200 group-hover:translate-x-1" />
                    </button>
                  </Link>
                )}

                {button2Text && (
                  <Link href={button2Link}>
                    <button className="flex h-11 sm:h-12 items-center gap-2 rounded-xl border border-slate-700 bg-slate-900/90 px-5 text-sm font-bold text-slate-200 transition-all duration-300 hover:border-amber-400/60 hover:bg-slate-800 hover:text-white">
                      <PhoneCall size={16} className="text-amber-400" />
                      <span>{button2Text}</span>
                    </button>
                  </Link>
                )}
              </div>
            )}
          </motion.div>

          {/* Right Showcase Card (5 cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="lg:col-span-5 relative flex justify-center lg:justify-end"
          >
            <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900/80 p-5 sm:p-6 backdrop-blur-xl shadow-xl shadow-slate-950/60">
              {/* Header Badges */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="inline-flex items-center gap-1.5 rounded-lg bg-slate-800 px-3 py-1 text-xs font-bold text-amber-300 border border-slate-700">
                  <ShieldCheck size={13} className="text-amber-400" />
                  ISO Certified Systems
                </div>
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400">
                  <BadgeCheck size={14} className="text-teal-400" />
                  AMC Support
                </div>
              </div>

              {/* Compact Stats Row */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-3.5 text-center">
                  <div className="text-xl sm:text-2xl font-black text-amber-400">500+</div>
                  <div className="text-[11px] font-medium text-slate-400 mt-0.5">Labs Serviced</div>
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-3.5 text-center">
                  <div className="text-xl sm:text-2xl font-black text-teal-400">99.9%</div>
                  <div className="text-[11px] font-medium text-slate-400 mt-0.5">Report Precision</div>
                </div>
              </div>

              {/* Quick Feature Banner */}
              <div className="flex items-center gap-3 rounded-xl border border-slate-800/80 bg-slate-950/50 p-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600/20 text-cyan-400 flex-shrink-0">
                  <Microscope size={18} />
                </div>
                <div className="overflow-hidden">
                  <p className="text-xs font-bold text-slate-200 truncate">
                    Clinical Diagnostic Equipment
                  </p>
                  <p className="text-[11px] text-slate-400 truncate">
                    Analyzers, Electrolyte Reagents & Kits
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}