 import { CartesianGrid, Label, LabelList, Line, LineChart, XAxis, YAxis } from 'recharts';
import {
  ChartContainer,
  ChartLegend,
  ChartTooltip,
  ChartTooltipContent,
} from '../../ui/chart';
import { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { FaChartLine, FaQuestionCircle } from 'react-icons/fa';
import { useBoolean } from 'react-hooks-shareable';
import { chartConfig4 } from './data';
import { DataEntrantsColor } from '../SchemaEntrants';
import { useDeviceType } from '../../../utils/mediaQuery';

export const description = 'A line chart with a label';

type ChartMultLineCorProps = {
  chartData?: DataEntrantsColor;
};

export function ChartMultLineCor({ chartData }: ChartMultLineCorProps) {
  const { isMobile } = useDeviceType();
  const [dialog, openDialog, closeDialog, toggleDialog] = useBoolean();

  const [filter, setFilter] = useState<
    'Todos' | 'Branca' | 'Preta' | 'Parda' | 'Amarela' | 'Indigena' | 'Indefinido'
  >('Todos');


  const SimpleDot = ({ cx, cy, fill, stroke, r = 10, isActive = false }: any) => {
    if (cx === undefined || cy === undefined) return null;
    return (
      <circle
        cx={cx}
        cy={cy}
        r={isActive ? r + 5 : r} // cresce quando ativo
        fill={fill}
        stroke={stroke}
        strokeWidth={isActive ? 0 : 8}
      />
    );
  };

  const CustomDot = ({ cx, cy, value, stroke, fill, r = 20, isActive = false }: any) => {
    if (cx === undefined || cy === undefined) return null;
    return (
      <g>
        {/* bolinha */}
        <circle
          cx={cx}
          cy={cy}
          r={isActive ? r + 10 : r} // cresce quando ativo
          fill={fill}
          stroke={stroke}
          strokeWidth={isActive ? 0 : 8}
        />
        {/* texto dentro */}
        <text
          x={cx}
          y={cy + 2}
          textAnchor="middle"
          fill="#fff"
          fontSize={isActive ? 10 : 5}
          fontWeight="bold"
        >
          {value}
        </text>
      </g>
    );
  };

  return (
    <div className="md:!h-[600px] border-red-500 rounded-lg bg-white shadow-md">
      <div className="flex px-4 pt-4 pb-2 border-b items-center justify-between gap-1 text-black/70">
        <div className="flex items-center gap-1 justify-start">
          <FaChartLine size={18} />
          <h1 className="font-semibold text-sm">Gráfico de Linhas Multiplas</h1>
        </div>
        <IconButton onClick={openDialog}>
          <FaQuestionCircle size={20} className="text-black/10" />
        </IconButton>
      </div>
      <div className="flex px-4 pt-4 pb-2  items-center justify-between gap-1 text-black/70">
        <div className="flex flex-col items-start gap-1 justify-start">
          <h1 className="font-bold text-sm md:text-xl leading-none">Evolução da cor/raça dos ingressantes</h1>
        </div>
        <FormControl size="small" className="w-40">
          <InputLabel>Filtro</InputLabel>
          <Select value={filter} label="Filtro" onChange={(e) => setFilter(e.target.value as any)}>
            <MenuItem value="Todos">Todos</MenuItem>
            <MenuItem value="Branca">Branca</MenuItem>
            <MenuItem value="Preta">Preta</MenuItem>
            <MenuItem value="Parda">Parda</MenuItem>
            <MenuItem value="Amarela">Amarela</MenuItem>
            <MenuItem value="Indigena">Indigena</MenuItem>
            <MenuItem value="Indefinido">Indefinido</MenuItem>
          </Select>
        </FormControl>
      </div>
      <ChartContainer config={chartConfig4} className="h-[300px] md:h-[460px] px-1 pb-2 w-full">
        <LineChart
          accessibilityLayer
          data={chartData}
          margin={{
            top: 0,
            left: 15,
            right: 15,
            bottom: 5,
          }}
        >
          <CartesianGrid />
          <XAxis
            dataKey="year"
            tickLine={true}
            tickMargin={5} // espaço entre ticks e labels
            axisLine={false}
            interval={1}
            tickFormatter={(val) => val.slice(0, 4)}
          >
            <Label
              value="Ano"
              position="bottom" // label abaixo dos ticks, dentro do gráfico
              offset={-5} // distância do label para os ticks
              style={{ textAnchor: 'middle', fontWeight: 'bold', fontSize: 14 }}
            />
          </XAxis>
          <YAxis
            tickLine={true} // remove os traços dos ticks, opcional
            axisLine={false} // exibe a linha do eixo
            tick={false}
            // tick={{ fontSize: 12, fontWeight: 'bold', fill: '#333' }}  // estilo do texto
            tickFormatter={(val) => val} // formata os números se quiser (ex: 1k, 2k)
            width={0} // largura reservada para os números
          >
            <Label
              value="Quantidade"
              offset={0}
              angle={-90}
              position="outside"
              style={{ textAnchor: 'middle', fontWeight: 'bold', fontSize: 14 }}
            />
          </YAxis>
          <ChartLegend
            verticalAlign="top"
            content={({ payload }) => (
              <div className="flex items-center justify-center flex-wrap gap-[4px] md:gap-3 mb-3 ">
                {payload?.map((entry, index) => {
                  const conf = chartConfig4[entry.value as keyof typeof chartConfig4];
                  return (
                    <div key={index} className="flex items-center gap-1">
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: conf?.color ?? '#999' }}
                      />
                      <span style={{ color: conf?.color ?? '#999', fontWeight: 'bold', fontSize: isMobile ? 9 : 11 }}>
                        {conf?.label ?? entry.value}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          />

          <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
          {(filter === 'Todos' || filter === 'Branca') && (
            <Line
              dataKey="Branca"
              type="linear"
              stroke={chartConfig4['Branca'].color}
              strokeWidth={2}
              dot={
                filter === 'Todos'
                  ? { fill: chartConfig4['Branca'].color } // dot simples
                  : isMobile
                    ? (props) => <CustomDot {...props} fill={chartConfig4['Branca'].color} /> // mobile = dot customizado
                    : (props) => <SimpleDot {...props} fill={chartConfig4['Branca'].color} /> // desktop = dot normal
              }
              activeDot={{ r: 6 }}
            >
              {filter !== 'Todos' && !isMobile && (
                <LabelList
                  position="top"
                  offset={15}
                  fill={chartConfig4['Branca'].color}
                  fontSize={15}
                  fontWeight={'bold'}
                />
              )}
            </Line>
          )}
          {(filter === 'Todos' || filter === 'Preta') && (
            <Line
              dataKey="Preta"
              type="linear"
              stroke={chartConfig4['Preta'].color}
              strokeWidth={2}
              dot={
                filter === 'Todos'
                  ? { fill: chartConfig4['Preta'].color } // dot simples
                  : isMobile
                    ? (props) => <CustomDot {...props} fill={chartConfig4['Preta'].color} /> // mobile = dot customizado
                    : (props) => <SimpleDot {...props} fill={chartConfig4['Preta'].color} /> // desktop = dot normal
              }
              activeDot={{ r: 6 }}
            >
              {filter !== 'Todos' && !isMobile && (
                <LabelList
                  position="top"
                  offset={15}
                  fill={chartConfig4['Preta'].color}
                  fontSize={15}
                  fontWeight={'bold'}
                />
              )}
            </Line>
          )}
          {(filter === 'Todos' || filter === 'Parda') && (
            <Line
              dataKey="Parda"
              type="linear"
              stroke={chartConfig4['Parda'].color}
              strokeWidth={2}
              dot={
                filter === 'Todos'
                  ? { fill: chartConfig4['Parda'].color } // dot simples
                  : isMobile
                    ? (props) => <CustomDot {...props} fill={chartConfig4['Parda'].color} /> // mobile = dot customizado
                    : (props) => <SimpleDot {...props} fill={chartConfig4['Parda'].color} /> // desktop = dot normal
              }
              activeDot={{ r: 6 }}
            >
              {filter !== 'Todos' && !isMobile && (
                <LabelList
                  position="top"
                  offset={15}
                  fill={chartConfig4['Parda'].color}
                  fontSize={15}
                  fontWeight={'bold'}
                />
              )}
            </Line>
          )}
          {(filter === 'Todos' || filter === 'Amarela') && (
            <Line
              dataKey="Amarela"
              type="linear"
              stroke={chartConfig4['Amarela'].color}
              strokeWidth={2}
              dot={
                filter === 'Todos'
                  ? { fill: chartConfig4['Amarela'].color } // dot simples
                  : isMobile
                    ? (props) => <CustomDot {...props} fill={chartConfig4['Amarela'].color} /> // mobile = dot customizado
                    : (props) => <SimpleDot {...props} fill={chartConfig4['Amarela'].color} /> // desktop = dot normal
              }
              activeDot={{ r: 6 }}
            >
              {filter !== 'Todos' && !isMobile && (
                <LabelList
                  position="top"
                  offset={15}
                  fill={chartConfig4['Amarela'].color}
                  fontSize={15}
                  fontWeight={'bold'}
                />
              )}
            </Line>
          )}
          {(filter === 'Todos' || filter === 'Indigena') && (
            <Line
              dataKey="Indigena"
              type="linear"
              stroke={chartConfig4['Indigena'].color}
              strokeWidth={2}
              dot={
                filter === 'Todos'
                  ? { fill: chartConfig4['Indigena'].color } // dot simples
                  : isMobile
                    ? (props) => <CustomDot {...props} fill={chartConfig4['Indigena'].color} /> // mobile = dot customizado
                    : (props) => <SimpleDot {...props} fill={chartConfig4['Indigena'].color} /> // desktop = dot normal
              }
              activeDot={{ r: 6 }}
            >
              {filter !== 'Todos' && !isMobile && (
                <LabelList
                  position="top"
                  offset={15}
                  fill={chartConfig4['Indigena'].color}
                  fontSize={15}
                  fontWeight={'bold'}
                />
              )}
            </Line>
          )}
          {(filter === 'Todos' || filter === 'Indefinido') && (
            <Line
              dataKey="Indefinido"
              type="linear"
              stroke={chartConfig4['Indefinido'].color}
              strokeWidth={2}
              dot={
                filter === 'Todos'
                  ? { fill: chartConfig4['Indefinido'].color } // dot simples
                  : isMobile
                    ? (props) => <CustomDot {...props} fill={chartConfig4['Indefinido'].color} /> // mobile = dot customizado
                    : (props) => <SimpleDot {...props} fill={chartConfig4['Indefinido'].color} /> // desktop = dot normal
              }
              activeDot={{ r: 6 }}
            >
              {filter !== 'Todos' && !isMobile && (
                <LabelList
                  position="top"
                  offset={15}
                  fill={chartConfig4['Indefinido'].color}
                  fontSize={15}
                  fontWeight={'bold'}
                />
              )}
            </Line>
          )}
        </LineChart>
      </ChartContainer>
      <Dialog open={dialog} onClose={toggleDialog}>
        <DialogTitle id="alert-dialog-title">Evolução da cor/raça dos ingressantes</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Mostra como a proporção de cada grupo de cor/raça variou ao longo dos anos
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} autoFocus>
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
