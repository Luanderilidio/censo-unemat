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
import BarChartTest from "../components/ChartBar";
import ChartLine from "../components/ChartLine";
import ChartFunnel from "../components/ChartFunnel";
import {
  HorizontalBarChart,
  HorizontalBarProps,
} from "../components/ChartBarHorizontal";
import { cities, courses } from "../utils/options";




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

      console.log("API Response:", response.data);
      setIsLoading2(false);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["posts"],
    queryFn: fecthData,
    staleTime: 999999, // 5 segundos antes de marcar como stale
  });

  if (isLoading) return <>carregando dados...</>;
  if (error) return <div>Something went wrong!</div>;

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
              refetch();
            }}
          >
            {isLoading2 ? "Gerando" : "Gerar"}
          </Button>
        </div>
      </div>
      <div className="col-span-10  grid grid-cols-12 grid-rows-12 gap-3  border-red-500 ">
        <div className="col-span-7 row-span-1 grid grid-cols-4 grid-rows-5 gap-3 border-1 border p-4 rounded-3xl bg-white shadow-md shadow-black/10 ">
        <p className="col-span-4 font-bold top-2 left-5">Quantidade de Ingressantes, Vagas, Inscritos e Concluintes por ano</p>
          <CardQtd
            qtd={data[0].cards[0].qtd}
            data={data[0].cards[0].data}
            title={data[0].cards[0].title}
          />
          <CardQtd
            qtd={data[0].cards[1].qtd}
            data={data[0].cards[1].data}
            title={data[0].cards[1].title}
          />
          <CardQtd
            qtd={data[0].cards[2].qtd}
            data={data[0].cards[2].data}
            title={data[0].cards[2].title}
          />
          <CardQtd
            qtd={data[0].cards[3].qtd}
            data={data[0].cards[3].data}
            title={data[0].cards[3].title}
          />
        </div>
        <div className="col-span-5 row-span-1 h-fit border-1 border rounded-3xl relative bg-white shadow-md shadow-black/10">
          <HorizontalBarChart data={data[1].horizontalBar} />
        </div>
        <div className="col-span-12 gap-3">
          <div className=" border px-4 h-full pt-2 rounded-3xl bg-white shadow-md shadow-black/10">
            <BarChartTest data={data[4]} />
          </div>
        </div>
        <div className="col-span-8 row-span-1 gap-3 rounded-3xl bg-white shadow-md shadow-black/10">
          <ChartLine data={data[2]} />
          {/* <div className="col-span-1 flex flex-col">
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
          </div> */}
        </div>
        <div className="col-span-4 row-span-1 rounded-3xl bg-white shadow-md shadow-black/10">
          <ChartFunnel data={data[3]} />
        </div>
      </div>
    </div>
  );
}
