"use client";

import { createContext, useContext, useSyncExternalStore } from "react";
import { STORAGE_KEY } from "../../constants/storage";

const CartContext = createContext(null);

const EMPTY_ITEMS = [];
const listeners = new Set();

// Notifies all subscribers that the underlying storage snapshot has changed.
// This triggers React to re-run getSnapshot() for useSyncExternalStore consumers.
const emitChange = () => {
  for (const listener of listeners) listener();
};

const subscribe = (listener) => {
  listeners.add(listener);
  const onStorage = (event) => {
    if (event?.key === STORAGE_KEY) listener();
  };
  window.addEventListener("storage", onStorage);

  return () => {
    window.removeEventListener("storage", onStorage);
    listeners.delete(listener);
  };
};

const normalizeItems = (parsed) => {
  if (!Array.isArray(parsed)) return [];
  // Backward-compatible: older versions stored plain item objects without quantity.
  return parsed
    .filter((x) => x && typeof x === "object" && x.id)
    .map((x) => ({
      ...x,
      quantity: Number.isFinite(Number(x.quantity)) ? Number(x.quantity) : 1,
    }));
};

let cachedRaw = null;
let cachedItems = EMPTY_ITEMS;

// getSnapshot(): Reads the cart from localStorage.
//
// Important for hydration:
// - During SSR/hydration, React uses getServerSnapshot() (we return EMPTY_ITEMS) so the
//   initial HTML matches the client tree.
// - After hydration, React calls this getSnapshot() and re-renders if the snapshot differs.
//
// Important for performance:
// - useSyncExternalStore expects snapshots to be referentially stable when data didn't change.
//   We cache the raw JSON string and the parsed array so repeated reads don't cause re-renders.
const readItems = () => {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      cachedRaw = null;
      cachedItems = EMPTY_ITEMS;
      return cachedItems;
    }
    if (raw === cachedRaw) return cachedItems;
    cachedRaw = raw;
    cachedItems = normalizeItems(JSON.parse(raw));
    return cachedItems;
  } catch {
    cachedRaw = null;
    cachedItems = EMPTY_ITEMS;
    return cachedItems;
  }
};

// Writes cart data to localStorage and emits a change so all subscribers update.
// This is how addItem/decrementItem/removeItem keep React UI in sync with localStorage
// without a useEffect-based "mirror state".
const writeItems = (nextItems) => {
  try {
    const normalized = normalizeItems(nextItems);
    const raw = JSON.stringify(normalized);
    window.localStorage.setItem(STORAGE_KEY, raw);
    cachedRaw = raw;
    cachedItems = normalized;
  } catch {
    // Ignore write failures (quota, disabled storage).
  }
  emitChange();
};

export const CartProvider = ({ children }) => {
  // useSyncExternalStore makes localStorage act like a reactive store:
  // - subscribe() tells React how to listen for changes (our internal emitter + 'storage' event).
  // - readItems() is the snapshot getter for the client.
  // - getServerSnapshot() returns EMPTY_ITEMS so SSR output is deterministic.
  const items = useSyncExternalStore(subscribe, readItems, () => EMPTY_ITEMS);

  const addItem = (item) => {
    if (!item?.id) return;
    const prev = readItems();
    const next = (() => {
      const idx = prev.findIndex((x) => x.id === item.id);
      if (idx === -1) return [...prev, { ...item, quantity: 1 }];
      return prev.map((x, i) =>
        i === idx ? { ...x, quantity: (Number(x.quantity) || 0) + 1 } : x,
      );
    })();
    writeItems(next);
  };

  const decrementItem = (id) => {
    if (!id) return;
    const prev = readItems();
    const next = prev
      .map((x) =>
        x.id === id ? { ...x, quantity: Math.max(0, (Number(x.quantity) || 0) - 1) } : x,
      )
      .filter((x) => (Number(x.quantity) || 0) > 0);
    writeItems(next);
  };

  const removeItem = (id) => {
    const prev = readItems();
    writeItems(prev.filter((x) => x.id !== id));
  };

  const clear = () => writeItems([]);

  const getQuantity = (id) => {
    const found = items.find((x) => x.id === id);
    return found ? Number(found.quantity) || 0 : 0;
  };

  const isInCart = (id) => getQuantity(id) > 0;

  const totalCount = items.reduce((sum, x) => sum + (Number(x.quantity) || 0), 0);
  const totalPrice = items.reduce(
    (sum, x) => sum + (Number(x.price) || 0) * (Number(x.quantity) || 0),
    0,
  );
  const value = {
    items,
    addItem,
    decrementItem,
    removeItem,
    clear,
    getQuantity,
    isInCart,
    totalCount,
    totalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
