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
import { chartConfig4 } from './data';
import { DataEntrantsColor } from '../SchemaEntrants';

type ChartPieCorProps = {
  chartData?: DataEntrantsColor;
};

export function ChartPieCor({ chartData }: ChartPieCorProps) {
  const originalData = chartData || [];
  const colorKeys = ['Branca', 'Preta', 'Parda', 'Amarela', 'Indigena', 'Indefinido'] as const;

  // inicializar acumulador
  const totals: Record<(typeof colorKeys)[number], number> = {
    Branca: 0,
    Preta: 0,
    Parda: 0,
    Amarela: 0,
    Indigena: 0,
    Indefinido: 0,
  };

  // somar cada ano por faixa etária
  for (const year of originalData) {
    colorKeys.forEach((key) => {
      totals[key] += year[key];
    });
  }

  // transformar no formato desejado
  const chartDataFomated = colorKeys.map((key) => ({
    cor: key,
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
        config={chartConfig4}
        className="[&_.recharts-pie-label-text]:fill-foreground mx-auto aspect-square h-[500px] px-4 pb-2 w-full"
      >
        <PieChart>
          <ChartTooltip content={<ChartTooltipContent nameKey="cor" />} />

          <Pie
            data={chartDataFomated}
            dataKey="quantidade"
            nameKey="cor"
            labelLine={true}
            label={({ cx, cy, midAngle, outerRadius, percent, index }) => {
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
                  {chartDataFomated[index].cor}
                </text>
              );
            }}
          >
            <LabelList
              dataKey="quantidade"
              className="fill-background text-2xl font-semibold"
              stroke="none"
              formatter={(value: number) => {
                const percent = value / total;
                return percent >= 0.03 ? `${(percent * 100).toFixed(0)}%` : '';
              }}
            />
          </Pie>

          <ChartLegend
            verticalAlign="top"
            content={({ payload }) => (
              <div className="w-full flex items-center justify-center flex-wrap gap-3">
                {payload?.map((entry, index) => {
                  const conf = chartConfig4[entry.value as keyof typeof chartConfig4];
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
