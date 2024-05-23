"use client"

import { FC, useContext, useEffect, useMemo, useState } from "react";
import { useWallet, useConnection } from "@solana/wallet-adapter-react"
import { useWalletModal } from "@solana/wallet-adapter-react-ui";

import { successAlert, errorAlert, infoAlert } from "@/components/ToastGroup";
import base58 from "bs58";
import UserContext from "@/context/UserContext";
import { confirmWallet, test, walletConnect } from "@/utils/util";
import { userInfo } from "@/utils/types";

export const ConnectButton: FC = () => {

  const { user, setUser, login, setLogin, isLoading, setIsLoading } = useContext(UserContext);

  const { visible, setVisible } = useWalletModal();
  const { publicKey, disconnect,connect, signMessage } = useWallet();

  const tempUser = useMemo(() => user, [user]);

  useEffect(() => {
    console.log("ok")
    if ( publicKey) {
      console.log(publicKey.toBase58())
      const updatedUser: userInfo = {
        name: publicKey.toBase58().slice(0, 6),
        wallet: publicKey.toBase58(),
        isLedger: false
      }
      setUser(updatedUser);
      sign(updatedUser);
    }
    console.log("user:",user)
  }, [publicKey, connect])

  const sign = async (updatedUser: userInfo) => {
    const connection = await walletConnect({ data: updatedUser });
    console.log("connection:", connection)
    const newUser = {
      name : connection.name,
      wallet: connection.wallet,
      id: connection._id
    }
    console.log(newUser)
    if (connection) {
      setLogin(true);
      setUser(newUser as userInfo);
      console.log(user);
      return;
    }
    console.log("conncetin:", connection)
    const msg = new TextEncoder().encode(`Nonce to confirm: ${connection.nonce}`);
    console.log(msg)
    const sig = await signMessage?.(msg);
    console.log(sig)
    const res = base58.encode(sig as Uint8Array);
    const signedWallet = { ...connection, signature: res }
    console.log("signedWallet:", signedWallet);
    const confirm = await confirmWallet({ data: signedWallet })
    if (confirm) {
      setUser(confirm);
      setLogin(true);
      setIsLoading(false);
    }
    successAlert("Message signed.");
    // setLogin(true);
  }

  const logOut = async () => {
    console.log(disconnect)
    await disconnect;
    setUser({} as userInfo);
    setLogin(false)
  }
  return (
    <button className="rounded-lg border-[0.75px] border-[#371111] bg-[#5b1717] shadow-btn-inner text-[#ffffff] tracking-[0.32px] py-2 px-2 w-[160px] lg:w-[180px] group relative h-11">
      {(login && publicKey) ? (
        <>
          <div className="flex items-center justify-center text-[16px] lg:text-md">
            {publicKey.toBase58().slice(0, 4)}....
            {publicKey.toBase58().slice(-4)}
            <div className="rotate-90 w-3 h-3">
              {/* <ArrowLine /> */}
            </div>
          </div>
          <div className="w-[200px] absolute right-0 top-10 hidden group-hover:block">
            <ul className="border-[0.75px] border-[#371111] rounded-lg bg-[#371111] p-2 mt-2">
              <li>
                <div
                  className="flex gap-2 items-center mb-1 text-primary-100 text-md tracking-[-0.32px]"
                  onClick={() => setVisible(true)}
                >
                  {/* <WalletIcon />  */}
                  Change Wallet
                </div>
              </li>
              <li>
                {user.name}
              </li>
              <li>
                <div
                  className="flex gap-2 items-center text-primary-100 text-md tracking-[-0.32px]"
                  onClick={()=>logOut()}
                >
                  {/* <ExitIcon /> */}
                  Disconnect
                </div>
              </li>
            </ul>
          </div>
        </>
      ) : (
        <div
          className="flex items-center justify-center gap-1 text-md"
          onClick={() => setVisible(true)}
        >
          Connect wallet
          {/* <ArrowLine /> */}
        </div>
      )}
    </button>
  )
}