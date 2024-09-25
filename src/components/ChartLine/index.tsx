import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import CountUp from "react-countup";



export default function ChartLine(data: any) {
  const data2 = data.data.lineChart;

  const options = {
    chart: {
      id: "basic-line",
    },
    dataLabels: {
      enabled: false, // Habilita os dataLabels
      offsetY: -10,
      formatter: (val: number) => {
        return val.toFixed(0); // Formata o valor como inteiro
      },
      style: {
        fontSize: "12px",
      },
    },

    grid: {
      show: true, // Exibe a grid
      borderColor: "#ededed", // Cor das linhas da grid
      strokeDashArray: 4, // Define o estilo pontilhado
      row: {
        colors: undefined,
        opacity: 0.1,
      },
      column: {
        colors: undefined,
        opacity: 0.1,
      },
      xaxis: {
        lines: {
          show: true, // Mostra linhas da grid no eixo X
        },
      },
      yaxis: {
        lines: {
          show: true, // Mostra linhas da grid no eixo Y
        },
      },
    },
    markers: {
      size: 5, // Tamanho dos pontos no gráfico
    },
    colors: ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0', '#d3d3d3'],
    xaxis: {
      categories: [
        "2010",
        "2011",
        "2012",
        "2013",
        "2014",
        "2015",
        "2016",
        "2017",
        "2018",
        "2019",
        "2020",
        "2021",
        "2022",
      ],
    },
    yaxis: {
      show: true,
      tickAmount: 5,
      labels: {
        style: {},
      },
      title: {
        style: {
          fontWeight: 200,
        },
      },
    },
  } as unknown as ApexOptions;

  const series = data2;

  return (
    <div className=" w-full h-full grid grid-cols-7 pb-3 pt-8 relative">

      <p className="font-bold absolute top-5 left-8">Raca/Cor dos Ingressantes</p>
      <div className="col-span-6">
        <Chart
          options={options}
          series={series}
          type="line"
          height="100%"
          width="100%"
        />
      </div>
      <div className="col-span-1 flex flex-col justify-start items-start gap-2">
        <div className="font-Bold mt-10 flex flex-col items-start justify-start">
          <p className="text-left  font-normal text-xs leading-none">Branca</p>
          <p className="text-left font-bold text-3xl text-[#008FFB]">
            <CountUp start={0} duration={2.75} end={data2[0].total} />
          </p>
        </div>
        <div className="font-Bold flex flex-col items-start justify-start">
          <p className="text-left  font-normal text-xs leading-none">Negra</p>
          <p className="text-left font-bold text-3xl text-[#00E396]">
            <CountUp start={0} duration={2.75} end={data2[1].total} />
          </p>
        </div>
        <div className="font-Bold flex flex-col items-start justify-start">
          <p className="text-left  font-normal text-xs leading-none">Parda</p>
          <p className="text-left font-bold text-3xl text-[#FEB019]">
            <CountUp start={0} duration={2.75} end={data2[2].total} />
          </p>
        </div>
        <div className="font-Bold flex flex-col items-start justify-start">
          <p className="text-left  font-normal text-xs leading-none">Amarela</p>
          <p className="text-left font-bold text-3xl text-[#FF4560]">
            <CountUp start={0} duration={2.75} end={data2[3].total} />
          </p>
        </div>
        <div className="font-Bold flex flex-col items-start justify-start">
          <p className="text-left  font-normal text-xs leading-none">
            Indígena
          </p>
          <p className="text-left font-bold text-3xl text-[#775DD0]">
            <CountUp start={0} duration={2.75} end={data2[4].total} />
          </p>
        </div>
        <div className="font-Bold flex flex-col items-start justify-start">
          <p className="text-left  font-normal text-xs leading-none">
            N/ Declarado
          </p>
          <p className="text-left font-bold text-3xl text-[#d3d3d3]">
            <CountUp start={0} duration={2.75} end={data2[5].total} />
          </p>
        </div>
      </div>
    </div>
  );
}
