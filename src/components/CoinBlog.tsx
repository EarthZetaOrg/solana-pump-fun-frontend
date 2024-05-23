import { coinInfo } from "@/utils/types"
import { FC } from "react"


export const CoinBlog = ({ coin }: { coin: coinInfo }) => {
    return (
        <div className="flex items-center hover:border-collapse active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 ">
            {/* <img src="" alt="image" /> */}
            <div>
                <div className="flex">
                    <div>Created by 🐸</div>
                    {coin.creator}
                </div>
                <div>market cap: {coin.marketcap} [badge:👑]</div>
                <div>replies: {coin.replies}</div>
                <div>{coin.name} [ticker: {coin.ticker}]</div>
                {(coin.description) &&
                    <div>
                        {coin.description}
                    </div>}
            </div>
        </div>
    )
}