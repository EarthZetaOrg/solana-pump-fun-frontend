import { recordInfo } from "@/utils/types";
import Link from "next/link";
import React from "react";
interface TradePropsInfo {
  trade: recordInfo;
}

export const Trade: React.FC<TradePropsInfo> = ({ trade }) => {
 
  return (
    <div className="my-2 bg-slate-500 grid grid-cols-5 leading-10 justify-between items-center rounded-md p-2">
      <div className="flex items-center">
        <img
          src={trade.holder.avatar}
          alt="Token IMG"
          className="rounded m-3"
          width={40}
          height={40}
        />
        <div className="px-3 rounded-xl text-xl leading-10 bg-gray-600">
          {trade.holder.name}
        </div>
      </div>
      <p className="text-xl leading-10">{trade.holdingStatus ==2 ? "BUY":"SELL"}</p>
      <p className="text-xl leading-10">{trade.amount}</p>
      <p className="text-xl leading-10">{trade.time.toString()}</p>
      <Link href={`https://solscan.io/tx/${trade.tx}`}>
      <p className="text-xl leading-10 hover:cursor-pointer hover:text-white">{trade.tx.slice(0,6)}</p>
      </Link>
    </div>
  );
};
