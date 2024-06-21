import { useContext, useEffect, useRef, useState } from "react";
import { Bar, ChartingLibraryWidgetOptions, HistoryCallback, LanguageCode, ResolutionString, widget } from "@/libraries/charting_library";
import UserContext from "@/context/UserContext";
import { usePathname } from "next/navigation";
import { recordInfo } from "@/utils/types";
import { getCoinTrade } from "@/utils/util";

export const TVChartContainer = (props: Partial<ChartingLibraryWidgetOptions>) => {
    const chartContainerRef =
        useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
    const pathname = usePathname();
    const [param, setParam] = useState<string>('');
    const [trades, setTrades] = useState<recordInfo[]>([])
    const intervalsMap: { [key: number]: recordInfo[] } = {};
    const [bars, setBars] = useState<Bar[]>([])


    useEffect(() => {
        const fetchData = async () => {
            console.log("tradingview chart ====", pathname)
            // Split the pathname and extract the last segment
            const segments = pathname.split("/");
            const parameter = segments[segments.length - 1];
            setParam(parameter);
            const data = await getCoinTrade(parameter);
            setTrades(data.record);
            console.log("tradingview chart ========trade=====", data.record)
            const tempBars = await aggregateRecordsToBars(data.record, 100);
            setBars(tempBars);
        }
        fetchData()

    }, [pathname]);

    const aggregateRecordsToBars = (
        records: recordInfo[],
        interval: number
    ): Bar[] => {
        const temp: Bar[] = [];
        records.forEach(record => {
            const time = new Date(record.time).getTime();
            const intervalStart = Math.floor(time / interval) * interval;

            if (!intervalsMap[intervalStart]) {
                intervalsMap[intervalStart] = [];
            }
            intervalsMap[intervalStart].push(record);
        });

        for (const [intervalStart, intervalRecords] of Object.entries(intervalsMap)) {
            intervalRecords.sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());

            const bar: Bar = {
                time: Number(intervalStart),
                low: Math.min(...intervalRecords.map(record => record.amount / 10000)),
                high: Math.max(...intervalRecords.map(record => record.amount / 10000)),
                open: intervalRecords[0].amount / 10000,
                close: intervalRecords[intervalRecords.length - 1].amount / 10000,
                volume: intervalRecords.reduce((sum, record) => sum / 10000 + record.amount / 10000, 0),
            };
            temp.push(bar);
        }

        console.log("tradingview=====", temp)
        return temp;
    };
    useEffect(() => {
        console.log(Boolean(chartContainerRef.current), "tradingview==bars=====", bars)
        if (chartContainerRef.current && bars.length > 0) {

            const widgetOptions: ChartingLibraryWidgetOptions = {
                symbol: props.symbol,
                container: chartContainerRef.current,
                interval: props.interval as ResolutionString,
                library_path: props.library_path,
                locale: props.locale as LanguageCode,
                disabled_features: ["use_localstorage_for_settings", 'header_resolutions'],
                enabled_features: [],
                // charts_storage_url: props.charts_storage_url,
                charts_storage_api_version: props.charts_storage_api_version,
                client_id: props.client_id,
                user_id: props.user_id,
                fullscreen: props.fullscreen,
                // height:400,
                autosize: props.autosize,
                theme: 'dark',
                timezone: 'Etc/UTC',
                // debug: true,
                // BEWARE: no trailing slash is expected in feed URL
                datafeed: {
                    onReady: (callback: any) => {
                        console.log("tradingview====datafeed=====",)
                        setTimeout(() => callback({
                            supports_search: false,
                            supports_group_request: false,
                            supports_marks: false,
                            supports_time: true,
                        }), 0);
                    },
                    resolveSymbol: (symbolName: any, onSymbolResolvedCallback: any) => {
                        console.log("tradngview ==========resolveSymbol", symbolName)
                        setTimeout(() => onSymbolResolvedCallback({
                            name: symbolName,
                            ticker: symbolName,
                            description: symbolName,
                            type: "stock",
                            session: "24x7",
                            timezone: "Etc/UTC",
                            exchange: "custom",
                            minmov: 1,
                            pricescale: 100,
                            has_intraday: true,
                            has_no_volume: false,
                            volume_precision: 2,
                            data_status: "streaming",
                            supported_resolutions: ["1", "5", "15", "30", "60", "1D"],
                        }), 0);
                    },
                    getBars: async (symbolInfo: any, resolution: string, { from, to }: any, onResult: HistoryCallback, onErrorCallback: any) => {
                        const testBars = [
                            { time: 1622505600, open: 100, high: 110, low: 95, close: 105, volume: 1000 },
                            { time: 1622592000, open: 105, high: 115, low: 100, close: 110, volume: 1200 },
                            { time: 1622678400, open: 110, high: 120, low: 108, close: 115, volume: 800 },
                            { time: 1622764800, open: 115, high: 125, low: 112, close: 120, volume: 750 },
                            { time: 1622851200, open: 120, high: 130, low: 118, close: 125, volume: 900 }
                        ];
                        try {
                            if (testBars.length && symbolInfo == 'Pump.fun Forking') {
                                console.log("Bars data:", bars);
                                onResult(testBars, { noData: false });
                            } else {
                                onResult([], { noData: true });
                            }
                        } catch (error) {
                            onErrorCallback(error);
                        }
                    },
                    subscribeBars: (symbolInfo: any, resolution: string, onRealtimeCallback: any, subscribeUID: any, onResetCacheNeededCallback: any) => {
                        // Custom implementation for real-time data subscription if needed.
                    },
                    unsubscribeBars: (subscriberUID: string) => {
                        // Custom implementation for unsubscribing from real-time data to avoid memory leaks.
                    },
                },
            };

            const tvWidget = new widget(widgetOptions);
            console.log("tradingview=== tvWidget ==", tvWidget)
            console.log("tradingView====== widgetOptions", widgetOptions)
            tvWidget.onChartReady(() => {
                tvWidget.headerReady().then(() => {
                    ;
                    const button = tvWidget.createButton();
                    button.setAttribute("title", "Click to show a notification popup");
                    button.classList.add("apply-common-tooltip");
                    button.addEventListener("click", () =>
                        tvWidget.showNoticeDialog({
                            title: "Notification",
                            body: "TradingView Charting Library API works correctly",
                            callback: () => {
                                console.log("tradingview::Noticed!");
                            },
                        })
                    );
                    button.innerHTML = "Check API";
                });
            });

            return () => {
                if (tvWidget) {
                    tvWidget.remove();
                }
            };
        }
    }, [props, bars]);

    return (
        <>
            <div ref={chartContainerRef}/>
        </>
    );
};