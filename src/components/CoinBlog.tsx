import { coinInfo, userInfo } from "@/utils/types";
import { getUserInfo } from "@/utils/util";
import Link from "next/link";
import { FC, useEffect } from "react";

interface CoinBlogProps {
  coin: coinInfo;
  componentKey: string;
}

export const CoinBlog: React.FC<CoinBlogProps> = ({ coin, componentKey }) => {
  return (
    <div className="flex w-[380px] items-center justify-center hover:border-collapse pt-2 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 ">
      <img src={coin?.url} alt="image" className="w-[110px]  px-3" />
      {/* <img src="/bonkz10157.png" alt="" className="w-[110px]  px-3" /> */}
      <div>
        <div className="flex">
          <div>Created by 🐸</div>
          <Link href={`/profile/${(coin?.creator as userInfo)?._id}`} >
            <div className="hover:border-slate-300 border-slate-600 border-b-2">
              {(coin?.creator as userInfo)?.name}
            </div>
          </Link>
        </div>
        <div>market cap: 32.25k{coin?.marketcap} [badge:👑]</div>
        <div>replies: {coin?.replies}</div>
        <div>
          {coin?.name} [ticker: {coin?.ticker}]
        </div>

        {componentKey === "coin" ? (
          coin?.description && <div>{coin?.description}</div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
