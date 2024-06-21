import Head from "next/head";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import Script from "next/script";

import {
  ChartingLibraryWidgetOptions,
  ResolutionString,
} from "@/libraries/charting_library/charting_library";
import { TVChartContainer } from "./TVChart/TVChartContainer";
import { getCoinTrade } from "@/utils/util";
import { Bar, recordInfo, tradeInfo } from "@/utils/types";


interface TradingChartProps {
  param: string
}
const defaultWidgetProps: Partial<ChartingLibraryWidgetOptions> = {
  symbol: "Pump",
  interval: "1D" as ResolutionString,
  library_path: "/libraries/charting_library/",
  locale: "en",
  // charts_storage_url: "https://saveload.tradingview.com",
  charts_storage_api_version: "1.1",
  client_id: "tradingview.com",
  user_id: "public_user_id",
  fullscreen: true,
  autosize: true,
};
export const TradingChart: React.FC<TradingChartProps> = ({ param }) => {
  const [isScriptReady, setIsScriptReady] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      console.log("tradingview chart")
    }
    fetchData();
  }, [param])
  // Aggregate while respecting time intervals (e.g., 1D, 1H)


  return (
    <>
      <Head>
        <title>Sample Demo TradingView with NextJS</title>
      </Head>
      <Script
        src="/libraries/charting_library/charting_library.standalone.js"
        strategy="lazyOnload"
        
      />
      <Script
        src="/libraries/datafeeds/udf/dist/bundle.js"
        strategy="lazyOnload"
        onReady={() => {
          setIsScriptReady(true);
        }}
      />
      {isScriptReady && <TVChartContainer {...defaultWidgetProps} />}
    </>
  );
}