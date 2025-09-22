import { useState } from 'react';
import { Bar, BarChart, Label, LabelList, XAxis, YAxis } from 'recharts';
import { 
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
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
import { chartConfig3 } from './data';
import { DataEntrantsShift } from '../SchemaEntrants';
import { useDeviceType } from '../../../utils/mediaQuery';

type StackedBarChartTurnoProps = {
  chartData?: DataEntrantsShift;
};

export function StackedBarChartTurno({ chartData }: StackedBarChartTurnoProps) {
  const { isMobile } = useDeviceType();
  const [dialog, openDialog, closeDialog, toggleDialog] = useBoolean();
  const [filter, setFilter] = useState<'Todos' | 'Diurno' | 'Noturno'>('Todos');

  const chartDataWithPercent = chartData?.map((d) => {
    const total = d.Diurno + d.Noturno;
    return {
      ...d,
      DiurnoPercent: total ? (d.Diurno / total) * 100 : 0,
      NoturnoPercent: total ? (d.Noturno / total) * 100 : 0,
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
            Comparativo <br className="block md:hidden" />  anual por turno
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
            <MenuItem value="Diurno">Diurno</MenuItem>
            <MenuItem value="Noturno">Noturno</MenuItem>
          </Select>
        </FormControl>
      </div>

      <ChartContainer config={chartConfig3} className="h-[300px] md:h-[450px] px-4 pb-2 w-full">
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

          <ChartTooltip content={<ChartTooltipContent />} />

          <ChartLegend
            verticalAlign="top"
            content={({ payload }) => (
              <div className="flex items-center justify-center flex-wrap gap-4">
                {payload?.map((entry, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: chartConfig3[entry.value].color }}
                    />
                    <span style={{ color: chartConfig3[entry.value].color, fontWeight: 'bold', fontSize: isMobile ? 9 : 11 }}>
                      {chartConfig3[entry.value].label}
                    </span>
                  </div>
                ))}
              </div>
            )}
          />

          {(filter === 'Todos' || filter === 'Diurno') && (
            <Bar
              dataKey="Diurno"
              stackId="a"
              fill={chartConfig3['Diurno'].color}
              radius={[0, 0, 0, 0]}
            >
              <LabelList
                dataKey={filter === 'Todos' ? 'DiurnoPercent' : 'Diurno'}
                position="insideTop"
                fill="#FFF"
                fontSize={isMobile ? 6 : 12}
                className="font-bold font-Roboto"
                formatter={(val: number) =>
                  filter === 'Todos' ? `${val.toFixed(0)}%` : val.toLocaleString()
                }
              />
            </Bar>
          )}

          {(filter === 'Todos' || filter === 'Noturno') && (
            <Bar
              dataKey="Noturno"
              stackId="a"
              fill={chartConfig3['Noturno'].color}
              radius={[2, 2, 0, 0]}
            >
              <LabelList
                dataKey={filter === 'Todos' ? 'NoturnoPercent' : 'Noturno'}
                position="insideTop"
                fill="#FFF"
                fontSize={isMobile ? 6 : 12}
                className="font-bold font-Roboto text-[.35rem] md:text-sm"
                formatter={(val: number) =>
                  filter === 'Todos' ? `${val.toFixed(0)}%` : val.toLocaleString()
                }
              />
            </Bar>
          )}
        </BarChart>
      </ChartContainer>

      <Dialog open={dialog} onClose={toggleDialog}>
        <DialogTitle id="alert-dialog-title">Comparativo anual por turno</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Quantidade de ingressantes por turno em cada ano
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
