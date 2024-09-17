// import React, { useRef, useState } from "react";
// import Chart from "react-apexcharts";
// import { ApexOptions } from "apexcharts";
// import {
//   Autocomplete,
//   Button,
//   Checkbox,
//   FormControlLabel,
//   Menu,
// } from "@mui/material";
import { faker } from "@faker-js/faker";

// interface Series {
//   name: string;
//   data: number[];
// }

// const options = ["Ingressantes", "Matriculados", "Vagas", "Concluintes"];

// const ChartBarHorizontal: React.FC = () => {
//   const chartRef = useRef<Chart | null>(null);

//   const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

//   const [visibleSeries, setVisibleSeries] = useState<Series[]>([
//     initialSeries[0],
//   ]);

//   const [chartData, setChartData] = useState({
//     series: visibleSeries,
//     options: {
//       annotations: {},
//       chart: {
//         animations: {
//           enabled: true,
//           easing: "swing",
//         },
//         background: "",
//         foreColor: "#333",
//         fontFamily: "Roboto",
//         id: "gH2S1",
//         stackOnlyBar: true,
//         toolbar: {
//           show: false,
//         },
//         type: "bar",
//         // width: 400,
//         zoom: {
//           allowMouseWheelZoom: true,
//         },
//       },
//       // colors: ['#26A0FC', '#26E7A6'],
//       plotOptions: {
//         bar: {
//           horizontal: true,
//           columnWidth: "100%",
//           distributed: false,
//           borderRadius: 5,
//           borderRadiusApplication: "end",
//           borderRadiusWhenStacked: "last",
//           dataLabels: {
//             position: "bottom",
//           },
//         },
//       },
//       dataLabels: {
//         // offsetY: 20,
//         offsetX: 20,
//         style: {
//           fontSize: "12px",
//           colors: ["#fff"],
//         },
//         formatter: function (
//           val: string,
//           opt: {
//             w: { globals: { labels: { [x: string]: string } } };
//             dataPointIndex: string | number;
//           }
//         ) {
//           return  val;
//         },
//         dropShadow: {
//           enabled: false,
//           // blur: 7,
//         },
//       },
//       grid: {
//         strokeDashArray: 5,
//         padding: {
//           right: 25,
//           left: 15,
//         },
//       },
//       legend: {
//         show: true, // Habilita as legendas
//         position: "top", // Posiciona as legendas no topo
//         horizontalAlign: "right", // Alinha as legendas à esquerda
//         offsetX: 30, // Ajusta a posição horizontal das legendas
//         offsetY: 0, // Ajusta a posição vertical das legendas
//         fontSize: "14px", // Tamanho da fonte das legendas
//         fontFamily: "Roboto", // Família da fonte das legendas
//         fontWeight: 600, // Peso da fonte das legendas
//         itemMargin: {
//           horizontal: 10, // Margem horizontal entre itens
//           vertical: 0, // Margem vertical entre itens
//         },
//       },
//       stroke: {
//         fill: {
//           type: "solid",
//           opacity: 0.85,
//           gradient: {
//             shade: "dark",
//             type: "horizontal",
//             shadeIntensity: 0.5,
//             inverseColors: true,
//             opacityFrom: 1,
//             opacityTo: 1,
//             stops: [0, 50, 100],
//           },
//         },
//       },
//       tooltip: {
//         shared: false,
//         hideEmptySeries: false,
//         intersect: true,
//       },
//       xaxis: {
//         show: false,
// categories: [
//   "Concorrencia",
//   "Pública",
//   "Étnico",
//   "Social",
//   "Deficientes",
//   "Outros",
// ],
// axisTicks: {
//   show: true, // oculta as marcas de verificação no eixo X
// },
// axisBorder: {
//   show: false, // oculta a borda do eixo X
// },

// labels: {
//   show: true,
//   trim: true,
// },
//         tickPlacement: "between",
//         title: {
//           text: "",
//           style: {
//             fontSize: "20px",
//             fontWeight: 700,
//           },
//         },
//         tooltip: {
//           enabled: true,
//         },
//       },

//     } as unknown as ApexOptions,
//   });

//   const handleCheckboxChange = (
//     event: React.ChangeEvent<HTMLInputElement>,
//     seriesName: string
//   ) => {
//     if (event.target.checked) {
//       // Adiciona a série à lista de visíveis se estiver selecionada
//       const seriesToAdd = initialSeries.find(
//         (series) => series.name === seriesName
//       );
//       if (seriesToAdd) {
//         setVisibleSeries((prevSeries) => [...prevSeries, seriesToAdd]);
//       }
//     } else {
//       // Remove a série da lista de visíveis se estiver desmarcada
//       setVisibleSeries((prevSeries) =>
//         prevSeries.filter((series) => series.name !== seriesName)
//       );
//     }
//   };

//   return (
//     <div id="chart" className="w-full">

//       <Chart
//         options={chartData.options}
//         series={visibleSeries}
//         type="bar"
//         height={400}
//         width={450}
//         ref={chartRef}
//       />

//     </div>
//   );
// };

// export default ChartBarHorizontal;

// src/components/VerticalBarChart.tsx

import { ApexOptions } from "apexcharts";
// src/components/VerticalBarChart.tsx
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
        enabled: true,
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
