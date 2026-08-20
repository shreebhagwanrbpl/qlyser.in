import { fetchFullCatalog } from "@/lib/data-fetcher-server";
import ProductDetails from "@/app/items/[slug]/ProductDetails";
import {
  formatSeoTitle,
  formatMetaDescription,
  generateProductSchema,
  generateBreadcrumbSchema,
  BASE_URL,
  slugify
} from "@/lib/seo-utils";
import { notFound } from "next/navigation";

export const dynamicParams = true;

export async function generateStaticParams() {
  try {
    const products = await fetchFullCatalog();
    return products.slice(0, 50).map((p) => ({
      slug: p.slug,
    }));
  } catch (err) {
    return [];
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const products = await fetchFullCatalog();
  const product = products.find((p) => p.slug === slug);

  const productName = product?.title || slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  const title = formatSeoTitle(productName, "product");
  const description = formatMetaDescription(productName, product?.description, "product");
  const canonicalUrl = `${BASE_URL}/products/${slug}`;
  const imageUrl = product?.image?.startsWith("http")
    ? product.image
    : `${BASE_URL}${product?.image || "/images/rajbiosis-logo.png"}`;

  return {
    title,
    description,
    keywords: [
      productName,
      `${productName} Supplier`,
      `${productName} Dealer`,
      `${productName} Distributor`,
      `${productName} Manufacturer`,
      `${productName} Price`,
      `${productName} Supplier in India`,
      `${productName} Specification`,
      product?.brand || "Raj Biosis",
      product?.category || "Biomedical Equipment",
      "Laboratory Equipment Supplier",
      "Diagnostic Equipment India",
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "Raj Biosis Private Limited",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: productName,
        },
      ],
      type: "website",
      locale: "en_IN",
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
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const products = await fetchFullCatalog();
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    // If exact slug match not found, check title match fallback
    const titleMatch = products.find(
      (p) => p.slug === slug.toLowerCase() || p.id === slug
    );
    if (!titleMatch) {
      notFound();
    }
  }

  const activeProduct = product || products.find((p) => p.slug === slug.toLowerCase() || p.id === slug);
  const canonicalUrl = `${BASE_URL}/products/${activeProduct.slug}`;
  const productSchema = generateProductSchema(activeProduct, canonicalUrl);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Products", url: "/products" },
    { name: activeProduct.category || "Catalog", url: `/category/${slugify(activeProduct.category || "all")}` },
    { name: activeProduct.title, url: `/products/${activeProduct.slug}` },
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
      <ProductDetails slug={activeProduct.slug} initialProduct={activeProduct} />
    </>
  );
}
