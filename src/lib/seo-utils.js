/**
 * SEO Utilities for Qlyser.in / Raj Biosis Private Limited
 * Schema generators, metadata formatters, and quality scoring engine.
 */

export const BASE_URL = "https://qlyser.in";

export const DEFAULT_ORGANIZATION = {
  name: "Raj Biosis Private Limited",
  legalName: "Raj Biosis Private Limited",
  url: BASE_URL,
  logo: `${BASE_URL}/images/rajbiosis-logo.png`,
  telephone: "+91 9983123469",
  email: "rajbiosis@yahoo.in",
  address: {
    streetAddress: "F-4, 1st Floor, Plot No. 16, D-Block Tagor Nagar, 200 Feet Bypass Rd",
    addressLocality: "Jaipur",
    addressRegion: "Rajasthan",
    postalCode: "302021",
    addressCountry: "IN",
  },
  sameAs: [
    "https://facebook.com/rajbiosis",
    "https://instagram.com/rajbiosis",
  ],
};

/**
 * Format dynamic title tag according to natural SEO formula
 */
export function formatSeoTitle(itemTitle, entityType = "product", location = "") {
  if (!itemTitle) return "Biomedical Equipment Supplier in India | Raj Biosis Private Limited";

  const cleanTitle = itemTitle.trim();
  const locationSuffix = location ? ` in ${location}` : " in India";

  switch (entityType) {
    case "product":
      return `${cleanTitle} Supplier${locationSuffix} | Raj Biosis Private Limited`;
    case "category":
      return `${cleanTitle} Diagnostic Equipment & Supplier${locationSuffix} | Raj Biosis`;
    case "brand":
      return `${cleanTitle} Biomedical Analyzers & Reagents${locationSuffix} | Raj Biosis`;
    case "district":
      return `Biomedical & Laboratory Equipment Supplier in ${cleanTitle} | Raj Biosis`;
    default:
      return `${cleanTitle}${locationSuffix} | Raj Biosis Private Limited`;
  }
}

/**
 * Format dynamic meta description tag
 */
export function formatMetaDescription(itemTitle, description = "", entityType = "product", location = "") {
  const loc = location || "India";
  if (description && description.length >= 80) {
    const truncated = description.length > 150 ? description.substring(0, 147) + "..." : description;
    return `${truncated} Available with warranty and technical support in ${loc} from Raj Biosis.`;
  }

  const title = itemTitle || "Biomedical Equipment";
  switch (entityType) {
    case "product":
      return `Buy ${title} at competitive prices in ${loc}. Authorized supplier, dealer, and service provider of ${title} for pathology labs, hospitals, and diagnostic centers by Raj Biosis.`;
    case "category":
      return `Explore high-precision ${title} diagnostic equipment and laboratory solutions in ${loc}. Quality tested, ISO certified analyzers and reagents by Raj Biosis.`;
    case "brand":
      return `Authorized supplier of genuine ${title} laboratory equipment, reagents, and clinical testing instruments across ${loc} with fast delivery and AMC support.`;
    case "district":
      return `Leading biomedical, pathology, and laboratory equipment supplier in ${title}. Quick delivery, installation support, and AMC services for medical analyzers.`;
    default:
      return `Raj Biosis Private Limited supplies CBC machines, biochemistry analyzers, and diagnostic lab equipment in ${loc}. Contact for instant quotation.`;
  }
}

/**
 * Generate Product JSON-LD Schema
 */
export function generateProductSchema(product, canonicalUrl) {
  if (!product) return null;

  const url = canonicalUrl || `${BASE_URL}/products/${product.slug}`;
  const images = Array.isArray(product.images) && product.images.length > 0
    ? product.images.map(img => img.startsWith("http") ? img : `${BASE_URL}${img}`)
    : [product.image ? (product.image.startsWith("http") ? product.image : `${BASE_URL}${product.image}`) : `${BASE_URL}/images/default-product.jpg`];

  return {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.title,
    "image": images,
    "description": product.description || `${product.title} supplied by Raj Biosis Private Limited`,
    "sku": product.id || product.slug,
    "mpn": product.model || product.id || product.slug,
    "brand": {
      "@type": "Brand",
      "name": product.brand || "Raj Biosis"
    },
    "category": product.category || "Biomedical Equipment",
    "offers": {
      "@type": "AggregateOffer",
      "url": url,
      "priceCurrency": "INR",
      "price": product.price || undefined,
      "priceValidUntil": "2027-12-31",
      "itemCondition": "https://schema.org/NewCondition",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": DEFAULT_ORGANIZATION.name
      }
    }
  };
}

/**
 * Generate BreadcrumbList JSON-LD Schema
 */
export function generateBreadcrumbSchema(items = []) {
  if (!items || items.length === 0) return null;

  const itemListElement = items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url ? (item.url.startsWith("http") ? item.url : `${BASE_URL}${item.url}`) : BASE_URL
  }));

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": itemListElement
  };
}

/**
 * Generate Organization JSON-LD Schema
 */
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": DEFAULT_ORGANIZATION.name,
    "legalName": DEFAULT_ORGANIZATION.legalName,
    "url": DEFAULT_ORGANIZATION.url,
    "logo": DEFAULT_ORGANIZATION.logo,
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": DEFAULT_ORGANIZATION.telephone,
      "contactType": "customer service",
      "email": DEFAULT_ORGANIZATION.email,
      "areaServed": "IN",
      "availableLanguage": ["en", "hi"]
    },
    "address": DEFAULT_ORGANIZATION.address,
    "sameAs": DEFAULT_ORGANIZATION.sameAs
  };
}

/**
 * Generate LocalBusiness JSON-LD Schema
 */
export function generateLocalBusinessSchema(districtName = "Jaipur") {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": `Raj Biosis Private Limited - ${districtName}`,
    "image": DEFAULT_ORGANIZATION.logo,
    "url": `${BASE_URL}/district/${districtName.toLowerCase().replace(/\s+/g, "-")}`,
    "telephone": DEFAULT_ORGANIZATION.telephone,
    "email": DEFAULT_ORGANIZATION.email,
    "priceRange": "₹₹-₹₹₹₹",
    "address": DEFAULT_ORGANIZATION.address,
    "areaServed": {
      "@type": "AdministrativeArea",
      "name": districtName
    }
  };
}

/**
 * Generate FAQPage JSON-LD Schema
 */
export function generateFAQSchema(faqs = []) {
  if (!faqs || faqs.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.q || faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a || faq.answer
      }
    }))
  };
}

/**
 * Compute Page SEO Quality Score (0 - 100)
 */
export function computePageSeoScore(pageData = {}) {
  let score = 0;

  // Technical SEO (20 pts)
  if (pageData.canonicalUrl) score += 10;
  if (pageData.isIndexable) score += 10;

  // Content quality (20 pts)
  if (pageData.description && pageData.description.length > 50) score += 10;
  if (pageData.specsCount && pageData.specsCount >= 2) score += 10;

  // Search intent & Metadata (25 pts)
  if (pageData.title && pageData.title.length >= 25 && pageData.title.length <= 70) score += 15;
  if (pageData.metaDescription && pageData.metaDescription.length >= 80 && pageData.metaDescription.length <= 160) score += 10;

  // Internal linking & Structured data (20 pts)
  if (pageData.hasInternalLinks) score += 10;
  if (pageData.hasSchema) score += 10;

  // Images & Local relevance (15 pts)
  if (pageData.hasImageWithAlt) score += 10;
  if (pageData.hasLocationOrCategory) score += 5;

  return score;
}
