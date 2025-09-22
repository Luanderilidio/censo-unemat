import { Pie, PieChart, LabelList, Cell } from 'recharts';
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
import { chartConfig5 } from './data';
import { DataEntrantsForm } from '../SchemaEntrants';
import { useDeviceType } from '../../../utils/mediaQuery';

type ChartMultLineFormaProps = {
  chartData?: DataEntrantsForm;
};

export function ChartPieForma({ chartData }: ChartMultLineFormaProps) {
  const { isMobile } = useDeviceType();
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

  // Filtrar apenas as formas com quantidade maior que 0
  const chartDataFomated = formKeys
    .filter((key) => totals[key] > 0)
    .map((key) => ({
      forma: key,
      quantidade: totals[key],
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
    // Verificação adicional de segurança
    if (!chartDataFomated[index] || chartDataFomated[index].quantidade === 0) return null;

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
    <div className="w-full h-[430px] md:h-[600px] border-blue-500 rounded-lg bg-white shadow-md">
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
          <h1 className="font-bold text-sm md:text-xl leading-none">Proporção total por forma de ingresso</h1>
        </div>
      </div>
      <ChartContainer
        config={chartConfig5}
        className="[&_.recharts-pie-label-text]:fill-foreground mx-auto aspect-square h-[300px] md:h-[475px] px-4 pb-2 w-full border-red-500"
      >
        <PieChart>
          <ChartTooltip content={<ChartTooltipContent nameKey="forma" />} />

          {/* Primeira camada (externa) */}
          <Pie
            data={chartDataFomated}
            dataKey="quantidade"
            nameKey="forma"
            labelLine={true}
            // Labels externos (nomes das formas de ingresso)
            label={({ cx, cy, midAngle, outerRadius, percent, index }) => {
              const RADIAN = Math.PI / 180;
              const radius = outerRadius + 20;
              const x = cx + radius * Math.cos(-midAngle * RADIAN);
              const y = cy + radius * Math.sin(-midAngle * RADIAN);

              // Verificação de segurança
              if (!chartDataFomated[index]) return null;

              return (
                <text
                  x={x}
                  y={y}
                  fill={chartConfig5[chartDataFomated[index].forma].color}
                  textAnchor={x > cx ? 'start' : 'end'}
                  dominantBaseline="central"
                  fontSize={percent <= 0.03 ? 10 : 14}
                  fontWeight="bold"
                >
                  {chartConfig5[chartDataFomated[index].forma].label}
                </text>
              );
            }}
          >
            {chartDataFomated.map((entry, idx) => (
              <Cell key={`cell-${idx}`} fill={chartConfig5[entry.forma].color} />
            ))}
          </Pie>

          {/* Segunda camada (interna) - para porcentagens */}
          <Pie
            data={chartDataFomated}
            dataKey="quantidade"
            nameKey="forma"
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
              <div className="w-full flex items-center justify-center leading-none flex-wrap md:mt-3 ">
                {Object.entries(chartConfig5).map(([key, conf]) => (
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
        <DialogTitle id="alert-dialog-title">Proporção total por forma de ingresso</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Percentual acumulado de ingressantes por forma de ingresso
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
