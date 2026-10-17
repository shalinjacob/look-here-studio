"use client";

import { useSyncExternalStore } from "react";
import { EMPTY_CUSTOMER, type Customer } from "@/lib/orderDetails";

// Delivery details shared by the cart's pincode field, the shipping line, the
// online-payment form and the WhatsApp request. Kept for the visit (sessionStorage).

const KEY = "lhs.delivery";
let state: Customer = EMPTY_CUSTOMER;
let loaded = false;
const subs = new Set<() => void>();

function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  try {
    const saved = sessionStorage.getItem(KEY);
    if (saved) state = { ...EMPTY_CUSTOMER, ...JSON.parse(saved) };
  } catch {
    /* private mode: fine */
  }
}

export function setDelivery(patch: Partial<Customer>) {
  load();
  state = { ...state, ...patch };
  try {
    sessionStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    /* ignore */
  }
  subs.forEach((f) => f());
}

function subscribe(f: () => void) {
  load();
  subs.add(f);
  // pick up what was saved earlier in the visit
  queueMicrotask(f);
  return () => subs.delete(f);
}

export function useDelivery(): Customer {
  return useSyncExternalStore(subscribe, () => (load(), state), () => EMPTY_CUSTOMER);
}
