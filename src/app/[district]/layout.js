export async function generateMetadata({ params }) {
  const { district = "jaipur" } = await params;

  const districtName = district
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  // Set canonical URL to clean /district/[district] location route
  const url = `https://qlyser.in/district/${district}`;

  return {
    title: `Biomedical & Diagnostic Equipment Supplier in ${districtName} | Raj Biosis`,
    description: `Raj Biosis supplies diagnostic machines, laboratory equipment, reagents and biomedical products in ${districtName}. Contact for quotation and technical support.`,
    keywords: [
      `Biomedical Equipment ${districtName}`,
      `Diagnostic Machines ${districtName}`,
      `Laboratory Equipment ${districtName}`,
      `Pathology Equipment ${districtName}`,
      `Biomedical Supplier ${districtName}`,
    ],
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `Biomedical Equipment in ${districtName} | Raj Biosis`,
      description: `Diagnostic laboratory equipment supplier in ${districtName}.`,
      url,
      type: "website",
    },
  };
}

export default function DistrictLayout({ children }) {
  return children;
}