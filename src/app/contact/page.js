"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  doc,
  getDoc,
  addDoc,
  collection,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import toast from "react-hot-toast";
import {
  Mail,
  Phone,
  MapPin,
  Clock3,
  MessageSquare,
  ArrowRight,
  Send,
  ShieldCheck,
  CheckCircle2,
  PhoneCall,
} from "lucide-react";
import PageBanner from "@/components/PageBanner";
import CTASection from "@/components/CTASection";

export default function ContactPage() {
  const [loading, setLoading] = useState(true);
  const [districtData, setDistrictData] = useState(null);
  const [contactInfo, setContactInfo] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const pathname = usePathname();
  const pathParts = pathname.split("/").filter(Boolean);
  const currentDistrict = pathParts.length > 0 && pathParts[0] !== "contact" ? pathParts[0] : null;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[6-9]\d{9}$/;

    if (!form.name.trim()) {
      return toast.error("Full name is required");
    }

    if (!emailRegex.test(form.email)) {
      return toast.error("Please enter a valid email address");
    }

    if (!phoneRegex.test(form.phone)) {
      return toast.error("Please enter a valid 10-digit mobile number");
    }

    if (!form.message.trim()) {
      return toast.error("Message content is required");
    }

    try {
      setSubmitting(true);

      await addDoc(
        collection(
          db,
          "websitesQueries",
          "qlyserin",
          "contactQueries"
        ),
        {
          ...form,
          createdAt: new Date(),
        }
      );

      toast.success("Thank you! Your inquiry has been submitted successfully.");

      setForm({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong while submitting. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    const loadDistrict = async () => {
      if (!currentDistrict) return;
      try {
        const snap = await getDoc(
          doc(
            db,
            "websites",
            "qlyserin",
            "districts",
            currentDistrict
          )
        );
        if (snap.exists()) {
          setDistrictData(snap.data());
        }
      } catch (err) {
        console.log(err);
      }
    };

    loadDistrict();
  }, [currentDistrict]);

  useEffect(() => {
    const loadContact = async () => {
      try {
        const snap = await getDoc(
          doc(
            db,
            "websites",
            "qlyserin",
            "pages",
            "contact"
          )
        );

        if (snap.exists()) {
          setContactInfo(snap.data().contactInfo || []);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    loadContact();
  }, []);

  const phoneValue =
    contactInfo.find((x) => x.label === "Phone Number")?.value ||
    "+91 98765 43210";

  const emailValue =
    contactInfo.find((x) => x.label === "Email Address")?.value ||
    "info@centralbiomedicals.com";

  const addressValue =
    contactInfo.find((x) => x.label === "Office Address")?.value ||
    "Central Biomedicals Corporate Office, Healthcare Tech Zone, India";

  const hoursValue =
    contactInfo.find((x) => x.label === "Working Hours")?.value ||
    "Mon - Sat: 9:00 AM - 7:00 PM (24/7 Emergency Support)";

  const dynamicAddress = districtData
    ? `${districtData.district}, ${districtData.state}, India`
    : addressValue;

  const mapAddress = encodeURIComponent(dynamicAddress);

  // WhatsApp quick text link
  const rawPhone = phoneValue.replace(/\D/g, "");
  const whatsappNumber = rawPhone.length === 10 ? `91${rawPhone}` : rawPhone || "919876543210";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=Hello%20Central%20Biomedicals%2C%20I%20would%20like%20to%20inquire%20about%20your%20biomedical%20equipment%20and%20reagents.`;

  return (
    <>
      {/* Banner */}
      <PageBanner
        title="Contact Us"
        subtitle="Get in touch with Raj Biosiss for premium diagnostic and biomedical solutions."
      />

      {/* Main Contact Section */}
      <section className="relative overflow-hidden bg-slate-50 py-24">
        {/* Glow */}
        <div className="absolute top-0 left-1/4 h-[500px] w-[500px] rounded-full bg-blue-100/50 blur-[150px] pointer-events-none" />

        <div className="container-custom relative z-10 grid lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Contact Cards (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
              <span className="inline-flex items-center gap-2 rounded-full bg-teal-50 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-teal-800 border border-teal-200">
                <ShieldCheck size={14} className="text-teal-600" />
                Quick Communication
              </span>

              <h2 className="mt-4 text-3xl font-extrabold text-slate-900 leading-tight">
                Let's Discuss Your Diagnostic Needs
              </h2>

              <p className="mt-3 text-sm text-slate-700 leading-relaxed">
                Whether you need pricing for automated biochemistry analyzers, bulk reagent packs, or emergency repair, our technical team is ready.
              </p>

              {/* Direct Quick Action Buttons */}
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={`tel:${phoneValue.replace(/\s+/g, "")}`}
                  className="flex-1 inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 text-xs font-bold text-white shadow hover:bg-blue-600 transition"
                >
                  <PhoneCall size={16} />
                  <span>Call Us Now</span>
                </a>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 text-xs font-bold text-white shadow hover:bg-emerald-700 transition"
                >
                  <MessageSquare size={16} />
                  <span>WhatsApp Chat</span>
                </a>
              </div>
            </div>

            {/* Contact Details Grid Cards */}
            <div className="space-y-4">
              {[
                {
                  icon: <Phone className="w-6 h-6 text-blue-600" />,
                  title: "Phone Number",
                  val: phoneValue,
                  sub: "Mon-Sat 9AM to 7PM",
                },
                {
                  icon: <Mail className="w-6 h-6 text-teal-600" />,
                  title: "Email Address",
                  val: emailValue,
                  sub: "Rapid response within 2 hours",
                },
                {
                  icon: <MapPin className="w-6 h-6 text-amber-600" />,
                  title: "Office Address",
                  val: dynamicAddress,
                  sub: "Nationwide service & dispatch",
                },
                {
                  icon: <Clock3 className="w-6 h-6 text-indigo-600" />,
                  title: "Working & Emergency Hours",
                  val: hoursValue,
                  sub: "24/7 Breakdown Assistance",
                },
              ].map((c, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-md transition duration-300 hover:border-blue-300 hover:shadow-lg"
                >
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-slate-100 border border-slate-200">
                    {c.icon}
                  </div>
                  <div>
                    <h4 className="text-base font-extrabold text-slate-900">
                      {c.title}
                    </h4>
                    <p className="mt-1 text-sm font-bold text-slate-800 break-words">
                      {c.val}
                    </p>
                    <p className="mt-0.5 text-xs text-slate-500">{c.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: High Contrast Contact Form (7 cols) */}
          <div className="lg:col-span-7 rounded-3xl border border-slate-200 bg-white p-8 lg:p-10 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-5">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-4 py-1.5 text-xs font-bold text-blue-800 border border-blue-200">
                  ⚡ Fast Response
                </span>
                <h3 className="mt-3 text-3xl font-black text-slate-900">
                  Send Us an Inquiry
                </h3>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-800 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Dr. Rajesh Sharma"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3.5 text-sm font-bold text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-800 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="name@labdomain.com"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3.5 text-sm font-bold text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                {/* Phone Number */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-800 mb-2">
                    Mobile Number (10-digit) *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="9876543210"
                    maxLength={10}
                    value={form.phone}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        phone: e.target.value.replace(/\D/g, ""),
                      })
                    }
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3.5 text-sm font-bold text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-800 mb-2">
                    Subject / Product
                  </label>
                  <input
                    type="text"
                    name="subject"
                    placeholder="Biochemistry Analyzer Quote"
                    value={form.subject}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3.5 text-sm font-bold text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-800 mb-2">
                  Message & Details *
                </label>
                <textarea
                  rows={5}
                  name="message"
                  placeholder="Please describe your equipment requirement, lab capacity, or AMC inquiry..."
                  value={form.message}
                  onChange={handleChange}
                  className="w-full resize-none rounded-xl border border-slate-300 bg-slate-50 px-4 py-3.5 text-sm font-bold text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitting}
                className="flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 font-bold text-white shadow-xl transition hover:bg-blue-600 hover:scale-[1.01] disabled:opacity-60"
              >
                {submitting ? (
                  <span>Submitting Inquiry...</span>
                ) : (
                  <>
                    <span>Submit Inquiry</span>
                    <Send size={16} />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-xs text-slate-500 mt-3">
                <CheckCircle2 size={14} className="text-teal-600" />
                <span>Your information is 100% confidential and secure.</span>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Google Map Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-xl">
            <iframe
              src={`https://maps.google.com/maps?q=${mapAddress}&z=13&output=embed`}
              width="100%"
              height="450"
              loading="lazy"
              className="border-0 w-full"
              title="Central Biomedicals Location"
            ></iframe>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection />
    </>
  );
}