"use client"

import Header from "@/components/Header";
import { CoinBlog } from "@/components/CoinBlog";
import { test } from "@/utils/util";
import Image from "next/image";
import { useContext, useState } from "react";
import Link from "next/link";
import UserContext from "@/context/UserContext";


export default function Home() {
  const [totalStaked, setTotalStaked] = useState(0);
  const [token, setToken] = useState("");
  const coin = {
    name: "bonkz",
    creator: "kevin",
    marketcap: 15515,
    replies: 45,
    ticker: "fox"
  }
  const {isLoading} = useContext(UserContext);
  const handleclick = (e: React.MouseEvent) => {

  }
  const searchToken = () => {

  }
  return (
    <main className="min-h-screen flex-col  justify-between p-24 pt-2 pr-4 ">
      <Header ></Header>
      <Link rel="stylesheet" href="/createCoin" >
        <h2 className="text-center text-xl font-medium hover:font-bold cursor-pointer" >Start a New Coin</h2>
      </Link>
      <div className="flex-col content-between">
        <h1 className="text-xl font-bold py-4" >King of the hill</h1>
        <CoinBlog coin={coin}></CoinBlog>
      </div>
      <div className="flex mt-10 ">
        <input type="text" value={token} placeholder=" Search for Token" onChange={(e) => setToken(e.target.value)} className=" bg-red-400 h-[40px] w-[400px] hover:bg-slate-400" />
        <button className="w-[70px] h-[40px] mx-5 bg-slate-800 active:bg-opacity-70 " onClick={searchToken}>Search</button>
      </div>

    </main>
  );
}
