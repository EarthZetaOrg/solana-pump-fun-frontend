import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

export const SOLANA_RPC = process.env.NEXT_PUBLIC_SOLANA_RPC ?? "";



const endpoints = {
    tradingVariables:"", 
    tradingHistory24:"",
    prices24Ago:"",
    pricingChart: "https://tizz-be-api-production.up.railway.app/charts",
    chartSocket: "http://",
    personalTradingHistoryTable:
      "https://backend-$$network_name$$$$collateral_type$$.gains.trade/personal-trading-history-table",
    userTradingVariables:
      "https://backend-$$network_name$$$$collateral_type$$.gains.trade/user-trading-variables",
    backendSocket: "wss://tizz-be-api-production.up.railway.app",
  };
 