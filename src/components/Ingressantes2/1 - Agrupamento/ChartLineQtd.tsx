import { CartesianGrid, Label, LabelList, Line, LineChart, XAxis, YAxis } from 'recharts';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartTooltip,
  ChartTooltipContent,
} from '../../ui/chart';
import { DataEntrantsQtd } from '../SchemaEntrants';

export const description = 'A line chart with a label';

const chartConfig = {
  Ingressantes: {
    label: 'Ingressantes',
    color: '#F54927',
  },
} satisfies ChartConfig;

type ChartLineQtdProps = {
  chartData?: DataEntrantsQtd;
};

export function ChartLineQtd({ chartData }: ChartLineQtdProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <ChartContainer config={chartConfig} className="h-[300px] md:h-[450px] p-4 w-full">
      <LineChart
        accessibilityLayer
        data={chartData}
        margin={{
          top: 10,
          left: 15,
          right: 15,
          bottom: 5,
        }}
      >
        <CartesianGrid vertical={true} horizontal={true} />
        <XAxis
          dataKey="year"
          tickLine={true}
          tickMargin={5} // espaço entre ticks e labels
          axisLine={false}
          interval={isMobile ? 3 : 0}
          tickFormatter={(val) => val.slice(0, 4)}
        >
          <Label
            value="Ano"
            position="bottom" // label abaixo dos ticks, dentro do gráfico
            offset={-5} // distância do label para os ticks
            style={{ textAnchor: 'middle', fontWeight: 'bold', fontSize: 14 }}
          />
        </XAxis>
        <YAxis
          tickLine={true} // remove os traços dos ticks, opcional
          axisLine={false} // exibe a linha do eixo
          tick={false}
          // tick={{ fontSize: 12, fontWeight: 'bold', fill: '#333' }}  // estilo do texto
          tickFormatter={(val) => val} // formata os números se quiser (ex: 1k, 2k)
          width={0} // largura reservada para os números
        >
          <Label
            value="Quantidade"
            offset={0}
            angle={-90}
            position="outside"
            style={{ textAnchor: 'middle', fontWeight: 'bold', fontSize: 14 }}
          />
        </YAxis>
        <ChartLegend
          verticalAlign="top"
          content={({ payload }) => (
            <div className="flex items-center justify-center flex-wrap gap-4 mb-4 ">
              {payload?.map((entry, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: chartConfig[entry.value].color }}
                  />
                  <span style={{ color: chartConfig[entry.value].color, fontWeight: 'bold' }}>
                    {chartConfig[entry.value].label}
                  </span>
                </div>
              ))}
            </div>
          )}
        />

        <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
        <Line
          dataKey="Ingressantes"
          type="linear"
          stroke="#F54927"
          strokeWidth={2}
          dot={{
            fill: '#F54927',
          }}
          activeDot={{
            r: 6,
          }}
        >
           
          {!isMobile && (
            <LabelList
              position="top"
              offset={12}
              fill="#F54927"
              fontSize={15}
              fontWeight={'bold'}
            />
          )}
        </Line>
      </LineChart>
    </ChartContainer>
  );
}
