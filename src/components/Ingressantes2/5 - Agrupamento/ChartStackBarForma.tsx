import { useState } from 'react';
import { Bar, BarChart, Label, LabelList, XAxis, YAxis } from 'recharts';
import { 
  ChartContainer,
  ChartTooltip, 
  ChartLegend,
} from '../../ui/chart'; 
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
import { chartConfig5 } from './data';
import { DataEntrantsForm } from '../SchemaEntrants';
import { useDeviceType } from '../../../utils/mediaQuery';

type StackedBarChartFormaProps = {
  chartData?: DataEntrantsForm;
};

export function StackedBarChartForma({ chartData }: StackedBarChartFormaProps) {
  const { isMobile } = useDeviceType();
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
  >('Todos');

  const formatedData = chartData?.map((d) => {
    const total =
      d.Vestibular +
      d.Enem +
      d.Avaliacao_Seriada +
      d.Selecao_Simplificada +
      d.EGR +
      d.Outro_Tipo_Selecao +
      d.Processo_Seletivo +
      d.Vaga_Remanescente +
      d.Programa_Especial +
      d.Outra_Forma;

    return {
      year: d.year,
      total,
      // 👇 Percentuais só se filtro for "Todos"
      Vestibular: filter === 'Todos' ? (d.Vestibular / total) * 100 : d.Vestibular,
      Enem: filter === 'Todos' ? (d.Enem / total) * 100 : d.Enem,
      Avaliacao_Seriada:
        filter === 'Todos' ? (d.Avaliacao_Seriada / total) * 100 : d.Avaliacao_Seriada,
      Selecao_Simplificada:
        filter === 'Todos' ? (d.Selecao_Simplificada / total) * 100 : d.Selecao_Simplificada,
      EGR: filter === 'Todos' ? (d.EGR / total) * 100 : d.EGR,
      Outro_Tipo_Selecao:
        filter === 'Todos' ? (d.Outro_Tipo_Selecao / total) * 100 : d.Outro_Tipo_Selecao,
      Processo_Seletivo:
        filter === 'Todos' ? (d.Processo_Seletivo / total) * 100 : d.Processo_Seletivo,
      Vaga_Remanescente:
        filter === 'Todos' ? (d.Vaga_Remanescente / total) * 100 : d.Vaga_Remanescente,
      Programa_Especial:
        filter === 'Todos' ? (d.Programa_Especial / total) * 100 : d.Programa_Especial,
      Outra_Forma: filter === 'Todos' ? (d.Outra_Forma / total) * 100 : d.Outra_Forma,
      abs: {
        Vestibular: d.Vestibular,
        Enem: d.Enem,
        Avaliacao_Seriada: d.Avaliacao_Seriada,
        Selecao_Simplificada: d.Selecao_Simplificada,
        EGR: d.EGR,
        Outro_Tipo_Selecao: d.Outro_Tipo_Selecao,
        Processo_Seletivo: d.Processo_Seletivo,
        Vaga_Remanescente: d.Vaga_Remanescente,
        Programa_Especial: d.Programa_Especial,
        Outra_Forma: d.Outra_Forma,
      },
    };
  });

  return (
    <div className="h-[430px] md:!h-[600px] border rounded-lg bg-white shadow-md">
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
          <h1 className="font-bold text-sm md:text-xl leading-none">Comparativo anual por forma de ingresso</h1>
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
            <MenuItem value="Outro_Tipo_Selecao">Outro Tipo Selecao</MenuItem>
            <MenuItem value="Vaga_Remanescente">Vaga Remanescente</MenuItem>
            <MenuItem value="Processo_Seletivo">Processo Seletivo</MenuItem>
            <MenuItem value="Programa_Especial">Programa Especial</MenuItem>
            <MenuItem value="Outra_Forma">Outra Forma</MenuItem>
          </Select>
        </FormControl>
      </div>
      <ChartContainer config={chartConfig5} className="h-[300px] md:h-[450px] px-4 pb-2 w-full">
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
            tickFormatter={(val) => val} // formata os números se quiser (ex: 1k, 2k)
            width={isMobile ? 0 : 20}// largura reservada para os números
          >
            {!isMobile && (
              <Label
                value="Quantidade"
                offset={0}
                angle={-90}
                position={filter === 'Todos' ? 'center' : 'insideTop'}
                style={{ textAnchor: 'middle', fontWeight: 'bold', fontSize: 14 }}
              />
            )}
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
              <div className="flex items-center justify-center flex-wrap mb-1 border-red-500">
                {payload?.map((entry, index) => {
                  const conf = chartConfig5[entry.value as keyof typeof chartConfig5];
                  return (
                    <div key={index} className="flex items-center  gap-[2px] md:gap-1 ml-[6px] md:ml-2  leading-tight md:leading-normal">
                      <span
                        className="w-[6px] md:w-2 h-[6px] md:h-2 rounded-full"
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
          {(filter === 'Todos' || filter === 'Vestibular') && (
            <Bar dataKey="Vestibular" stackId="a" fill="#7CD23C" radius={[0, 0, 0, 0]}>
              <LabelList
                dataKey="Vestibular"
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
                      fontSize={isMobile ? 7 : 12}
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
          {(filter === 'Todos' || filter === 'Enem') && (
            <Bar dataKey="Enem" stackId="a" fill="#EC167C" radius={[0, 0, 0, 0]}>
              <LabelList
                dataKey="Enem"
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
                      fontSize={isMobile ? 7 : 12}
                      fontWeight="bold"
                    >
                      {numericValue.toFixed(0)}
                      {filter === 'Todos' && '% '}
                    </text>
                  );
                }}
              />
            </Bar>
          )}{' '}
          {(filter === 'Todos' || filter === 'Avaliacao_Seriada') && (
            <Bar dataKey="Avaliacao_Seriada" stackId="a" fill="#FAB70C" radius={[0, 0, 0, 0]}>
              <LabelList
                dataKey="Avaliacao_Seriada"
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
                      fontSize={isMobile ? 7 : 12}
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
          {(filter === 'Todos' || filter === 'Selecao_Simplificada') && (
            <Bar dataKey="Selecao_Simplificada" stackId="a" fill="#04ACDA" radius={[0, 0, 0, 0]}>
              <LabelList
                dataKey="Selecao_Simplificada"
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
                      fontSize={isMobile ? 7 : 12}
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
          {(filter === 'Todos' || filter === 'EGR') && (
            <Bar dataKey="EGR" stackId="a" fill="#718EC6" radius={[0, 0, 0, 0]}>
              <LabelList
                dataKey="EGR"
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
                      fontSize={isMobile ? 7 : 12}
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
          {(filter === 'Todos' || filter === 'Outro_Tipo_Selecao') && (
            <Bar dataKey="Outro_Tipo_Selecao" stackId="a" fill="#1A6674" radius={[0, 0, 0, 0]}>
              <LabelList
                dataKey="Outro_Tipo_Selecao"
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
                      fontSize={isMobile ? 7 : 12}
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
          {(filter === 'Todos' || filter === 'Processo_Seletivo') && (
            <Bar dataKey="Processo_Seletivo" stackId="a" fill="#890117" radius={[0, 0, 0, 0]}>
              <LabelList
                dataKey="Processo_Seletivo"
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
                      fontSize={isMobile ? 7 : 12}
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
          {(filter === 'Todos' || filter === 'Vaga_Remanescente') && (
            <Bar dataKey="Vaga_Remanescente" stackId="a" fill="#8F479B" radius={[0, 0, 0, 0]}>
              <LabelList
                dataKey="Vaga_Remanescente"
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
                      fontSize={isMobile ? 7 : 12}
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
          {(filter === 'Todos' || filter === 'Programa_Especial') && (
            <Bar dataKey="Programa_Especial" stackId="a" fill="#FF8027" radius={[0, 0, 0, 0]}>
              <LabelList
                dataKey="Programa_Especial"
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
                      fontSize={isMobile ? 7 : 12}
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
          {(filter === 'Todos' || filter === 'Outra_Forma') && (
            <Bar dataKey="Outra_Forma" stackId="a" fill="#F30D0D" radius={[0, 0, 0, 0]}>
              <LabelList
                dataKey="Outra_Forma"
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
                      fontSize={isMobile ? 7 : 12}
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
        <DialogTitle id="alert-dialog-title">Comparativo anual por forma de ingresso</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Quantidade de ingressantes por cada forma de ingresso em cada ano
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
