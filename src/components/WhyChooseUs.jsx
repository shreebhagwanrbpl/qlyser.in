"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  Microscope,
  HeartPulse,
  BadgeCheck,
} from "lucide-react";

import SectionTitle from "./SectionTitle";

export default function WhyChooseUs() {
  const features = [
    {
      icon: <Microscope size={30} />,
      title: "Advanced Technology",
      description:
        "Modern biomedical and diagnostic equipment for accurate healthcare solutions.",
    },
    {
      icon: <ShieldCheck size={30} />,
      title: "Trusted Quality",
      description:
        "Reliable and certified diagnostic systems with premium quality standards.",
    },
    {
      icon: <HeartPulse size={30} />,
      title: "Healthcare Focused",
      description:
        "Delivering healthcare-driven biomedical solutions with precision and care.",
    },
    {
      icon: <BadgeCheck size={30} />,
      title: "Expert Support",
      description:
        "Professional consultation and technical support for all medical needs.",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-white py-24">

      {/* Background Glow */}

      <div className="absolute -top-40 left-1/2 h-[550px] w-[550px] -translate-x-1/2 rounded-full bg-[#CBD5E1]/10 blur-[150px]" />

      <div className="absolute bottom-0 right-0 h-[300px] w-[300px] rounded-full bg-[#E2E8F0]/15 blur-[120px]" />

      {/* Grid */}

      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#94A3B8 1px, transparent 1px), linear-gradient(90deg,#94A3B8 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="container-custom relative z-10">

        {/* Title */}

        <SectionTitle
          badge="Why Choose Us"
          title="Trusted Biomedical Excellence"
          description="We deliver innovative diagnostic technologies and biomedical solutions with precision, trust and unmatched service quality."
          center
        />

        {/* Cards */}

        <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-4">

          {features.map((item, index) => (

            <motion.div
              key={index}
              initial={{
                opacity: 0,
                y: 50,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.6,
                delay: index * 0.12,
              }}
              viewport={{
                once: true,
              }}
              className="group relative overflow-hidden rounded-[30px] border border-[#CBD5E1]/15 bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,.08)] transition-all duration-500 hover:-translate-y-3 hover:border-[#94A3B8]/40 hover:shadow-[0_30px_80px_rgba(15,23,42,.15)]"
            >

              {/* Glow */}

              <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[#CBD5E1]/10 blur-3xl opacity-0 transition-all duration-500 group-hover:opacity-100" />

              {/* Top Border */}

              <div className="absolute left-0 top-0 h-1 w-0 bg-gradient-to-r from-[#64748B] via-[#CBD5E1] to-[#E2E8F0] transition-all duration-500 group-hover:w-full" />

              {/* Icon */}

              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F8FAFC] text-[#64748B] shadow-lg shadow-yellow-200/40 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">

                {item.icon}

              </div>

              {/* Title */}

              <h3 className="mt-7 text-2xl font-bold text-[#1E293B] transition-colors duration-300 group-hover:text-[#64748B]">

                {item.title}

              </h3>

              {/* Divider */}

              <div className="mt-5 h-1 w-16 rounded-full bg-gradient-to-r from-[#64748B] to-[#CBD5E1] transition-all duration-500 group-hover:w-24" />

              {/* Description */}

              <p className="mt-6 leading-8 text-slate-600">

                {item.description}

              </p>

            </motion.div>

          ))}

        </div>

      </div>

    </section>
  );
}