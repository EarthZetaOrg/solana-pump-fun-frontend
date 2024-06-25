import { coinInfo, recordInfo, tradeInfo, userInfo } from "@/utils/types";
import { getCoinTrade } from "@/utils/util";
import { set } from "@coral-xyz/anchor/dist/cjs/utils/features";
import { useEffect, useState } from "react";

interface HolderInfo {
  param: string | null;
  coin: coinInfo
}
interface holderInfo {
  holder: userInfo;
  totalAmount: number
}
export const Holders: React.FC<HolderInfo> = ({ param, coin }) => {
  const [trades, setTrades] = useState<tradeInfo>({} as tradeInfo);
  const [holders, setHolders] = useState<holderInfo[]>([])
  useEffect(() => {
    const fetchData = async () => {
      if (param) {
        const data: tradeInfo = await getCoinTrade(param);
        setTrades(data)
        const agr=holderCalc(data.record);
        setHolders(agr);
        console.log("trade holder",agr)
      }
    }
    fetchData();
  }, [param])
  
  const holderCalc = (records: recordInfo[]): holderInfo[] => {
    const aggregation = records.reduce((acc, record) => {
      const { holder, amount } = record;

      if (!acc[holder.name]) {
        acc[holder.name] = {
          holder,
          totalAmount: 0,
        };
      }
      acc[holder.name].totalAmount += (-1)**record.holdingStatus*amount;
      return acc;
    }, {} as Record<string, holderInfo>);

    return Object.values(aggregation);
  };

  console.log("trades", trades)
  return (
    <div className="m-4">
      {holders && holders.map((trade, index) => (
        <div key={index} className="flex justify-between text-xl text-white">
          <div>
            {index + 1}. {trade.holder.name}
          </div>
          <div>{Math.floor(trade.totalAmount/10_000_000_000)/1000}</div>
        </div>
      ))}
    </div>
  );
};
