import { Pie, PieChart, Label, LabelList, Cell } from 'recharts';
import { RiPieChart2Line } from 'react-icons/ri';
import { 
  ChartContainer, 
  ChartTooltip,
  ChartTooltipContent,
} from '../../ui/chart';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from '@mui/material';
import { FaQuestionCircle } from 'react-icons/fa';
import { useBoolean } from 'react-hooks-shareable';
import { chartConfig3 } from './data';
import { DataEntrantsShift } from '../SchemaEntrants';

type ChartPieTurnoProps = {
  chartData?: DataEntrantsShift;
};

export function ChartPieTurno({ chartData }: ChartPieTurnoProps) {
  const originalData = chartData || [];

  const shiftKeys = ['Diurno', 'Noturno'] as const;

  // inicializar acumulador
  const totals: Record<(typeof shiftKeys)[number], number> = {
    Diurno: 0,
    Noturno: 0,
  };

  // somar cada ano por faixa etária
  for (const year of originalData) {
    shiftKeys.forEach((key) => {
      totals[key] += year[key];
    });
  }

  // Filtrar apenas os turnos com valor maior que zero
  const chartDataFomated = shiftKeys
    .filter(key => totals[key] > 0)
    .map((key) => ({
      turno: key,
      quantidade: totals[key]
    }));

  const total = chartDataFomated.reduce((acc, cur) => acc + cur.quantidade, 0);

  // Se não houver dados, mostrar mensagem
  if (total === 0) {
    return (
      <div className="w-full h-[600px] border-red-500 rounded-lg bg-white shadow-md flex items-center justify-center">
        <div className="text-gray-500 text-lg">Nenhum dado disponível</div>
      </div>
    );
  }

  const [dialog, openDialog, closeDialog, toggleDialog] = useBoolean();

  return (
    <div className="w-full h-[410px] md:h-[600px]  border-blue-500 rounded-lg bg-white shadow-md">
      <div className="flex px-4 pt-4 pb-2 border-b items-center justify-between gap-1 text-black/70">
        <div className="flex items-center gap-1 justify-start">
          <RiPieChart2Line size={18} />
          <h1 className="font-semibold text-sm">Gráfico de Pizza</h1>
        </div>
        <IconButton onClick={openDialog}>
          <FaQuestionCircle size={20} className="text-black/10" />
        </IconButton>
      </div>
      <div className="flex px-4 pt-2  items-center justify-between gap-1 text-black/70">
        <div className="flex flex-col items-start gap-1 justify-start">
          <h1 className="font-bold text-md md:text-xl leading-none">Distribuição total por turno</h1>
        </div>
      </div>
      <ChartContainer
        config={chartConfig3}
        className="[&_.recharts-pie-label-text]:fill-foreground  mx-auto aspect-square h-[300px] md:h-[475px] px-4  w-full border-red-500"
      >
        <PieChart>
          <ChartTooltip content={<ChartTooltipContent nameKey="turno" />} />

          <Pie
            data={chartDataFomated}
            dataKey="quantidade"
            nameKey="turno"
            labelLine={true}
            label={({ cx, cy, midAngle, outerRadius, index }) => {
              const RADIAN = Math.PI / 180;
              const radius = outerRadius + 20;
              const x = cx + radius * Math.cos(-midAngle * RADIAN);
              const y = cy + radius * Math.sin(-midAngle * RADIAN);

              // Verificar se há dados para evitar erros
              if (!chartDataFomated[index]) return null;

              return (
                <text
                  x={x}
                  y={y}
                  fill={chartDataFomated[index].turno === 'Diurno' ? '#E69F00' : '#0072B2'}
                  textAnchor={x > cx ? 'start' : 'end'}
                  dominantBaseline="central"
                  fontSize={14}
                  fontWeight="bold"
                >
                  {chartDataFomated[index].turno}
                </text>
              );
            }}
          >
            {chartDataFomated.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.turno === 'Diurno' ? '#E69F00' : '#0072B2'}
              />
            ))}
            <LabelList
              dataKey="quantidade"
              className="fill-background text-3xl font-semibold"
              stroke="none"
              formatter={(value: number) => `${((value / total) * 100).toFixed(0)}%`}
            />
          </Pie>

          {/* <ChartLegend
            verticalAlign="top"
            content={({ payload }) => (
              <div className="flex items-center justify-center flex-wrap gap-2">
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
          /> */}
        </PieChart>
      </ChartContainer>
      <Dialog open={dialog} onClose={toggleDialog}>
        <DialogTitle id="alert-dialog-title">Distribuição total por turno</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Percentual acumulado de ingressantes no diurno e noturno
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