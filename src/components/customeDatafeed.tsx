import { ChartingLibraryWidgetOptions } from "@/libraries/charting_library/charting_library";

interface Configuration {
    supports_search: boolean;
    supports_group_request: boolean;
    supported_resolutions: string[];
    supports_marks: boolean;
    supports_timescale_marks: boolean;
    supports_time: boolean;
  }
  
  interface LibrarySymbolInfo {
    name: string;
    ticker: string;
    type: string;
    session: string;
    timezone: string;
    minmov: number;
    pricescale: number;
    has_intraday: boolean;
    intraday_multipliers: string[];
    supported_resolutions: string[];
    volume_precision: number;
  }
  
  interface Bar {
    time: number;
    low: number;
    high: number;
    open: number;
    close: number;
    volume: number;
  }
  
  interface HistoryResponse {
    s: string;
    t: number[];
    l: number[];
    h: number[];
    o: number[];
    c: number[];
    v: number[];
  }
  
  class CustomDatafeed {
    datafeedURL: string;
    updateFrequency: number;
  
    constructor(datafeedURL: string, updateFrequency: number) {
      this.datafeedURL = datafeedURL;
      this.updateFrequency = updateFrequency;
    }
  
    onReady(callback: (config: Configuration) => void): void {
      const configuration: Configuration = {
        supports_search: true,
        supports_group_request: false,
        supported_resolutions: ["1D", "1W", "1M"],
        supports_marks: false,
        supports_timescale_marks: false,
        supports_time: true,
      };
      setTimeout(() => callback(configuration), 0);
    }
  
    resolveSymbol(symbolName: string, onSymbolResolvedCallback: (symbolInfo: LibrarySymbolInfo) => void, onResolveErrorCallback: (error: string) => void): void {
      const symbolInfo: LibrarySymbolInfo = {
        name: symbolName,
        ticker: symbolName,
        type: "stock",
        session: "24x7",
        timezone: "Etc/UTC",
        minmov: 1,
        pricescale: 100,
        has_intraday: true,
        intraday_multipliers: ["1", "5", "15", "60", "D"],
        supported_resolutions: ["1", "5", "15", "60", "D"],
        volume_precision: 2,
      };
      setTimeout(() => onSymbolResolvedCallback(symbolInfo), 0);
    }
  
    getBars(symbolInfo: LibrarySymbolInfo, resolution: string, from: number, to: number, onHistoryCallback: (bars: Bar[], meta: { noData: boolean }) => void, onErrorCallback: (error: string) => void): void {
      const url = `${this.datafeedURL}/history?symbol=${symbolInfo.name}&resolution=${resolution}&from=${from}&to=${to}`;
      fetch(url)
        .then(response => response.json())
        .then((data: HistoryResponse) => {
          if (data.s === "ok") {
            const bars: Bar[] = data.t.map((time, index) => ({
              time: time * 1000, // TradingView expects JavaScript timestamp in milliseconds
              low: data.l[index],
              high: data.h[index],
              open: data.o[index],
              close: data.c[index],
              volume: data.v[index],
            }));
            onHistoryCallback(bars, { noData: bars.length === 0 });
          } else {
            onHistoryCallback([], { noData: true });
          }
        })
        .catch(err => {
          console.error("Error fetching historical data:", err);
          onErrorCallback(err);
        });
    }
  
    subscribeBars(symbolInfo: LibrarySymbolInfo, resolution: string, onRealtimeCallback: (bar: Bar) => void, subscriberUID: string, onResetCacheNeededCallback: () => void): void {
      // Handle real-time updates here, if needed
    }
  
    unsubscribeBars(subscriberUID: string): void {
      // Remove real-time updates here, if needed
    }
  }
  
  // Usage example
  const datafeed = new CustomDatafeed("https://your-datafeed-url.com", 10 * 1000); // 10 seconds update interval
  

    
  