import React, { useState } from 'react';
import { Bar, BarChart, Label, LabelList, XAxis, YAxis } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend } from '../../ui/chart';
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
import { chartConfig1 } from './data';
import { DataEntrantsSex } from '../SchemaEntrants';
import { useDeviceType } from '../../../utils/mediaQuery';

type ChartMultLineSexoProps = {
  // NOTE: seu DataEntrantsSex já é um array (conforme seu uso anterior)
  chartData?: DataEntrantsSex;
};

export function StackedBarChartSexo({ chartData }: ChartMultLineSexoProps) {
  const { isMobile } = useDeviceType();
  const [dialog, openDialog, closeDialog, toggleDialog] = useBoolean();
  const [filter, setFilter] = useState<'Todos' | 'Masculino' | 'Feminino'>('Todos');

  // Formatter robusto: tenta extrair a linha correta (dataEntry) de várias formas,
  // e retorna '' se não conseguir calcular ou total for 0.
  const chartDataWithPercent = chartData?.map((d) => {
    const total = d.Masculino + d.Feminino;
    return {
      ...d,
      MasculinoPercent: total ? (d.Masculino / total) * 100 : 0,
      FemininoPercent: total ? (d.Feminino / total) * 100 : 0,
    };
  });
  return (
    <div className="h-[430px] md:!h-[600px] border rounded-lg bg-white shadow-md">
      <div className="flex px-4 pt-4 pb-2 border-b items-center justify-between gap-1 text-black/70">
        <div className="flex items-center gap-1 justify-start">
          <FaChartBar size={isMobile ? 10 : 18} />
          <h1 className="font-semibold text-sm">Gráfico de Barras</h1>
        </div>
        <IconButton onClick={openDialog}>
          <FaQuestionCircle size={20} className="text-black/10" />
        </IconButton>
      </div>

      <div className="flex px-4 pt-2 pb-2 items-center justify-between gap-1 text-black/70">
        <div className="flex flex-col items-start gap-1 justify-start">
          <h1 className="font-bold text-sm md:text-xl leading-none">
            Comparativo <br className="block md:hidden" /> anual por sexo
          </h1>
        </div>
        <FormControl size="small" className="">
          <InputLabel>Filtro</InputLabel>
          <Select
            value={filter}
            label="Filtro"
            size={isMobile ? 'small' : 'medium'}
            onChange={(e) => setFilter(e.target.value as any)}
          >
            <MenuItem value="Todos">Todos</MenuItem>
            <MenuItem value="Masculino">Masculino</MenuItem>
            <MenuItem value="Feminino">Feminino</MenuItem>
          </Select>
        </FormControl>
      </div>

      <ChartContainer config={chartConfig1} className="h-[300px] md:h-[450px] px-4 pb-2 w-full">
        <BarChart accessibilityLayer data={chartDataWithPercent}>
          <XAxis
            dataKey="year"
            tickLine={true}
            tickMargin={5}
            axisLine={true}
            interval={1}
            tickFormatter={(val) => String(val).slice(0, 4)}
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
            tickFormatter={(val) => val} // mantém valores absolutos
            width={isMobile ? 0 : 40}
          >
            {!isMobile && (
              <Label
                value="Quantidade"
                offset={0}
                angle={-90}
                position="center"
                style={{ textAnchor: 'middle', fontWeight: 'bold', fontSize: 14 }}
              />
            )}
          </YAxis>

          <ChartTooltip content={<ChartTooltipContent />} />

          <ChartLegend
            verticalAlign="top"
            content={({ payload }) => (
              <div className="flex items-center justify-center flex-wrap gap-4">
                {payload?.map((entry, idx) => (
                  <div key={idx} className="flex items-center gap-2">
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

          {(filter === 'Todos' || filter === 'Feminino') && (
            <Bar
              dataKey="Feminino"
              stackId="a"
              fill={chartConfig1['Feminino'].color}
              radius={[0, 0, 0, 0]}
            >
              <LabelList
                dataKey="FemininoPercent"
                position="insideTop"
                fill="#FFF"
                fontSize={isMobile ? 6 : 12}
                className="font-bold font-Roboto"
                formatter={(val) => `${val.toFixed(0)}%`}
              />
            </Bar>
          )}

          {(filter === 'Todos' || filter === 'Masculino') && (
            <Bar
              dataKey="Masculino"
              stackId="a"
              fill={chartConfig1['Masculino'].color}
              radius={[2, 2, 0, 0]}
            >
              <LabelList
                dataKey="MasculinoPercent"
                position="insideTop"
                fill="#FFF"
                fontSize={isMobile ? 6 : 12}
                className="font-bold font-Roboto"
                formatter={(val) => `${val.toFixed(0)}%`}
              />
            </Bar>
          )}
        </BarChart>
      </ChartContainer>

      <Dialog open={dialog} onClose={toggleDialog}>
        <DialogTitle id="alert-dialog-title">Comparativo anual por sexo</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Quantidade de ingressantes masculinos e femininos em cada ano (labels em %)
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
