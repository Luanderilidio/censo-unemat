import { Pie, PieChart, Label, LabelList } from 'recharts';
import { RiPieChart2Line } from 'react-icons/ri';
import { faker } from '@faker-js/faker';
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
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
import { chartConfig5 } from './data';
import { DataEntrantsForm } from '../SchemaEntrants';

type ChartPieFormaProps = {
  chartData?: DataEntrantsForm;
};

export function ChartPieForma({ chartData }: ChartPieFormaProps) {
  const originalData = chartData || [];

  const formKeys = [
    'Vestibular',
    'Enem',
    'Avaliacao_Seriada',
    'Selecao_Simplificada',
    'EGR',
    'Outro_Tipo_Selecao',
    'Processo_Seletivo',
    'Vaga_Remanescente',
    'Programa_Especial',
    'Outra_Forma',
  ] as const;

  // inicializar acumulador
  const totals: Record<(typeof formKeys)[number], number> = {
    Vestibular: 0,
    Enem: 0,
    Avaliacao_Seriada: 0,
    Selecao_Simplificada: 0,
    EGR: 0,
    Outro_Tipo_Selecao: 0,
    Processo_Seletivo: 0,
    Vaga_Remanescente: 0,
    Programa_Especial: 0,
    Outra_Forma: 0,
  };

  // somar cada ano por faixa etária
  for (const year of originalData) {
    formKeys.forEach((key) => {
      totals[key] += year[key];
    });
  }

  // transformar no formato desejado
  const chartDataFomated = formKeys.map((key) => ({
    forma: key,
    quantidade: totals[key],
    fill: faker.color.rgb({ casing: 'upper' }),
  }));

  const total = chartDataFomated.reduce((acc, cur) => acc + cur.quantidade, 0);

  const [dialog, openDialog, closeDialog, toggleDialog] = useBoolean();

  return (
    <div className="w-full h-[600px] border-red-500 rounded-lg bg-white shadow-md">
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
          <h1 className="font-bold text-xl">title</h1>
          <h2 className="font-normal leading-none ">subtitle</h2>
        </div>
      </div>
      <ChartContainer
        config={chartConfig5}
        className="[&_.recharts-pie-label-text]:fill-foreground mx-auto aspect-square h-[500px] px-4 pb-2 w-full"
      >
        <PieChart>
          <ChartTooltip content={<ChartTooltipContent nameKey="forma" />} />

          <Pie
            data={chartDataFomated}
            dataKey="quantidade"
            nameKey="forma"
            labelLine={true}
            label={({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
              const RADIAN = Math.PI / 180;
              const radius = outerRadius + 20;
              const x = cx + radius * Math.cos(-midAngle * RADIAN);
              const y = cy + radius * Math.sin(-midAngle * RADIAN);
              return (
                <text
                  x={x}
                  y={y}
                  fill={chartDataFomated[index].fill}
                  textAnchor={x > cx ? 'start' : 'end'}
                  dominantBaseline="central"
                  fontSize={percent <= 0.03 ? 10 : 14}
                  fontWeight="bold"
                >
                  {chartDataFomated[index].forma}
                </text>
              );
            }}
          >
            <LabelList
              dataKey="quantidade"
              className="fill-background text-3xl font-semibold"
              stroke="none"
              formatter={(value: number, entry: any) => {
                const percent = value / total;
                return percent >= 0.03 ? `${(percent * 100).toFixed(0)}%` : '';
              }}
            />
          </Pie>

          <ChartLegend
            verticalAlign="top"
            content={({ payload }) => (
              <div className="flex items-center justify-center flex-wrap gap-2">
                {payload?.map((entry, index) => {
                  const conf = chartConfig5[entry.value as keyof typeof chartConfig5];
                  return (
                    <div key={index} className="flex items-center gap-1">
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: conf?.color ?? '#999' }}
                      />
                      <span
                        className="!text-xs"
                        style={{ color: conf?.color ?? '#999', fontWeight: 'bold' }}
                      >
                        {conf?.label ?? entry.value}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          />
        </PieChart>
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
