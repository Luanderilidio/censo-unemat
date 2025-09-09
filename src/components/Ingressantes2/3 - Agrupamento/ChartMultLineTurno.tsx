'use client';

import { TrendingUp } from 'lucide-react';
import { CartesianGrid, Label, LabelList, Line, LineChart, XAxis, YAxis } from 'recharts';
import { faker } from '@faker-js/faker';

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
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
import { chartConfig3 } from './data';
import { DataEntrantsShift } from '../SchemaEntrants';

export const description = 'A line chart with a label';

type ChartMultLineTurnoProps = {
  chartData?: DataEntrantsShift;
};

export function ChartMultLineTurno({ chartData }: ChartMultLineTurnoProps) {
  const [dialog, openDialog, closeDialog, toggleDialog] = useBoolean();
  const [filter, setFilter] = useState<'Todos' | 'Diurno' | 'Noturno'>('Todos');

  return (
    <div className="!h-[600px] boder  border-red-500 rounded-lg bg-white shadow-md">
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
          <h1 className="font-bold text-xl">Evolução do turno dos ingressantes</h1>
        </div>
        <FormControl size="small" className="w-40">
          <InputLabel>Filtro</InputLabel>
          <Select value={filter} label="Filtro" onChange={(e) => setFilter(e.target.value as any)}>
            <MenuItem value="Todos">Todos</MenuItem>
            <MenuItem value="Diurno">Diurno</MenuItem>
            <MenuItem value="Noturno">Noturno</MenuItem>
          </Select>
        </FormControl>
      </div>
      <ChartContainer config={chartConfig3} className="h-[460px] p-4 w-full">
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
            tickMargin={5}
            axisLine={false}
            interval={1}
            tickFormatter={(val) => val.slice(0, 4)}
          >
            <Label
              value="Ano"
              position="bottom"
              offset={-5}
              style={{ textAnchor: 'middle', fontWeight: 'bold', fontSize: 14 }}
            />
          </XAxis>
          <YAxis
            tickLine={true}
            axisLine={false}
            tick={false}
            tickFormatter={(val) => val}
            width={0}
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
              <div className="flex items-center justify-center flex-wrap gap-4 mb-4">
                {payload?.map((entry, index) => {
                  const conf = chartConfig3[entry.value as keyof typeof chartConfig3];
                  return (
                    <div key={index} className="flex items-center gap-2">
                      <span
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: conf?.color ?? '#999' }}
                      />
                      <span style={{ color: conf?.color ?? '#999', fontWeight: 'bold' }}>
                        {conf?.label ?? entry.value}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          />
          <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
          {(filter === 'Todos' || filter === 'Diurno') && (
            <Line
              dataKey="Diurno"
              type="linear"
              stroke={chartConfig3['Diurno'].color}
              strokeWidth={2}
              dot={{ fill: chartConfig3['Diurno'].color }}
              activeDot={{ r: 6 }}
            >
              <LabelList
                position="top"
                offset={10}
                fill={chartConfig3['Diurno'].color}
                fontSize={12}
                fontWeight={'bold'}
              />
            </Line>
          )}
          {(filter === 'Todos' || filter === 'Noturno') && (
            <Line
              dataKey="Noturno"
              type="linear"
              stroke={chartConfig3['Noturno'].color}
              strokeWidth={2}
              dot={{ fill: chartConfig3['Noturno'].color }}
              activeDot={{ r: 6 }}
            >
              <LabelList
                position="top"
                offset={10}
                fill={chartConfig3['Noturno'].color}
                fontSize={12}
                fontWeight={'bold'}
              />
            </Line>
          )}
        </LineChart>
      </ChartContainer>
      <Dialog open={dialog} onClose={toggleDialog}>
        <DialogTitle id="alert-dialog-title">Evolução do turno dos ingressantes</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Mostra a variação no número de ingressantes do turno diurno e noturno
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
