import { ApexOptions } from "apexcharts";
import React from "react";
import Chart from "react-apexcharts";

export interface HorizontalBarProps {
  data: {
    name: string;
    data: number[];
  };
}

export const HorizontalBarChart: React.FC<HorizontalBarProps> = ({ data }) => {
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
        "Concorrência",
        "Pública",
        "Étnico",
        "Social",
        "Deficiente",
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
      enabled: true,
      background: {
        enabled: true,
        foreColor: '#000',
        padding: 4,
        borderRadius: 2,
        borderWidth: 1,
        borderColor: '#000',
        opacity: 0.0,
        dropShadow: {
          enabled: true,
          top: 1,
          left: 1,
          blur: 1,
          color: '#fff',
          opacity: 1
        }
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
  } as unknown as ApexOptions;

  const series = [
    {
      name: data.name, // Nome da série

      data: data.data, // Dados do gráfico
    },
  ];

  return (
    <div className="chart-container relative pt-2">
      <p className="font-bold absolute top-2 left-5">Modalidade de ingresso</p>
      <Chart
        options={options}
        series={series}
        type="bar" // Tipo de gráfico
        height={400} // Altura do gráfico
      />
    </div>
  );
};
