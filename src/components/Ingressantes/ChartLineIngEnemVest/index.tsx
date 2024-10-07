
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import "../../../styles/ChartContainer.css"
import { colors } from "@mui/material";


export default function ChartLineIngEnemVest(data: any) {

  const data2 = data.data.lineChartEnemVest;

  console.log("Data ChartLineIngEnemVest", data2);

  const categories = data2[0].data.map((item) => item.ano);

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
    colors: ["#0032fc", "#8600fc"],
    legend: {
      show: false,  // Desativa a legenda
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
    xaxis: {
      categories: categories,
      labels: {
        rotate: 0,
        style: {
          fontSize: "10px", // Tamanho da fonte para as labels do eixo X
          fontFamily: "Roboto, sans-serif", // Define a família de fontes (opcional)
          fontWeight: "bold", // Peso da fonte (opcional)
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
      name: "Enem",
      data: data2[0].data.map((item: any) => item.qtd),
    },
    {
      name: "Vestibular",
      data: data2[1].data.map((item: any) => item.qtd),
    },
  ];

  return (
    <div className="w-full !h-full relative chart-container">
      <p className="font-bold text-sm text-black/80  absolute left-5 top-1">
        Ingressantes por Enem/Vestibular
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
