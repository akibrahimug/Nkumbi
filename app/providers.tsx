"use client";

import { SessionProvider } from "next-auth/react";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "@/store";
import SyncSession from "@/app/components/SyncSession";
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ReduxProvider store={store}>
        {/* This keeps Redux in sync with the NextAuth session */}
        <SyncSession />
        {children}
      </ReduxProvider>
    </SessionProvider>
  );
}
