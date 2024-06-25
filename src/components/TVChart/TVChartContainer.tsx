"use client"
import { useContext, useEffect, useRef, useState } from "react";
import { ChartingLibraryWidgetOptions, HistoryCallback, IChartingLibraryWidget, IDatafeedChartApi, LanguageCode, ResolutionString, SearchSymbolResultItem, widget } from "@/libraries/charting_library";
import { usePathname } from "next/navigation";
import { Bar, recordInfo } from "@/utils/types";
import { getCoinTrade } from "@/utils/util";
import { chartOverrides, disabledFeatures, enabledFeatures } from "@/utils/constants";
import { getDataFeed } from "./datafeed";
import ReactLoading from "react-loading";
import { twMerge } from "tailwind-merge";
import { flare } from "viem/chains";
import UserContext from "@/context/UserContext";


export type TVChartContainerProps = {
    name: string;
    pairIndex: number;
    token: string;
    classNames?: {
        container: string;
    };
};

export const TVChartContainer = ({
    name,
    pairIndex,
    token
}: TVChartContainerProps) => {
    const chartContainerRef =
        useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
    const tvWidgetRef = useRef<IChartingLibraryWidget | null>(null);
    const {isLoading, setIsLoading} = useContext(UserContext);

    useEffect(() => {
        if (!chartContainerRef.current) {
            return () => { };
        }
        if (tvWidgetRef.current) {
            tvWidgetRef.current.remove();
        }
        const elem = chartContainerRef.current;
        console.log("localhost host", location.host)
        if(name){
            const widgetOptions: ChartingLibraryWidgetOptions = {
                symbol: name,
                debug: false,
                datafeed: getDataFeed({ pairIndex, name, token }),
                theme: "dark",
                locale: "en",
                container: elem,
                library_path: `${location.protocol}//${location.host}/libraries/charting_library/`,
                loading_screen: {
                    backgroundColor: "#111114",
                    foregroundColor: "#111114",
                },
                enabled_features: enabledFeatures,
                disabled_features: disabledFeatures,
                client_id: "tradingview.com",
                user_id: "public_user_id",
                fullscreen: false,
                autosize: true,
                custom_css_url: "/tradingview-chart.css",
                overrides: chartOverrides,
                interval: "1D" as ResolutionString,
    
            };
    
            tvWidgetRef.current = new widget(widgetOptions);
            tvWidgetRef.current.onChartReady(function () {
                setIsLoading(false);
                const priceScale = tvWidgetRef.current?.activeChart().getPanes()[0].getMainSourcePriceScale();
                priceScale?.setAutoScale(true)
            });
            
            return () => {
                if (tvWidgetRef.current) {
                    tvWidgetRef.current.remove();
                }
            };

        }
    }, [name, pairIndex]);

    return (
        <div className="relative mb-[1px] h-[500px] w-full ">
            { isLoading ? (
                <div className="z-9999 absolute left-0 top-0 flex h-full w-full items-center justify-center bg-tizz-background">
                    <ReactLoading
                        height={20}
                        width={50}
                        type={"bars"}
                        color={"#36d7b7"}
                    />
                </div>
            ) : null}
            <div
                ref={chartContainerRef}
                className={twMerge("h-full w-full")}
            />
        </div>
    );
};

