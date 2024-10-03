import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import CountUp from "react-countup";

export default function ChartLineTurn(data: any) {
  const data2 = data.data;

  // const categories = data2.data[0].map((e: any) => e.ano);

  console.log("ChartLineIngGen", data.data);

  const options = {
    chart: {
      id: "basic-line",
      toolbar: {
        show: false, // Desativa a toolbar
      },
      zoom: {
        enabled: false, // Desativa o zoom
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
      offsetX: 0,
      offsetY: 5,
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
        labels: {
          show: false,
          style: {
            fontFamily: "Roboto",
            fontSize: "1px", // Define o tamanho da fonte do eixo X
          },
        },
        axisTicks: {
          show: false,
        },
        lines: {
          show: true, // Mostra linhas da grid no eixo X
        },
      },
      yaxis: {
        labels: {
          show: false, // Oculta os valores do eixo Y
        },
      },
    },
    markers: {
      size: 5, // Tamanho dos pontos no gráfico
    },
    colors: ["#ffff00", "#001fff"],
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
      labels: {
        rotate: 0,
        style: {
          fontSize: "10px", // Tamanho da fonte para as labels do eixo X
          fontFamily: "Roboto, sans-serif", // Define a família de fontes (opcional)
          fontWeight: "normal", // Peso da fonte (opcional)
        },
      },
      tickAmount: 5,
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
    {
      name: "Masculino",
      data: data2[0].data,
    },
    {
      name: "Feminino",
      data: data2[1].data,
    },
  ];

  return (
    <div className="w-full h-full px-2 relative">
      <p className="font-bold text-sm text-black/80  absolute left-5 top-2">
        Quantidade de ingressantes por Turno
      </p>
      <Chart
        options={options}
        series={series}
        type="line"
        height="100%"
        width="100%"
      />
    </div>
  );
}
