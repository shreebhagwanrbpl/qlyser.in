"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  featuredProductsData
} from "@/data/productsData";
import SectionTitle from "./SectionTitle";
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Filter,
  Microscope,
  FlaskConical,
  Activity,
  Layers,
  Sparkles,
} from "lucide-react";

export default function FeaturedProducts({ city }) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    "Diagnostic Equipment",
    "Electrolyte Reagents",
    "Hematology",
    "Biochemistry",
    "Rapid Diagnostic Kits",
  ];

  const filteredProducts =
    selectedCategory === "All"
      ? featuredProductsData
      : featuredProductsData.filter(
          (p) => p.category === selectedCategory
        );

  const categoryIcons = {
    "All": <Layers size={16} />,
    "Diagnostic Equipment": <Microscope size={16} />,
    "Electrolyte Reagents": <FlaskConical size={16} />,
    "Hematology": <Activity size={16} />,
    "Biochemistry": <Sparkles size={16} />,
    "Rapid Diagnostic Kits": <ShieldCheck size={16} />,
  };

  const districtSlug = city ? city.toLowerCase().replace(/\s+/g, "-") : "";
  const makeLink = (path) => (districtSlug ? `/${districtSlug}${path}` : path);

  return (
    <section className="relative overflow-hidden bg-slate-50 py-24">
      {/* Glow Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[500px] w-[500px] rounded-full bg-blue-100/50 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 h-[350px] w-[350px] rounded-full bg-amber-100/50 blur-[130px] pointer-events-none" />

      {/* Grid Overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#0f172a 1px, transparent 1px), linear-gradient(90deg, #0f172a 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <SectionTitle
          badge="Featured Equipment"
          title="Top Diagnostic & Biomedical Products"
          description={
            city
              ? `Explore high-performance biochemistry, hematology, and diagnostic equipment delivered with full warranty across ${city}.`
              : "Discover precision clinical chemistry instruments, electrolyte analyzers, and pathology test kits engineered for medical laboratories."
          }
          center
        />

        {/* Category Tabs Filter */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-bold transition-all duration-300 ${
                  isActive
                    ? "bg-slate-900 text-white shadow-xl shadow-slate-900/20 scale-105"
                    : "bg-white text-slate-700 border border-slate-200 hover:border-slate-300 hover:bg-slate-100/80"
                }`}
              >
                <span className={isActive ? "text-cyan-400" : "text-slate-500"}>
                  {categoryIcons[cat]}
                </span>
                <span>{cat}</span>
              </button>
            );
          })}
        </div>

        {/* Product Cards Grid */}
        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 shadow-lg shadow-slate-200/50 transition-all duration-300 hover:-translate-y-2 hover:border-blue-300 hover:shadow-2xl hover:shadow-slate-300/60"
              >
                <div>
                  {/* Top Badges Row */}
                  <div className="flex items-center justify-between gap-2 mb-5">
                    <span className="inline-flex items-center gap-1.5 rounded-xl bg-slate-100 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-slate-700">
                      {product.category}
                    </span>
                    {product.badge && (
                      <span className="inline-flex items-center gap-1 rounded-xl bg-amber-500/10 px-3.5 py-1.5 text-xs font-extrabold text-amber-700 border border-amber-500/20">
                        <Sparkles size={13} className="text-amber-500" />
                        {product.badge}
                      </span>
                    )}
                  </div>

                  {/* Image Container Box */}
                  <div className="relative flex h-52 w-full items-center justify-center overflow-hidden rounded-2xl border border-slate-100 bg-gradient-to-b from-slate-50 to-slate-100 p-6">
                    <div className="absolute inset-0 bg-blue-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <div className="relative z-10 flex flex-col items-center justify-center text-slate-700 group-hover:scale-105 transition-transform duration-500">
                      <Microscope className="w-20 h-20 text-slate-800 transition-colors group-hover:text-blue-600" />
                      <span className="mt-2 text-xs font-bold text-slate-600 uppercase tracking-widest">
                        {product.brand} • {product.model}
                      </span>
                    </div>
                  </div>

                  {/* Product Title */}
                  <h3 className="mt-6 text-xl font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                    {product.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-3 text-sm text-slate-600 leading-relaxed line-clamp-3">
                    {product.description}
                  </p>

                  {/* Specs Table Pill */}
                  <div className="mt-5 grid grid-cols-2 gap-2.5 rounded-2xl bg-slate-50 p-3.5 border border-slate-100 text-xs">
                    {Object.entries(product.specs).map(([key, value]) => (
                      <div key={key} className="overflow-hidden">
                        <span className="block text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                          {key}
                        </span>
                        <span className="block font-bold text-slate-800 truncate mt-0.5">
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Features Bullet List */}
                  <div className="mt-4 space-y-1.5">
                    {product.features.map((feat, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs font-medium text-slate-700">
                        <CheckCircle2 size={15} className="text-teal-600 flex-shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="mt-7 pt-5 border-t border-slate-100 flex items-center gap-3">
                  <Link href={makeLink("/contact")} className="flex-1">
                    <button className="flex w-full h-12 items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 text-xs font-bold text-white shadow-md transition-all duration-300 hover:bg-blue-600 hover:shadow-lg">
                      <span>Get Best Quote</span>
                      <ArrowRight size={15} />
                    </button>
                  </Link>

                  <Link href={makeLink(`/items`)}>
                    <button className="flex h-12 items-center justify-center rounded-xl border border-slate-300 px-4 text-xs font-bold text-slate-700 transition-colors hover:bg-slate-100">
                      Catalog
                    </button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* View All Products Bottom Bar */}
        <div className="mt-16 text-center">
          <Link href={makeLink("/items")}>
            <button className="inline-flex items-center gap-3 rounded-2xl border-2 border-slate-900 bg-white px-9 py-4 text-base font-bold text-slate-900 shadow-xl transition-all duration-300 hover:bg-slate-900 hover:text-white hover:scale-105">
              <span>Explore Complete Product Catalog</span>
              <ArrowRight size={18} />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
