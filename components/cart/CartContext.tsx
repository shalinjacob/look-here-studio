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
import { track, gaItem } from "@/lib/analytics";

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
  /** chosen variant, e.g. "LOVE + MORE" */
  variant?: string;
  /** variant holds the customer's own text (custom word, lightbox text…) */
  personalised?: boolean;
}

export const GIFT_NOTE_MAX = 150;

/** a line is one product + one variant */
export const lineId = (l: Pick<CartLine, "slug" | "variant">) =>
  l.variant ? `${l.slug}::${l.variant}` : l.slug;

interface CartState {
  lines: CartLine[];
  gift?: boolean;
  giftNote?: string;
}

type Action =
  | { type: "ADD"; line: Omit<CartLine, "qty">; qty: number }
  | { type: "REMOVE"; id: string }
  | { type: "SET_QTY"; id: string; qty: number }
  | { type: "CLEAR" }
  | { type: "SET_GIFT"; gift: boolean; giftNote: string }
  | { type: "HYDRATE"; state: CartState };

const KEY = "lookhere.cart.v1";

function reducer(state: CartState, action: Action): CartState {
  switch (action.type) {
    case "HYDRATE":
      return action.state;
    case "ADD": {
      const id = lineId(action.line);
      const existing = state.lines.find((l) => lineId(l) === id);
      if (existing) {
        return {
          ...state,
          lines: state.lines.map((l) =>
            lineId(l) === id ? { ...l, qty: l.qty + action.qty } : l
          ),
        };
      }
      return { ...state, lines: [...state.lines, { ...action.line, qty: action.qty }] };
    }
    case "SET_QTY":
      return {
        ...state,
        lines: state.lines
          .map((l) => (lineId(l) === action.id ? { ...l, qty: action.qty } : l))
          .filter((l) => l.qty > 0),
      };
    case "REMOVE":
      return { ...state, lines: state.lines.filter((l) => lineId(l) !== action.id) };
    case "CLEAR":
      return { lines: [] };
    case "SET_GIFT":
      return { ...state, gift: action.gift, giftNote: action.giftNote.slice(0, GIFT_NOTE_MAX) };
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
  addItem: (product: Product, qty?: number, variant?: ChosenVariant) => void;
  /** takes a line id (see lineId) */
  removeItem: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  gift: boolean;
  giftNote: string;
  setGift: (gift: boolean, giftNote: string) => void;
}

export interface ChosenVariant {
  label: string;
  personalised?: boolean;
  price: number;
  image?: string;
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

  const addItem = useCallback((product: Product, qty = 1, variant?: ChosenVariant) => {
    if (product.price == null) return;
    dispatch({
      type: "ADD",
      qty,
      line: {
        slug: product.slug,
        name: product.name,
        price: variant?.price ?? product.price,
        currency: product.currency,
        image: variant?.image ?? product.images[0],
        status: product.status,
        variant: variant?.label,
        ...(variant?.personalised || product.custom ? { personalised: true } : {}),
      },
    });
    const price = variant?.price ?? product.price;
    track("add_to_cart", {
      currency: product.currency,
      value: price * qty,
      items: [{ ...gaItem({ ...product, price }, qty, variant?.label) }],
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
      removeItem: (id) => dispatch({ type: "REMOVE", id }),
      setQty: (id, qty) => dispatch({ type: "SET_QTY", id, qty }),
      clear: () => dispatch({ type: "CLEAR" }),
      gift: !!state.gift,
      giftNote: state.giftNote ?? "",
      setGift: (gift, giftNote) => dispatch({ type: "SET_GIFT", gift, giftNote }),
    };
  }, [state, isOpen, addItem]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
