import { fetchFullCatalog } from "@/lib/data-fetcher-server";
import { BASE_URL, computePageSeoScore, slugify } from "@/lib/seo-utils";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export const revalidate = 3600;

function escapeXmlUrl(urlStr) {
  if (!urlStr) return "";
  return urlStr.replace(/&(?!amp;|lt;|gt;|quot;|apos;)/g, "&amp;");
}

export default async function sitemap() {
  const urls = [];
  const now = new Date();

  // 1. Static Core Pages (High Priority)
  urls.push(
    { url: escapeXmlUrl(BASE_URL), lastModified: now, changeFrequency: "daily", priority: 1.0 },
    { url: escapeXmlUrl(`${BASE_URL}/products`), lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: escapeXmlUrl(`${BASE_URL}/about`), lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: escapeXmlUrl(`${BASE_URL}/services`), lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: escapeXmlUrl(`${BASE_URL}/contact`), lastModified: now, changeFrequency: "monthly", priority: 0.8 }
  );

  try {
    // 2. Fetch Catalog Products
    const products = await fetchFullCatalog();

    // Track Categories & Brands for indexing
    const categoriesSet = new Set();
    const brandsSet = new Set();

    products.forEach((product) => {
      if (!product.slug) return;

      const cleanProductSlug = slugify(product.slug);
      const canonicalUrl = `${BASE_URL}/products/${cleanProductSlug}`;
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
          url: escapeXmlUrl(canonicalUrl),
          lastModified: now,
          changeFrequency: "weekly",
          priority: 0.9,
        });
      }

      if (product.category) {
        categoriesSet.add(slugify(product.category));
      }

      if (product.brand) {
        brandsSet.add(slugify(product.brand));
      }
    });

    // 3. Category Authority Pages
    categoriesSet.forEach((categorySlug) => {
      if (categorySlug) {
        urls.push({
          url: escapeXmlUrl(`${BASE_URL}/category/${categorySlug}`),
          lastModified: now,
          changeFrequency: "weekly",
          priority: 0.85,
        });
      }
    });

    // 4. Brand Authority Pages
    brandsSet.forEach((brandSlug) => {
      if (brandSlug) {
        urls.push({
          url: escapeXmlUrl(`${BASE_URL}/brand/${brandSlug}`),
          lastModified: now,
          changeFrequency: "weekly",
          priority: 0.85,
        });
      }
    });

    // 5. Service Districts (Single Canonical URL per District)
    try {
      const districtSnap = await getDocs(
        collection(db, "websites", "qlyserin", "districts")
      );
      if (!districtSnap.empty) {
        districtSnap.docs.forEach((docSnap) => {
          const data = docSnap.data();
          const rawSlug = data.slug || docSnap.id;
          if (rawSlug) {
            const districtSlug = slugify(rawSlug);
            urls.push({
              url: escapeXmlUrl(`${BASE_URL}/district/${districtSlug}`),
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