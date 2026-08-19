import { BASE_URL } from "@/lib/seo-utils";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/admin/",
          "/*?*",
          "/private/",
          "/search?",
        ],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: [
          "/api/",
          "/admin/",
          "/*?*",
        ],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}