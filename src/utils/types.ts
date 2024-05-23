import { PublicKey } from "@solana/web3.js"

export interface userInfo {
    id?: string,
    name: string,
    wallet: string,
    isLedger?: Boolean,
    signature?: string,
}

export interface coinInfo {
    name: string,
    creator: string,
    marketcap: number,
    replies: number,
    ticker: string,
    description?: string
  }


  