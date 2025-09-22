import { Pie, PieChart, Cell } from 'recharts';
import { RiPieChart2Line } from 'react-icons/ri';
import { faker } from '@faker-js/faker';
import { 
  ChartContainer,
  ChartLegend, 
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
import { useDeviceType } from '../../../utils/mediaQuery';

type ChartPieCorProps = {
  chartData?: DataEntrantsColor;
};

export function ChartPieCor({ chartData }: ChartPieCorProps) {
  const { isMobile } = useDeviceType();
  const originalData = chartData || [];
  const colorKeys = ['Branca', 'Preta', 'Parda', 'Amarela', 'Indigena', 'Indefinido'] as const;

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
    <div className="w-full h-[400px] md:h-[600px] border-blue-500 rounded-lg bg-white shadow-md">
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
          <h1 className="font-bold text-sm md:text-xl leading-none">Distribuição total por cor/raça</h1>
        </div>
      </div>
      <ChartContainer
        config={chartConfig4}
        className="[&_.recharts-pie-label-text]:fill-foreground mx-auto aspect-square h-[320px] md:h-[475px] px-2   w-full border-red-500"
      >
        <PieChart>
          <ChartTooltip content={<ChartTooltipContent nameKey="idade" />} />
          <Pie
            data={chartDataFomated}
            dataKey="quantidade"
            nameKey="cor"
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
                  fill={chartConfig4[chartDataFomated[index].cor].color}
                  textAnchor={x > cx ? 'start' : 'end'}
                  dominantBaseline="central"
                  fontSize={percent <= 0.03 ? 10 : 14}
                  fontWeight="bold"
                >
                  {chartConfig4[chartDataFomated[index].cor].label}
                </text>
              );
            }}
          >
            {chartDataFomated.map((entry, idx) => (
              <Cell key={`cell-${idx}`} fill={chartConfig4[entry.cor].color} />
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
                {Object.entries(chartConfig4).map(([key, conf]) => (
                  <div key={key} className="flex items-center gap-[2px] md:gap-1 ml-2 mb-[3px]">
                    <span
                      className="w-[6px] md:w-2 h-[6px] md:h-2 rounded-full"
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
        </PieChart>
      </ChartContainer>
      <Dialog open={dialog} onClose={toggleDialog}>
        <DialogTitle id="alert-dialog-title">Distribuição total por cor/raça</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Percentual acumulado de ingressantes por cor/raça no período analisado
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
