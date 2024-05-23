"use client";
import { createContext, useContext, ReactNode } from "react";

interface PageContextType {
  solPrice: number;
}

export const PageContext = createContext<PageContextType | undefined>(
  undefined
);

export function useData() {
  const context = useContext(PageContext);
  if (!context) {
    throw new Error("useData must be used within a ModalProvider");
  }
  return context;
}

interface PageProviderProps {
  children: ReactNode;
}

export function PageProvider({ children }: PageProviderProps) {
  
  const pageContextValue: PageContextType = {
    solPrice: 101,
  };
  return (
    <PageContext.Provider value={pageContextValue}>
      {children}
    </PageContext.Provider>
  );
}
