import Head from "next/head";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import Script from "next/script";

import {
  ChartingLibraryWidgetOptions,
  ResolutionString,
  widget,
} from "@/libraries/charting_library/charting_library";
import { TVChartContainer } from "./TVChart/TVChartContainer";
import { getCoinTrade } from "@/utils/util";
import { Bar, recordInfo, tradeInfo } from "@/utils/types";
import { UDFCompatibleDatafeed } from "@/libraries/datafeeds/udf/src/udf-compatible-datafeed";



interface TradingChartProps {
  param: string
}

export const TradingChart: React.FC<TradingChartProps> = ({ param }) => {
  const [isScriptReady, setIsScriptReady] = useState(false);

  const widgetOptions: ChartingLibraryWidgetOptions = {
    container: 'chartContainer',
    locale: 'en',
    library_path: '/libraries/charting_library/',
    datafeed: new UDFCompatibleDatafeed("https://demo-feed-data.tradingview.com"),
    symbol: 'AAPL',
    interval: 'D' as ResolutionString,
    fullscreen: true,
    debug: true,
    autosize: true,
    client_id: "tradingview.com",
    user_id: "public_user_id",
    charts_storage_api_version: "1.1",
  }
  const tvWidget = new widget(widgetOptions);
  // tvWidget.onChartReady(() => {
  //   tvWidget.headerReady().then(() => {
  //     const button = tvWidget.createButton();
  //     button.setAttribute("title", "Click to show a notification popup");
  //     button.classList.add("apply-common-tooltip");
  //     button.addEventListener("click", () =>
  //       tvWidget.showNoticeDialog({
  //         title: "Notification",
  //         body: "TradingView Charting Library API works correctly",
  //         callback: () => {
  //           console.log("Noticed!");
  //         },
  //       })
  //     );

  //     button.innerHTML = "Check API";
  //   });
  // });

  // return () => {
  //   tvWidget.remove();
  // };
  return (
    <>
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
      {isScriptReady && <div id="chartContainer"></div>}
    </>
  );
}