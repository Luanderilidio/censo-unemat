import React, { useRef, useState } from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { faker } from "@faker-js/faker";

interface Series {
  name: string;
  data: number[];
}

const initialSeries = [
  {
    name: "Ingressantes",
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
];

const BarChart: React.FC = () => {
  const chartRef = useRef<Chart | null>(null);

  const [visibleSeries, setVisibleSeries] = useState<Series[]>([
    initialSeries[0],
  ]);

  const [chartData, setChartData] = useState({
    series: visibleSeries,
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
        offsetY: 20,
        style: {
          fontSize: "14px",
          colors: ["#304758"],
        },
        dropShadow: {
          enabled: false,
          // blur: 7,
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
        show: false,
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

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    seriesName: string
  ) => {
    if (event.target.checked) {
      // Adiciona a série à lista de visíveis se estiver selecionada
      const seriesToAdd = initialSeries.find(
        (series) => series.name === seriesName
      );
      if (seriesToAdd) {
        setVisibleSeries((prevSeries) => [...prevSeries, seriesToAdd]);
      }
    } else {
      // Remove a série da lista de visíveis se estiver desmarcada
      setVisibleSeries((prevSeries) =>
        prevSeries.filter((series) => series.name !== seriesName)
      );
    }
  };

  return (
    <div id="chart" className=" border-blue-500 h-full">
      <p className="font-bold ">Comparação de Dados</p>
      <Chart
        options={chartData.options}
        series={visibleSeries}
        type="bar"
        height={240}
        ref={chartRef}
      />

      <div className="flex items-center justify-center">
        {initialSeries.map((series) => (
          <FormControlLabel
            key={series.name}
            value={series.name}
            control={
              <Checkbox
                size="small"
                checked={visibleSeries.some((s) => s.name === series.name)}
                onChange={(e) => handleCheckboxChange(e, series.name)}
              />
            }
            label={series.name}
            labelPlacement="end"
          />
        ))}
      </div>
    </div>
  );
};

export default BarChart;
