import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { FaQuestionCircle } from 'react-icons/fa';
import { FaChartLine } from 'react-icons/fa6';
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
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
import { ChartMultLineForma } from './5 - Agrupamento/ChartMultLineForma';
import { EntrantsData } from './SchemaEntrants';
import CountUp from 'react-countup';
import { useBoolean } from 'react-hooks-shareable';
import { ChartPieForma } from './5 - Agrupamento/ChartPieForma';

type IngressantesMainProps = {
  data?: EntrantsData['entrants'];
};

export default function IngressantesMain({ data }: IngressantesMainProps) {
  const [expanded, setExpanded] = useState(false);

  const [expandSex, openSex, closeSex, toggleSex] = useBoolean();
  const [expandAge, openAge, closeAge, toggleAge] = useBoolean();
  const [expandShift, openShift, closeShift, toggleShift] = useBoolean();
  const [expandForm, openForm, closeForm, toggleForm] = useBoolean();
  const [expandColor, openColor, closeColor, toggleColor] = useBoolean();

  const total_ing = data?.entrantsQtd.reduce((acc, cur) => acc + cur.Ingressantes, 0);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const theme = useTheme(); 
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <div className=" bg-gray-300/40 rounded-lg shadow-md font-Roboto">
      <div className="w-full flex p-4 items-center justify-between cursor-pointer" onClick={handleExpandClick} >
        <div className="flex items-center justify-start gap-2 text-black/60">
          <TiChartPie size={50} />
          <h1 className="text-4xl font-semibold ">Ingressantes</h1>
        </div>
        <ExpandMore
          expand={expanded}
        >
          <ExpandMoreIcon fontSize="large" />
        </ExpandMore>
      </div>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent  className="grid grid-cols-15 gap-4 border border-red-500  !p-2 md:p-4">
          <div className="col-span-15 grid grid-cols-12 border border-blue-500 rounded-lg bg-white shadow-md">
            <div className="col-span-12 border-b ">
              <div className="flex px-4 pt-4 pb-2 items-center justify-between gap-1 text-black/70">
                <div className="flex items-center gap-1 justify-start">
                  <FaChartLine  size={isMobile ? 10 : 18} />
                  <h1 className="font-semibold text-xs md:text-sm">Gráfico de Linha</h1>
                </div>
                <IconButton>
                  <FaQuestionCircle size={20} className="text-black/10" />
                </IconButton>
              </div>
            </div>
            <div className="col-span-8 md:col-span-10  border-b ">
              <div className="flex p-4 items-center justify-between gap-1 text-black/70">
                <div className="flex flex-col items-start gap-1 justify-start">
                  <h1 className="font-bold text-md md:text-xl">Progressão anual dos ingressantes</h1>
                </div>
              </div>
            </div>
            <div className="col-span-4 md:col-span-2 border-b border-x   flex flex-col items-center justify-center  ">
              <div className="flex flex-col w-fit ">
                <h1 className="font-normal text-[.7rem] md:text-sm text-black/70">Total Ingressantes</h1>
                <h2 className=" font-black text-2xl md:text-3xl leading-none text-black/80">
                  <CountUp
                    start={0}
                    duration={2.75}
                    end={total_ing ?? 0}
                    decimal=","
                    separator="."
                  />
                </h2>
              </div>
            </div> 
            <div className="col-span-12 border border-purple-500 h-[300px] md:h-[450px]">
              <ChartLineQtd chartData={data?.entrantsQtd} />
            </div>
          </div>

          {/* 1° - Agrupamento - sexo */}

          <div
            className="col-span-15 flex items-center justify-between mt-10 text-black/50 cursor-pointer"
            onClick={toggleSex}
          >
            <h1 className=" text-3xl font-bold">Sexo</h1>
            <div className="flex items-center justify-center gap-1">
              <h1 className=" text-sm font-bold">1° Agrupamento </h1>
              <ExpandMore expand={expandSex}>
                <ExpandMoreIcon />
              </ExpandMore>
            </div>
          </div>

          <Collapse in={expandSex} timeout="auto" className="col-span-15 " unmountOnExit>
            <div className="grid grid-cols-15 gap-4">
              <div className="col-span-15 md:col-span-8 border-red-500">
                <StackedBarChartSexo chartData={data?.entrantsSex} />
              </div>
              <div className="col-span-15 md:col-span-7 border-red-500">
                <ChartPieSexo chartData={data?.entrantsSex} />
              </div>
              <div className="col-span-15 border-red-500">
                <ChartMultLineSexo chartData={data?.entrantsSex} />
              </div>
            </div>
          </Collapse>

          {/* 2° - Agrupamento - Idade */}
          {/* <div
            className="col-span-15 flex items-center justify-between mt-10 text-black/50 cursor-pointer"
            onClick={toggleAge}
          >
            <h1 className=" text-3xl font-bold">Idade dos Ingressantes</h1>
            <div className="flex items-center justify-center gap-1">
              <h1 className=" text-sm font-bold">2° Agrupamento </h1>
              <ExpandMore expand={expandAge}>
                <ExpandMoreIcon />
              </ExpandMore>
            </div>
          </div> */}
          {/* <Collapse in={expandAge} timeout="auto" className="col-span-15 " unmountOnExit>
          <div className="grid grid-cols-15 gap-4">
            <div className="col-span-8 border-red-500">
              <StackedBarChartIdade chartData={data?.entrantsAge} />
            </div>
            <div className="col-span-7 border-red-500">
              <ChartPieIdade chartData={data?.entrantsAge} />
            </div>
            <div className="col-span-15 border-red-500">
              <ChartMultLineIdade chartData={data?.entrantsAge} />
            </div>
          </div>
          </Collapse> */}

          {/* 2° - Agrupamento - Idade */}
          {/* <div
            className=" col-span-15 flex items-center justify-between mt-10 text-black/50 cursor-pointer "
            onClick={toggleShift}
          >
            <h1 className=" text-3xl font-bold">Turno dos Ingressantes</h1>
            <div className="flex items-center justify-center gap-1">
              <h1 className=" text-sm font-bold">3° Agrupamento </h1>
              <ExpandMore expand={expandShift}>
                <ExpandMoreIcon />
              </ExpandMore>
            </div>
          </div>
          <Collapse in={expandShift} timeout="auto" className="col-span-15 " unmountOnExit>
            <div className="grid grid-cols-15 gap-4">
              <div className="col-span-8 border-red-500">
                <StackedBarChartTurno chartData={data?.entrantsShift} />
              </div>
              <div className="col-span-7 border-red-500">
                <ChartPieTurno chartData={data?.entrantsShift} />
              </div>
              <div className="col-span-15 border-red-500">
                <ChartMultLineTurno chartData={data?.entrantsShift} />
              </div>
            </div>
          </Collapse> */}

          {/* 5° - Agrupamento - Idade */}
          {/* <div
            className="col-span-15 flex items-center justify-between mt-10 text-black/50 cursor-pointer"
            onClick={toggleForm}
          >
            <h1 className=" text-3xl font-bold">Forma de Ingresso</h1>
            <div className="flex items-center justify-center gap-1">
              <h1 className=" text-sm font-bold">4° Agrupamento </h1>
              <ExpandMore expand={expandForm}>
                <ExpandMoreIcon />
              </ExpandMore>
            </div>
          </div>
          <Collapse in={expandForm} timeout="auto" className="col-span-15 " unmountOnExit>
            <div className="grid grid-cols-15 gap-4">
              <div className="col-span-8 border-red-500">
                <StackedBarChartForma chartData={data?.entrantsForm} />
              </div>
              <div className="col-span-7 border-red-500">
                <ChartPieForma chartData={data?.entrantsForm} />
              </div>
              <div className="col-span-15 border-red-500">
                <ChartMultLineForma chartData={data?.entrantsForm} />
              </div>
            </div>
          </Collapse> */}

          {/* 5° - Agrupamento - Idade */}
          {/* <div
            className="col-span-15 flex items-center justify-between mt-10 text-black/50 cursor-pointer"
            onClick={toggleColor}
          >
            <h1 className=" text-3xl font-bold">Cor dos Ingressantes</h1>
            <div className="flex items-center justify-center gap-1">
              <h1 className=" text-sm font-bold">5° Agrupamento </h1>
              <ExpandMore expand={expandColor}>
                <ExpandMoreIcon />
              </ExpandMore>
            </div>
          </div>
          <Collapse in={expandColor} timeout="auto" className="col-span-15 " unmountOnExit>
            <div className="grid grid-cols-15 gap-4">
              <div className="col-span-8 border-red-500">
                <StackedBarChartCor chartData={data?.entrantsColor} />
              </div>
              <div className="col-span-7 border-red-500">
                <ChartPieCor chartData={data?.entrantsColor} />
              </div>
              <div className="col-span-15 border-red-500">
                <ChartMultLineCor chartData={data?.entrantsColor} />
              </div>
            </div>
          </Collapse> */}
        </CardContent>
      </Collapse>
    </div>
  );
}
