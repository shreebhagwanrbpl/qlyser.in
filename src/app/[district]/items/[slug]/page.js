import { fetchFullCatalog } from "@/lib/data-fetcher-server";
import ProductDetails from "@/app/items/[slug]/ProductDetails";
import {
  formatSeoTitle,
  formatMetaDescription,
  generateProductSchema,
  generateBreadcrumbSchema,
  BASE_URL
} from "@/lib/seo-utils";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const { slug, district } = await params;
  const products = await fetchFullCatalog();
  const product = products.find((p) => p.slug === slug);

  const districtName = district
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  const productName = product?.title || slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  const title = formatSeoTitle(productName, "product", districtName);
  const description = formatMetaDescription(productName, product?.description, "product", districtName);

  // Canonical points to primary product URL to eliminate duplicate content penalty
  const canonicalUrl = `${BASE_URL}/products/${slug}`;

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
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function DistrictProductPage({ params }) {
  const { slug, district } = await params;
  const products = await fetchFullCatalog();
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  const districtName = district.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  const canonicalUrl = `${BASE_URL}/products/${product.slug}`;
  const productSchema = generateProductSchema(product, canonicalUrl);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: districtName, url: `/${district}` },
    { name: product.title, url: canonicalUrl },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ProductDetails slug={slug} initialProduct={product} />
    </>
  );
}