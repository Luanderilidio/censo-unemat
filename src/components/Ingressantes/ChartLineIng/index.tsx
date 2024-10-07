import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

import "../../../styles/ChartContainer.css";

export default function ChartLineIng(data: any) {
  const data2 = data.data[0];

  const categories = data2.data.map((e: any) => e.ano);

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
    dataLabels: {
      enabled: true,
      enabledOnSeries: undefined,
      formatter: function (val, _opts) {
        return val;
      },
      textAnchor: "middle",
      distributed: false,
      offsetX: 0,
      offsetY: -8,
      style: {
        fontSize: "10px",
        fontFamily: "Roboto",
        fontWeight: "bold",
        colors: undefined,
      },
      background: {
        enabled: true,
        foreColor: "#fff",
        padding: 4,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: "#fff",
        opacity: 0.9,
        dropShadow: {
          enabled: false,
          top: 1,
          left: 1,
          blur: 1,
          color: "#000",
          opacity: 0.45,
        },
      },
      dropShadow: {
        enabled: false,
        top: 1,
        left: 1,
        blur: 1,
        color: "#000",
        opacity: 0.45,
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
    colors: ["#008FFB"],
    xaxis: {
      categories: data2.data.map((item) => item.ano),
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
    {
      name: "Qtd",
      data: data2.data.map((e: any) => e.qtd),
    },
  ];

  return (
    <div className="w-full h-full relative chart-container">
      <p className="font-bold text-sm text-black/80  absolute left-5 top-2">
        Quantidade de Ingressantes por Ano
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
