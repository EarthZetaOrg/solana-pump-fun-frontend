"use client";

import { FC, useContext, useEffect, useMemo, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";

import { successAlert, errorAlert, infoAlert } from "@/components/ToastGroup";
import base58 from "bs58";
import UserContext from "@/context/UserContext";
import { confirmWallet, walletConnect } from "@/utils/util";
import { userInfo } from "@/utils/types";
import Link from "next/link";

export const ConnectButton: FC = () => {
  const { user, setUser, login, setLogin, isLoading, setIsLoading } =
    useContext(UserContext);
  const { publicKey, disconnect, connect, signMessage } = useWallet();
  const { visible, setVisible } = useWalletModal();

  const tempUser = useMemo(() => user, [user]);
  useEffect(() => {
    const handleClick = async () => {
      if (publicKey && !login) {
        console.log("UseEffect");
        console.log(publicKey.toBase58());
        const updatedUser: userInfo = {
          name: publicKey.toBase58().slice(0, 6),
          wallet: publicKey.toBase58(),
          isLedger: false,
        };
        await sign(updatedUser);
      }
    };
    handleClick();
  }, [publicKey, login]); // Removed `connect`, `wallet`, and `disconnect` to prevent unnecessary calls
  const sign = async (updatedUser: userInfo) => {
    try {
      const connection = await walletConnect({ data: updatedUser });
      console.log(connection)
      if(!connection) return;
      if (connection.nonce===undefined) {
        const newUser = {
          name: connection.name,
          wallet: connection.wallet,
          _id: connection._id,
          avatar: connection.avatar,
        };
        console.log(connection, newUser)
        setUser(newUser as userInfo);
        setLogin(true);
        return;
      }

      const msg = new TextEncoder().encode(
        `Nonce to confirm: ${connection.nonce}`
      );
      
      const sig = await signMessage?.(msg);
      const res = base58.encode(sig as Uint8Array);
      const signedWallet = { ...connection, signature: res };
      const confirm = await confirmWallet({ data: signedWallet });

      if (confirm) {
        setUser(confirm);
        setLogin(true);
        setIsLoading(false);
      }
      successAlert("Message signed.");
    } catch (error) {
      errorAlert("Sign-in failed.");
    }
  };

  const logOut = async () => {
    if (typeof disconnect === "function") {
      await disconnect();
    }
    // Initialize `user` state to default value
    setUser({} as userInfo);
    setLogin(false);
    localStorage.clear();
  };
  return (
    <div>
      <button className=" rounded-lg border-[0.75px] border-[#371111] bg-[#5b1717] shadow-btn-inner text-[#ffffff] tracking-[0.32px] h-[40px] pt-1 px-2 group relative ">
        {login  && publicKey ? (
          <>
            <div className="flex mr-3 items-center justify-center text-[16px] lg:text-md">
             {(user.avatar !==undefined) && <img
                src={user.avatar}
                alt="Token IMG"
                className="rounded p"
                width={40}
                height={40}
              />}
              <div className="ml-3">
                {publicKey.toBase58().slice(0, 4)}....
                {publicKey.toBase58().slice(-4)}
              </div>
            </div>
            <div className="w-[200px] absolute right-0 top-10 hidden group-hover:block">
              <ul className="border-[0.75px] border-[#371111] rounded-lg bg-[#371111] p-2 ">
                <li>
                  <div
                    className="flex gap-2 items-center mb-1 text-primary-100 text-md tracking-[-0.32px]"
                    onClick={() => setVisible(true)}
                  >
                    Change Wallet
                  </div>
                </li>
                <li>
                  <div
                    className="flex gap-2 items-center text-primary-100 text-md tracking-[-0.32px]"
                    onClick={logOut}
                  >
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
          </div>
        )}
      </button>
      <div>
        {login && tempUser.wallet && (
          <Link rel="stylesheet" href={`/profile/${tempUser._id}`}>
            <div className="text-center py-1 text-md text-white cursor-pointer hover:bg-slate-800 hover:rounded-md active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300">
              [View Profile]
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};
