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
    <div className="col-span-1 row-span-4 text-white bg-[#222222] rounded-3xl flex flex-col gap-1 items-center justify-evenly leading-none relative drop-shadow-md shadow-black transition ease-in-out hover:scale-105">
      <div className="flex items-center gap-1">
        <div className="bg-white text-black py-1 px-1 rounded-full">
          <PersonIcon fontSize="medium" />
        </div>
        <div>
          <p className="text-left  font-bold text-xs">{title}</p>
          <p className="text-left font-bold text-3xl">
            {/* <SlotCounter
              startValue={123}
              startValueOnce
              value={123123}
              animateUnchanged
              direction="bottom-up"
              autoAnimationStart={true}
            /> */}

            <CountUp  start={0} duration={2.75} end={qtd} />
          </p>
        </div>
      </div>
      {/* <div className="absolute top-0 right-1 ">
              <IconButton>
                <HelpOutlineIcon
                  fontSize="small"
                  className="text-white opacity-20"
                />
              </IconButton>
            </div> */}
      <div />

      <div className="w-full flex items-center justify-center absolute bottom-1 ">
        <SparkLineChart height={45} data={data} showHighlight showTooltip />
      </div>
    </div>
  );
}
