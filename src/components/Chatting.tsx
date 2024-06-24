import { coinInfo, msgInfo, tradeInfo, userInfo } from "@/utils/types";
import { MessageForm } from "./MessageForm";
import { useContext, useEffect, useState } from "react";
import { Trade } from "./Trade";
import { getCoinTrade, getMessageByCoin } from "@/utils/util";
import UserContext from "@/context/UserContext";

interface ChattingProps {
  param: string | null;
  coin: coinInfo
}

export const Chatting: React.FC<ChattingProps> = ({ param, coin }) => {
  const [messages, setMessages] = useState<msgInfo[]>([]);
  const [trades, setTrades] = useState<tradeInfo>({} as tradeInfo);
  const [isTrades, setIsTrades] = useState<Boolean>(true);
  const { user } = useContext(UserContext);
  const ownerMsg: msgInfo = {
    name: (coin?.creator as userInfo)?.name,
    avatar: (coin?.creator as userInfo)?.avatar!,
    date: coin.date!,
    img: coin.url,
    ticker: coin.ticker,
    msg: ""
  };
  useEffect(() => {

    const fetchData = async () => {
      if (param) {
        console.log("trade fectchdata", isTrades)
        if (isTrades) {
          const data = await getMessageByCoin(param);
          console.log("trade: chatting====", data)
          setMessages(data);
        } else {
          const data = await getCoinTrade(param);
          console.log("trade: trade status", data);
          setTrades(data)
        }
      }
    }
    fetchData();
  }, [isTrades, param])
  return (
    <div className="pt-8">
      <div className="flex">
        <button
          className={
            isTrades
              ? "bg-green-500 rounded-lg p-3 mx-4"
              : "rounded-lg p-3 mx-4"
          }
          onClick={() => setIsTrades(true)}
        >
          Thread
        </button>
        <button
          className={
            isTrades
              ? "rounded-lg p-3 mx-4"
              : "bg-green-500 rounded-lg p-3 mx-4"
          }
          onClick={() => setIsTrades(false)}
        >
          Trades
        </button>
      </div>
      <div>
        {isTrades ? (coin &&
          <div>
            <MessageForm msg={ownerMsg}></MessageForm>
            {messages && messages.map((message, index) => (
              <MessageForm key={index} msg={message}></MessageForm>
            ))}
          </div>
        ) : (
          <div>
            <div className="my-2 bg-slate-500 grid grid-cols-5 leading-10 justify-between items-center rounded-md p-2">
              <p className="text-xl leading-10">Account</p>
              <p className="text-xl leading-10">Type</p>
              <p className="text-xl leading-10">SOL</p>
              <p className="text-xl leading-10">Date</p>
              <p className="text-xl leading-10  ">Transaction</p>
            </div>
            {trades.record && trades.record.map((trade, index) => (
              <Trade key={index} trade={trade}></Trade>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
