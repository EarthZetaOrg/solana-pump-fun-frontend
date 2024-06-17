import UserContext from "@/context/UserContext";
import { swapTx } from "@/program/web3";
import { coinInfo } from "@/utils/types";
import { useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { useContext, useState } from "react";
interface TradingFormProps {
  coin: coinInfo
}

export const TradeForm: React.FC<TradingFormProps> = ({ coin }) => {
  const [sol, setSol] = useState< string>('');
  const [isBuy, setIsBuy] = useState<number>(2)
  const { user } = useContext(UserContext);
  const wallet = useWallet();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!isNaN(parseFloat(value))) {
      setSol(value);
    } else if (value === '') {
      setSol(''); // Allow empty string to clear the input
    }
  };

  const handlTrade = async () => {
    const mint = new PublicKey(coin.token)
    const userWallet = new PublicKey(user.wallet)
    console.log("trade wallet token", mint, userWallet)
    const res = await swapTx(mint, wallet, sol, isBuy)
    console.log("trade tx", res)
  }
  return (
    <div className="py-3 mx-2 rounded-lg h-[300px] bg-gray-700">
      <div className="flex justify-around pt-5 pb-3 px-3">
        <button className={`rounded h-[60px] w-[200px] ${isBuy === 2 ? 'bg-green-500' : 'bg-slate-800'}`} onClick={() => setIsBuy(2)}>Buy</button>
        <button className={`rounded h-[60px] w-[200px] ${isBuy === 1 ? 'bg-green-500' : 'bg-slate-800'}`} onClick={() => setIsBuy(1)}>
          Sell
        </button>
      </div>
      <div className="px-4 relative">
        <label
          htmlFor="name py-[20px]"
          className="rounded bg-slate-800 w-[150px] p-2 block mb-2 text-ml font-medium text-white dark:text-white"
        >
          Set max slippage
        </label>
        <input
          type="text"
          id="setTrade"
          value={sol}
          onChange={handleInputChange}
          pattern="\d*"
          className="p-2.5  w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="0.0"
          required
        />
        <div className=" absolute right-12 top-14 flex">
          SOL
        </div>
        <div className="flex ">
          <div className="rounded m-2 p-1 bg-slate-800" onClick={() => setSol('')}>reset</div>
          <div className="rounded m-2 p-1 bg-slate-800" onClick={() => setSol("1")}>1 SOL</div>
          <div className="rounded m-2 p-1 bg-slate-800" onClick={() => setSol('5')}>5 SOL</div>
          <div className="rounded m-2 p-1 bg-slate-800" onClick={() => setSol('10')}>10 SOL</div>
        </div>
        <div className="bg-green-500 cursor-pointer hover:bg-green-400 w-full text-center rounded-lg h-[40px] leading-10" onClick={handlTrade}>
          Place Trade
        </div>
      </div>
    </div>
  );
};
