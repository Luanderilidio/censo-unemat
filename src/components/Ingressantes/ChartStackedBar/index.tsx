import { ApexOptions } from "apexcharts";
import Chart from "react-apexcharts";

export default function BarChart(data: any) {
  const data2 = data.data.barVertical;

  // console.log("BarChart sexo", data2)

  const options = {
    chart: {
      stacked: true,
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
      show: true,
      showForSingleSeries: false,
      showForNullSeries: true,
      showForZeroSeries: true,
      position: "top",
      horizontalAlign: "right",
      floating: true,
      fontSize: "10px",
      fontFamily: "Roboto, Arial",
      fontWeight: 600,
      formatter: undefined,
      inverseOrder: false,
      width: undefined,
      height: undefined,
      tooltipHoverFormatter: undefined,
      customLegendItems: [],
      offsetX: 0,
      offsetY: 0,
      labels: {
        colors: undefined,
        useSeriesColors: false,
      },
      markers: {
        size: 7,
        shape: undefined,
        strokeWidth: 5,
        fillColors: undefined,
        customHTML: undefined,
        onClick: undefined,
        offsetX: 5,
        offsetY: 0,
      },
      itemMargin: {
        horizontal: -4,
        vertical: 0,
      },
      onItemClick: {
        toggleDataSeries: true,
      },
      onItemHover: {
        highlightDataSeries: true,
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
        rotate: 0,
        style: {
          fontSize: "10px", // Tamanho da fonte para as labels do eixo X
          fontFamily: "Roboto, sans-serif", // Define a família de fontes (opcional)
          fontWeight: "bold", // Peso da fonte (opcional)
        },
      },
      
    },
    colors: ["#008FFB", "#FF4560"],
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

  const series = data2;

  return (
    <div className=" border-blue-500 chart-container">
      <div className="flex items-center justify-between mt-2">
        <p className="font-bold ">Quantidade de ingressantes por gênero</p>
      </div>
      <Chart
        options={options}
        series={series}
        type="bar"
        height="450px"
      />
    </div>
  );
}
