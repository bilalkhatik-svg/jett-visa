"use client";

import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@/store/store";
import { initializeAuthFromEnv } from "@/utility/initializeAuth";

export default function StoreProvider({ children }: { children: React.ReactNode }) {
  // Initialize OAuth credentials immediately (synchronously) before rendering
  // This ensures credentials are available for API calls that happen on mount
  if (typeof window !== 'undefined') {
    try {
      initializeAuthFromEnv();
    } catch (error) {
      console.error('[StoreProvider] Error initializing auth:', error);
    }
  }

  useEffect(() => {
    // Also initialize in useEffect as a backup
    initializeAuthFromEnv();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}

