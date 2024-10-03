import { useQuery } from "@tanstack/react-query";
import api from "../services/api";
import { useState } from "react";
import {
  Autocomplete,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Slider,
  TextField,
} from "@mui/material";
import CardQtd, { CardsArray } from "../components/CardQtd";
import ClearIcon from "@mui/icons-material/Clear";
import BarChartTest from "../components/Ingressantes/ChartStackedBar";
import ChartLine from "../components/ChartLine";
import CountUp from "react-countup";
import ChartFunnel from "../components/ChartFunnel";
import {
  HorizontalBarChart,
  HorizontalBarProps,
} from "../components/ChartBarHorizontal";
import { cities, courses } from "../utils/options";
import ChartLineIng from "../components/Ingressantes/ChartLineIng";
import ChartLineIngEnemVest from "../components/Ingressantes/ChartLineIngEnemVest";
import ChartPieIng from "../components/Ingressantes/ChartPieIng";
import ChartLineIngGen from "../components/Ingressantes/ChartLineIngGen";
import ChartLineTurn from "../components/Ingressantes/ChartLineTurn";

export interface DataStructure {
  cards: CardsArray[];
  horizontalBar: HorizontalBarProps;
}

export default function Home() {
  const [course, setCourse] = useState<string | null>("");
  const [city, setCity] = useState<string | null>("");
  const [modality, setModality] = useState<string>("");
  const [degree, setDegree] = useState<string>("");
  const [isLoading2, setIsLoading2] = useState(true);

  const [year, setYear] = useState<number[]>([2010, 2022]);

  const handleChange = (_event: Event, newValue: number | number[]) => {
    setYear(newValue as number[]);
  };
  const fecthData = async () => {
    const apiUrl = import.meta.env.VITE_BACK_END_URL as string;
    console.log("apiUrl", apiUrl);
    try {
      const response = await api.get(apiUrl, {
        params: {
          action: "getFiltered",
          course: course,
          city: city,
          modality: modality,
          degree: degree,
        },
      });

      // console.log("API Response:", response.data);
      setIsLoading2(false);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  // const { data, error, isLoading, refetch } = useQuery({
  //   queryKey: ["posts"],
  //   queryFn: fecthData,
  //   staleTime: 999999, // 5 segundos antes de marcar como stale
  // });

  const data = [
    {
      lineChartIng: [
        {
          title: "Quantidade de Ingressantes",
          qtd: 55588,
          hidden: false,
          data: [
            {
              ano: 2010,
              qtd: 3181,
            },
            {
              ano: 2011,
              qtd: 3332,
            },
            {
              ano: 2012,
              qtd: 4897,
            },
            {
              ano: 2013,
              qtd: 3808,
            },
            {
              ano: 2014,
              qtd: 3828,
            },
            {
              ano: 2015,
              qtd: 4704,
            },
            {
              ano: 2016,
              qtd: 4708,
            },
            {
              ano: 2017,
              qtd: 4490,
            },
            {
              ano: 2018,
              qtd: 5750,
            },
            {
              ano: 2019,
              qtd: 5589,
            },
            {
              ano: 2020,
              qtd: 2122,
            },
            {
              ano: 2021,
              qtd: 4507,
            },
            {
              ano: 2022,
              qtd: 4672,
            },
          ],
        },
      ],
    },
    {
      horizontalBar: {
        name: "Ingressantes",
        data: [17294, 10173, 7132, 16, 139, 23],
      },
    },
    {
      lineChart: [
        {
          name: "Branca",
          hidden: false,
          data: [
            345, 417, 1015, 600, 939, 1188, 1144, 1135, 1461, 1498, 531, 1662,
            1543,
          ],
          total: 13478,
        },
        {
          name: "Negra",
          hidden: false,
          data: [
            205, 271, 326, 294, 403, 464, 470, 515, 656, 559, 1263, 2067, 858,
          ],
          total: 8351,
        },
        {
          name: "Parda",
          hidden: false,
          data: [
            413, 606, 912, 636, 1143, 1553, 1870, 1575, 2408, 2150, 28, 130,
            394,
          ],
          total: 13818,
        },
        {
          name: "Amarela",
          hidden: true,
          data: [7, 15, 42, 14, 69, 53, 61, 59, 91, 50, 21, 549, 279],
          total: 1310,
        },
        {
          name: "Indígena",
          hidden: true,
          data: [2, 6, 9, 3, 4, 10, 125, 15, 34, 45, 14, 54, 48],
          total: 369,
        },
        {
          name: "N/ Declarado",
          hidden: true,
          data: [
            2209, 2017, 2593, 2261, 1270, 1436, 1038, 1191, 1100, 1287, 265, 45,
            1550,
          ],
          total: 18262,
        },
      ],
    },
    {
      funnelChart: [
        {
          name: "ingressantes",
          data: [1264, 35572, 7747, 4787, 2990, 2603, 554, 71],
        },
      ],
    },
    {
      barVertical: [
        {
          name: "Masculino",
          hidden: false,
          data: [
            1348, 1377, 2050, 1614, 1702, 2078, 2128, 2129, 2363, 2290, 930,
            1705, 1967,
          ],
        },
        {
          name: "Feminino",
          hidden: true,
          data: [
            1833, 1955, 2847, 2194, 2126, 2626, 2580, 2361, 3387, 3299, 1192,
            2802, 2705,
          ],
        },
      ],
    },
    {
      lineChartEnemVest: [
        {
          title: "Ingressantes pelo Enem",
          qtd: 31420,
          hidden: false,
          data: [
            {
              ano: 2010,
              qtd: 3113,
            },
            {
              ano: 2011,
              qtd: 3259,
            },
            {
              ano: 2012,
              qtd: 4599,
            },
            {
              ano: 2013,
              qtd: 2110,
            },
            {
              ano: 2014,
              qtd: 1685,
            },
            {
              ano: 2015,
              qtd: 2262,
            },
            {
              ano: 2016,
              qtd: 2095,
            },
            {
              ano: 2017,
              qtd: 2208,
            },
            {
              ano: 2018,
              qtd: 3301,
            },
            {
              ano: 2019,
              qtd: 2897,
            },
            {
              ano: 2020,
              qtd: 880,
            },
            {
              ano: 2021,
              qtd: 934,
            },
            {
              ano: 2022,
              qtd: 2077,
            },
          ],
        },
        {
          title: "Ingressantes pelo Vestibular",
          qtd: 21146,
          hidden: true,
          data: [
            {
              ano: 2010,
              qtd: 0,
            },
            {
              ano: 2011,
              qtd: 0,
            },
            {
              ano: 2012,
              qtd: 1,
            },
            {
              ano: 2013,
              qtd: 1614,
            },
            {
              ano: 2014,
              qtd: 1925,
            },
            {
              ano: 2015,
              qtd: 1851,
            },
            {
              ano: 2016,
              qtd: 2194,
            },
            {
              ano: 2017,
              qtd: 2065,
            },
            {
              ano: 2018,
              qtd: 2070,
            },
            {
              ano: 2019,
              qtd: 2210,
            },
            {
              ano: 2020,
              qtd: 2067,
            },
            {
              ano: 2021,
              qtd: 3215,
            },
            {
              ano: 2022,
              qtd: 1934,
            },
          ],
        },
      ],
    },
  ];

  console.log(data[4]?.barVertical);

  // if (isLoading) return <>carregando dados...</>;
  // if (error) return <div>Something went wrong!</div>;

  return (
    <div className="grid grid-cols-12 gap-5 border bg-gray-100/20 px-4">
      <div className="col-span-12 row-span-1 text-center font-bold text-2xl flex items-center justify-center border-green-500">
        DASHBOARD CENSO DA EDUCAÇÃO SUPERIOR - UNEMAT
      </div>
      <div className="col-span-2">
        <div className="flex flex-col gap-4 p-4 rounded-md border font-Roboto font-medium">
          <p>Filtros</p>

          <Autocomplete
            className="col-span-3"
            fullWidth
            value={course}
            options={courses}
            onChange={(_event: any, newValue: string | null) => {
              setCourse(newValue);
            }}
            renderInput={(params) => <TextField {...params} label="Curso" />}
          />
          <Autocomplete
            className="col-span-3"
            fullWidth
            value={city}
            options={cities}
            onChange={(_event: any, newValue: string | null) => {
              setCity(newValue);
            }}
            renderInput={(params) => (
              <TextField {...params} label="Município" />
            )}
          />
          <FormControl fullWidth>
            <InputLabel>Modalidade</InputLabel>
            <Select
              value={modality}
              label="Modalidade"
              onChange={(event: SelectChangeEvent) => {
                setModality(event.target.value as string);
              }}
            >
              <MenuItem value={1}>Presencial</MenuItem>
              <MenuItem value={2}>Distância</MenuItem>
            </Select>
            {modality !== "" && (
              <IconButton
                onClick={() => setModality("")}
                style={{
                  position: "absolute",
                  right: 20,
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              >
                <ClearIcon fontSize="small" />
              </IconButton>
            )}
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Grau Acadêmico</InputLabel>
            <Select
              value={degree}
              label="Grau Acadêmico"
              onChange={(event: SelectChangeEvent) => {
                setDegree(event.target.value as string);
              }}
            >
              <MenuItem value={1}>Bacharelado</MenuItem>
              <MenuItem value={2}>Licenciatura</MenuItem>
            </Select>
            {degree !== "" && (
              <IconButton
                onClick={() => setDegree("")}
                style={{
                  position: "absolute",
                  right: 20,
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              >
                <ClearIcon fontSize="small" />
              </IconButton>
            )}
          </FormControl>

          <div className="px-1">
            <p>Ano</p>

            <Slider
              disabled
              getAriaLabel={() => "Temperature range"}
              value={year}
              min={2010}
              max={2022}
              step={1}
              onChange={handleChange}
              valueLabelDisplay="auto"
              getAriaValueText={() => `${year}`}
            />
            <div className="flex justify-between items-center w-full">
              <p>{year[0]}</p>
              <p>{year[1]}</p>
            </div>
          </div>
          <Button
            variant="contained"
            onClick={() => {
              setIsLoading2(true);
              // refetch();
            }}
          >
            {isLoading2 ? "Gerando" : "Gerar"}
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-3  border-red-500 col-span-10 ">
        {/* Graficos de Linha */}
        <div className="grid grid-cols-2 grid-rows-5 !h-[500px]  border-red-500 rounded-3xl bg-white shadow-md shadow-black/10 col-span-7 !row-span-1">
          <div className="col-span-2 row-span-3">
            <ChartLineIng data={data[0].lineChartIng} />
          </div>
          <div className="col-span-1 row-span-2  pl-2  border-500-red">
            <ChartLineIngEnemVest
              title="Ingressantes por Enem"
              data={data[5]?.lineChartEnemVest?.[0]}
            />
          </div>
          <div className="col-span-1 row-span-2 pr-2 border-500-red">
            <ChartLineIngEnemVest
              title="Ingressantes por Vestibular"
              data={data[5]?.lineChartEnemVest?.[1]}
            />
          </div>
        </div>

        {/* BarVertical + Line */}
        <div className="grid grid-cols-2 grid-rows-5 !h-[500px] col-span-5 border rounded-3xl bg-white shadow-md shadow-black/10">
          <div className="col-span-2 h-full row-span-3 border-red-500">
            <HorizontalBarChart data={data[1].horizontalBar} />
          </div>
          <div className="col-span-2 row-span-2 border-red-500">
          <ChartLineTurn data={data[4]?.barVertical} />
          </div>
        </div>

        {/* BarHorizontal */}
        <div className="col-span-7 gap-3 !h-[500px] border px-4 pt-2 rounded-3xl bg-white shadow-md shadow-black/10">
          <BarChartTest data={data[4]} />
        </div>

        {/* BarPie + BarLine */}
        <div className="grid grid-rows-5 border px-4 !h-[500px] pt-2 rounded-3xl bg-white shadow-md shadow-black/10 col-span-5">
          <div className="row-span-3 !h-[300px] border-red-500">
            <ChartPieIng />
          </div>

          <div className="row-span-2 !h-[200px]  border-red-500">
            <ChartLineIngGen data={data[4]?.barVertical} />
          </div>
        </div>

        <div className="col-span-8 !h-[450px] gap-3 rounded-3xl bg-white shadow-md shadow-black/10">
          <ChartLine data={data[2]} />
        </div>
        <div className="col-span-4 !h-[450px] rounded-3xl bg-white shadow-md shadow-black/10">
          <ChartFunnel data={data[3]} />
        </div>

        {/* 
        <div className="col-span-8 row-span-1 gap-3 rounded-3xl bg-white shadow-md shadow-black/10">
          <ChartLine data={data[2]} />
          <div className="col-span-1 flex flex-col">
            <div className="font-Bold mt-10">
              <p className="text-left  font-normal text-xs">Branca</p>
              <p className="text-left font-bold text-4xl text-[#008FFB]">
                <CountUp start={0} duration={2.75} end={100} />
              </p>
            </div>
            <div className="font-Bold">
              <p className="text-left  font-normal text-xs">Negra</p>
              <p className="text-left font-bold text-4xl text-[#00E396]">
                <CountUp start={0} duration={2.75} end={100} />
              </p>
            </div>
            <div className="font-Bold">
              <p className="text-left  font-normal text-xs">Parda</p>
              <p className="text-left font-bold text-4xl text-[#FEB019]">
                <CountUp start={0} duration={2.75} end={100} />
              </p>
            </div>
            <div className="font-Bold">
              <p className="text-left  font-normal text-xs">Amarela</p>
              <p className="text-left font-bold text-4xl text-[#FF4560]">
                <CountUp start={0} duration={2.75} end={100} />
              </p>
            </div>
            <div className="font-Bold">
              <p className="text-left  font-normal text-xs">Indígena</p>
              <p className="text-left font-bold text-4xl text-[#775DD0]">
                <CountUp start={0} duration={2.75} end={100} />
              </p>
            </div>
            <div className="font-Bold">
              <p className="text-left  font-normal text-xs">N/ Declarado</p>
              <p className="text-left font-bold text-4xl text-[#008FFB]">
                <CountUp start={0} duration={2.75} end={100} />
              </p>
            </div>
          </div>
        </div>
        <div className="col-span-4 row-span-1 rounded-3xl bg-white shadow-md shadow-black/10">
          <ChartFunnel data={data[3]} />
        </div> */}
      </div>
    </div>
  );
}
