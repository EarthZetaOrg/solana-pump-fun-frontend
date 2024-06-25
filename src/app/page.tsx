"use client";

import Header from "@/components/Header";
import { CoinBlog } from "@/components/CoinBlog";
import { getCoinsInfo, test } from "@/utils/util";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import UserContext from "@/context/UserContext";
import { coinInfo } from "@/utils/types";

export default function Home() {
  const [totalStaked, setTotalStaked] = useState(0);
  const [token, setToken] = useState("");
  const [data, setData] = useState<coinInfo[]>([]);
  const { isCreated } = useContext(UserContext);
  const { isLoading, setIsLoading } = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      const coins = await getCoinsInfo();
      if (coins !== null) {
        console.log("dashboard", coins);
        setData(coins);
        setIsLoading(true);
      }
    };

    fetchData();
    data.sort((a, b) => b.reserveOne - a.reserveOne);
  }, [isCreated]);
  const searchToken = () => {};
  return (
    <main className="min-h-screen flex-col  justify-between p-24 pt-2 ">
      <div className="text-center w-[240px]  m-auto">
        <Link rel="stylesheet" href="/create-coin">
          <h2 className="text-cener text-2xl font-medium hover:font-bold cursor-pointer">
            Start a New Coin
          </h2>
        </Link>
      </div>
      <div className="flex-col content-between">
        <h1 className="text-xl font-bold py-4 text-center">King of the hill</h1>
        <div className="flex justify-center">
          {data[0] && (
            <Link href={`/trading/${data[0]?._id}`}>
              <CoinBlog coin={data[0]} componentKey="king" />
            </Link>
          )}
        </div>
      </div>
      <div className="flex mt-10 justify-center pb-4">
        <input
          type="text"
          value={token}
          placeholder=" Search for Token"
          onChange={(e) => setToken(e.target.value)}
          className=" bg-grey-400 h-[40px] w-[400px]"
        />
        <button
          className="w-[70px] h-[40px] mx-5 bg-slate-800 active:bg-opacity-70 "
          onClick={searchToken}
        >
          Search
        </button>
      </div>
      {data && (
        <div className="flex-wrap flex justify-center ">
          {data.map((temp, index) => (
            <Link href={`/trading/${temp._id}`} key={index}>
              <CoinBlog coin={temp} componentKey="coin"></CoinBlog>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
