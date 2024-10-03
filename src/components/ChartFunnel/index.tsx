// src/components/FunnelChart.tsx
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

export default function ChartFunnel(data: any) {
  const data2 = data.data.funnelChart;

  // console.log(data2);

  const options: ApexOptions = {
    chart: {
      type: "bar",
    },
    plotOptions: {
      bar: {
        borderRadius: 0,
        horizontal: true,
        // barHeight: '80%',
        isFunnel: true,
      },
    },
    dataLabels: {
      enabled: true,
      // formatter: function (val, opt) {
      //   return   ":  " + val;
      // },
      style: {
        fontSize: "14px",
        fontFamily: "Helvetica, Arial, sans-serif",
        fontWeight: "bold",
        colors: ["#000000"],
      },
      dropShadow: {
        enabled: false,
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
    legend: {
      show: true,
    },
    xaxis: {
      categories: [
        "0-17",
        "18-24",
        "25-29",
        "30-34",
        "35-39",
        "40-49",
        "50-59",
        "60+",
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
  };

  // Dados do gráfico
  const series = data2;

  return (
    <div className="chart-container px-4 pt-4 relative">
      <p className="font-bold absolute top-5 left-5">Idade dos Ingressantes</p>
      <Chart
        options={options}
        series={series}
        type="bar"
        height={400} // Altura do gráfico
      />
    </div>
  );
}
