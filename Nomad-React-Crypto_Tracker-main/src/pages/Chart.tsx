import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChartLine from "react-apexcharts";
import ApexChartStick from "react-apexcharts";
import { useLocation } from "react-router";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "./../atom";

// router v5 props
interface ChartProps {
  coinId: string;
}

interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

const Chart = (/* {coinId}: ChartProps */) => {
  const { coinId } = useParams();
  const isDark = useRecoilValue(isDarkAtom);

  const { isLoading, data } = useQuery<IHistorical[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId),
    {
      refetchInterval: 10000,
    }
  );

  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <>
          <ApexChartLine
            type="line"
            series={[
              {
                name: "Prices",
                data: data?.map((price) => {
                  return price.close;
                }) as any, // as any 를 추가해야 에러가 안남 왜?? ts 때문?
              },
            ]}
            options={{
              title: {
                text: "Line Chart",
                align: "left",
              },
              theme: {
                mode: isDark ? "dark" : "light",
              },
              chart: {
                height: 300,
                width: 500,
                toolbar: {
                  show: false,
                },
                background: "transparent",
              },
              grid: { show: false },
              stroke: {
                curve: "smooth",
                width: 4,
              },

              yaxis: {
                show: false,
              },
              xaxis: {
                // axisBorder: { show: false },
                axisTicks: { show: false },
                labels: { show: false },
                type: "datetime",
                categories: data?.map((price) => price.time_close),
              },
              fill: {
                type: "gradient",
                gradient: { gradientToColors: ["#00cec9"], stops: [0, 100] },
              },
              colors: ["#6c5ce7"],
              tooltip: {
                y: {
                  formatter: (value) => `$${value.toFixed(2)}`,
                },
              },
            }}
          />
          <ApexChartStick
            type="candlestick"
            series={[
              {
                name: "Prices",
                data: data?.map((price) => {
                  return {
                    x: new Date(price.time_close),
                    y: [price.open, price.high, price.low, price.close].map(
                      Number
                    ),
                  };
                }) as any, // as any 를 추가해야 에러가 안남 왜?? ts 때문?
              },
            ]}
            options={{
              title: {
                text: "CandleStick Chart",
                align: "left",
              },
              theme: {
                mode: isDark ? "dark" : "light",
              },
              chart: {
                type: "candlestick",
                toolbar: {
                  show: false,
                },
                background: "transparent",
              },
              grid: { show: false },
              plotOptions: {
                candlestick: {
                  colors: {
                    upward: "#00cec9",
                    downward: "#6c5ce7",
                  },
                },
              },
              tooltip: {
                y: {
                  formatter: (value) => `$${value.toFixed(2)}`,
                },
              },
              xaxis: {
                type: "datetime",
                axisTicks: { show: false },
                labels: { show: false },
              },
              yaxis: {
                show: false,
              },
            }}
          />
        </>
      )}
    </div>
  );
};

export default Chart;
