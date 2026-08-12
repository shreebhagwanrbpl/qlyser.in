import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

export const metadata = {
  metadataBase: new URL(
    "https://qlyser.in"
  ),

  title:
    "Biomedical Equipment Supplier in India | Raj Biosis Private Limited",

  description:
    "Raj Biosis Private Limited supplies CBC Machines, Hematology Analyzers, Biochemistry Analyzers, ELISA Readers and laboratory equipment across India.",

  keywords: [
    "Raj Biosis Private Limited",
    "Biomedical Equipment Supplier",
    "Laboratory Equipment Supplier",
    "CBC Machine Supplier",
    "Hematology Analyzer Supplier",
    "Biochemistry Analyzer Supplier",
    "Diagnostic Equipment Supplier",
    "Medical Equipment Supplier India",
  ],

  openGraph: {
    title:
      "Biomedical Equipment Supplier in India | Raj Biosis Private Limited",

    description:
      "Supplier of biomedical and laboratory equipment across India.",

    url: "https://qlyser.in",

    siteName: "Raj Biosis Private Limited",

    images: [
      {
        url: "/images/rajbiosis-logo.png",
        width: 1200,
        height: 630,
        alt: "Raj Biosis Private Limited",
      },
    ],

    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",

    title:
      "Biomedical Equipment Supplier in India | Raj Biosis Private Limited",

    description:
      "Supplier of biomedical and laboratory equipment across India.",

    images: ["/images/rajbiosis-logo.png"],
  },

  alternates: {
    canonical: "https://qlyser.in",
  },
};

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Navbar />

        <main>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
            }}
          />

          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}