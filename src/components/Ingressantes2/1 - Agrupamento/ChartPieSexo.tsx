import { Pie, PieChart, Label, LabelList } from "recharts";
import { RiPieChart2Line } from "react-icons/ri";
import { faker } from "@faker-js/faker";
import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "../../ui/chart";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from "@mui/material";
import { FaQuestionCircle } from "react-icons/fa";
import { useBoolean } from "react-hooks-shareable";

const chartData = [
    { sexo: "Masculino", quantidade: faker.number.int({ min: 50, max: 150 }), fill: "#2787F5" },
    { sexo: "Feminino", quantidade: faker.number.int({ min: 50, max: 150 }), fill: "#F54927" }
];

// Calcular total para porcentagem
const total = chartData.reduce((acc, cur) => acc + cur.quantidade, 0);

const chartConfig = {
    Masculino: { label: "Masculino", color: "#2787F5" },
    Feminino: { label: "Feminino", color: "#F54927" }
} satisfies ChartConfig;


export function ChartPieSexo() {
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
                config={chartConfig}
                className="[&_.recharts-pie-label-text]:fill-foreground mx-auto aspect-square h-[500px] px-4 pb-2 w-full"
            >
                <PieChart>
                    <ChartTooltip content={<ChartTooltipContent nameKey="sexo" />} />

                    <Pie
                        data={chartData}
                        dataKey="quantidade"
                        nameKey="sexo"

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
                                    fill={chartData[index].fill}
                                    textAnchor={x > cx ? "start" : "end"}
                                    dominantBaseline="central"
                                    fontSize={14}
                                    fontWeight="bold"
                                >
                                    {chartData[index].sexo}
                                </text>
                            );
                        }}
                    > 
                        <LabelList
                            dataKey="quantidade"
                            className="fill-background text-3xl font-semibold"
                            stroke="none"
                            formatter={(value: number) => `${((value / total) * 100).toFixed(0)}%`}

                        />
                    </Pie>

                    <ChartLegend
                        verticalAlign='top'
                        content={({ payload }) => (
                            <div className="flex items-center justify-center flex-wrap gap-4 ">
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
                </PieChart>
            </ChartContainer>
            <Dialog open={dialog} onClose={toggleDialog}>
                <DialogTitle id="alert-dialog-title">titleDialog</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        descriptionDialog
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
