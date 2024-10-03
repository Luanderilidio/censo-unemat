import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

import "../../../styles/ChartContainer.css"

export default function ChartLineIng(data: any) {
  const data2 = data.data[0];

  const categories = data2.data.map((e: any) => e.ano);

  const options = {
    chart: {
      id: "basic-line",
      toolbar: {
        show: false // Desativa a toolbar
      },
      zoom: {
        enabled: false, // Desativa o zoom
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
    <div className="w-full h-full px-2 pt-2 relative chart-container">
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
