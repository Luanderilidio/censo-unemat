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
import { chartConfig5, chartData5 } from './data';

export function StackedBarChartForma() {
  const [dialog, openDialog, closeDialog, toggleDialog] = useBoolean();

  const [filter, setFilter] = useState<
    | 'Todos'
    | 'Vestibular'
    | 'Enem'
    | 'Avaliação_Seriada'
    | 'Seleção_Simplificada'
    | 'EGR'
    | 'Outro_Tipo_Seleção'
    | 'Processo_Seletivo'
    | 'Vaga_Remanescente'
    | 'Programa_Especial'
    | 'Outra_Forma'
  >('Vestibular');

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
            <MenuItem value="Vestibular">Vestibular</MenuItem>
            <MenuItem value="Enem">Enem</MenuItem>
            <MenuItem value="Avaliação_Seriada">Avaliação_Seriada</MenuItem>
            <MenuItem value="Seleção_Simplificada">Seleção_Simplificada</MenuItem>
            <MenuItem value="EGR">EGR</MenuItem>
            <MenuItem value="Outro_Tipo_Seleção">Outro_Tipo_Seleção</MenuItem>
            <MenuItem value="Vaga_Remanescente">Vaga_Remanescente</MenuItem>
            <MenuItem value="Processo_Seletivo">Processo_Seletivo</MenuItem>
            <MenuItem value="Programa_Especial">Programa_Especial</MenuItem>
          </Select>
        </FormControl>
      </div>
      <ChartContainer config={chartConfig5} className="h-[450px] px-4 pb-2 w-full">
        <BarChart accessibilityLayer data={chartData5}>
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
                {payload?.map((entry, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: chartConfig5[entry.value].color }}
                    />
                    <span style={{ color: chartConfig5[entry.value].color, fontWeight: 'bold' }}>
                      {chartConfig5[entry.value].label}
                    </span>
                  </div>
                ))}
              </div>
            )}
          />
          {(filter === 'Todos' || filter === 'Vestibular') && (
            <Bar
              dataKey="Vestibular"
              stackId="a"
              fill={faker.color.rgb({ casing: 'upper' })}
              radius={[0, 0, 4, 4]}
            >
              {filter !== 'Todos' && (
                <LabelList
                  dataKey="Vestibular"
                  position="insideTop"
                  fill="#FFF"
                  className="font-bold text-xs font-Roboto"
                />
              )}
            </Bar>
          )}
          {(filter === 'Todos' || filter === 'Enem') && (
            <Bar
              dataKey="Enem"
              stackId="a"
              fill={faker.color.rgb({ casing: 'upper' })}
              radius={[4, 4, 0, 0]}
            >
              {filter !== 'Todos' && (
                <LabelList
                  dataKey="Enem"
                  position="insideTop"
                  fill="#FFF"
                  className="font-bold text-xs font-Roboto"
                />
              )}
            </Bar>
          )}{' '}
          {(filter === 'Todos' || filter === 'Avaliação_Seriada') && (
            <Bar
              dataKey="Avaliação_Seriada"
              stackId="a"
              fill={faker.color.rgb({ casing: 'upper' })}
              radius={[4, 4, 0, 0]}
            >
              {filter !== 'Todos' && (
                <LabelList
                  dataKey="Avaliação_Seriada"
                  position="insideTop"
                  fill="#FFF"
                  className="font-bold text-xs font-Roboto"
                />
              )}
            </Bar>
          )}
          {(filter === 'Todos' || filter === 'Seleção_Simplificada') && (
            <Bar
              dataKey="Seleção_Simplificada"
              stackId="a"
              fill={faker.color.rgb({ casing: 'upper' })}
              radius={[4, 4, 0, 0]}
            >
              {filter !== 'Todos' && (
                <LabelList
                  dataKey="Seleção_Simplificada"
                  position="insideTop"
                  fill="#FFF"
                  className="font-bold text-xs font-Roboto"
                />
              )}
            </Bar>
          )}
          {(filter === 'Todos' || filter === 'EGR') && (
            <Bar
              dataKey="EGR"
              stackId="a"
              fill={faker.color.rgb({ casing: 'upper' })}
              radius={[4, 4, 0, 0]}
            >
              {filter !== 'Todos' && (
                <LabelList
                  dataKey="EGR"
                  position="insideTop"
                  fill="#FFF"
                  className="font-bold text-xs font-Roboto"
                />
              )}
            </Bar>
          )}
          {(filter === 'Todos' || filter === 'Outro_Tipo_Seleção') && (
            <Bar
              dataKey="Outro_Tipo_Seleção"
              stackId="a"
              fill={faker.color.rgb({ casing: 'upper' })}
              radius={[4, 4, 0, 0]}
            >
              {filter !== 'Todos' && (
                <LabelList
                  dataKey="Outro_Tipo_Seleção"
                  position="insideTop"
                  fill="#FFF"
                  className="font-bold text-xs font-Roboto"
                />
              )}
            </Bar>
          )}
          {(filter === 'Todos' || filter === 'Processo_Seletivo') && (
            <Bar
              dataKey="Processo_Seletivo"
              stackId="a"
              fill={faker.color.rgb({ casing: 'upper' })}
              radius={[4, 4, 0, 0]}
            >
              {filter !== 'Todos' && (
                <LabelList
                  dataKey="Processo_Seletivo"
                  position="insideTop"
                  fill="#FFF"
                  className="font-bold text-xs font-Roboto"
                />
              )}
            </Bar>
          )}
          {(filter === 'Todos' || filter === 'Vaga_Remanescente') && (
            <Bar
              dataKey="Vaga_Remanescente"
              stackId="a"
              fill={faker.color.rgb({ casing: 'upper' })}
              radius={[4, 4, 0, 0]}
            >
              {filter !== 'Todos' && (
                <LabelList
                  dataKey="Vaga_Remanescente"
                  position="insideTop"
                  fill="#FFF"
                  className="font-bold text-xs font-Roboto"
                />
              )}
            </Bar>
          )}
          {(filter === 'Todos' || filter === 'Programa_Especial') && (
            <Bar
              dataKey="Programa_Especial"
              stackId="a"
              fill={faker.color.rgb({ casing: 'upper' })}
              radius={[4, 4, 0, 0]}
            >
              {filter !== 'Todos' && (
                <LabelList
                  dataKey="Programa_Especial"
                  position="insideTop"
                  fill="#FFF"
                  className="font-bold text-xs font-Roboto"
                />
              )}
            </Bar>
          )}
          {(filter === 'Todos' || filter === 'Outra_Forma') && (
            <Bar
              dataKey="Outra_Forma"
              stackId="a"
              fill={faker.color.rgb({ casing: 'upper' })}
              radius={[4, 4, 0, 0]}
            >
              {filter !== 'Todos' && (
                <LabelList
                  dataKey="Outra_Forma"
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
