"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { defaultServicesData } from "@/data/servicesData";
import PageBanner from "@/components/PageBanner";
import SectionTitle from "@/components/SectionTitle";
import CTASection from "@/components/CTASection";
import {
  Microscope,
  FlaskConical,
  ShieldCheck,
  Stethoscope,
  Wrench,
  Activity,
  CheckCircle2,
  ArrowRight,
  Clock,
  Award,
  Sparkles,
} from "lucide-react";

export default function ServicesPage() {
  const [services, setServices] = useState(defaultServicesData);
  const [loading, setLoading] = useState(true);

  const iconsMap = [
    <Microscope key="1" size={32} className="text-blue-600" />,
    <FlaskConical key="2" size={32} className="text-teal-600" />,
    <ShieldCheck key="3" size={32} className="text-emerald-600" />,
    <Stethoscope key="4" size={32} className="text-amber-600" />,
    <Wrench key="5" size={32} className="text-indigo-600" />,
    <Activity key="6" size={32} className="text-cyan-600" />,
  ];

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const snap = await getDoc(
          doc(db, "websites", "rajbiosis", "pages", "services")
        );

        if (snap.exists() && snap.data()?.services?.length > 0) {
          const dbServices = snap.data().services.map((item, index) => ({
            id: `service-${index}`,
            badge: item.badge || "Biomedical Service",
            title: item.title,
            desc: item.desc || item.description,
            features: item.features || [
              "Certified Support",
              "Rapid Response",
              "Quality Assurance",
              "Nationwide Coverage",
            ],
            target: item.target || "Laboratories & Hospitals",
          }));
          setServices(dbServices);
        }
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return (
    <>
      {/* Banner */}
      <PageBanner
        title="Biomedical & Laboratory Services"
        subtitle="Raj Biosis Private Limited delivers end-to-end equipment supply, engineering installation, pathology reagent cold-chain supply, and 24/7 AMC maintenance support."
      />

      {/* Services Grid Section */}
      <section className="relative overflow-hidden bg-slate-50 py-24">
        {/* Glow */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[500px] w-[500px] rounded-full bg-blue-100/50 blur-[150px] pointer-events-none" />

        <div className="relative z-10 container-custom">
          <SectionTitle
            badge="What We Offer"
            title="Comprehensive Biomedical Solutions"
            description="Providing healthcare institutions and diagnostic centers with world-class machinery, emergency AMC repairs, and calibrated testing solutions."
            center
          />

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <div
                key={service.id || index}
                className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-lg shadow-slate-200/50 transition-all duration-300 hover:-translate-y-2 hover:border-blue-400 hover:shadow-2xl"
              >
                <div>
                  {/* Badge & Icon Row */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 border border-slate-200 transition-transform duration-300 group-hover:scale-110 group-hover:bg-slate-900">
                      {iconsMap[index % iconsMap.length]}
                    </div>
                    {service.badge && (
                      <span className="inline-flex items-center gap-1 rounded-xl bg-amber-500/10 px-3.5 py-1.5 text-xs font-extrabold text-amber-700 border border-amber-500/20">
                        <Sparkles size={13} className="text-amber-500" />
                        {service.badge}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {service.title}
                  </h3>

                  {/* Target Audience Tag */}
                  <p className="mt-2 text-xs font-bold uppercase tracking-wider text-teal-700">
                    Target: {service.target}
                  </p>

                  {/* Description */}
                  <p className="mt-4 text-sm leading-relaxed text-slate-700">
                    {service.desc}
                  </p>

                  {/* Feature Checkmarks */}
                  <div className="mt-6 space-y-2 border-t border-slate-100 pt-5">
                    {service.features.map((feat, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                        <CheckCircle2 size={16} className="text-teal-600 flex-shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Service Button */}
                <div className="mt-8 pt-4">
                  <Link href="/contact">
                    <button className="flex w-full h-12 items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 text-sm font-bold text-white transition hover:bg-blue-600 shadow-md">
                      <span>Request Service Consultation</span>
                      <ArrowRight size={16} />
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SLA / Service Guarantees Section - Passed dark={true} to fix invisible text */}
      <section className="bg-slate-900 py-24 text-white relative overflow-hidden">
        <div className="container-custom relative z-10">
          <SectionTitle
            badge="Our Service Commitments"
            title="Guaranteed Quality & Zero Lab Downtime"
            description="Raj Biosis Private Limited stands behind our biomedical equipment and maintenance contracts with strict SLAs."
            center
            dark={true}
          />

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {[
              {
                icon: <Clock className="w-10 h-10 text-amber-400" />,
                title: "24-Hour Emergency Response",
                desc: "Certified engineers dispatched within 24 hours for urgent equipment breakdowns to protect patient care timelines.",
              },
              {
                icon: <ShieldCheck className="w-10 h-10 text-teal-400" />,
                title: "100% Factory Spare Parts",
                desc: "We stock original replacement electrodes, valves, lamps, and pumps directly sourced from OEM manufacturers.",
              },
              {
                icon: <Award className="w-10 h-10 text-cyan-400" />,
                title: "NABL & ISO Compliance",
                desc: "Standardized calibration protocols and traceable testing paperwork ensuring smooth NABL inspection audits.",
              },
            ].map((g, i) => (
              <div key={i} className="rounded-3xl border border-slate-800 bg-slate-950 p-8 text-center shadow-xl">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-slate-900 border border-slate-800">
                  {g.icon}
                </div>
                <h3 className="text-xl font-bold text-white">{g.title}</h3>
                <p className="mt-3 text-sm text-slate-200 leading-relaxed font-normal">{g.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Working Process */}
      <section className="relative overflow-hidden bg-white py-24">
        <div className="container-custom">
          <SectionTitle
            badge="How We Work"
            title="Simple 3-Step Engagement Process"
            description="Getting diagnostic equipment or technical AMC support for your lab is straightforward with Raj Biosis Private Limited."
            center
          />

          <div className="mt-16 grid gap-8 lg:grid-cols-3">
            {[
              {
                step: "01",
                title: "Consultation & Requirement Audit",
                desc: "We analyze your daily test sample volumes, lab budget, and technical specs before recommending equipment.",
              },
              {
                step: "02",
                title: "Installation & Calibration",
                desc: "Certified engineers install machinery, perform standard calibration curves, and conduct hands-on staff training.",
              },
              {
                step: "03",
                title: "Ongoing AMC & Reagent Assurance",
                desc: "Routine preventative maintenance visits and seamless cold-chain reagent restocking to keep operations running smoothly.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-lg transition duration-300 hover:-translate-y-2 hover:border-slate-400"
              >
                <span className="absolute right-6 top-4 text-7xl font-black text-slate-200">
                  {item.step}
                </span>

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 text-lg font-bold text-amber-400 shadow-md">
                  {item.step}
                </div>

                <h3 className="mt-8 text-2xl font-bold text-slate-900">
                  {item.title}
                </h3>

                <p className="mt-4 text-sm leading-relaxed text-slate-700">
                  {item.desc}
                </p>
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