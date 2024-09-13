import { SparkLineChart } from "@mui/x-charts";
import PersonIcon from "@mui/icons-material/Person";
import CountUp from "react-countup";

interface CardQtdProps {
  title: string;
  qtd: number;
  data: number[];
}

export default function CardQtd({ title, qtd, data }: CardQtdProps) {
  return (
    <div className="col-span-2 row-span-2  text-white bg-[#222222] rounded-3xl flex  flex-col gap-1 items-start justify-start leading-none relative drop-shadow-md shadow-black transition ease-in-out hover:scale-105 active:scale-95">
      <div className="ml-4 mt-2 flex items-start gap-1">
        <div className="bg-white text-black py-1 px-1 rounded-full">
          <PersonIcon fontSize="medium" />
        </div>
        <div>
          <p className="text-left  font-bold text-xs">{title}</p>
          <p className="text-left font-bold text-3xl">
            <CountUp  start={0} duration={2.75} end={qtd} />
          </p>
        </div>
      </div>
      {/* <div /> */}
      <div className="w-full -rotate-3 flex items-center justify-center absolute bottom-1 ">
        <SparkLineChart height={45} data={data} showHighlight showTooltip />
      </div>
    </div>
  );
}
