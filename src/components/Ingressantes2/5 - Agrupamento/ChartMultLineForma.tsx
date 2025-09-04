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
import { chartConfig5 } from './data';
import { DataEntrantsForm } from '../SchemaEntrants';

export const description = 'A line chart with a label';

type ChartMultLineFormaProps = {
  chartData?: DataEntrantsForm;
};

export function ChartMultLineForma({ chartData }: ChartMultLineFormaProps) {
  const [dialog, openDialog, closeDialog, toggleDialog] = useBoolean();

  const [filter, setFilter] = useState<
    | 'Todos'
    | 'Vestibular'
    | 'Enem'
    | 'Avaliacao_Seriada'
    | 'Selecao_Simplificada'
    | 'EGR'
    | 'Outro_Tipo_Selecao'
    | 'Processo_Seletivo'
    | 'Vaga_Remanescente'
    | 'Programa_Especial'
    | 'Outra_Forma'
  >('Vestibular');

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
          <h1 className="font-bold text-xl">title</h1>
          <h2 className="font-normal leading-none ">subtitle</h2>
        </div>
        <FormControl size="small" className="w-40">
          <InputLabel>Filtro</InputLabel>
          <Select value={filter} label="Filtro" onChange={(e) => setFilter(e.target.value as any)}>
            <MenuItem value="Todos">Todos</MenuItem>
            <MenuItem value="Vestibular">Vestibular</MenuItem>
            <MenuItem value="Enem">Enem</MenuItem>
            <MenuItem value="Avaliacao_Seriada">Avaliacao Seriada</MenuItem>
            <MenuItem value="Selecao_Simplificada">Selecao Simplificada</MenuItem>
            <MenuItem value="EGR">EGR</MenuItem>
            <MenuItem value="Outro_Tipo_Selecao">Outro_Tipo Selecao</MenuItem>
            <MenuItem value="Vaga_Remanescente">Vaga Remanescente</MenuItem>
            <MenuItem value="Processo_Seletivo">Processo Seletivo</MenuItem>
            <MenuItem value="Programa_Especial">Programa Especial</MenuItem>
            <MenuItem value="Outra_Forma">Outra Forma</MenuItem>
          </Select>
        </FormControl>
      </div>
      <ChartContainer config={chartConfig5} className="h-[460px] p-4 w-full">
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
              <div className="flex items-center justify-center flex-wrap gap-4 mb-4">
                {payload?.map((entry, index) => {
                  const conf = chartConfig5[entry.value as keyof typeof chartConfig5];
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
          {(filter === 'Todos' || filter === 'Vestibular') && (
            <Line
              dataKey="Vestibular"
              type="linear"
              stroke={faker.color.rgb({ casing: 'upper' })}
              strokeWidth={2}
              dot={{ fill: faker.color.rgb({ casing: 'upper' }) }}
              activeDot={{ r: 6 }}
            >
              {filter !== 'Todos' && (
                <LabelList
                  position="top"
                  offset={15}
                  fill={faker.color.rgb({ casing: 'upper' })}
                  fontSize={15}
                  fontWeight={'bold'}
                />
              )}
            </Line>
          )}
          {(filter === 'Todos' || filter === 'Enem') && (
            <Line
              dataKey="Enem"
              type="linear"
              stroke={faker.color.rgb({ casing: 'upper' })}
              strokeWidth={2}
              dot={{ fill: faker.color.rgb({ casing: 'upper' }) }}
              activeDot={{ r: 6 }}
            >
              {filter !== 'Todos' && (
                <LabelList
                  position="top"
                  offset={15}
                  fill={faker.color.rgb({ casing: 'upper' })}
                  fontSize={15}
                  fontWeight={'bold'}
                />
              )}
            </Line>
          )}
          {(filter === 'Todos' || filter === 'Avaliacao_Seriada') && (
            <Line
              dataKey="Avaliacao_Seriada"
              type="linear"
              stroke={faker.color.rgb({ casing: 'upper' })}
              strokeWidth={2}
              dot={{ fill: faker.color.rgb({ casing: 'upper' }) }}
              activeDot={{ r: 6 }}
            >
              {filter !== 'Todos' && (
                <LabelList
                  position="top"
                  offset={15}
                  fill={faker.color.rgb({ casing: 'upper' })}
                  fontSize={15}
                  fontWeight={'bold'}
                />
              )}
            </Line>
          )}
          {(filter === 'Todos' || filter === 'Selecao_Simplificada') && (
            <Line
              dataKey="Selecao_Simplificada"
              type="linear"
              stroke={faker.color.rgb({ casing: 'upper' })}
              strokeWidth={2}
              dot={{ fill: faker.color.rgb({ casing: 'upper' }) }}
              activeDot={{ r: 6 }}
            >
              {filter !== 'Todos' && (
                <LabelList
                  position="top"
                  offset={15}
                  fill={faker.color.rgb({ casing: 'upper' })}
                  fontSize={15}
                  fontWeight={'bold'}
                />
              )}
            </Line>
          )}
          {(filter === 'Todos' || filter === 'EGR') && (
            <Line
              dataKey="EGR"
              type="linear"
              stroke={faker.color.rgb({ casing: 'upper' })}
              strokeWidth={2}
              dot={{ fill: faker.color.rgb({ casing: 'upper' }) }}
              activeDot={{ r: 6 }}
            >
              {filter !== 'Todos' && (
                <LabelList
                  position="top"
                  offset={15}
                  fill={faker.color.rgb({ casing: 'upper' })}
                  fontSize={15}
                  fontWeight={'bold'}
                />
              )}
            </Line>
          )}
          {(filter === 'Todos' || filter === 'Outro_Tipo_Selecao') && (
            <Line
              dataKey="Outro_Tipo_Selecao"
              type="linear"
              stroke={faker.color.rgb({ casing: 'upper' })}
              strokeWidth={2}
              dot={{ fill: faker.color.rgb({ casing: 'upper' }) }}
              activeDot={{ r: 6 }}
            >
              {filter !== 'Todos' && (
                <LabelList
                  position="top"
                  offset={15}
                  fill={faker.color.rgb({ casing: 'upper' })}
                  fontSize={15}
                  fontWeight={'bold'}
                />
              )}
            </Line>
          )}
          {(filter === 'Todos' || filter === 'Processo_Seletivo') && (
            <Line
              dataKey="Processo_Seletivo"
              type="linear"
              stroke={faker.color.rgb({ casing: 'upper' })}
              strokeWidth={2}
              dot={{ fill: faker.color.rgb({ casing: 'upper' }) }}
              activeDot={{ r: 6 }}
            >
              {filter !== 'Todos' && (
                <LabelList
                  position="top"
                  offset={15}
                  fill={faker.color.rgb({ casing: 'upper' })}
                  fontSize={15}
                  fontWeight={'bold'}
                />
              )}
            </Line>
          )}

          {(filter === 'Todos' || filter === 'Vaga_Remanescente') && (
            <Line
              dataKey="Vaga_Remanescente"
              type="linear"
              stroke={faker.color.rgb({ casing: 'upper' })}
              strokeWidth={2}
              dot={{ fill: faker.color.rgb({ casing: 'upper' }) }}
              activeDot={{ r: 6 }}
            >
              {filter !== 'Todos' && (
                <LabelList
                  position="top"
                  offset={15}
                  fill={faker.color.rgb({ casing: 'upper' })}
                  fontSize={15}
                  fontWeight={'bold'}
                />
              )}
            </Line>
          )}
          {(filter === 'Todos' || filter === 'Programa_Especial') && (
            <Line
              dataKey="Programa_Especial"
              type="linear"
              stroke={faker.color.rgb({ casing: 'upper' })}
              strokeWidth={2}
              dot={{ fill: faker.color.rgb({ casing: 'upper' }) }}
              activeDot={{ r: 6 }}
            >
              {filter !== 'Todos' && (
                <LabelList
                  position="top"
                  offset={15}
                  fill={faker.color.rgb({ casing: 'upper' })}
                  fontSize={15}
                  fontWeight={'bold'}
                />
              )}
            </Line>
          )}
          {(filter === 'Todos' || filter === 'Outra_Forma') && (
            <Line
              dataKey="Outra_Forma"
              type="linear"
              stroke={faker.color.rgb({ casing: 'upper' })}
              strokeWidth={2}
              dot={{ fill: faker.color.rgb({ casing: 'upper' }) }}
              activeDot={{ r: 6 }}
            >
              {filter !== 'Todos' && (
                <LabelList
                  position="top"
                  offset={15}
                  fill={faker.color.rgb({ casing: 'upper' })}
                  fontSize={15}
                  fontWeight={'bold'}
                />
              )}
            </Line>
          )}
        </LineChart>
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
