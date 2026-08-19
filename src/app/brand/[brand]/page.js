import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchFullCatalog } from "@/lib/data-fetcher-server";
import PageBanner from "@/components/PageBanner";
import SectionTitle from "@/components/SectionTitle";
import ProductCard from "@/components/ProductCard";
import CTASection from "@/components/CTASection";
import {
  formatSeoTitle,
  formatMetaDescription,
  generateBreadcrumbSchema,
  generateFAQSchema,
  BASE_URL
} from "@/lib/seo-utils";
import { ShieldCheck, Award, Truck, HelpCircle } from "lucide-react";

export const dynamicParams = true;

export async function generateStaticParams() {
  try {
    const products = await fetchFullCatalog();
    const brands = new Set(
      products.map((p) => p.brand?.toLowerCase().replace(/\s+/g, "-")).filter(Boolean)
    );
    return Array.from(brands).slice(0, 50).map((b) => ({ brand: b }));
  } catch (err) {
    return [];
  }
}

export async function generateMetadata({ params }) {
  const { brand } = await params;
  const products = await fetchFullCatalog();

  const brandProducts = products.filter(
    (p) => p.brand && p.brand.toLowerCase().replace(/\s+/g, "-") === brand.toLowerCase()
  );

  const rawBrandName = brandProducts[0]?.brand || brand.replace(/-/g, " ");
  const brandName = rawBrandName.charAt(0).toUpperCase() + rawBrandName.slice(1);

  const title = formatSeoTitle(brandName, "brand");
  const description = formatMetaDescription(
    brandName,
    `Authorized supplier of genuine ${brandName} laboratory equipment, clinical analyzers, and diagnostic reagents by Raj Biosis Private Limited across India.`,
    "brand"
  );
  const canonicalUrl = `${BASE_URL}/brand/${brand}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "Raj Biosis Private Limited",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function BrandPage({ params }) {
  const { brand } = await params;
  const products = await fetchFullCatalog();

  const brandProducts = products.filter(
    (p) => p.brand && p.brand.toLowerCase().replace(/\s+/g, "-") === brand.toLowerCase()
  );

  if (brandProducts.length === 0) {
    // Partial match search
    const partial = products.filter(
      (p) => p.brand && p.brand.toLowerCase().includes(brand.toLowerCase().replace(/-/g, " "))
    );
    if (partial.length === 0) {
      notFound();
    }
  }

  const activeProducts = brandProducts.length > 0
    ? brandProducts
    : products.filter((p) => p.brand && p.brand.toLowerCase().includes(brand.toLowerCase().replace(/-/g, " ")));

  const brandName = activeProducts[0]?.brand || brand.replace(/-/g, " ");
  const categories = Array.from(new Set(activeProducts.map((p) => p.category).filter(Boolean)));

  const faqs = [
    {
      q: `Are ${brandName} products genuine and certified?`,
      a: `Yes, all ${brandName} biomedical devices and clinical consumables supplied by Raj Biosis Private Limited are 100% genuine and ISO/CE certified.`
    },
    {
      q: `Do you provide AMC and service support for ${brandName} equipment?`,
      a: `Yes, we offer complete installation, calibration, and Annual Maintenance Contracts (AMC) for ${brandName} laboratory instruments across India.`
    }
  ];

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Brands", url: "/products" },
    { name: brandName, url: `/brand/${brand}` }
  ]);
  const faqSchema = generateFAQSchema(faqs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <PageBanner
        title={`${brandName} Laboratory Equipment & Reagents`}
        subtitle={`Genuine ${brandName} clinical diagnostic analyzers, testing kits, and laboratory reagents supplied by Raj Biosis Private Limited.`}
      />

      {/* Brand Profile */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-5 grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-3xl font-black text-slate-900">
              Authorized Supply of {brandName} Products
            </h2>
            <p className="text-slate-600 leading-relaxed text-lg">
              {brandName} is globally recognized for diagnostic accuracy and engineering excellence. Raj Biosis Private Limited supplies genuine {brandName} instruments and reagents to pathology laboratories, medical centers, and research institutes across India.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 pt-4">
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-4">
                <Award className="w-8 h-8 text-amber-500 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-slate-900">100% Genuine Guaranteed</h4>
                  <p className="text-sm text-slate-600 mt-1">Directly sourced equipment and sealed original reagents.</p>
                </div>
              </div>
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-4">
                <Truck className="w-8 h-8 text-blue-600 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-slate-900">Cold-Chain Logistics</h4>
                  <p className="text-sm text-slate-600 mt-1">Temperature-controlled fast dispatch for sensitive chemical solutions.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-slate-900 text-white flex flex-col justify-between">
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-amber-400">Categories Covered</span>
              <h3 className="text-2xl font-bold mt-2">{brandName} Product Range</h3>
              <div className="flex flex-wrap gap-2 mt-4">
                {categories.map((c) => (
                  <Link
                    key={c}
                    href={`/category/${c.toLowerCase().replace(/\s+/g, "-")}`}
                    className="px-3 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-sm font-semibold hover:border-amber-400 hover:text-amber-400 transition"
                  >
                    {c}
                  </Link>
                ))}
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-slate-800">
              <Link href="/contact" className="block text-center py-3 bg-amber-400 text-slate-950 font-bold rounded-xl hover:bg-amber-300 transition">
                Request {brandName} Quotation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-5">
          <SectionTitle
            badge={`${activeProducts.length} Products Found`}
            title={`${brandName} Products Catalog`}
            description={`Explore our inventory of genuine ${brandName} analyzers and diagnostic consumables.`}
            center
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {activeProducts.map((product) => (
              <ProductCard key={product.uid || product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
