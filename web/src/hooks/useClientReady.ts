"use client";

// ===== Static server markup, enhanced controls after hydration =====
import { useSyncExternalStore } from "react";
const subscribe = () => () => {};
export function useClientReady() {
  return useSyncExternalStore(subscribe, () => true, () => false);
}
