import { Pie, PieChart, Cell } from 'recharts';
import { RiPieChart2Line } from 'react-icons/ri'; 
import { ChartContainer, ChartLegend, ChartTooltip, ChartTooltipContent } from '../../ui/chart';
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
import { chartConfig2 } from './data';
import { DataEntrantsAge } from '../SchemaEntrants';
import { useDeviceType } from '../../../utils/mediaQuery';

type ChartMultLineIdadeProps = {
  chartData?: DataEntrantsAge;
};

export function ChartPieIdade({ chartData }: ChartMultLineIdadeProps) {
  const { isMobile } = useDeviceType();

  const originalData = chartData || [];

  const ageKeys = [
    'Ing_0_17',
    'Ing_18_24',
    'Ing_25_29',
    'Ing_30_34',
    'Ing_35_39',
    'Ing_40_49',
    'Ing_50_59',
    'Ing_60_mais',
  ] as const;

  // inicializar acumulador
  const totals: Record<(typeof ageKeys)[number], number> = {
    Ing_0_17: 0,
    Ing_18_24: 0,
    Ing_25_29: 0,
    Ing_30_34: 0,
    Ing_35_39: 0,
    Ing_40_49: 0,
    Ing_50_59: 0,
    Ing_60_mais: 0,
  };

  // somar cada ano por faixa etária
  for (const year of originalData) {
    ageKeys.forEach((key) => {
      totals[key] += year[key];
    });
  }

  // transformar no formato desejado
  const chartDataFomated = ageKeys.map((key) => ({
    idade: key,
    quantidade: totals[key],
  }));

  const total = chartDataFomated.reduce((acc, cur) => acc + cur.quantidade, 0);

  const [dialog, openDialog, closeDialog, toggleDialog] = useBoolean();

  // Função personalizada para renderizar os labels dentro das fatias
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }: any) => {
    if (chartDataFomated[index].quantidade === 0) return null;

    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    const percentValue = percent * 100;

    // Só mostra o percentual se for maior ou igual a 3%
    if (percentValue < 3) return null;

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={percentValue > 20 ? 25 : percentValue > 10 ? 18 : 15}
        fontWeight="bold"
      >
        {`${percentValue.toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="w-full h-[410px] md:h-[600px] border-blue-500 rounded-lg bg-white shadow-md">
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
          <h1 className="font-bold text-sm md:text-xl leading-none">Proporção total por faixa etária</h1>
        </div>
      </div>
      <ChartContainer
        config={chartConfig2}
        className="[&_.recharts-pie-label-text]:fill-foreground mx-auto aspect-square h-[300px] md:h-[475px] px-4 pb-2 w-full border-red-500"
      >
        <PieChart>
          <ChartTooltip content={<ChartTooltipContent nameKey="idade" />} />
          <Pie
            data={chartDataFomated}
            dataKey="quantidade"
            nameKey="idade"
            labelLine={true}
            // Labels externos (nomes das faixas etárias)
            label={({ cx, cy, midAngle, outerRadius, percent, index }) => {
              const RADIAN = Math.PI / 180;
              const radius = outerRadius + 20;
              const x = cx + radius * Math.cos(-midAngle * RADIAN);
              const y = cy + radius * Math.sin(-midAngle * RADIAN);

              if (chartDataFomated[index].quantidade === 0) return null;

              return (
                <text
                  x={x}
                  y={y}
                  fill={chartConfig2[chartDataFomated[index].idade].color}
                  textAnchor={x > cx ? 'start' : 'end'}
                  dominantBaseline="central"
                  fontSize={percent <= 0.03 ? 10 : 14}
                  fontWeight="bold"
                >
                  {chartConfig2[chartDataFomated[index].idade].label}
                </text>
              );
            }}
          >
            {chartDataFomated.map((entry, idx) => (
              <Cell key={`cell-${idx}`} fill={chartConfig2[entry.idade].color} />
            ))}
          </Pie>

          <Pie
            data={chartDataFomated}
            dataKey="quantidade"
            nameKey="idade"
            outerRadius="70%"
            innerRadius="50%" 
            label={renderCustomizedLabel}
            labelLine={false}
          >
            {chartDataFomated.map((idx) => (
              <Cell key={`inner-cell-${idx}`} fill="transparent" />
            ))}
          </Pie>

          <ChartLegend
            verticalAlign="top"
            content={() => (
              <div className="w-full flex items-center justify-center leading-none flex-wrap mt-3">
                {Object.entries(chartConfig2).map(([key, conf]) => (
                  <div key={key} className="flex items-center gap-[2px] md:gap-1 ml-2 leading-normal">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: conf?.color ?? '#999' }}
                    />
                    <span
                      style={{
                        color: conf?.color ?? '#999',
                        fontWeight: 'bold',
                        fontSize: isMobile ? 9 : 11
                      }}
                    >
                      {conf?.label ?? key}
                    </span>
                  </div>
                ))}
              </div>
            )}
          />

          {/* <div className="w-full flex items-center justify-center leading-none flex-wrap gap-2 mt-3 !border-2 h-10">
            {chartDataFomated.map((entry, index) => {
              const conf = chartConfig2[entry.idade as keyof typeof chartConfig2];
              if (entry.quantidade === 0) return null;

              return (
                <div key={index} className="flex items-center gap-1">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: conf?.color ?? '#999' }}
                  />
                  <span
                    style={{
                      color: conf?.color ?? '#999',
                      fontWeight: 'bold',
                      fontSize: 11,
                    }}
                  >
                    {conf?.label ?? entry.idade}
                  </span>
                </div>
              );
            })}
          </div> */}
        </PieChart>
      </ChartContainer>
      <Dialog open={dialog} onClose={toggleDialog}>
        <DialogTitle id="alert-dialog-title">Proporção total por faixa etária</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Percentual acumulado de ingressantes por faixa etária
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
