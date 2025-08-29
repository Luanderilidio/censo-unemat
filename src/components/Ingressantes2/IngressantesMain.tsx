import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { MdInsertChartOutlined } from "react-icons/md";
import { FaQuestionCircle } from "react-icons/fa";

import { useState } from "react";
import { ExpandMore } from "../../utils/ExpandMore";
import { TiChartPie } from "react-icons/ti";
import { CardContent, Collapse, IconButton } from "@mui/material";
import CardBar from "../CardBar";
import { HorizontalBarChart2 } from "../ChartBarHorizontal/index2";

export default function IngressantesMain() {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <div className=" bg-gray-200/30 rounded-lg shadow-md font-Roboto">
      <div className="w-full flex p-4 items-center justify-between">
        <div className="flex items-center justify-start gap-2 text-black/60">
          <TiChartPie size={50} />
          <h1 className="text-4xl font-semibold ">Ingressantes</h1>
        </div>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon fontSize="large" />
        </ExpandMore>
      </div>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent className="grid grid-cols-15 gap-4">
          <div className="col-span-15 grid grid-cols-12 border-red-500 rounded-lg bg-white shadow-md">
            <div className="col-span-12 border-b ">
              <div className="flex px-4 pt-4 pb-2 items-center justify-between gap-1 text-black/70">
                <div className="flex items-center gap-1 justify-start">
                  <MdInsertChartOutlined size={18} />
                  <h1 className="font-semibold text-sm">Gráfico de Linha</h1>
                </div>
                <IconButton>
                  <FaQuestionCircle size={20} className="text-black/10" />
                </IconButton>
              </div>
            </div>
            <div className="col-span-8  border-b ">
              <div className="flex p-4  items-center justify-between gap-1 text-black/70">
                <div className="flex flex-col items-start gap-1 justify-start">
                  <h1 className="font-bold text-xl">Grafico de Barras</h1>
                  <h2 className="font-normal leading-none ">
                    Grafico de Barras
                  </h2>
                </div>
              </div>
            </div>
            <div className="col-span-2 border-b border-x flex flex-col items-center justify-center  ">
              <div className="flex flex-col w-fit ">
                <h1 className="font-normal text-sm text-black/70">
                  Qtd tal tal
                </h1>
                <h2 className=" font-black text-3xl leading-none text-black/80">
                  5151551
                </h2>
              </div>
            </div>
            <div className="col-span-2 border-b flex flex-col items-center justify-center  ">
              <div className="flex flex-col w-fit ">
                <h1 className="font-normal text-sm text-black/70">
                  Qtd tal tal
                </h1>
                <h2 className=" font-black text-3xl leading-none text-black/80">
                  5151551
                </h2>
              </div>
            </div>
            <div className="col-span-12 border-purple-500 p-4">
              Grafico de Linha
            </div>
          </div>

          <div className="col-span-5 !h-[400px] border-red-500">
            <CardBar
              title="Grafico de pasdasd"
              subtitle="asdasdasda"
              titleDialog="asdasdasd"
              descriptionDialog="asdasdasd"
              children={
                <HorizontalBarChart2
                  categories={[
                    "Concorrência",
                    "Pública",
                    "Étnico",
                    "Social",
                    "Deficiente",
                    "Outros",
                  ]}
                  series={[
                    { name: "Candidatos", data: [30, 40, 25, 50, 20, 10] },
                    { name: "Vagas", data: [10, 20, 15, 30, 10, 5] },
                  ]}
                  colors={["#1E90FF", "#FF6347"]} // Azul e vermelho
                />
              }
            />
          </div>

          <div className="col-span-5 !h-96 border-red-500">
            {/* <CardBar
              title="Grafico de pasdasd"
              subtitle="asdasdasda"
              titleDialog="asdasdasd"
              descriptionDialog="asdasdasd"
            /> */}
          </div>

          <div className="col-span-5 !h-96 border-red-500">
            {/* <CardBar
              title="Grafico de pasdasd"
              subtitle="asdasdasda"
              titleDialog="asdasdasd"
              descriptionDialog="asdasdasd"
            /> */}
          </div>
        </CardContent>
      </Collapse>
    </div>
  );
}
