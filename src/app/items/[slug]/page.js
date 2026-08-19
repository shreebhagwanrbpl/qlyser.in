import { fetchFullCatalog } from "@/lib/data-fetcher-server";
import ProductDetails from "./ProductDetails";
import {
  formatSeoTitle,
  formatMetaDescription,
  generateProductSchema,
  generateBreadcrumbSchema,
  BASE_URL
} from "@/lib/seo-utils";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const products = await fetchFullCatalog();
  const product = products.find((p) => p.slug === slug);

  const productName = product?.title || slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  const title = formatSeoTitle(productName, "product");
  const description = formatMetaDescription(productName, product?.description, "product");
  // Set canonical URL to primary product path /products/[slug]
  const canonicalUrl = `${BASE_URL}/products/${slug}`;
  const imageUrl = product?.image?.startsWith("http")
    ? product.image
    : `${BASE_URL}${product?.image || "/images/rajbiosis-logo.png"}`;

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
      images: [{ url: imageUrl, width: 1200, height: 630, alt: productName }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function Page({ params }) {
  const { slug } = await params;
  const products = await fetchFullCatalog();
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  const canonicalUrl = `${BASE_URL}/products/${product.slug}`;
  const productSchema = generateProductSchema(product, canonicalUrl);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Products", url: "/products" },
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