// Delivery details collected in the cart before paying online. Shared by the
// form (client) and the create-order endpoint (server) so both validate alike.

export interface Customer {
  name: string;
  phone: string; // 10-digit Indian mobile
  email: string;
  address: string;
  city: string;
  pincode: string; // 6 digits
}

export const EMPTY_CUSTOMER: Customer = { name: "", phone: "", email: "", address: "", city: "", pincode: "" };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** returns the cleaned customer, or { error } naming the first problem */
export function cleanCustomer(raw: Partial<Customer> | undefined): { ok: true; value: Customer } | { ok: false; error: string } {
  const s = (v: unknown, max: number) => String(v ?? "").replace(/\s+/g, " ").trim().slice(0, max);
  const name = s(raw?.name, 80);
  const digits = String(raw?.phone ?? "").replace(/[\s()-]/g, "").replace(/^(\+?91|0)(?=[6-9]\d{9}$)/, "");
  const email = s(raw?.email, 120).toLowerCase();
  const address = s(raw?.address, 200);
  const city = s(raw?.city, 60);
  const pincode = s(raw?.pincode, 6);

  if (name.length < 2) return { ok: false, error: "Add your name." };
  if (!/^[6-9]\d{9}$/.test(digits)) return { ok: false, error: "Add a 10-digit mobile number." };
  if (!EMAIL_RE.test(email)) return { ok: false, error: "Add a valid email so we can send your receipt." };
  if (address.length < 6) return { ok: false, error: "Add your full delivery address." };
  if (city.length < 2) return { ok: false, error: "Add your city." };
  if (!/^\d{6}$/.test(pincode)) return { ok: false, error: "Add a 6-digit pincode." };
  return { ok: true, value: { name, phone: digits, email, address, city, pincode } };
}
