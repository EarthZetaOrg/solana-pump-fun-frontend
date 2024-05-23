"use client";
import React, { ReactNode, useState } from "react";
import { PageProvider } from "@/contexts/PageContext";
import { SolanaWalletProvider } from "@/contexts/SolanaWalletProvider";
import { QueryClientProvider, QueryClient } from "react-query";
import { ToastContainer } from "react-toastify";
import { ModalProvider } from "@/contexts/ModalProvider";
import walletContext from "@/context/UserContext";
import { userInfo } from "@/utils/types";
import 'dotenv/config.js'
import LoginContext from "@/context/CoinContex";
import { useWallet } from "@solana/wallet-adapter-react";

const queryClient = new QueryClient();

export default function Providers({ children }: { children: ReactNode }) {
  const wallet = useWallet();
  const [user, setUser] = useState<userInfo>({} as userInfo);
  const [login, setLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  return (
    <SolanaWalletProvider>
      <QueryClientProvider client={queryClient}>
        <ModalProvider>
          <PageProvider>
            <walletContext.Provider value={{user, setUser, login, setLogin, isLoading, setIsLoading}}>
            {children}
            <ToastContainer pauseOnFocusLoss={false} theme="colored" />
            </walletContext.Provider>
          </PageProvider>
        </ModalProvider>
      </QueryClientProvider>
    </SolanaWalletProvider>
  );
}
