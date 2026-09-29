import {
  getDocumentByPath,
  getDocumentsByCollection,
  getDocumentsLikePath,
} from "./sqliteDb.js";
import {
  WEBSITE_ID,
  NORMALIZED_WEBSITE_ID,
  isItemVisibleOnWebsite,
  visibilityWithParents,
  makeSlug,
} from "./catalog-utils.js";
import { adminFetch } from "./admin-api.js";
import { defaultServicesData } from "../data/servicesData.js";

const companyId = () => process.env.SQLITE_COMPANY_ID || "rajbiosis";

const defaultContactInfo = [
  {
    label: "Address",
    value: "F-4, 1st Floor, Plot No. 16, D-Block Tagor Nagar, Ajmer-Delhi Bypass Rd, Jaipur, Rajasthan 302021, India",
  },
  {
    label: "Email",
    value: "mail@rajbiosis.com",
  },
  {
    label: "Phone",
    value: ["8318368383"],
  },
  {
    label: "Working Hours",
    value: "Mon - Sat (10AM - 6PM)",
  },
];

async function adminJson(pathname) {
  const response = await adminFetch(pathname);
  return response.json();
}

function uniqueByKey(items) {
  const map = new Map();
  for (const item of items) {
    const key = item.uid || item.id || item.slug || item.title;
    if (key && !map.has(key)) map.set(key, item);
  }
  return [...map.values()];
}

async function findWebsitePage(pageType) {
  const c = companyId();
  const candidates = [
    `websites/${c}/${WEBSITE_ID}/pages/${pageType}`,
    `websites/${WEBSITE_ID}/pages/${pageType}`,
  ];
  for (const p of candidates) {
    const found = getDocumentByPath(p);
    if (found) return found.data;
  }
  const normalized = getDocumentsLikePath(`websites/%/${WEBSITE_ID}/pages/${pageType}`);
  if (normalized[0]?.data) return normalized[0].data;
  try {
    return await adminJson(`/api/site-data?page=${encodeURIComponent(pageType)}&websiteId=${encodeURIComponent(WEBSITE_ID)}`);
  } catch {
    return null;
  }
}

export async function fetchDocCached(pathValue) {
  const direct = getDocumentByPath(pathValue);
  return direct?.data || null;
}

export async function fetchHomeData() {
  return findWebsitePage("home");
}

export async function fetchContactData() {
  const page = await findWebsitePage("contact");
  if (page && Array.isArray(page.contactInfo) && page.contactInfo.length) {
    return page;
  }
  return { contactInfo: defaultContactInfo };
}

export async function fetchServicesData() {
  const page = await findWebsitePage("services");
  if (page && Array.isArray(page.services) && page.services.length) {
    return page;
  }
  return { services: defaultServicesData };
}

export async function fetchDistrictData(district) {
  if (!district) return null;
  const c = companyId();
  const candidates = [
    `websites/${c}/${WEBSITE_ID}/districts/${district}`,
    `websites/${WEBSITE_ID}/districts/${district}`,
  ];
  for (const p of candidates) {
    try {
      const found = getDocumentByPath(p);
      if (found && found.data && (found.data.district || found.data.name)) return found.data;
    } catch {
      // ignore
    }
  }
  try {
    const remote = await adminJson(`/api/site-data?type=district&district=${encodeURIComponent(district)}&websiteId=${encodeURIComponent(WEBSITE_ID)}`);
    if (remote && remote.data && (remote.data.district || remote.data.name)) return remote.data;
    if (remote && !remote.error && (remote.district || remote.name)) return remote;
  } catch {
    // ignore
  }
  const districtName = district
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
  return {
    district: districtName,
    state: "Rajasthan",
    country: "India",
  };
}

export async function fetchDistricts() {
  const c = companyId();
  const rows = getDocumentsLikePath(`websites/%/${WEBSITE_ID}/districts/%`);
  if (rows.length) return rows.map((r) => ({ id: r.doc_id, ...(r.data || {}) }));
  const fallback = getDocumentsLikePath(`websites/${c}/districts/%`);
  return fallback.map((r) => ({ id: r.doc_id, ...(r.data || {}) }));
}

export async function fetchCategories() {
  const c = companyId();
  const rows = getDocumentsByCollection(`companies/${c}/categories`);
  if (rows.length) return rows;
  return getDocumentsLikePath(`companies/%/categories/%`);
}

async function fetchFullCatalogFromSQLite() {
  const c = companyId();
  let catRows = getDocumentsByCollection(`companies/${c}/categories`);
  if (!catRows.length) {
    catRows = getDocumentsLikePath(`companies/%/categories/%`);
  }

  let subRows = getDocumentsLikePath(`companies/${c}/categories/%/subcategories/%`);
  if (!subRows.length) {
    subRows = getDocumentsLikePath(`companies/%/categories/%/subcategories/%`);
  }

  const categoryMap = new Map();
  const subMap = new Map();
  const products = [];

  for (const row of catRows) {
    categoryMap.set(row.doc_id, row.data);
  }

  for (const row of subRows) {
    const parts = row.path.split("/");
    const comp = parts[1];
    const categoryId = parts[3];
    const subcategoryId = parts[5];
    const sub = row.data || {};
    subMap.set(`${comp}-${subcategoryId}`, { ...sub, id: subcategoryId, categoryId });

    const category = categoryMap.get(categoryId) || { name: categoryId, category: categoryId };
    const embedded = Array.isArray(sub.products) ? sub.products : [];
    embedded.forEach((item, index) => {
      if (!visibilityWithParents(item, category, sub)) return;
      products.push({
        ...item,
        uid: item.uid || `${comp}-${categoryId}-${subcategoryId}-${index}`,
        categoryId,
        subcategoryId,
        category: item.category || category?.category || category?.name || categoryId,
        subCategory: item.subCategory || sub.subCategory || sub.name || subcategoryId,
        slug: item.slug || makeSlug(item.title),
      });
    });
  }

  const productRows = getDocumentsLikePath(`companies/%/categories/%/subcategories/%/products/%`);
  for (const row of productRows) {
    const parts = row.path.split("/");
    const comp = parts[1];
    const categoryId = parts[3];
    const subcategoryId = parts[5];
    const productId = parts[7];
    const item = row.data || {};
    const category = categoryMap.get(categoryId) || { name: categoryId, category: categoryId };
    const sub = subMap.get(`${comp}-${subcategoryId}`) || { name: subcategoryId };
    if (!visibilityWithParents(item, category, sub)) continue;
    products.push({
      ...item,
      id: item.id || productId,
      uid: item.uid || productId,
      categoryId,
      subcategoryId,
      category: item.category || category?.category || category?.name || categoryId,
      subCategory: item.subCategory || sub?.subCategory || sub?.name || subcategoryId,
      slug: item.slug || makeSlug(item.title),
    });
  }

  const masterRows = getDocumentsLikePath(`companies/%/products/%`);
  for (const row of masterRows) {
    const item = row.data || {};
    if (!isItemVisibleOnWebsite(item)) continue;

    const categoryId = item.categoryId || item.categoryID;
    const subcategoryId = item.subcategoryId || item.subCategoryId;
    const category = categoryId ? categoryMap.get(categoryId) : null;
    const sub = subcategoryId ? subMap.get(subcategoryId) : null;

    if (category && !isItemVisibleOnWebsite(category)) continue;
    if (sub && !isItemVisibleOnWebsite(sub)) continue;

    products.push({
      ...item,
      id: item.id || row.doc_id,
      uid: item.uid || row.doc_id,
      category: item.category || category?.category || category?.name,
      subCategory: item.subCategory || sub?.subCategory || sub?.name,
      slug: item.slug || makeSlug(item.title),
    });
  }

  return uniqueByKey(products);
}

export async function fetchCatalogCategories() {
  const catalog = await fetchFullCatalog();
  return [...new Set(catalog.map((p) => p.category).filter(Boolean))];
}


export async function fetchFullCatalog() {
  try {
    const local = await fetchFullCatalogFromSQLite();
    if (Array.isArray(local) && local.length) return local;
  } catch (error) {
    // console.warn("[catalog] SQLite read unavailable, using Admin API:", error.message);
  }
  try {
    const remote = await adminJson(`/api/catalog?websiteId=${encodeURIComponent(WEBSITE_ID)}`);
    const list = Array.isArray(remote) ? remote : (Array.isArray(remote?.products) ? remote.products : []);
    if (list.length) return list;
  } catch (error) {
    // console.error("[catalog] Admin API fallback failed:", error);
  }
  return [];
}
