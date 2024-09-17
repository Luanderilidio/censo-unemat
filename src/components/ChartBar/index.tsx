import React, { useRef, useState } from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import {
  Checkbox,
  Chip,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { faker } from "@faker-js/faker";

interface Series {
  name: string;
  hidden: boolean;
  data: number[];
}

const BarChart: React.FC = () => {
  const chartRef = useRef<Chart | null>(null);

  const [series, setSeries] = useState<Series[]>([
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
        faker.number.int({ min: 500, max: 1500 }),
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
        faker.number.int({ min: 500, max: 1500 }),
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
        faker.number.int({ min: 500, max: 1500 }),
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
        faker.number.int({ min: 500, max: 1500 }),
        faker.number.int({ min: 500, max: 1500 }),
        faker.number.int({ min: 500, max: 1500 }),
        faker.number.int({ min: 500, max: 1500 }),
        faker.number.int({ min: 500, max: 1500 }),
        faker.number.int({ min: 500, max: 1500 }),
        faker.number.int({ min: 500, max: 1500 }),
      ],
    },
  ]);

  const [chartData, setChartData] = useState({
    series: series,
    options: {
      annotations: {},
      chart: {
        animations: {
          enabled: true,
          easing: "swing",
        },
        background: "",
        foreColor: "#333",
        fontFamily: "Roboto",
        // height: 250,
        id: "gH2S1",
        stackOnlyBar: true,
        toolbar: {
          show: false,
        },
        type: "bar" as const,
        // width: 400,
        zoom: {
          allowMouseWheelZoom: true,
        },
      },
      plotOptions: {
        bar: {
          columnWidth: "90%",
          distributed: false,
          borderRadius: 5,
          borderRadiusApplication: "end",
          borderRadiusWhenStacked: "last",
        },
      },
      dataLabels: {
        enabled: true, // Habilita os dataLabels
        style: {
          fontSize: "12px",
          colors: ["#fff"], // Define a cor do texto
          transform: "rotate(90deg)", // Ajuste o ângulo de rotação conforme necessário
          transformOrigin: "bottom left", // Ajuste o ponto de origem da rotação
          whiteSpace: "nowrap", // Para evitar que o texto quebre em várias linhas
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
        position: "top", // Posiciona as legendas no topo
        horizontalAlign: "right", // Alinha as legendas à esquerda
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
      stroke: {
        fill: {
          type: "solid",
          opacity: 0.85,
          gradient: {
            shade: "dark",
            type: "horizontal",
            shadeIntensity: 0.5,
            inverseColors: true,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 50, 100],
          },
        },
      },
      tooltip: {
        shared: false,
        hideEmptySeries: false,
        intersect: true,
      },
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
          trim: true,
        },
        tickPlacement: "between",
        title: {
          text: "",
          style: {
            fontSize: "20px",
            fontWeight: 700,
          },
        },
        tooltip: {
          enabled: true,
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
    } as unknown as ApexOptions,
  });

  // const handleCheckboxChange = (
  //   event: React.ChangeEvent<HTMLInputElement>,
  //   seriesName: string
  // ) => {
  //   if (event.target.checked) {
  //     // Adiciona a série à lista de visíveis se estiver selecionada
  //     const seriesToAdd = initialSeries.find(
  //       (series) => series.name === seriesName
  //     );
  //     if (seriesToAdd) {
  //       setVisibleSeries((prevSeries) => [...prevSeries, seriesToAdd]);
  //     }
  //   } else {
  //     // Remove a série da lista de visíveis se estiver desmarcada
  //     setVisibleSeries((prevSeries) =>
  //       prevSeries.filter((series) => series.name !== seriesName)
  //     );
  //   }
  // };

  return (
    <div id="chart" className=" border-blue-500 !h-[380px]">
      <div className="flex items-center justify-between">
        <p className="font-bold ">Comparação de Dados</p>
      </div>

      <Chart
        options={chartData.options}
        series={series}
        type="bar"
        height="100%"
        ref={chartRef}
      />
    </div>
  );
};

export default BarChart;
