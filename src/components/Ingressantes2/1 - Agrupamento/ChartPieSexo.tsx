import { Pie, PieChart, Label, LabelList, Cell } from 'recharts';
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
import { chartConfig1 } from './data';
import { DataEntrantsSex } from '../SchemaEntrants';
import CountUp from 'react-countup';

type ChartMultLineSexoProps = {
  chartData?: DataEntrantsSex;
};

export function ChartPieSexo({ chartData }: ChartMultLineSexoProps) {
  const originalData = chartData || [];
  const sexKeys = ['Feminino', 'Masculino'] as const;

  // inicializar acumulador
  const totals: Record<(typeof sexKeys)[number], number> = {
    Feminino: 0,
    Masculino: 0,
  };

  // somar cada ano por faixa etária
  for (const year of originalData) {
    sexKeys.forEach((key) => {
      totals[key] += year[key];
    });
  }

  // transformar no formato desejado
  const chartDataFomated = sexKeys.map((key) => ({
    sexo: key,
    quantidade: totals[key],
  }));

  const total = chartDataFomated.reduce((acc, cur) => acc + cur.quantidade, 0);

  const [dialog, openDialog, closeDialog, toggleDialog] = useBoolean();

  const total_fem = chartData?.reduce((acc, cur) => acc + cur.Feminino, 0);
  const total_masc = chartData?.reduce((acc, cur) => acc + cur.Masculino, 0);

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
      <div className="flex px-4 pt-2 items-center justify-between gap-1 text-black/70">
        <div className="flex flex-col items-start gap-1 justify-start">
          <h1 className="font-bold text-xl">Comparativo geral por sexo</h1>
        </div>
        <div className="flex items-center gap-6 ">
          <div className="flex flex-col w-fit ">
            <h1 className="font-normal text-sm !text-[#DF536B]">Feminino</h1>
            <h2 className=" font-black text-3xl leading-none !text-[#da3f59] ">
              <CountUp start={0} duration={2.75} end={total_fem ?? 0} decimal="," separator="." />
            </h2>
          </div>
          <div className="flex flex-col w-fit ">
            <h1 className="font-normal text-sm !text-[#2297E6]">Masculino</h1>
            <h2 className=" font-black text-3xl leading-none !text-[#116fad]">
              <CountUp start={0} duration={2.75} end={total_masc ?? 0} decimal="," separator="." />
            </h2>
          </div>
        </div>
      </div>
      <ChartContainer
        config={chartConfig1}
        className="[&_.recharts-pie-label-text]:fill-foreground mx-auto aspect-square h-[500px] px-4 pb-2 w-full"
      >
        <PieChart>
          <ChartTooltip content={<ChartTooltipContent nameKey="sexo" />} />

          <Pie
            data={chartDataFomated}
            dataKey="quantidade"
            nameKey="sexo"
            labelLine={true}
            label={({ cx, cy, midAngle, outerRadius, index }) => {
              const RADIAN = Math.PI / 180;
              const radius = outerRadius + 20;
              const x = cx + radius * Math.cos(-midAngle * RADIAN);
              const y = cy + radius * Math.sin(-midAngle * RADIAN);
              return (
                <text
                  x={x}
                  y={y}
                  fill={chartDataFomated[index].sexo === 'Feminino' ? '#DF536B' : '#2297E6'}
                  textAnchor={x > cx ? 'start' : 'end'}
                  dominantBaseline="central"
                  fontSize={14}
                  fontWeight="bold"
                >
                  {chartDataFomated[index].sexo}
                </text>
              );
            }}
          >
            {chartDataFomated.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.sexo === 'Feminino' ? chartConfig1['Feminino'].color : chartConfig1['Masculino'].color} // define cor
              />
            ))}

            <LabelList
              dataKey="quantidade"
              className="fill-background text-4xl font-semibold"
              stroke="none"
              formatter={(value: number) => {
                const percent = value / total;
                return percent >= 0.03 ? `${(percent * 100).toFixed(0)}%` : '';
              }}
            />
          </Pie>

          {/* <ChartLegend
            verticalAlign="top"
            content={({ payload }) => (
              <div className="flex items-center justify-center flex-wrap gap-4 ">
                {payload?.map((entry, index) => {
                  const conf = chartConfig1[entry.value as keyof typeof chartConfig1];

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
        <DialogTitle id="alert-dialog-title">Comparativo geral por sexo</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Quantidade geral de ingressantes masculinos e femininos
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
