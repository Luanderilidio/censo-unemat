'use client';

import { useState } from 'react';
import { Bar, BarChart, Label, LabelList, XAxis, YAxis } from 'recharts';
import { 
  ChartContainer,
  ChartTooltip, 
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
import { chartConfig4 } from './data';
import { DataEntrantsColor } from '../SchemaEntrants';

type StackedBarChartProps = {
  chartData?: DataEntrantsColor;
};
export function StackedBarChartCor({ chartData }: StackedBarChartProps) {
  const [dialog, openDialog, closeDialog, toggleDialog] = useBoolean();

  const [filter, setFilter] = useState<
    'Todos' | 'Branca' | 'Preta' | 'Parda' | 'Amarela' | 'Indigena' | 'Indefinido'
  >('Todos');

  const formatedData = chartData?.map((d) => {
    const total = d.Branca + d.Preta + d.Parda + d.Amarela + d.Indigena + d.Indefinido;

    return {
      year: d.year,
      total, 
      Branca: filter === 'Todos' ? (d.Branca / total) * 100 : d.Branca,
      Preta: filter === 'Todos' ? (d.Preta / total) * 100 : d.Preta,
      Parda: filter === 'Todos' ? (d.Parda / total) * 100 : d.Parda,
      Amarela: filter === 'Todos' ? (d.Amarela / total) * 100 : d.Amarela,
      Indigena: filter === 'Todos' ? (d.Indigena / total) * 100 : d.Indigena,
      Indefinido: filter === 'Todos' ? (d.Indefinido / total) * 100 : d.Indefinido,
      abs: {
        Branca: d.Branca,
        Preta: d.Preta,
        Parda: d.Parda,
        Amarela: d.Amarela,
        Indigena: d.Indigena,
        Indefinido: d.Indefinido,
      },
    };
  });

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
      <div className="flex px-4 pt-2 pb-2  items-center justify-between gap-1 text-black/70">
        <div className="flex flex-col items-start gap-1 justify-start">
          <h1 className="font-bold text-xl">Comparativo anual por cor/raça</h1>
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
      <ChartContainer config={chartConfig4} className="h-[450px] px-4 pb-2 w-full">
        <BarChart accessibilityLayer data={formatedData}>
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
            domain={filter === 'Todos' ? [0, 100] : [0, 'auto']}
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
          <ChartTooltip
            content={({ payload }) => {
              if (!payload || !payload.length) return null;
              const data = payload[0].payload; // linha inteira do ano
              return (
                <div className="bg-white shadow p-2 rounded text-sm">
                  <p className="w-full text-center mb-1 font-bold text-black/40">{data.year}</p>
                  {payload.map((item) => {
                    const key = item.dataKey as keyof typeof data.abs;
                    return (
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center justify-start gap-1">
                          <div
                            className="w-[10px] h-[10px] rounded-[2px] "
                            style={{ backgroundColor: item.color }}
                          />
                          <span className="font-light text-xs text-black/50">{String(key)}:</span>
                        </div>
                        <span className="font-normal text-xs">{data.abs[key]}</span>
                      </div>
                    );
                  })}
                </div>
              );
            }}
          />
          <ChartLegend
            verticalAlign="top"
            content={({ payload }) => (
              <div className="flex items-center justify-center flex-wrap gap-4 mb-4 ">
                {payload?.map((entry, index) => {
                  const conf = chartConfig4[entry.value as keyof typeof chartConfig4];
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
          {(filter === 'Todos' || filter === 'Branca') && (
            <Bar
              dataKey="Branca"
              stackId="a"
              fill={chartConfig4['Branca'].color}
              radius={[0, 0, 0, 0]}
            >
              <LabelList
                dataKey="Branca"
                position="insideTop"
                fill="#FFF"
                className="font-bold text-xs font-Roboto"
                content={(props) => {
                  const { x, y, width, height, value } = props;
                  const numericValue = Number(value ?? 0);
                  const numericHeight = Number(height ?? 0);
                  const numericX = Number(x ?? 0);
                  const numericY = Number(y ?? 0);
                  const numericWidth = Number(width ?? 0);

                  if (numericValue <= 0 || numericHeight < 15) return null;

                  return (
                    <text
                      x={numericX + numericWidth / 2}
                      y={numericY + numericHeight / 2}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill="#FFF"
                      fontSize={12}
                      fontWeight="bold"
                    >
                      {numericValue.toFixed(0)}
                      {filter === 'Todos' && '% '}
                    </text>
                  );
                }}
              />
            </Bar>
          )}
          {(filter === 'Todos' || filter === 'Preta') && (
            <Bar
              dataKey="Preta"
              stackId="a"
              fill={chartConfig4['Preta'].color}
              radius={[0, 0, 0, 0]}
            >
              <LabelList
                dataKey="Preta"
                position="insideTop"
                fill="#FFF"
                className="font-bold text-xs font-Roboto"
                content={(props) => {
                  const { x, y, width, height, value } = props;
                  const numericValue = Number(value ?? 0);
                  const numericHeight = Number(height ?? 0);
                  const numericX = Number(x ?? 0);
                  const numericY = Number(y ?? 0);
                  const numericWidth = Number(width ?? 0);

                  if (numericValue <= 0 || numericHeight < 15) return null;

                  return (
                    <text
                      x={numericX + numericWidth / 2}
                      y={numericY + numericHeight / 2}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill="#FFF"
                      fontSize={12}
                      fontWeight="bold"
                    >
                      {numericValue.toFixed(0)}
                      {filter === 'Todos' && '% '}
                    </text>
                  );
                }}
              />
            </Bar>
          )}
          {(filter === 'Todos' || filter === 'Parda') && (
            <Bar
              dataKey="Parda"
              stackId="a"
              fill={chartConfig4['Parda'].color}
              radius={[0, 0, 0, 0]}
            >
              <LabelList
                dataKey="Parda"
                position="insideTop"
                fill="#FFF"
                className="font-bold text-xs font-Roboto"
                content={(props) => {
                  const { x, y, width, height, value } = props;
                  const numericValue = Number(value ?? 0);
                  const numericHeight = Number(height ?? 0);
                  const numericX = Number(x ?? 0);
                  const numericY = Number(y ?? 0);
                  const numericWidth = Number(width ?? 0);

                  if (numericValue <= 0 || numericHeight < 15) return null;

                  return (
                    <text
                      x={numericX + numericWidth / 2}
                      y={numericY + numericHeight / 2}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill="#FFF"
                      fontSize={12}
                      fontWeight="bold"
                    >
                      {numericValue.toFixed(0)}
                      {filter === 'Todos' && '% '}
                    </text>
                  );
                }}
              />
            </Bar>
          )}
          {(filter === 'Todos' || filter === 'Amarela') && (
            <Bar
              dataKey="Amarela"
              stackId="a"
              fill={chartConfig4['Amarela'].color}
              radius={[0, 0, 0, 0]}
            >
              <LabelList
                dataKey="Amarela"
                position="insideTop"
                fill="#FFF"
                className="font-bold text-xs font-Roboto"
                content={(props) => {
                  const { x, y, width, height, value } = props;
                  const numericValue = Number(value ?? 0);
                  const numericHeight = Number(height ?? 0);
                  const numericX = Number(x ?? 0);
                  const numericY = Number(y ?? 0);
                  const numericWidth = Number(width ?? 0);

                  if (numericValue <= 0 || numericHeight < 15) return null;

                  return (
                    <text
                      x={numericX + numericWidth / 2}
                      y={numericY + numericHeight / 2}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill="#FFF"
                      fontSize={12}
                      fontWeight="bold"
                    >
                      {numericValue.toFixed(0)}
                      {filter === 'Todos' && '% '}
                    </text>
                  );
                }}
              />
            </Bar>
          )}
          {(filter === 'Todos' || filter === 'Indigena') && (
            <Bar
              dataKey="Indigena"
              stackId="a"
              fill={chartConfig4['Indigena'].color}
              radius={[0, 0, 0, 0]}
            >
              <LabelList
                dataKey="Indigena"
                position="insideTop"
                fill="#FFF"
                className="font-bold text-xs font-Roboto"
                content={(props) => {
                  const { x, y, width, height, value } = props;
                  const numericValue = Number(value ?? 0);
                  const numericHeight = Number(height ?? 0);
                  const numericX = Number(x ?? 0);
                  const numericY = Number(y ?? 0);
                  const numericWidth = Number(width ?? 0);

                  if (numericValue <= 0 || numericHeight < 15) return null;

                  return (
                    <text
                      x={numericX + numericWidth / 2}
                      y={numericY + numericHeight / 2}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill="#FFF"
                      fontSize={12}
                      fontWeight="bold"
                    >
                      {numericValue.toFixed(0)}
                      {filter === 'Todos' && '% '}
                    </text>
                  );
                }}
              />
            </Bar>
          )}
          {(filter === 'Todos' || filter === 'Indefinido') && (
            <Bar
              dataKey="Indefinido"
              stackId="a"
              fill={chartConfig4['Indefinido'].color}
              radius={[0, 0, 0, 0]}
            >
              <LabelList
                dataKey="Indefinido"
                position="insideTop"
                fill="#FFF"
                className="font-bold text-xs font-Roboto"
                content={(props) => {
                  const { x, y, width, height, value } = props;
                  const numericValue = Number(value ?? 0);
                  const numericHeight = Number(height ?? 0);
                  const numericX = Number(x ?? 0);
                  const numericY = Number(y ?? 0);
                  const numericWidth = Number(width ?? 0);

                  if (numericValue <= 0 || numericHeight < 15) return null;

                  return (
                    <text
                      x={numericX + numericWidth / 2}
                      y={numericY + numericHeight / 2}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill="#FFF"
                      fontSize={12}
                      fontWeight="bold"
                    >
                      {numericValue.toFixed(0)}
                      {filter === 'Todos' && '% '}
                    </text>
                  );
                }}
              />
            </Bar>
          )}
        </BarChart>
      </ChartContainer>
      <Dialog open={dialog} onClose={toggleDialog}>
        <DialogTitle id="alert-dialog-title">Comparativo anual por cor/raça</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">Quantidade de ingressantes em cada grupo de cor/raça, por ano</DialogContentText>
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
