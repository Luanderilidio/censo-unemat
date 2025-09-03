'use client';

import React, { useState } from 'react';
import { Bar, BarChart, Label, LabelList, XAxis, YAxis } from 'recharts';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
} from '../../ui/chart';
import { faker } from '@faker-js/faker';
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
import { FaChartBar, FaQuestionCircle } from 'react-icons/fa';
import { useBoolean } from 'react-hooks-shareable';
import { chartConfig3 } from './data';
import { DataEntrantsShift } from '../SchemaEntrants';

type StackedBarChartTurnoProps = {
  chartData?: DataEntrantsShift;
};

export function StackedBarChartTurno({ chartData }: StackedBarChartTurnoProps) {
  const [dialog, openDialog, closeDialog, toggleDialog] = useBoolean();

  const [filter, setFilter] = useState<'Todos' | 'Diurno' | 'Noturno'>('Todos');

  return (
    <div className="!h-[600px] boder  border-red-500 rounded-lg bg-white shadow-md">
      <div className="flex px-4 pt-4 pb-2 border-b items-center justify-between gap-1 text-black/70">
        <div className="flex items-center gap-1 justify-start">
          <FaChartBar size={18} />
          <h1 className="font-semibold text-sm">Gráfico de Barras</h1>
        </div>
        <IconButton onClick={openDialog}>
          <FaQuestionCircle size={20} className="text-black/10" />
        </IconButton>
      </div>
      <div className="flex px-4 pt-4 pb-2  items-center justify-between gap-1 text-black/70">
        <div className="flex flex-col items-start gap-1 justify-start">
          <h1 className="font-bold text-xl">title</h1>
          <h2 className="font-normal leading-none ">subtitle</h2>
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
      <ChartContainer config={chartConfig3} className="h-[450px] px-4 pb-2 w-full">
        <BarChart accessibilityLayer data={chartData}>
          <XAxis
            dataKey="year"
            tickLine={true}
            tickMargin={5}
            axisLine={true}
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
            tickLine={true} // remove os traços dos ticks, opcional
            axisLine={false} // exibe a linha do eixo
            tick={false}
            // tick={{ fontSize: 12, fontWeight: 'bold', fill: '#333' }}  // estilo do texto
            tickFormatter={(val) => val} // formata os números se quiser (ex: 1k, 2k)
            width={20} // largura reservada para os números
          >
            <Label
              value="Quantidade"
              offset={0}
              angle={-90}
              position="center"
              style={{ textAnchor: 'middle', fontWeight: 'bold', fontSize: 14 }}
            />
          </YAxis>
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend
            verticalAlign="top"
            content={({ payload }) => (
              <div className="flex items-center justify-center flex-wrap gap-4 ">
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
          {(filter === 'Todos' || filter === 'Diurno') && (
            <Bar
              dataKey="Diurno"
              stackId="a"
              fill={faker.color.rgb({ casing: 'upper' })}
              radius={[0, 0, 4, 4]}
            >
              <LabelList
                dataKey="Diurno"
                position="insideTop"
                fill="#FFF"
                className="font-bold text-xs font-Roboto"
              />
            </Bar>
          )}
          {(filter === 'Todos' || filter === 'Noturno') && (
            <Bar
              dataKey="Noturno"
              stackId="a"
              fill={faker.color.rgb({ casing: 'upper' })}
              radius={[4, 4, 0, 0]}
            >
              <LabelList
                dataKey="Noturno"
                position="top"
                fill="#FFF"
                className="font-bold text-xs font-Roboto"
              />
            </Bar>
          )}
        </BarChart>
      </ChartContainer>
      <Dialog open={dialog} onClose={toggleDialog}>
        <DialogTitle id="alert-dialog-title">titleDialog</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">descriptionDialog</DialogContentText>
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
