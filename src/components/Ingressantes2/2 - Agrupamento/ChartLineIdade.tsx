"use client"

import { TrendingUp } from "lucide-react"
import { CartesianGrid, Label, LabelList, Line, LineChart, XAxis, YAxis } from "recharts"
import { faker } from '@faker-js/faker';

import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "../../ui/chart"

export const description = "A line chart with a label"

const chartData = [
    { year: "2010", ingressantes: faker.number.int(100) },
    { year: "2011", ingressantes: faker.number.int(100) },
    { year: "2012", ingressantes: faker.number.int(100) },
    { year: "2013", ingressantes: faker.number.int(100) },
    { year: "2014", ingressantes: faker.number.int(100) },
    { year: "2015", ingressantes: faker.number.int(100) },
    { year: "2016", ingressantes: faker.number.int(100) },
    { year: "2017", ingressantes: faker.number.int(100) },
    { year: "2018", ingressantes: faker.number.int(100) },
    { year: "2019", ingressantes: faker.number.int(100) },
    { year: "2020", ingressantes: faker.number.int(100) },
    { year: "2021", ingressantes: faker.number.int(100) },
    { year: "2022", ingressantes: faker.number.int(100) },
    { year: "2023", ingressantes: faker.number.int(100) },
];

const chartConfig = {
    ingressantes: {
        label: "Ingressantes",
        color: "#F54927",
    },

} satisfies ChartConfig

export function ChartLineIdade() {
    return (
        <ChartContainer config={chartConfig} className="h-[450px] p-4 w-full">
            <LineChart
                accessibilityLayer
                data={chartData}
                margin={{
                    top: 10,
                    left: 15,
                    right: 15,
                    bottom: 5
                }}
            >
                <CartesianGrid vertical={true} horizontal={true} />
                <XAxis
                    dataKey="year"
                    tickLine={true}
                    tickMargin={5}  // espaço entre ticks e labels
                    axisLine={false}
                    interval={0}
                    tickFormatter={(val) => val.slice(0, 4)}
                >
                    <Label
                        value="Ano"
                        position="bottom"  // label abaixo dos ticks, dentro do gráfico
                        offset={-5}              // distância do label para os ticks
                        style={{ textAnchor: 'middle', fontWeight: 'bold', fontSize: 14 }}
                    />
                </XAxis>
                <YAxis
                    tickLine={true}        // remove os traços dos ticks, opcional
                    axisLine={false}         // exibe a linha do eixo
                    tick={false}
                    // tick={{ fontSize: 12, fontWeight: 'bold', fill: '#333' }}  // estilo do texto
                    tickFormatter={(val) => val}  // formata os números se quiser (ex: 1k, 2k)
                    width={0}              // largura reservada para os números
                >
                    <Label value="Quantidade" offset={0} angle={-90} position="outside" style={{ textAnchor: 'middle', fontWeight: 'bold', fontSize: 14 }} />
                </YAxis>
                <ChartLegend
                    verticalAlign='top'
                    content={({ payload }) => (
                        <div className="flex items-center justify-center flex-wrap gap-4 mb-4 ">
                            {payload?.map((entry, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    <span
                                        className="w-3 h-3 rounded-full"
                                        style={{ backgroundColor: chartConfig[entry.value].color }}
                                    />
                                    <span
                                        style={{ color: chartConfig[entry.value].color, fontWeight: "bold" }}
                                    >
                                        {chartConfig[entry.value].label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                />

                <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="line" />}
                />
               <Line
                    dataKey="ingressantes"
                    type="linear"
                    stroke="#F54927"
                    strokeWidth={2}
                    dot={{
                        fill: "#F54927",
                    }}
                    activeDot={{
                        r: 6,
                    }}
                >
                    <LabelList
                        position="top"
                        offset={12}
                        // className="fill-foreground"
                        fill="#F54927"

                        fontSize={15}
                        fontWeight={"bold"}
                    />
                </Line>
            </LineChart>
        </ChartContainer>

    )
}
