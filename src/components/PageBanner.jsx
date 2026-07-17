"use client";

import { motion } from "framer-motion";

export default function PageBanner({
  title,
  subtitle,
}) {
  return (
    <section className="relative overflow-hidden bg-white py-28 lg:py-36">

      {/* Background Glow */}
      <div className="absolute -top-32 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[#CBD5E1]/15 blur-[140px]" />

      <div className="absolute bottom-0 left-0 h-[300px] w-[300px] rounded-full bg-[#E2E8F0]/20 blur-[120px]" />

      <div className="absolute top-20 right-0 h-[260px] w-[260px] rounded-full bg-[#FFF3BF] blur-[120px]" />

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#94A3B8 1px, transparent 1px), linear-gradient(90deg,#94A3B8 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Top Decorative Line */}
      <div className="absolute top-0 left-1/2 h-[2px] w-72 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#94A3B8] to-transparent" />

      <div className="container-custom relative z-10">

        <motion.div
          initial={{
            opacity: 0,
            y: 50,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.7,
          }}
          className="mx-auto max-w-5xl text-center"
        >

          {/* Badge */}

          <div className="inline-flex items-center gap-2 rounded-full border border-[#94A3B8]/30 bg-[#F8FAFC] px-6 py-2 text-sm font-semibold text-[#64748B] shadow-lg shadow-yellow-200/30">

            ✨ Premium Biomedical Solutions

          </div>

          {/* Heading */}

          <h1 className="mt-8 text-5xl font-black leading-tight text-[#1E293B] md:text-6xl xl:text-7xl">

            {title}

          </h1>

          {/* Divider */}

          <div className="mx-auto mt-8 h-1 w-28 rounded-full bg-gradient-to-r from-[#64748B] via-[#CBD5E1] to-[#64748B]" />

          {/* Subtitle */}

          <p className="mx-auto mt-8 max-w-3xl text-lg leading-9 text-slate-700">

            {subtitle}

          </p>

        </motion.div>

      </div>

      {/* Bottom Decorative Line */}

      <div className="absolute bottom-0 left-1/2 h-[2px] w-72 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#94A3B8] to-transparent" />

    </section>
  );
}