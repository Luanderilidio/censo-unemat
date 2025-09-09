'use client';

import { TrendingUp } from 'lucide-react';
import { CartesianGrid, Label, LabelList, Line, LineChart, XAxis, YAxis } from 'recharts';
import { faker } from '@faker-js/faker';

import {
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
import { chartConfig1 } from './data';
import { DataEntrantsSex } from '../SchemaEntrants';

export const description = 'A line chart with a label';

type ChartMultLineSexoProps = {
  chartData?: DataEntrantsSex;
};

export function ChartMultLineSexo({ chartData }: ChartMultLineSexoProps) {
  const [dialog, openDialog, closeDialog, toggleDialog] = useBoolean();

  const [filter, setFilter] = useState<'Todos' | 'Masculino' | 'Feminino'>('Todos');

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
          <h1 className="font-bold text-xl">Evolução do sexo dos ingressantes</h1> 
        </div>
        <FormControl size="small" className="w-40">
          <InputLabel>Filtro</InputLabel>
          <Select value={filter} label="Filtro" onChange={(e) => setFilter(e.target.value as any)}>
            <MenuItem value="Todos">Todos</MenuItem>
            <MenuItem value="Masculino">Masculino</MenuItem>
            <MenuItem value="Feminino">Feminino</MenuItem>
          </Select>
        </FormControl>
      </div>
      <ChartContainer config={chartConfig1} className="h-[460px] p-4 w-full">
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
              <div className="flex items-center justify-center flex-wrap gap-4 mb-5 ">
                {payload?.map((entry, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: chartConfig1[entry.value].color }}
                    />
                    <span style={{ color: chartConfig1[entry.value].color, fontWeight: 'bold' }}>
                      {chartConfig1[entry.value].label}
                    </span>
                  </div>
                ))}
              </div>
            )}
          />

          <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
          {(filter === 'Todos' || filter === 'Feminino') && (
            <Line
              dataKey="Feminino"
              type="linear"
              stroke={chartConfig1['Feminino'].color}
              strokeWidth={3}
              dot={{ fill: chartConfig1['Feminino'].color }}
              activeDot={{ r: 7 }}
            >
              <LabelList
                position="top"
                offset={15}
                fill={chartConfig1['Feminino'].color}
                fontSize={15}
                fontWeight={'bold'}
              />
            </Line>
          )}
          {(filter === 'Todos' || filter === 'Masculino') && (
            <Line
              dataKey="Masculino"
              type="linear"
              stroke={chartConfig1['Masculino'].color}
              strokeWidth={3}
              dot={{ fill: chartConfig1['Masculino'].color }}
              activeDot={{ r: 7 }}
            >
              <LabelList
                position="bottom"
                offset={15}
                fill={chartConfig1['Masculino'].color}
                fontSize={15}
                fontWeight={'bold'}
              />
            </Line>
          )}
        </LineChart>
      </ChartContainer>
      <Dialog open={dialog} onClose={toggleDialog}>
        <DialogTitle id="alert-dialog-title">Evolução do sexo dos ingressantes</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">Mostra como a proporção de homens e mulheres variou ao longo dos anos</DialogContentText>
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
