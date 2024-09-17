// src/components/FunnelChart.tsx
import React from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { faker } from "@faker-js/faker";

const ChartFunnel: React.FC = () => {
  // Configuração das opções do gráfico
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
      formatter: function (val, opt) {
        return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val;
      },
      dropShadow: {
        enabled: true,
      },
    },
    grid: {
      strokeDashArray: 5,
      padding: {
        right: 25,
        left: 15,
      },
    },
    legend: {
      show: true, // Habilita as legendas
      position: "bottom", // Posiciona as legendas no topo
      horizontalAlign: "center", // Alinha as legendas à esquerda
      offsetX: 0, // Ajusta a posição horizontal das legendas
      offsetY: 0, // Ajusta a posição vertical das legendas
      fontSize: "14px", // Tamanho da fonte das legendas
      fontFamily: "Roboto", // Família da fonte das legendas
      fontWeight: 600, // Peso da fonte das legendas
      itemMargin: {
        horizontal: 10, // Margem horizontal entre itens
        vertical: 0, // Margem vertical entre itens
      },
    },
    xaxis: {
      categories: ["0-17", "18_24", "25_29", "30_34", "40_49", "50_59", "60+"],
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
  const series = [
    {
      name: "Número de Pessoas",
      data: [
        faker.number.int({ min: 500, max: 1500 }),
        faker.number.int({ min: 500, max: 1500 }),
        faker.number.int({ min: 500, max: 1500 }),
        faker.number.int({ min: 500, max: 1500 }),
        faker.number.int({ min: 500, max: 1500 }),
        faker.number.int({ min: 500, max: 1500 }),
        faker.number.int({ min: 500, max: 1500 }),
      ],
    },
  ];

  return (
    <div className="chart-container">
      <Chart
        options={options}
        series={series}
        type="bar"
        height={400} // Altura do gráfico
      />
    </div>
  );
};

export default ChartFunnel;
