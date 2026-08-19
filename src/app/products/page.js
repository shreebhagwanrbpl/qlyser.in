import { fetchFullCatalog } from "@/lib/data-fetcher-server";
import ProductsClient from "@/app/items/ProductsClient";
import {
  formatSeoTitle,
  formatMetaDescription,
  generateBreadcrumbSchema,
  BASE_URL
} from "@/lib/seo-utils";

export const revalidate = 3600; // Cache revalidation every hour

export async function generateMetadata() {
  const title = formatSeoTitle("Biomedical & Laboratory Equipment Catalog", "product");
  const description = formatMetaDescription(
    "Laboratory & Biomedical Equipment Catalog",
    "Explore automated hematology analyzers, biochemistry analyzers, electrolyte reagents, rapid diagnostic kits, and laboratory instruments by Raj Biosis Private Limited.",
    "product"
  );
  const canonicalUrl = `${BASE_URL}/products`;

  return {
    title,
    description,
    keywords: [
      "Biomedical Equipment Catalog",
      "Laboratory Equipment List",
      "Hematology Analyzers",
      "Biochemistry Analyzers",
      "Electrolyte Reagents",
      "Diagnostic Test Kits",
      "Medical Laboratory Equipment India",
      "Raj Biosis Products",
    ],
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
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function ProductsPage() {
  const allProducts = await fetchFullCatalog();

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Products Catalog", url: "/products" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ProductsClient initialProducts={allProducts} />
    </>
  );
}