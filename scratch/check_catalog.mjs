import { initializeApp } from "firebase/app";
import { getFirestore, getDocs, collection } from "firebase/firestore";
import fs from "fs";

const firebaseConfig = {
  apiKey: "AIzaSyDGIJXX3MR1CxmIJbJHyVzbfRa0M0Sw6FQ",
  authDomain: "rajbiosis-central.firebaseapp.com",
  projectId: "rajbiosis-central",
  storageBucket: "rajbiosis-central.firebasestorage.app",
  messagingSenderId: "190335913620",
  appId: "1:190335913620:web:99a14edcbb528f06c1ee81"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function checkCatalog() {
  const websiteCollections = ["rajbiosis", "centralbiomedicals", "ozallecom"];
  const allProducts = [];

  for (const siteId of websiteCollections) {
    try {
      const categorySnap = await getDocs(
        collection(db, "websites", siteId, "pages", "categoryproducts", "categories")
      );

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
                  siteId,
                  category: categoryName,
                  subCategory: subCategoryName,
                }));

              allProducts.push(...categoryProducts);
            });
          } catch (e) {}

          if (data.products?.length) {
            const directProducts = data.products
              .filter((p) => p.isPublished !== false)
              .map((item, index) => ({
                ...item,
                siteId,
                category: categoryName,
                subCategory: item.subCategory || categoryName,
              }));
            allProducts.push(...directProducts);
          }
        })
      );
    } catch (err) {
      console.error(`Error checking site ${siteId}:`, err);
    }
  }

  console.log(`TOTAL PRODUCTS: ${allProducts.length}`);
  fs.writeFileSync("scratch/products.json", JSON.stringify(allProducts, null, 2));
  process.exit(0);
}

checkCatalog();
