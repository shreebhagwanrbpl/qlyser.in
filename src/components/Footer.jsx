"use client";

import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail, Phone, MapPin, ShieldCheck, Heart } from "lucide-react";

export default function Footer() {
  const [contactInfo, setContactInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [districtData, setDistrictData] = useState(null);

  const pathname = usePathname();
  const pathParts = pathname.split("/").filter(Boolean);

  const staticRoutes = [
    "about",
    "services",
    "products",
    "contact",
    "items",
  ];

  const district =
    pathParts.length > 0 && !staticRoutes.includes(pathParts[0])
      ? pathParts[0]
      : "";

  useEffect(() => {
    const loadContact = async () => {
      try {
        const snap = await getDoc(
          doc(db, "websites", "centralbiomedicals", "pages", "contact")
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

  useEffect(() => {
    const loadDistrict = async () => {
      if (!district) return;
      try {
        const snap = await getDoc(
          doc(db, "websites", "centralbiomedicals", "districts", district)
        );
        if (snap.exists()) {
          setDistrictData(snap.data());
        }
      } catch (err) {
        console.log(err);
      }
    };
    loadDistrict();
  }, [district]);

  const phone =
    contactInfo.find((x) => x.label === "Phone Number")?.value || "+91 98765 43210";

  const email =
    contactInfo.find((x) => x.label === "Email Address")?.value || "info@centralbiomedicals.com";

  const address =
    contactInfo.find((x) => x.label === "Office Address")?.value || "Central Biomedicals Corporate Office, Healthcare Tech Zone, India";

  const dynamicAddress = districtData
    ? `${districtData.district}, ${districtData.state}, India`
    : address;

  const makeLink = (path) => {
    if (!district) return path;
    if (path === "/") return `/${district}`;
    return `/${district}${path}`;
  };

  return (
    <footer className="relative overflow-hidden bg-slate-950 text-white border-t border-slate-800">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/4 h-80 w-80 rounded-full bg-blue-500/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-teal-500/10 blur-[120px] pointer-events-none" />

      <div className="relative z-10 container-custom py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Col 1: Brand & Tagline */}
          <div>
            <h2 className="text-2xl font-black tracking-tight">
              <span className="text-cyan-400">Central</span>{" "}
              <span className="text-white">Biomedicals</span>
            </h2>

            <p className="mt-4 text-sm leading-relaxed text-slate-300">
              Delivering trusted diagnostic machinery, biochemistry reagents, hematology solutions, and 24/7 technical AMC maintenance support across India.
            </p>

            <div className="mt-5 flex items-center gap-2 text-xs font-bold text-teal-400">
              <ShieldCheck size={16} />
              <span>ISO 9001:2015 Certified Equipment</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h3 className="mb-4 text-base font-bold text-white uppercase tracking-wider">
              Quick Links
            </h3>
            <div className="flex flex-col gap-2.5 text-sm">
              {[
                ["Home", "/"],
                ["About Us", "/about"],
                ["Biomedical Services", "/services"],
                ["Product Catalog", "/items"],
                ["Contact Support", "/contact"],
              ].map(([name, url]) => (
                <Link
                  key={name}
                  href={makeLink(url)}
                  className="text-slate-300 transition-colors hover:text-cyan-400 hover:translate-x-1"
                >
                  {name}
                </Link>
              ))}
            </div>
          </div>

          {/* Col 3: Categories & Offerings */}
          <div>
            <h3 className="mb-4 text-base font-bold text-white uppercase tracking-wider">
              Equipment Categories
            </h3>
            <div className="flex flex-col gap-2.5 text-sm text-slate-300">
              <p className="hover:text-cyan-400 cursor-pointer transition">Biochemistry Analyzers</p>
              <p className="hover:text-cyan-400 cursor-pointer transition">Electrolyte Testing Systems</p>
              <p className="hover:text-cyan-400 cursor-pointer transition">Hematology 5-Part Counsel</p>
              <p className="hover:text-cyan-400 cursor-pointer transition">Rapid Diagnostic Kits</p>
              <p className="hover:text-cyan-400 cursor-pointer transition">AMC & Technician Support</p>
            </div>
          </div>

          {/* Col 4: Contact Info */}
          <div>
            <h3 className="mb-4 text-base font-bold text-white uppercase tracking-wider">
              Corporate Office
            </h3>
            <div className="space-y-4 text-sm text-slate-300">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-amber-400 flex-shrink-0 mt-0.5" />
                <span>{dynamicAddress}</span>
              </div>

              <div className="flex items-center gap-3">
                <Phone size={18} className="text-teal-400 flex-shrink-0" />
                <a href={`tel:${phone.replace(/\s+/g, "")}`} className="hover:text-white transition">
                  {phone}
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Mail size={18} className="text-cyan-400 flex-shrink-0" />
                <a href={`mailto:${email}`} className="hover:text-white transition break-all">
                  {email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom Line */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-slate-800 pt-6 text-xs text-slate-400 md:flex-row">
          <p>© {new Date().getFullYear()} Central Biomedicals. All Rights Reserved.</p>
          <p className="flex items-center gap-1">
            Engineered with Healthcare Precision & Modern UI.
          </p>
        </div>
      </div>
    </footer>
  );
}