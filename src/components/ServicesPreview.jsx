"use client";

import { motion } from "framer-motion";
import {
  Microscope,
  FlaskConical,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";

import SectionTitle from "./SectionTitle";
import ServiceCard from "./ServiceCard";

export default function ServicesPreview() {
  const services = [
    {
      icon: <Microscope size={30} />,
      title: "Analyzer Setup & Supply",
      description:
        "Complete delivery and engineer installation of biochemistry and hematology machines.",
    },
    {
      icon: <FlaskConical size={30} />,
      title: "Fresh Reagent Delivery",
      description:
        "Strict cold-chain shipment of daily testing chemicals, calibrators, and diagnostic kits.",
    },
    {
      icon: <ShieldCheck size={30} />,
      title: "24/7 AMC & Repairs",
      description:
        "Fast technician visits, emergency breakdown repairs, and original spare part replacements.",
    },
    {
      icon: <Stethoscope size={30} />,
      title: "New Lab Guidance",
      description:
        "Practical advice on room layouts, instrument selection, and staff operational training.",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-white py-24">

      {/* Background Glow */}

      <div className="absolute -top-40 left-1/2 h-[550px] w-[550px] -translate-x-1/2 rounded-full bg-[#CBD5E1]/10 blur-[150px]" />

      <div className="absolute bottom-0 left-0 h-[300px] w-[300px] rounded-full bg-[#E2E8F0]/15 blur-[120px]" />

      <div className="absolute top-32 right-0 h-[260px] w-[260px] rounded-full bg-[#FFF3BF] blur-[120px]" />

      {/* Grid Pattern */}

      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#94A3B8 1px, transparent 1px), linear-gradient(90deg,#94A3B8 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="container-custom relative z-10">

        {/* Section Title */}

        <SectionTitle
          badge="Complete Lab Care"
          title="Services Built Around Your Lab Needs"
          description="Everything required to keep your laboratory running smoothly, from equipment installation to daily reagent supply and fast machine maintenance."
          center
        />

        {/* Cards */}

        <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-4">

          {services.map((service, index) => (

            <motion.div
              key={index}
              initial={{
                opacity: 0,
                y: 60,
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
            >

              <ServiceCard
                icon={service.icon}
                title={service.title}
                description={service.description}
              />

            </motion.div>

          ))}

        </div>

      </div>

    </section>
  );
}