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
import { chartConfig2 } from './data';
import { DataEntrantsAge } from '../SchemaEntrants';

type StackedBarChartIdadeProps = {
  chartData?: DataEntrantsAge;
};

export function StackedBarChartIdade({ chartData }: StackedBarChartIdadeProps) {
  const [dialog, openDialog, closeDialog, toggleDialog] = useBoolean();

  const [filter, setFilter] = useState<
    | 'Todos'
    | 'Ing_0_17'
    | 'Ing_18_24'
    | 'Ing_25_29'
    | 'Ing_30_34'
    | 'Ing_35_39'
    | 'Ing_40_49'
    | 'Ing_50_59'
    | 'Ing_60_mais'
  >('Ing_0_17');

  const formatedData = chartData?.map((d) => {
    const total =
      d.Ing_0_17 +
      d.Ing_18_24 +
      d.Ing_25_29 +
      d.Ing_30_34 +
      d.Ing_35_39 +
      d.Ing_40_49 +
      d.Ing_50_59 +
      d.Ing_60_mais;

    return {
      year: d.year,
      total,
      // 👇 Percentuais só se filtro for "Todos"
      Ing_0_17: filter === 'Todos' ? (d.Ing_0_17 / total) * 100 : d.Ing_0_17,
      Ing_18_24: filter === 'Todos' ? (d.Ing_18_24 / total) * 100 : d.Ing_18_24,
      Ing_25_29: filter === 'Todos' ? (d.Ing_25_29 / total) * 100 : d.Ing_25_29,
      Ing_30_34: filter === 'Todos' ? (d.Ing_30_34 / total) * 100 : d.Ing_30_34,
      Ing_35_39: filter === 'Todos' ? (d.Ing_35_39 / total) * 100 : d.Ing_35_39,
      Ing_40_49: filter === 'Todos' ? (d.Ing_40_49 / total) * 100 : d.Ing_40_49,
      Ing_50_59: filter === 'Todos' ? (d.Ing_50_59 / total) * 100 : d.Ing_50_59,
      Ing_60_mais: filter === 'Todos' ? (d.Ing_60_mais / total) * 100 : d.Ing_60_mais,
      abs: {
        Ing_0_17: d.Ing_0_17,
        Ing_18_24: d.Ing_18_24,
        Ing_25_29: d.Ing_25_29,
        Ing_30_34: d.Ing_30_34,
        Ing_35_39: d.Ing_35_39,
        Ing_40_49: d.Ing_40_49,
        Ing_50_59: d.Ing_50_59,
        Ing_60_mais: d.Ing_60_mais,
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
      <div className="flex px-4 pt-4 pb-2  items-center justify-between gap-1 text-black/70">
        <div className="flex flex-col items-start gap-1 justify-start">
          <h1 className="font-bold text-xl">title</h1>
          <h2 className="font-normal leading-none ">subtitle</h2>
        </div>
        <FormControl size="small" className="w-40">
          <InputLabel>Filtro</InputLabel>
          <Select value={filter} label="Filtro" onChange={(e) => setFilter(e.target.value as any)}>
            <MenuItem value="Todos">Todos</MenuItem>
            <MenuItem value="Ing_0_17">Ing_0_17</MenuItem>
            <MenuItem value="Ing_18_24">Ing_18_24</MenuItem>
            <MenuItem value="Ing_25_29">Ing_25_29</MenuItem>
            <MenuItem value="Ing_30_34">Ing_30_34</MenuItem>
            <MenuItem value="Ing_35_39">Ing_35_39</MenuItem>
            <MenuItem value="Ing_40_49">Ing_40_49</MenuItem>
            <MenuItem value="Ing_50_59">Ing_50_59</MenuItem>
            <MenuItem value="Ing_60_mais">Ing_60_ mais</MenuItem>
          </Select>
        </FormControl>
      </div>
      <ChartContainer config={chartConfig2} className="h-[450px] px-4 pb-2 w-full">
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
              position={filter === 'Todos' ? 'center' : 'insideTop'}
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
              <div className="flex items-center justify-center flex-wrap gap-4 ">
                {payload?.map((entry, index) => {
                  const conf = chartConfig2[entry.value as keyof typeof chartConfig2];
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
          {(filter === 'Todos' || filter === 'Ing_0_17') && (
            <Bar
              dataKey="Ing_0_17"
              stackId="a"
              fill={faker.color.rgb({ casing: 'upper' })}
              radius={[0, 0, 0, 0]}
            >
              <LabelList
                dataKey="Ing_0_17"
                position={filter === 'Todos' ? 'center' : 'insideTop'}
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
          {(filter === 'Todos' || filter === 'Ing_18_24') && (
            <Bar
              dataKey="Ing_18_24"
              stackId="a"
              fill={faker.color.rgb({ casing: 'upper' })}
              radius={[0, 0, 0, 0]}
            >
              <LabelList
                dataKey="Ing_18_24"
                position={filter === 'Todos' ? 'center' : 'insideTop'}
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
                // content={(props) => {
                //   const { x, y, width, height, value } = props;

                //   const numericValue = Number(value ?? 0);
                //   const numericHeight = Number(height ?? 0);
                //   const numericX = Number(x ?? 0);
                //   const numericY = Number(y ?? 0);
                //   const numericWidth = Number(width ?? 0);

                //   if (numericValue <= 0 || numericHeight < 15) return null;

                //   return (
                //     <text
                //       x={numericX + numericWidth / 2}
                //       y={numericY + numericHeight / 2}
                //       textAnchor="middle"
                //       dominantBaseline="middle"
                //       fill="#FFF"
                //       fontSize={12}
                //       fontWeight="bold"
                //     >
                //       {numericValue}
                //     </text>
                //   );
                // }}
              />
            </Bar>
          )}{' '}
          {(filter === 'Todos' || filter === 'Ing_25_29') && (
            <Bar
              dataKey="Ing_25_29"
              stackId="a"
              fill={faker.color.rgb({ casing: 'upper' })}
              radius={[0, 0, 0, 0]}
            >
              <LabelList
                dataKey="Ing_25_29"
                position={filter === 'Todos' ? 'center' : 'insideTop'}
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
          {(filter === 'Todos' || filter === 'Ing_30_34') && (
            <Bar
              dataKey="Ing_30_34"
              stackId="a"
              fill={faker.color.rgb({ casing: 'upper' })}
              radius={[0, 0, 0, 0]}
            >
              <LabelList
                dataKey="Ing_30_34"
                position={filter === 'Todos' ? 'center' : 'insideTop'}
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
                      {numericValue.toFixed(0)} {filter === 'Todos' && '% '}
                    </text>
                  );
                }}
              />
            </Bar>
          )}
          {(filter === 'Todos' || filter === 'Ing_35_39') && (
            <Bar
              dataKey="Ing_35_39"
              stackId="a"
              fill={faker.color.rgb({ casing: 'upper' })}
              radius={[0, 0, 0, 0]}
            >
              <LabelList
                dataKey="Ing_35_39"
                position={filter === 'Todos' ? 'center' : 'insideTop'}
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
          {(filter === 'Todos' || filter === 'Ing_40_49') && (
            <Bar
              dataKey="Ing_40_49"
              stackId="a"
              fill={faker.color.rgb({ casing: 'upper' })}
              radius={[0, 0, 0, 0]}
            >
              <LabelList
                dataKey="Ing_40_49"
                position={filter === 'Todos' ? 'center' : 'insideTop'}
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
          {(filter === 'Todos' || filter === 'Ing_50_59') && (
            <Bar
              dataKey="Ing_50_59"
              stackId="a"
              fill={faker.color.rgb({ casing: 'upper' })}
              radius={[0, 0, 0, 0]}
            >
              <LabelList
                dataKey="Ing_50_59"
                position={filter === 'Todos' ? 'center' : 'insideTop'}
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
          {(filter === 'Todos' || filter === 'Ing_60_mais') && (
            <Bar
              dataKey="Ing_60_mais"
              stackId="a"
              fill={faker.color.rgb({ casing: 'upper' })}
              radius={[0, 0, 4, 4]}
            >
              <LabelList
                dataKey="Ing_60_mais"
                position={filter === 'Todos' ? 'center' : 'insideTop'}
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
