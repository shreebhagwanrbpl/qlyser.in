import Home from "@/app/page";
import {
  formatSeoTitle,
  formatMetaDescription,
  generateLocalBusinessSchema,
  generateBreadcrumbSchema,
  BASE_URL
} from "@/lib/seo-utils";

export async function generateMetadata({ params }) {
  const { district } = await params;
  const districtName = district
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  const title = formatSeoTitle(districtName, "district");
  const description = formatMetaDescription(
    districtName,
    `Raj Biosis Private Limited is the leading biomedical and laboratory equipment supplier in ${districtName}. Supplying CBC machines, biochemistry analyzers, diagnostic kits, and 24/7 AMC services.`,
    "district"
  );
  const canonicalUrl = `${BASE_URL}/district/${district}`;

  return {
    title,
    description,
    keywords: [
      `Biomedical Equipment ${districtName}`,
      `Laboratory Equipment Supplier ${districtName}`,
      `CBC Machine Supplier ${districtName}`,
      `Hematology Analyzer ${districtName}`,
      `Biochemistry Analyzer Supplier ${districtName}`,
      `Pathology Equipment Dealer ${districtName}`,
      `Diagnostic Machines ${districtName}`,
      "Raj Biosis Private Limited",
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

export default async function DistrictLocationPage({ params }) {
  const { district } = await params;
  const districtName = district
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  const localSchema = generateLocalBusinessSchema(districtName);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Service Locations", url: "/services" },
    { name: districtName, url: `/district/${district}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Home city={districtName} />
    </>
  );
}
