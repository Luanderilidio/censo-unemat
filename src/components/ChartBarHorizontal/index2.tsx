import { ApexOptions } from 'apexcharts';
import React from 'react';
import Chart from 'react-apexcharts';

type SeriesType = {
  name: string;
  data: number[];
};

interface HorizontalBarChartProps {
  categories: string[];
  series: SeriesType[];
  colors: string[]; // opcional, caso queira customizar cores
}

export const HorizontalBarChart2: React.FC<HorizontalBarChartProps> = ({
  categories,
  series,
  colors = ['#008FFB', '#00E396', '#FEB019', '#FF4560'],
}) => {
  const options: ApexOptions = {
    chart: {
      id: 'vertical-bar-chart',
      type: 'bar',
      stacked: true,
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: true,
        },
      },
    },
    colors, // agora as cores vêm das props
    xaxis: {
      categories,
      axisTicks: { show: false },
      axisBorder: { show: false },
      labels: { show: false, trim: false },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        endingShape: 'rounded',
      },
    },
    dataLabels: {
      enabled: true,
      background: {
        enabled: true,
        foreColor: '#fff',
        padding: 4,
        borderRadius: 2,
        borderWidth: 1,
        borderColor: '#fff',
        opacity: 0.0,
        dropShadow: {
          enabled: true,
          top: 1,
          left: 1,
          blur: 1,
          color: '#fff',
          opacity: 1,
        },
      },
    },
    legend: {
      show: true,
      position: 'bottom',
      horizontalAlign: 'center',
      fontSize: '14px',
      fontFamily: 'Roboto',
      fontWeight: 600,
      itemMargin: {
        horizontal: 10,
        vertical: 0,
      },
    },
    grid: {
      show: true,
      borderColor: '#ededed',
      strokeDashArray: 4,
      xaxis: { lines: { show: true } },
      yaxis: { lines: { show: true } },
    },
  } as unknown as ApexOptions;

  return <Chart options={options} series={series} type="bar" height="100%" />;
};
