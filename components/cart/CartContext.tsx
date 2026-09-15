"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
  useCallback,
} from "react";
import type { Product } from "@/lib/types";

// ---------------------------------------------------------------------------
// Central cart state. localStorage-backed for this demo; swap the persistence
// + the `checkout` stub for Shopify / Stripe when ready (see README).
// ---------------------------------------------------------------------------

export interface CartLine {
  slug: string;
  name: string;
  price: number;
  currency: string;
  image: string;
  status: string;
  qty: number;
}

interface CartState {
  lines: CartLine[];
}

type Action =
  | { type: "ADD"; line: Omit<CartLine, "qty">; qty: number }
  | { type: "REMOVE"; slug: string }
  | { type: "SET_QTY"; slug: string; qty: number }
  | { type: "CLEAR" }
  | { type: "HYDRATE"; state: CartState };

const KEY = "lookhere.cart.v1";

function reducer(state: CartState, action: Action): CartState {
  switch (action.type) {
    case "HYDRATE":
      return action.state;
    case "ADD": {
      const existing = state.lines.find((l) => l.slug === action.line.slug);
      if (existing) {
        return {
          lines: state.lines.map((l) =>
            l.slug === action.line.slug ? { ...l, qty: l.qty + action.qty } : l
          ),
        };
      }
      return { lines: [...state.lines, { ...action.line, qty: action.qty }] };
    }
    case "SET_QTY":
      return {
        lines: state.lines
          .map((l) => (l.slug === action.slug ? { ...l, qty: action.qty } : l))
          .filter((l) => l.qty > 0),
      };
    case "REMOVE":
      return { lines: state.lines.filter((l) => l.slug !== action.slug) };
    case "CLEAR":
      return { lines: [] };
    default:
      return state;
  }
}

interface CartContextValue {
  lines: CartLine[];
  count: number;
  subtotal: number;
  currency: string;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (product: Product, qty?: number) => void;
  removeItem: (slug: string) => void;
  setQty: (slug: string, qty: number) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { lines: [] });
  const [isOpen, setIsOpen] = useState(false);
  const [ready, setReady] = useState(false);

  // hydrate from localStorage once
  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) dispatch({ type: "HYDRATE", state: JSON.parse(raw) });
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  // persist
  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch {
      /* ignore */
    }
  }, [state, ready]);

  const addItem = useCallback((product: Product, qty = 1) => {
    if (product.price == null) return;
    dispatch({
      type: "ADD",
      qty,
      line: {
        slug: product.slug,
        name: product.name,
        price: product.price,
        currency: product.currency,
        image: product.images[0],
        status: product.status,
      },
    });
    setIsOpen(true);
  }, []);

  const value = useMemo<CartContextValue>(() => {
    const count = state.lines.reduce((n, l) => n + l.qty, 0);
    const subtotal = state.lines.reduce((n, l) => n + l.qty * l.price, 0);
    return {
      lines: state.lines,
      count,
      subtotal,
      currency: state.lines[0]?.currency ?? "INR",
      isOpen,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      addItem,
      removeItem: (slug) => dispatch({ type: "REMOVE", slug }),
      setQty: (slug, qty) => dispatch({ type: "SET_QTY", slug, qty }),
      clear: () => dispatch({ type: "CLEAR" }),
    };
  }, [state, isOpen, addItem]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
