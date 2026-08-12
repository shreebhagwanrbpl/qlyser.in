import { db } from "./firebase";
import { doc, getDoc, getDocs, collection } from "firebase/firestore";
import { featuredProductsData } from "@/data/productsData";

// Simple in-memory cache for Firestore documents and catalog
const docCache = {};
let catalogPromise = null;

const makeSlug = (text = "") =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");

export async function fetchDocCached(path) {
  if (docCache[path]) {
    return docCache[path];
  }
  if (!docCache[path + "_promise"]) {
    docCache[path + "_promise"] = (async () => {
      try {
        const parts = path.split("/");
        const docRef = doc(db, ...parts);
        const snap = await getDoc(docRef);
        if (snap.exists()) {
          const data = snap.data();
          docCache[path] = data;
          return data;
        }
        return null;
      } catch (err) {
        console.error(`Error fetching doc at ${path}:`, err);
        delete docCache[path + "_promise"];
        return null;
      }
    })();
  }
  return docCache[path + "_promise"];
}

export async function fetchFullCatalog() {
  if (catalogPromise) {
    return catalogPromise;
  }

  catalogPromise = (async () => {
    const startTime = performance.now();
    const allProducts = [];

    const websiteCollections = ["rajbiosis", "centralbiomedicals", "ozallecom"];

    for (const siteId of websiteCollections) {
      try {
        const categorySnap = await getDocs(
          collection(db, "websites", siteId, "pages", "categoryproducts", "categories")
        );

        if (!categorySnap.empty) {
          await Promise.all(
            categorySnap.docs.map(async (categoryDoc) => {
              const data = categoryDoc.data();
              const categoryName = data.category || categoryDoc.id;

              try {
                const subcategoriesSnap = await getDocs(
                  collection(db, "websites", siteId, "pages", "categoryproducts", "categories", categoryDoc.id, "subcategories")
                );

                subcategoriesSnap.forEach((subDoc) => {
                  const subData = subDoc.data();
                  const subCategoryName = subData.subCategory || subDoc.id;

                  const categoryProducts = (subData.products || [])
                    .filter((p) => p.isPublished !== false)
                    .map((item, index) => ({
                      ...item,
                      uid: `${siteId}-${categoryDoc.id}-${subDoc.id}-${index}`,
                      category: categoryName,
                      subCategory: subCategoryName,
                      slug: item.slug || makeSlug(item.title),
                    }));

                  allProducts.push(...categoryProducts);
                });
              } catch (subErr) {
                console.error(`Error fetching subcategories for category ${categoryDoc.id}:`, subErr);
              }

              if (data.products?.length) {
                const directProducts = data.products
                  .filter((p) => p.isPublished !== false)
                  .map((item, index) => ({
                    ...item,
                    uid: `${siteId}-${categoryDoc.id}-direct-${index}`,
                    category: categoryName,
                    subCategory: item.subCategory || categoryName,
                    slug: item.slug || makeSlug(item.title),
                  }));
                allProducts.push(...directProducts);
              }
            })
          );
        }
      } catch (siteErr) {
        // Site path skipped
      }
    }

    // If Firestore has no products, return default high quality featured products catalog
    if (allProducts.length === 0) {
      console.log("[data-fetcher] Firestore returned 0 products. Using high-quality default catalog.");
      allProducts.push(...featuredProductsData);
    }

    const duration = performance.now() - startTime;
    console.log(`[data-fetcher] fetchFullCatalog returned ${allProducts.length} items in ${duration.toFixed(2)}ms`);

    return allProducts;
  })();

  return catalogPromise;
}

export async function fetchHomeData() {
  return (
    (await fetchDocCached("websites/rajbiosis/pages/home")) ||
    (await fetchDocCached("websites/centralbiomedicals/pages/home"))
  );
}

export async function fetchContactData() {
  return (
    (await fetchDocCached("websites/rajbiosis/pages/contact")) ||
    (await fetchDocCached("websites/centralbiomedicals/pages/contact"))
  );
}

export async function fetchServicesData() {
  return (
    (await fetchDocCached("websites/rajbiosis/pages/services")) ||
    (await fetchDocCached("websites/centralbiomedicals/pages/services"))
  );
}

export async function fetchDistrictData(district) {
  if (!district) return null;
  return (
    (await fetchDocCached(`websites/rajbiosis/districts/${district}`)) ||
    (await fetchDocCached(`websites/centralbiomedicals/districts/${district}`))
  );
}
