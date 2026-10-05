import HeroSection from "@/components/HeroSection";
import FeaturedProducts from "@/components/FeaturedProducts";
import WhyChooseUs from "@/components/WhyChooseUs";
import StatsSection from "@/components/StatsSection";
import ServicesPreview from "@/components/ServicesPreview";
import Testimonials from "@/components/Testimonials";
import CTASection from "@/components/CTASection";
import SeoContent from "@/components/SeoContent";
import { fetchFullCatalog } from "@/lib/data-fetcher-server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Home({ city = "" }) {
  let initialProducts = [];
  try {
    const catalog = await fetchFullCatalog();
    if (Array.isArray(catalog) && catalog.length > 0) {
      initialProducts = catalog.slice(0, 3).map((item) => ({
        id: item.uid || item.slug || item.id,
        title: item.title || item.name,
        category: item.category || "Diagnostic Equipment",
        subCategory: item.subCategory || "",
        brand: item.brand || "Raj Biosis",
        model: item.model || "",
        slug: item.slug || "",
        badge: item.badge || "Featured",
        description: item.description || item.desc || "High-precision laboratory diagnostic equipment.",
        image: item.image || (item.images?.length ? item.images[0] : ""),
        images: item.images || (item.image ? [item.image] : []),
        specs: item.specs || {
          "Category": item.category || "Diagnostic",
          "Brand": item.brand || "Raj Biosis"
        },
        features: item.features || ["High Diagnostic Accuracy", "Quality Certified"]
      }));
    }
  } catch (err) {
    console.error("[Home SSR Catalog]", err);
  }

  return (
    <>
      <HeroSection city={city} />
      <FeaturedProducts initialProducts={initialProducts} city={city} />
      <WhyChooseUs city={city} />
      <StatsSection city={city} />
      <ServicesPreview city={city} />
      <SeoContent city={city} />
      <Testimonials city={city} />
      <CTASection city={city} />
    </>
  );
}