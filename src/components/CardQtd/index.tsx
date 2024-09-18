import Chart from "react-apexcharts";
import PersonIcon from "@mui/icons-material/Person";
import CountUp from "react-countup";
import { ApexOptions } from "apexcharts";

interface YearlyData {
  ano: number;
  quantidade: number;
}

interface CardData {
  title: string;
  qtd: number;
  data: YearlyData[];
}

export type CardsArray = CardData[];

export default function CardQtd({ title, qtd, data }: CardData) {
  const series = [
    {
      name: "Qtd",
      data: data.map((e) => e.quantidade),
    },
  ];

const categories = data.map(e => e.ano)

  const options = {
    chart: {
      type: "area",
      height: 160,
      sparkline: {
        enabled: true,
      },
    },
    tooltip: {
      enabled: true,
      enabledOnSeries: undefined,
      shared: true,
      followCursor: true,
      intersect: false,
      inverseOrder: false,
      custom: undefined,
      hideEmptySeries: true,
      fillSeriesColor: true,
      theme: false,
      style: {
        fontSize: "15px",
        fontFamily: 'Roboto',
      },
      onDatasetHover: {
        highlightDataSeries: false,
      },
      x: {
        show: true,
        format: "yyyy",
        formatter: undefined,
      },
      y: {
        formatter: undefined,
        // title: {
        //   formatter: (seriesName) => seriesName,
        // },
      },
      z: {
        formatter: undefined,
        title: "Size: ",
      },
      marker: {
        show: true,
      },
      fixed: {
        enabled: true,
        position: "topRight",
        offsetX: -10,
        offsetY: -45,
      },
    },
    stroke: {
      curve: "straight",
    },
    fill: {
      opacity: 1,
    },
    xaxis: {
      categories: categories,
      show: false,
      crosshairs: {
        width: 1,
      },
    },
    yaxis: {
      show: false,
      min: 0,
    },
  } as unknown as ApexOptions;

  return (
    <div className="col-span-2 row-span-2  text-white bg-[#222222] rounded-3xl flex  flex-col gap-1 items-start justify-start leading-none relative drop-shadow-md shadow-black">
      <div className="ml-4 mt-2 flex items-start gap-1">
        <div className="bg-white text-black py-1 px-1 rounded-full">
          <PersonIcon fontSize="medium" />
        </div>
        <div>
          <p className="text-left  font-bold text-xs">{title}</p>
          <p className="text-left font-bold text-3xl">
            <CountUp start={0} duration={2.75} end={qtd} />
          </p>
        </div>
      </div>
      {/* <div /> */}
      <div className="w-full  flex items-center justify-center absolute -bottom-2 ">
        <Chart
          options={options}
          series={series}
          type="line"
          height="80"
          width="100%"
        />
      </div>
    </div>
  );
}
