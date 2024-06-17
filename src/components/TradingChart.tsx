"use client";

import { useEffect, useRef, useState, memo } from "react";
import ReactLoading from "react-loading";
import { twMerge } from "tailwind-merge";
import { useTranslations } from "next-intl";
import {
  widget,
  IChartingLibraryWidget,
  ChartingLibraryWidgetOptions,
  ResolutionString,
} from "@/libraries/charting_library";
import { useMedia } from "react-use";

import {
  chartOverrides,
  disabledFeatures,
  disabledFeaturesOnMobile,
  enabledFeatures,
} from "./constants";
import { getDataFeed } from "./datafeeds";

export type TVChartContainerProps = {
  name: string;
  pairIndex: number;
  groupIndex: number;
  classNames?: {
    container: string;
  };
};

export default memo(function TradingChart({
  name,
  pairIndex,
  groupIndex,
  classNames,
}: TVChartContainerProps) {
  const isMobile = useMedia("(max-width: 550px)");

  const chartContainerRef = useRef<HTMLDivElement>(null);
  const tvWidgetRef = useRef<IChartingLibraryWidget | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!chartContainerRef.current) {
      return () => {};
    }

    const elem = chartContainerRef.current;

    if (tvWidgetRef.current) {
      tvWidgetRef.current.remove();
    }

    const widgetOptions: ChartingLibraryWidgetOptions = {
      debug: false,
      datafeed: getDataFeed({ pairIndex, name, groupIndex }),
      theme: "dark",
      locale: "en",
      container: elem,
      library_path: `${location.protocol}//${location.host}/libraries/charting_library/`,
      loading_screen: {
        backgroundColor: "#111114",
        foregroundColor: "#111114",
      },
      enabled_features: enabledFeatures,
      disabled_features: isMobile
        ? disabledFeatures.concat(disabledFeaturesOnMobile)
        : disabledFeatures,
      client_id: "tradingview.com",
      user_id: "public_user_id",
      fullscreen: false,
      autosize: true,
      custom_css_url: "/tradingview-chart.css",
      overrides: chartOverrides,
      symbol: name,
      interval: "1" as ResolutionString,
    };

    tvWidgetRef.current = new widget(widgetOptions);
    tvWidgetRef.current.onChartReady(function () {
      setIsLoading(false);
    });

    return () => {
      if (tvWidgetRef.current) {
        tvWidgetRef.current.remove();
      }
    };
  }, [name, pairIndex, groupIndex, isMobile]);

  return (
    <div className="relative mb-[1px] h-full w-full ">
      {isLoading ? (
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
        className={twMerge("h-full w-full", classNames?.container)}
      />
    </div>
  );
});
