export function normalizeContactInfo(contactInfo = []) {
  if (!Array.isArray(contactInfo)) return [];
  return contactInfo.flatMap((entry) => {
    if (!entry) return [];
    if (typeof entry === "string") return [{ label: "", value: entry }];
    return [{ label: String(entry.label || ""), value: entry.value ?? "" }];
  });
}

export function contactValues(contactInfo, labels = []) {
  const wanted = labels.map((x) => x.toLowerCase());
  return normalizeContactInfo(contactInfo)
    .filter((item) => wanted.some((label) => item.label.toLowerCase().includes(label)))
    .flatMap((item) => String(item.value || "").split(/[,\n/;|]+/))
    .map((x) => x.trim())
    .filter(Boolean);
}

export function extractPhones(contactInfo) {
  return [...new Set(
    contactValues(contactInfo, ["phone", "mobile", "whatsapp", "contact number"])
      .map((value) => value.replace(/[^\d+]/g, ""))
      .map((value) => value.startsWith("+91") ? value : value.replace(/^91(?=\d{10}$)/, "+91"))
      .filter((value) => /\+?91?\d{10}$/.test(value.replace(/\s/g, "")))
  )];
}

export function extractEmails(contactInfo) {
  return [...new Set(
    contactValues(contactInfo, ["email", "mail"])
      .flatMap((value) => value.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi) || [])
      .map((x) => x.trim())
  )];
}

export function getContactAddress(contactInfo) {
  return contactValues(contactInfo, ["office address", "address"])[0] || "";
}

export function getWorkingHours(contactInfo) {
  return contactValues(contactInfo, ["working hours", "work hours", "hours"])[0] || "";
}
