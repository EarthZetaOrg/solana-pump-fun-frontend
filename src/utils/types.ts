import { PublicKey } from "@solana/web3.js"

export interface userInfo {
    _id?: string,
    name: string,
    wallet: string,
    avatar?: string,
    isLedger?: Boolean,
    signature?: string,
}

export interface coinInfo {
    _id?:string,
    name: string,
    creator: string | userInfo,
    ticker: string,
    url: string,
    reserveOne: number,
    reserveTwo: number,
    token: string,
    marketcap?: number,
    replies?: number,
    description?: string,
    twitter?:string,
    date?:Date,
}
export interface msgInfo {
    name: string,
    avatar: string,
    date: Date,
    img?: string,
    ticker?: string,
    msg: string,
}

export interface tradeInfo {
    creator: string | coinInfo,
    record : recordInfo[],
    
}

export interface recordInfo {
    holder: userInfo,
    holdingStatus: number,
    time: Date,
    amount: number,
    tx:string,
}