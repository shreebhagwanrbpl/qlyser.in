const noStore={cache:"no-store",headers:{"Cache-Control":"no-cache, no-store, must-revalidate",Pragma:"no-cache"}};
async function requestJson(path){const url=`${path}${path.includes("?")?"&":"?"}_t=${Date.now()}`;const r=await fetch(url,noStore);if(!r.ok)throw new Error(`Data API ${r.status}: ${path}`);return r.json();}
let clientCatalogCache = null;
let clientCatalogTime = 0;
let clientCatalogInFlight = null;

export async function fetchFullCatalog(){
  const now = Date.now();
  if (clientCatalogCache && (now - clientCatalogTime < 30000)) {
    return clientCatalogCache;
  }
  if (clientCatalogInFlight) {
    return clientCatalogInFlight;
  }
  clientCatalogInFlight = (async () => {
    try {
      const d = await requestJson("/api/catalog");
      const x = Array.isArray(d) ? d : (d?.products || d?.data || d?.catalog || []);
      const res = Array.isArray(x) ? x : [];
      if (res.length > 0) {
        clientCatalogCache = res;
        clientCatalogTime = Date.now();
      }
      return res;
    } catch(e) {
      console.error("[fetchFullCatalog]", e);
      return clientCatalogCache || [];
    } finally {
      clientCatalogInFlight = null;
    }
  })();
  return clientCatalogInFlight;
}
export async function fetchSiteData(page){const d=await requestJson(`/api/site-data?page=${encodeURIComponent(page)}`);return d?.data!==undefined?d.data:d;}
export async function fetchHomeData(){return fetchSiteData("home")} export async function fetchContactData(){return fetchSiteData("contact")} export async function fetchServicesData(){return fetchSiteData("services")} export async function fetchAboutData(){return fetchSiteData("about")}
export async function fetchDistrictData(district){const d=await requestJson(`/api/site-data?type=district&district=${encodeURIComponent(district||"")}`);return d?.data!==undefined?d.data:d;}
export async function fetchDistrictsList(){const d=await requestJson("/api/site-data?page=districts");return d?.districts||d?.data||[]} export const fetchDistrictsInState=fetchDistrictsList;
export async function fetchProductBySlug(slug){const l=await fetchFullCatalog(),t=decodeURIComponent(String(slug||"")).toLowerCase();return l.find(p=>String(p.slug||"").toLowerCase()===t||makeSlug(p.title||p.name||"")===t||String(p.id||p.uid||"").toLowerCase()===t)||null;}
export {makeSlug,resolveImageUrl} from "./catalog-utils.js";
