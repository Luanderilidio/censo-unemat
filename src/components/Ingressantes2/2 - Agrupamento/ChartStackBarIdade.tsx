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
              radius={[0, 0, 4, 4]}
            >
              {filter !== 'Todos' && (
                <LabelList
                  dataKey="Ing_0_17"
                  position="insideTop"
                  fill="#FFF"
                  className="font-bold text-xs font-Roboto"
                />
              )}
            </Bar>
          )}
          {(filter === 'Todos' || filter === 'Ing_18_24') && (
            <Bar
              dataKey="Ing_18_24"
              stackId="a"
              fill={faker.color.rgb({ casing: 'upper' })}
              radius={[4, 4, 0, 0]}
            >
              {filter !== 'Todos' && (
                <LabelList
                  dataKey="Ing_18_24"
                  position="insideTop"
                  fill="#FFF"
                  className="font-bold text-xs font-Roboto"
                />
              )}
            </Bar>
          )}{' '}
          {(filter === 'Todos' || filter === 'Ing_25_29') && (
            <Bar
              dataKey="Ing_25_29"
              stackId="a"
              fill={faker.color.rgb({ casing: 'upper' })}
              radius={[4, 4, 0, 0]}
            >
              {filter !== 'Todos' && (
                <LabelList
                  dataKey="Ing_25_29"
                  position="insideTop"
                  fill="#FFF"
                  className="font-bold text-xs font-Roboto"
                />
              )}
            </Bar>
          )}
          {(filter === 'Todos' || filter === 'Ing_30_34') && (
            <Bar
              dataKey="Ing_30_34"
              stackId="a"
              fill={faker.color.rgb({ casing: 'upper' })}
              radius={[4, 4, 0, 0]}
            >
              {filter !== 'Todos' && (
                <LabelList
                  dataKey="Ing_30_34"
                  position="insideTop"
                  fill="#FFF"
                  className="font-bold text-xs font-Roboto"
                />
              )}
            </Bar>
          )}
          {(filter === 'Todos' || filter === 'Ing_35_39') && (
            <Bar
              dataKey="Ing_35_39"
              stackId="a"
              fill={faker.color.rgb({ casing: 'upper' })}
              radius={[4, 4, 0, 0]}
            >
              {filter !== 'Todos' && (
                <LabelList
                  dataKey="Ing_35_39"
                  position="insideTop"
                  fill="#FFF"
                  className="font-bold text-xs font-Roboto"
                />
              )}
            </Bar>
          )}
          {(filter === 'Todos' || filter === 'Ing_40_49') && (
            <Bar
              dataKey="Ing_40_49"
              stackId="a"
              fill={faker.color.rgb({ casing: 'upper' })}
              radius={[4, 4, 0, 0]}
            >
              {filter !== 'Todos' && (
                <LabelList
                  dataKey="Ing_40_49"
                  position="insideTop"
                  fill="#FFF"
                  className="font-bold text-xs font-Roboto"
                />
              )}
            </Bar>
          )}
          {(filter === 'Todos' || filter === 'Ing_50_59') && (
            <Bar
              dataKey="Ing_50_59"
              stackId="a"
              fill={faker.color.rgb({ casing: 'upper' })}
              radius={[4, 4, 0, 0]}
            >
              {filter !== 'Todos' && (
                <LabelList
                  dataKey="Ing_50_59"
                  position="insideTop"
                  fill="#FFF"
                  className="font-bold text-xs font-Roboto"
                />
              )}
            </Bar>
          )}
          {(filter === 'Todos' || filter === 'Ing_60_mais') && (
            <Bar
              dataKey="Ing_60_mais"
              stackId="a"
              fill={faker.color.rgb({ casing: 'upper' })}
              radius={[4, 4, 0, 0]}
            >
              {filter !== 'Todos' && (
                <LabelList
                  dataKey="Ing_60_mais"
                  position="insideTop"
                  fill="#FFF"
                  className="font-bold text-xs font-Roboto"
                />
              )}
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
