import React, { useState } from "react";
import Chart from "react-apexcharts";
import { faker } from "@faker-js/faker";
import { ApexOptions } from "apexcharts";
import CountUp from "react-countup";

const ChartLine: React.FC = () => {


  const options = {
    chart: {
      id: "basic-line",

    },
    dataLabels: {
      enabled: false, // Habilita os dataLabels
      offsetY: -10,
      formatter: (val: number) => {
        return val.toFixed(0); // Formata o valor como inteiro
      },
      style: {
        fontSize: "12px",
      },
    },

    grid: {
      padding: {
        top: 0, // Padding superior
        right: 0, // Padding à direita
        bottom: 0, // Padding inferior
        left: 0, // Padding à esquerda
      },
    },
    markers: {
      size: 5, // Tamanho dos pontos no gráfico
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
  } as unknown as ApexOptions;

  const series = [ 
    {
      name: "Branca",
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
      name: "Negra",
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
      name: "Parda",
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
      name: "Amarela",
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
      name: "Indígena",
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
      name: "N/ Declarado",
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
  ];

  return (
    <div className=" w-full h-full grid grid-cols-7">
      <div className="col-span-6">
        <Chart
          options={options}
          series={series}
          type="line"
          height="100%"
          width="100%"
        />
      </div>
      <div className="col-span-1 flex flex-col items-center gap-2">
        <div className="font-Bold mt-10">
          <p className="text-left  font-normal text-xs leading-none">Branca</p>
          <p className="text-left font-bold text-4xl text-[#008FFB]">
            <CountUp start={0} duration={2.75} end={100} />
          </p>
        </div>
        <div className="font-Bold">
          <p className="text-left  font-normal text-xs leading-none">Negra</p>
          <p className="text-left font-bold text-4xl text-[#00E396]">
            <CountUp start={0} duration={2.75} end={100} />
          </p>
        </div>
        <div className="font-Bold">
          <p className="text-left  font-normal text-xs leading-none">Parda</p>
          <p className="text-left font-bold text-4xl text-[#FEB019]">
            <CountUp start={0} duration={2.75} end={100} />
          </p>
        </div>
        <div className="font-Bold">
          <p className="text-left  font-normal text-xs leading-none">Amarela</p>
          <p className="text-left font-bold text-4xl text-[#FF4560]">
            <CountUp start={0} duration={2.75} end={100} />
          </p>
        </div>
        <div className="font-Bold">
          <p className="text-left  font-normal text-xs leading-none">Indígena</p>
          <p className="text-left font-bold text-4xl text-[#775DD0]">
            <CountUp start={0} duration={2.75} end={100} />
          </p>
        </div>
        <div className="font-Bold">
          <p className="text-left  font-normal text-xs leading-none">N/ Declarado</p>
          <p className="text-left font-bold text-4xl text-[#008FFB]">
            <CountUp start={0} duration={2.75} end={100} />
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChartLine;
