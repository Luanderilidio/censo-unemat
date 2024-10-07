import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import CountUp from "react-countup";



export default function ChartLine(data: any) {
  const data2 = data.data.lineChart;

  // console.log("ChartLineByRace", data2)

  const options = {
    chart: {
      id: "basic-line",
      toolbar: {
        show: false,  // Desativa o menu de opções
      },
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
      offsetX: -20,
      offsetY: 10,
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
    // xaxis: {
    //   categories: [
    //     "2010",
    //     "2011",
    //     "2012",
    //     "2013",
    //     "2014",
    //     "2015",
    //     "2016",
    //     "2017",
    //     "2018",
    //     "2019",
    //     "2020",
    //     "2021",
    //     "2022",
    //   ],
    // },
    xaxis: {
      categories: data2[0].data.map(item => item.ano),
      labels: {
        rotate: 0,
        style: {
          fontSize: "10px", // Tamanho da fonte para as labels do eixo X
          fontFamily: "Roboto, sans-serif", // Define a família de fontes (opcional)
          fontWeight: "bold", // Peso da fonte (opcional)
        },
      },

    },
    yaxis: {
      show: false,
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

  const series = [
    { name: "Branca", hidden: false, data: data2[0].data.map(item => item.qtd) },
    { name: "Negra", hidden: false, data: data2[1].data.map(item => item.qtd) },
    { name: "Parda", hidden: false, data: data2[2].data.map(item => item.qtd) },
    { name: "Amarela", hidden: true, data: data2[3].data.map(item => item.qtd) },
    { name: "Indigena", hidden: true, data: data2[4].data.map(item => item.qtd) },
    { name: "N/ Declarado", hidden: true, data: data2[5].data.map(item => item.qtd) }
  ];

  return (
    <div className="col-span-4 w-full h-full grid grid-cols-7 pb-3 pt-9 relative">
      <p className="font-bold text-sm text-black/80 absolute top-5 left-8">Raca/Cor dos Ingressantes</p>
      
      <div className="col-span-6 pl-2">
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
            <CountUp start={0} duration={2.75} end={data2[0].qtd} />
          </p>
        </div>
        <div className="font-Bold flex flex-col items-start justify-start">
          <p className="text-left  font-normal text-xs leading-none">Negra</p>
          <p className="text-left font-bold text-3xl text-[#00E396]">
            <CountUp start={0} duration={2.75} end={data2[1].qtd} />
          </p>
        </div>
        <div className="font-Bold flex flex-col items-start justify-start">
          <p className="text-left  font-normal text-xs leading-none">Parda</p>
          <p className="text-left font-bold text-3xl text-[#FEB019]">
            <CountUp start={0} duration={2.75} end={data2[2].qtd} />
          </p>
        </div>
        <div className="font-Bold flex flex-col items-start justify-start">
          <p className="text-left  font-normal text-xs leading-none">Amarela</p>
          <p className="text-left font-bold text-3xl text-[#FF4560]">
            <CountUp start={0} duration={2.75} end={data2[3].qtd} />
          </p>
        </div>
        <div className="font-Bold flex flex-col items-start justify-start">
          <p className="text-left  font-normal text-xs leading-none">
            Indígena
          </p>
          <p className="text-left font-bold text-3xl text-[#775DD0]">
            <CountUp start={0} duration={2.75} end={data2[4].qtd} />
          </p>
        </div>
        <div className="font-Bold flex flex-col items-start justify-start">
          <p className="text-left  font-normal text-xs leading-none">
            N/ Declarado
          </p>
          <p className="text-left font-bold text-3xl text-[#d3d3d3]">
            <CountUp start={0} duration={2.75} end={data2[5].qtd} />
          </p>
        </div>
      </div>
    </div>
  );
}
