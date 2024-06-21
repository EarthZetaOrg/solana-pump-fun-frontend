"use client"
import Head from "next/head";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import Script from "next/script";

import {
    ChartingLibraryWidgetOptions,
    ResolutionString,
} from "@/libraries/charting_library/charting_library";
import { coinInfo } from "@/utils/types";
// import { TVChartContainer } from "@/components/TVChartContainer";


interface TradingChartProps {
    param: coinInfo
}

const TVChartContainer = dynamic(
    () =>
        import("@/components/TVChart/TVChartContainer").then((mod) => mod.TVChartContainer),
    { ssr: false }
);

export const TradingChart: React.FC<TradingChartProps> = ({ param }) => {

    const [isScriptReady, setIsScriptReady] = useState(false);
    
    console.log("tradingview chart", param)

    return (
        <>
            <Head>
                <title>Sample Demo TradingView with NextJS</title>
            </Head>
            {/* <Script
        src="/libraries/charting_library/charting_library.standalone.js"
        strategy="lazyOnload"
      /> */}
            <Script
                src="/libraries/datafeeds/udf/dist/bundle.js"
                strategy="lazyOnload"
                onReady={() => {
                    setIsScriptReady(true);
                }}
            />
            {isScriptReady && param && <TVChartContainer
                name={param.name}
                pairIndex={10}
                token = {param.token}
            />}
        </>
    );
}