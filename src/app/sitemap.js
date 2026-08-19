import { fetchFullCatalog } from "@/lib/data-fetcher-server";
import { BASE_URL, computePageSeoScore } from "@/lib/seo-utils";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export const revalidate = 3600;

export default async function sitemap() {
  const urls = [];
  const now = new Date();

  // 1. Static Core Pages (High Priority)
  urls.push(
    { url: BASE_URL, lastModified: now, changeFrequency: "daily", priority: 1.0 },
    { url: `${BASE_URL}/products`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/services`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.8 }
  );

  try {
    // 2. Fetch Catalog Products
    const products = await fetchFullCatalog();

    // Track Categories & Brands for indexing
    const categoriesSet = new Set();
    const brandsSet = new Set();

    products.forEach((product) => {
      if (!product.slug) return;

      const canonicalUrl = `${BASE_URL}/products/${product.slug}`;
      const score = computePageSeoScore({
        canonicalUrl,
        isIndexable: product.isPublished !== false,
        title: product.title,
        description: product.description,
        specsCount: product.specs ? Object.keys(product.specs).length : 0,
        hasImageWithAlt: !!(product.image || product.images?.length),
        hasSchema: true,
      });

      // Quality Gate: Only include products scoring 50+
      if (score >= 50 && product.isPublished !== false) {
        urls.push({
          url: canonicalUrl,
          lastModified: now,
          changeFrequency: "weekly",
          priority: 0.9,
        });
      }

      if (product.category) {
        categoriesSet.add(product.category.toLowerCase().replace(/\s+/g, "-"));
      }

      if (product.brand) {
        brandsSet.add(product.brand.toLowerCase().replace(/\s+/g, "-"));
      }
    });

    // 3. Category Authority Pages
    categoriesSet.forEach((categorySlug) => {
      urls.push({
        url: `${BASE_URL}/category/${categorySlug}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.85,
      });
    });

    // 4. Brand Authority Pages
    brandsSet.forEach((brandSlug) => {
      urls.push({
        url: `${BASE_URL}/brand/${brandSlug}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.85,
      });
    });

    // 5. Service Districts (Single Canonical URL per District)
    try {
      const districtSnap = await getDocs(
        collection(db, "websites", "qlyserin", "districts")
      );
      if (!districtSnap.empty) {
        districtSnap.docs.forEach((docSnap) => {
          const data = docSnap.data();
          const slug = data.slug || docSnap.id;
          if (slug) {
            urls.push({
              url: `${BASE_URL}/district/${slug}`,
              lastModified: now,
              changeFrequency: "monthly",
              priority: 0.75,
            });
          }
        });
      }
    } catch (distErr) {
      console.warn("Sitemap: District fetch skipped or empty", distErr);
    }
  } catch (error) {
    console.error("Sitemap generation error:", error);
  }

  return urls;
}