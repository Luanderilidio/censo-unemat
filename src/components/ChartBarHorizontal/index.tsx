
import { faker } from "@faker-js/faker";

import { ApexOptions } from "apexcharts";
import React from "react";
import Chart from "react-apexcharts";

const ChartBarHorizontal: React.FC = () => {
  // Configuração das opções do gráfico
  const options = {
    chart: {
      id: "vertical-bar-chart",
      type: "bar",
      toolbar: {
        show: true, // Habilita a barra de ferramentas
        tools: {
          download: true, // Exibe o botão de download
          selection: true, // Exibe a ferramenta de seleção
          zoom: true, // Exibe a ferramenta de zoom
          zoomin: true, // Exibe a ferramenta de zoom in
          zoomout: true, // Exibe a ferramenta de zoom out
          pan: true, // Exibe a ferramenta de pan
          reset: true, // Exibe o botão de reset
        },
      },
    },
    xaxis: {
      categories: [
        "Concorrencia",
        "Pública",
        "Étnico",
        "Social",
        "Deficientes",
        "Outros",
      ], // Categorias do eixo X

      axisTicks: {
        show: false, // oculta as marcas de verificação no eixo X
      },
      axisBorder: {
        show: false, // oculta a borda do eixo X
      },

      labels: {
        show: false,
        trim: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: true, // Define o gráfico como barras verticais
        columnWidth: "55%", // Largura das colunas
        endingShape: "rounded", // Forma de término das barras
      },
    },
    dataLabels: {
      enabled: true, // Ativa os rótulos de dados
      dropShadow: {
        enabled: false,
        left: 2,
        top: 2,
        opacity: 0.3,
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
  } as unknown as ApexOptions;

  // Dados do gráfico
  const series = [
    {
      name: "Ingressantes",
      hidden: false,
      data: [
        faker.number.int({ min: 500, max: 1500 }),
        faker.number.int({ min: 500, max: 1500 }),
        faker.number.int({ min: 500, max: 1500 }),
        faker.number.int({ min: 500, max: 1500 }),
        faker.number.int({ min: 500, max: 1500 }),
        faker.number.int({ min: 500, max: 1500 }),
      ],
    },
    {
      name: "Matriculados",
      hidden: true,
      data: [
        faker.number.int({ min: 500, max: 1500 }),
        faker.number.int({ min: 500, max: 1500 }),
        faker.number.int({ min: 500, max: 1500 }),
        faker.number.int({ min: 500, max: 1500 }),
        faker.number.int({ min: 500, max: 1500 }),
        faker.number.int({ min: 500, max: 1500 }),
      ],
    },
    {
      name: "Vagas",
      hidden: true,
      data: [
        faker.number.int({ min: 500, max: 1500 }),
        faker.number.int({ min: 500, max: 1500 }),
        faker.number.int({ min: 500, max: 1500 }),
        faker.number.int({ min: 500, max: 1500 }),
        faker.number.int({ min: 500, max: 1500 }),
        faker.number.int({ min: 500, max: 1500 }),
      ],
    },
    {
      name: "Concluintes",
      hidden: true,
      data: [
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
        type="bar" // Tipo de gráfico
        height={400} // Altura do gráfico
      />
    </div>
  );
};

export default ChartBarHorizontal;
