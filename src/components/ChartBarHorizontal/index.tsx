import React, { useRef, useState } from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import {
  Autocomplete,
  Button,
  Checkbox,
  Chip,
  FormControlLabel,
  Menu,
  MenuItem,
  TextField,
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
    ],
  },
];

const options = ["Ingressantes", "Matriculados", "Vagas", "Concluintes"];

const ChartBarHorizontal: React.FC = () => {
  const chartRef = useRef<Chart | null>(null);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
        type: "bar",
        // width: 400,
        zoom: {
          allowMouseWheelZoom: true,
        },
      },
      colors: ['#26A0FC', '#26E7A6'],
      plotOptions: {
        bar: {
          horizontal: true,
          columnWidth: 100,
          distributed: false,
          borderRadius: 5,
          borderRadiusApplication: "end",
          borderRadiusWhenStacked: "last",
          dataLabels: {
            position: "bottom",
          },
        },
      },
      dataLabels: {
        // offsetY: 20,
        offsetX: 40,
        style: {
          fontSize: "14px",
          colors: ["#304758"],
        },
        formatter: function (
          val: string,
          opt: {
            w: { globals: { labels: { [x: string]: string } } };
            dataPointIndex: string | number;
          }
        ) {
          return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val;
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
        show: false,
        categories: [
          "Ampla Concorrencia",
          "Pública",
          "Étnico",
          "Social",
          "Deficientes",
          "Outros",
        ],
        axisTicks: {
          show: false, // oculta as marcas de verificação no eixo X
        },
        axisBorder: {
          show: false, // oculta a borda do eixo X
        },

        labels: {
          show: false,
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
    <div id="chart" className="w-full flex items-end border-blue-500 h-full">
      <div className="flex items-center justify-end absolute right-3 top-3 z-50">
        <Button
          size="small"
          variant="contained"
          color="inherit"
          onClick={handleClick}
        >
          Filtrar
        </Button>
      </div>
      <div className="flex items-center justify-end absolute left-5 gap-1 top-3 z-50">
        <Chip size="small" className="!bg-[#26A0FC] !font-semibold !text-white" label="Ingressantes" />
        <Chip size="small" className="!bg-[#26E7A6] !font-semibold !text-white" label="Matriculadas" />
        <Chip size="small" className="!bg-[#FEBC3B] !font-semibold !text-white" label="Vagas" />
        <Chip size="small" className="!bg-[#ff6178] !font-semibold !text-white" label="Concluintes" />
      </div>
      <Chart
        options={chartData.options}
        series={visibleSeries}
        type="bar"
        height={320}
        width={450}
        ref={chartRef}
      />
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <div className="flex flex-col items-start justify-start px-2">
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
      </Menu>
    </div>
  );
};

export default ChartBarHorizontal;
