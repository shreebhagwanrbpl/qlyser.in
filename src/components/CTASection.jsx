"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { PhoneCall, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";

export default function CTASection({ city }) {
  const pathname = usePathname();

  const staticRoutes = [
    "about",
    "services",
    "products",
    "contact",
    "items",
    "enquiry",
  ];

  const pathParts = pathname.split("/").filter(Boolean);
  const urlDistrict =
    pathParts.length > 0 && !staticRoutes.includes(pathParts[0])
      ? pathParts[0]
      : "";

  const districtSlug = city
    ? city.toLowerCase().replace(/\s+/g, "-")
    : urlDistrict;

  const makeLink = (path) => {
    if (!districtSlug) return path;
    if (path === "/") return `/${districtSlug}`;
    return `/${districtSlug}${path}`;
  };

  return (
    <section className="py-20 bg-slate-50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-slate-950 p-10 lg:p-16 text-white shadow-2xl"
        >
          {/* Glow overlay */}
          <div className="absolute -top-32 -left-32 h-80 w-80 rounded-full bg-blue-500/20 blur-[130px] pointer-events-none" />
          <div className="absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-amber-500/20 blur-[130px] pointer-events-none" />

          <div className="relative z-10 grid lg:grid-cols-12 gap-12 items-center">
            {/* Left Col (7 cols) */}
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900 px-5 py-2 text-xs font-bold text-amber-300">
                <Sparkles size={14} className="text-amber-400" />
                Trusted Healthcare Partner
              </span>

              <h2 className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-black leading-tight text-white tracking-tight">
                Need Advanced <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-amber-300">
                  Biomedical Solutions?
                </span>
              </h2>

              <p className="mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-slate-300">
                Contact our expert biomedical engineers for analyzer quotes, genuine reagent supply, on-site installation, and 24/7 emergency AMC maintenance.
              </p>

              <div className="mt-8 flex items-center gap-8">
                <div>
                  <h3 className="text-3xl font-black text-amber-400">500+</h3>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Diagnostic Labs Serviced
                  </p>
                </div>
                <div className="h-10 w-[1px] bg-slate-800" />
                <div>
                  <h3 className="text-3xl font-black text-teal-400">24/7</h3>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Emergency Engineer AMC
                  </p>
                </div>
              </div>
            </div>

            {/* Right Card Col (5 cols) */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900/90 p-8 shadow-2xl backdrop-blur-md">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600/20 border border-blue-500/30 text-cyan-400">
                  <PhoneCall size={26} />
                </div>

                <h3 className="mt-5 text-2xl font-bold text-white">
                  Talk to a Specialist
                </h3>

                <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                  Get personalized diagnostic equipment recommendations, bulk reagent pricing, or request emergency technician visits.
                </p>

                <div className="mt-8 space-y-3">
                  <Link href={makeLink("/contact")}>
                    <button className="group flex w-full h-13 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-teal-500 to-cyan-500 px-6 font-bold text-white shadow-lg transition duration-300 hover:scale-[1.02]">
                      <span>Get Instant Quote</span>
                      <ArrowRight size={17} className="transition group-hover:translate-x-1" />
                    </button>
                  </Link>

                  <a
                    href="tel:+919876543210"
                    className="flex w-full h-13 items-center justify-center rounded-xl border border-slate-700 bg-slate-950 px-6 font-bold text-slate-200 transition hover:bg-slate-800 hover:text-white"
                  >
                    Call Directly
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}