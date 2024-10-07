import { ApexOptions } from "apexcharts";
import React from "react";
import Chart from "react-apexcharts";
import ChartLineIngGen from "../ChartLineIngGen";
import CountUp from "react-countup";

import "../../../styles/ChartContainer.css";

export default function ChartPieIng(data: any) {
  
  const data2 = data.data.barVertical;
  const series = [data2[0].qtd, data2[1].qtd];


  // console.log("ChartPieIng: ", data2[0].qtd)

  const options = {
    chart: {
      type: "pie",
    },
    labels: ["Masculino", "Feminino"],
    colors: ["#008FFB", "#FF4560"],
    legend: {
      show: true,
      showForSingleSeries: false,
      showForNullSeries: true,
      showForZeroSeries: true,
      position: "top",
      horizontalAlign: "right",
      floating: true,
      fontSize: "10px",
      fontFamily: "Roboto, Arial",
      fontWeight: 600,
      formatter: undefined,
      inverseOrder: false,
      width: undefined,
      height: undefined,
      tooltipHoverFormatter: undefined,
      customLegendItems: [],
      offsetX: 0,
      offsetY: 0,
      labels: {
        colors: undefined,
        useSeriesColors: false,
      },
      markers: {
        size: 7,
        shape: undefined,
        strokeWidth: 5,
        fillColors: undefined,
        customHTML: undefined,
        onClick: undefined,
        offsetX: 5,
        offsetY: 0,
      },
      itemMargin: {
        horizontal: -4,
        vertical: 0,
      },
      onItemClick: {
        toggleDataSeries: true,
      },
      onItemHover: {
        highlightDataSeries: true,
      },
    },
  } as unknown as ApexOptions;

  return (
    <div className="chart-container relative !h-[310px] border-green-500">
      <p className="font-bold text-sm text-black/80">Quantidade de ingressantes por gênero</p>

      <Chart
        options={options}
        series={series}
        type="pie"
        width="100%"
        height="310"
        className=""
      />

      <div className="font-Bold flex flex-col items-start justify-start absolute left-3 bottom-10">
        <p className="text-left  font-normal text-xs leading-none">Feminino</p>
        <p className="text-left font-bold text-3xl text-[#FF4560]">
          <CountUp start={0} duration={2.75} end={data2[1].qtd} />
        </p>
      </div>
      <div className="font-Bold flex flex-col items-start justify-start absolute right-3 bottom-10">
        <p className="text-left  font-normal text-xs leading-none">Masculino</p>
        <p className="text-left font-bold text-3xl text-[#008FFB]">
          <CountUp start={0} duration={2.75} end={data2[0].qtd} />
        </p>
      </div>
    </div>
  );
};

