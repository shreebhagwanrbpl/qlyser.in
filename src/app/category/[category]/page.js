import Image from "next/image";
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
import { ShieldCheck, Truck, Wrench, HelpCircle } from "lucide-react";

export const dynamicParams = true;

export async function generateStaticParams() {
  try {
    const products = await fetchFullCatalog();
    const categories = new Set(
      products.map((p) => p.category?.toLowerCase().replace(/\s+/g, "-")).filter(Boolean)
    );
    return Array.from(categories).slice(0, 50).map((cat) => ({ category: cat }));
  } catch (err) {
    return [];
  }
}

export async function generateMetadata({ params }) {
  const { category } = await params;
  const products = await fetchFullCatalog();

  const matchingProducts = products.filter(
    (p) => p.category && p.category.toLowerCase().replace(/\s+/g, "-") === category.toLowerCase()
  );

  const rawCategoryName = matchingProducts[0]?.category || category.replace(/-/g, " ");
  const categoryName = rawCategoryName.charAt(0).toUpperCase() + rawCategoryName.slice(1);

  const title = formatSeoTitle(categoryName, "category");
  const description = formatMetaDescription(
    categoryName,
    `High-precision ${categoryName} diagnostic equipment, laboratory analyzers, and clinical reagents supplied by Raj Biosis Private Limited across India.`,
    "category"
  );
  const canonicalUrl = `${BASE_URL}/category/${category}`;

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

export default async function CategoryPage({ params }) {
  const { category } = await params;
  const products = await fetchFullCatalog();

  const categoryProducts = products.filter(
    (p) => p.category && p.category.toLowerCase().replace(/\s+/g, "-") === category.toLowerCase()
  );

  if (categoryProducts.length === 0) {
    // Check if partial match exists
    const partialMatch = products.filter(
      (p) => p.category && p.category.toLowerCase().includes(category.toLowerCase().replace(/-/g, " "))
    );
    if (partialMatch.length === 0) {
      notFound();
    }
  }

  const activeProducts = categoryProducts.length > 0
    ? categoryProducts
    : products.filter((p) => p.category && p.category.toLowerCase().includes(category.toLowerCase().replace(/-/g, " ")));

  const categoryName = activeProducts[0]?.category || category.replace(/-/g, " ");
  const brands = Array.from(new Set(activeProducts.map((p) => p.brand).filter(Boolean)));

  const faqs = [
    {
      q: `What are ${categoryName} used for?`,
      a: `${categoryName} are critical medical diagnostic instruments used in pathology laboratories, hospitals, and clinics for accurate sample analysis and patient diagnostics.`
    },
    {
      q: `Do you provide installation and service for ${categoryName}?`,
      a: `Yes, Raj Biosis Private Limited provides expert installation, calibration, and 24/7 AMC technical support for all ${categoryName} models.`
    },
    {
      q: `How can I request a quotation for ${categoryName}?`,
      a: `You can request an instant quote by selecting any ${categoryName} model on our website or contacting our sales office directly.`
    }
  ];

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Products", url: "/products" },
    { name: categoryName, url: `/category/${category}` }
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
        title={`${categoryName} Equipment & Analyzers`}
        subtitle={`Explore certified high-precision ${categoryName} diagnostic instruments, analyzers, and clinical consumables for pathology laboratories.`}
      />

      {/* Overview & Applications */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-5 grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-3xl font-black text-slate-900">
              Overview & Applications of {categoryName}
            </h2>
            <p className="text-slate-600 leading-relaxed text-lg">
              {categoryName} play a central role in modern diagnostic pathology, enabling healthcare providers to deliver reliable, repeatable test results with high throughput. Raj Biosis Private Limited supplies, installs, and services top-tier {categoryName} solutions engineered for clinical efficiency.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 pt-4">
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                <ShieldCheck className="w-8 h-8 text-blue-600 mb-2" />
                <h4 className="font-bold text-slate-900">ISO & CE Certified</h4>
                <p className="text-sm text-slate-600 mt-1">Compliant with stringent quality standards for clinical diagnostic accuracy.</p>
              </div>
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                <Wrench className="w-8 h-8 text-emerald-600 mb-2" />
                <h4 className="font-bold text-slate-900">Technical Support & AMC</h4>
                <p className="text-sm text-slate-600 mt-1">Dedicated biomedical engineers providing rapid installation and maintenance.</p>
              </div>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-slate-900 text-white flex flex-col justify-between">
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-amber-400">Available Brands</span>
              <h3 className="text-2xl font-bold mt-2">Trusted Brands in {categoryName}</h3>
              <div className="flex flex-wrap gap-2 mt-4">
                {brands.map((b) => (
                  <Link
                    key={b}
                    href={`/brand/${b.toLowerCase().replace(/\s+/g, "-")}`}
                    className="px-3 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-sm font-semibold hover:border-amber-400 hover:text-amber-400 transition"
                  >
                    {b}
                  </Link>
                ))}
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-slate-800">
              <p className="text-xs text-slate-400">Need expert advice for your laboratory setup?</p>
              <Link href="/contact" className="mt-3 block text-center py-3 bg-amber-400 text-slate-950 font-bold rounded-xl hover:bg-amber-300 transition">
                Consult Our Specialist
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Product Listing */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-5">
          <SectionTitle
            badge={`${activeProducts.length} Equipment Available`}
            title={`Browse ${categoryName} Models`}
            description={`Select a product below to review technical specifications, features, and request a quotation.`}
            center
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {activeProducts.map((product) => (
              <ProductCard key={product.uid || product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-5">
          <SectionTitle
            badge="Frequently Asked Questions"
            title={`Questions about ${categoryName}`}
            description="Find answers to common questions regarding purchasing, installation, and support."
            center
          />

          <div className="mt-12 space-y-6">
            {faqs.map((faq, i) => (
              <div key={i} className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-3">
                  <HelpCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  {faq.q}
                </h3>
                <p className="mt-3 text-slate-600 leading-relaxed pl-8">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
