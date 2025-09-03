import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { FaQuestionCircle } from 'react-icons/fa';
import { FaChartLine } from 'react-icons/fa6';

import { useState } from 'react';
import { ExpandMore } from '../../utils/ExpandMore';
import { TiChartPie } from 'react-icons/ti';
import { CardContent, Collapse, IconButton } from '@mui/material';
import { StackedBarChartSexo } from './1 - Agrupamento/ChartStackBarSexo';
import { ChartLineQtd } from './1 - Agrupamento/ChartLineQtd';
import { ChartPieSexo } from './1 - Agrupamento/ChartPieSexo';
import { ChartMultLineSexo } from './1 - Agrupamento/ChartMultLineSexo';
import { StackedBarChartIdade } from './2 - Agrupamento/ChartStackBarIdade';
import { ChartPieIdade } from './2 - Agrupamento/ChartPieIdade';
import { ChartMultLineIdade } from './2 - Agrupamento/ChartMultLineIdade';
import { StackedBarChartTurno } from './3 - Agrupamento/ChartStackBarTurno';
import { ChartMultLineTurno } from './3 - Agrupamento/ChartMultLineTurno';
import { ChartPieTurno } from './3 - Agrupamento/ChartPieTurno';
import { ChartMultLineCor } from './4 - Agrupamento/ChartMultLineCor';
import { ChartPieCor } from './4 - Agrupamento/ChartPieCor';
import { StackedBarChartCor } from './4 - Agrupamento/ChartStackBarCor';
import { StackedBarChartForma } from './5 - Agrupamento/ChartStackBarForma';
import { ChartPieForma } from './5 - Agrupamento/ChartPieForma';
import { ChartMultLineForma } from './5 - Agrupamento/ChartMultLineForma';
import { EntrantsData } from './SchemaEntrants';

type IngressantesMainProps = {
  data?: EntrantsData['entrants'];
};

export default function IngressantesMain({ data }: IngressantesMainProps) {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <div className=" bg-gray-200/30 rounded-lg shadow-md font-Roboto">
      <div className="w-full flex p-4 items-center justify-between">
        <div className="flex items-center justify-start gap-2 text-black/60">
          <TiChartPie size={50} />
          <h1 className="text-4xl font-semibold ">Ingressantes</h1>
        </div>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon fontSize="large" />
        </ExpandMore>
      </div>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent className="grid grid-cols-15 gap-4">
          <div className="col-span-15 grid grid-cols-12 border-red-500 rounded-lg bg-white shadow-md">
            <div className="col-span-12 border-b ">
              <div className="flex px-4 pt-4 pb-2 items-center justify-between gap-1 text-black/70">
                <div className="flex items-center gap-1 justify-start">
                  <FaChartLine size={18} />
                  <h1 className="font-semibold text-sm">Gráfico de Linha</h1>
                </div>
                <IconButton>
                  <FaQuestionCircle size={20} className="text-black/10" />
                </IconButton>
              </div>
            </div>
            <div className="col-span-8  border-b ">
              <div className="flex p-4  items-center justify-between gap-1 text-black/70">
                <div className="flex flex-col items-start gap-1 justify-start">
                  <h1 className="font-bold text-xl">Grafico de Barras</h1>
                  <h2 className="font-normal leading-none ">Grafico de Barras</h2>
                </div>
              </div>
            </div>
            <div className="col-span-2 border-b border-x flex flex-col items-center justify-center  ">
              <div className="flex flex-col w-fit ">
                <h1 className="font-normal text-sm text-black/70">Qtd tal tal</h1>
                <h2 className=" font-black text-3xl leading-none text-black/80">5151551</h2>
              </div>
            </div>
            <div className="col-span-2 border-b flex flex-col items-center justify-center  ">
              <div className="flex flex-col w-fit ">
                <h1 className="font-normal text-sm text-black/70">Qtd tal tal</h1>
                <h2 className=" font-black text-3xl leading-none text-black/80">5151551</h2>
              </div>
            </div>
            <div className="col-span-12 border-purple-500 h-[450px]">
              <ChartLineQtd chartData={data?.entrantsQtd} />
            </div>
          </div>

          {/* 1° - Agrupamento - sexo */}

          <div className="col-span-15 flex items-center justify-between mt-10 text-black/50">
            <h1 className=" text-3xl font-bold">Sexo dos Ingressantes</h1>
            <h1 className=" text-sm font-bold">1° Agrupamento </h1>
          </div>
          <div className="col-span-8 border-red-500">
            <StackedBarChartSexo chartData={data?.entrantsSex} />
          </div>
          <div className="col-span-7 border-red-500">
            <ChartPieSexo chartData={data?.entrantsSex} />
          </div>
          <div className="col-span-15 border-red-500">
            <ChartMultLineSexo chartData={data?.entrantsSex} />
          </div>

          {/* 2° - Agrupamento - Idade */}
          <div className="col-span-15 flex items-center justify-between mt-10 text-black/50">
            <h1 className=" text-3xl font-bold">Idade dos Ingressantes</h1>
            <h1 className=" text-sm font-bold">2° Agrupamento </h1>
          </div>
          <div className="col-span-8 border-red-500">
            <StackedBarChartIdade chartData={data?.entrantsAge} />
          </div>
          <div className="col-span-7 border-red-500">
            <ChartPieIdade chartData={data?.entrantsAge} />
          </div>
          <div className="col-span-15 border-red-500">
            <ChartMultLineIdade chartData={data?.entrantsAge} />
          </div>

          {/* 2° - Agrupamento - Idade */}
          <div className="col-span-15 flex items-center justify-between mt-10 text-black/50">
            <h1 className=" text-3xl font-bold">Turno dos Ingressantes</h1>
            <h1 className=" text-sm font-bold">3° Agrupamento </h1>
          </div>
          <div className="col-span-8 border-red-500">
            <StackedBarChartTurno chartData={data?.entrantsShift} />
          </div>
          <div className="col-span-7 border-red-500">
            <ChartPieTurno chartData={data?.entrantsShift} />
          </div>
          <div className="col-span-15 border-red-500">
            <ChartMultLineTurno chartData={data?.entrantsShift} />
          </div>

          {/* 5° - Agrupamento - Idade */}
          <div className="col-span-15 flex items-center justify-between mt-10 text-black/50">
            <h1 className=" text-3xl font-bold">Formas de Ingresso</h1>
            <h1 className=" text-sm font-bold">5° Agrupamento </h1>
          </div>
          <div className="col-span-8 border-red-500">
            <StackedBarChartForma chartData={data?.entrantsForm} />
          </div>
          <div className="col-span-7 border-red-500">
            <ChartPieForma chartData={data?.entrantsForm} />
          </div>
          <div className="col-span-15 border-red-500">
            <ChartMultLineForma chartData={data?.entrantsForm} />
          </div>

          {/* 5° - Agrupamento - Idade */}
          <div className="col-span-15 flex items-center justify-between mt-10 text-black/50">
            <h1 className=" text-3xl font-bold">Cor dos Ingressantes</h1>
            <h1 className=" text-sm font-bold">4° Agrupamento </h1>
          </div>
          <div className="col-span-8 border-red-500">
            <StackedBarChartCor chartData={data?.entrantsColor} />
          </div>
          <div className="col-span-7 border-red-500">
            <ChartPieCor chartData={data?.entrantsColor} />
          </div>
          <div className="col-span-15 border-red-500">
            <ChartMultLineCor chartData={data?.entrantsColor} />
          </div>
        </CardContent>
      </Collapse>
    </div>
  );
}
