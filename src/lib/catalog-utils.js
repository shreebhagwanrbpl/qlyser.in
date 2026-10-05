// src/lib/catalog-utils.js
export const WEBSITE_ID = "qlyserin";

export const normalizeDomainId = (value = "") =>
  String(value)
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .replace(/[.\-\s]/g, "")
    .replace(/\/.*$/, "");

export const NORMALIZED_WEBSITE_ID = normalizeDomainId(WEBSITE_ID);

const asStatus = (value) => String(value ?? "").trim().toLowerCase();

export function isItemVisibleOnWebsite(item) {
  if (!item || item.isPublished === false) return false;
  const status = asStatus(item.status);
  if (status === "inactive" || status === "draft") return false;

  if (item.websiteIds === undefined || item.websiteIds === null) return true;
  if (!Array.isArray(item.websiteIds) || item.websiteIds.length === 0) return false;

  return item.websiteIds.some((id) => {
    const normalized = normalizeDomainId(id);
    return normalized === "all" || normalized === NORMALIZED_WEBSITE_ID;
  });
}

export function visibilityWithParents(item, category, subcategory) {
  if (category && !isItemVisibleOnWebsite(category)) return false;
  if (subcategory && !isItemVisibleOnWebsite(subcategory)) return false;
  return isItemVisibleOnWebsite(item);
}

export const makeSlug = (text = "") =>
  String(text)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");

export const COMPANY_ID = process.env.COMPANY_ID || "rajbiosis";

export function resolveImageUrl(url) {
  if (!url || typeof url !== "string") return "";
  const trimmed = url.trim();
  if (!trimmed) return "";
  if (
    trimmed.startsWith("http://") ||
    trimmed.startsWith("https://") ||
    trimmed.startsWith("data:") ||
    trimmed.startsWith("blob:")
  ) {
    return trimmed;
  }
  const adminBase = (
    (typeof process !== "undefined" && (
      process.env?.NEXT_PUBLIC_ADMIN_API_BASE_URL ||
      process.env?.ADMIN_API_BASE_URL ||
      process.env?.ADMIN_API_URL ||
      process.env?.SQLITE_ADMIN_API_URL
    )) || "https://admin.rajbiosis.app"
  ).replace(/\/$/, "");

  if (trimmed.startsWith("/uploads/") || trimmed.startsWith("uploads/")) {
    const cleanPath = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
    return `${adminBase}${cleanPath}`;
  }

  if (trimmed.startsWith("/")) {
    return trimmed;
  }

  return `/${trimmed}`;
}
