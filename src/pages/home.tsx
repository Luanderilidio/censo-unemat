import { useQuery } from "@tanstack/react-query";
import api from "../services/api";
import { useEffect, useState } from "react";
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
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import CardQtd, { CardsArray } from "../components/CardQtd";
import DownloadIcon from "@mui/icons-material/Download";
import ClearIcon from "@mui/icons-material/Clear";
import BarChartTest from "../components/ChartBar";
import ChartLine from "../components/ChartLine";
import ChartFunnel from "../components/ChartFunnel";
import {
  HorizontalBarChart,
  HorizontalBarProps,
} from "../components/ChartBarHorizontal";
import { cities, courses } from "../utils/options";

interface Microdados {
  id: string;
  nu_ano_censo: string;
  no_municipio: string;
  no_curso: string;
  co_curso: string;
  no_cine_rotulo: string;
  no_cine_area_geral: string;
  tp_modalidade_ensino: string;
  tp_grau_academico: string;
  qt_curso: string;
  qt_vg_total: string;
  qt_vg_total_diurno: string;
  qt_vg_total_noturno: string;
  qt_vg_total_ead: string;
  qt_vg_nova: string;
  qt_vg_proc_seletivo: string;
  qt_vg_remanesc: string;
  qt_vg_prog_especial: string;
  qt_inscrito_total: string;
  qt_inscrito_total_diurno: string;
  qt_inscrito_total_noturno: string;
  qt_inscrito_total_ead: string;
  qt_insc_vg_nova: string;
  qt_insc_proc_seletivo: string;
  qt_insc_vg_remanesc: string;
  qt_insc_vg_prog_especial: string;
  qt_ing: string;
  qt_ing_fem: string;
  qt_ing_masc: string;
  qt_ing_diurno: string;
  qt_ing_noturno: string;
  qt_ing_vg_nova: string;
  qt_ing_vestibular: string;
  qt_ing_enem: string;
  qt_ing_avaliacao_seriada: string;
  qt_ing_selecao_simplifica: string;
  qt_ing_egr: string;
  qt_ing_outro_tipo_selecao: string;
  qt_ing_proc_seletivo: string;
  qt_ing_vg_remanesc: string;
  qt_ing_vg_prog_especial: string;
  qt_ing_outra_forma: string;
  qt_ing_0_17: string;
  qt_ing_18_24: string;
  qt_ing_25_29: string;
  qt_ing_30_34: string;
  qt_ing_35_39: string;
  qt_ing_40_49: string;
  qt_ing_50_59: string;
  qt_ing_60_mais: string;
  qt_ing_branca: string;
  qt_ing_preta: string;
  qt_ing_parda: string;
  qt_ing_amarela: string;
  qt_ing_indigena: string;
  qt_ing_cornd: string;
  qt_mat: string;
  qt_mat_fem: string;
  qt_mat_masc: string;
  qt_mat_diurno: string;
  qt_mat_noturno: string;
  qt_mat_0_17: string;
  qt_mat_18_24: string;
  qt_mat_25_29: string;
  qt_mat_30_34: string;
  qt_mat_35_39: string;
  qt_mat_40_49: string;
  qt_mat_50_59: string;
  qt_mat_60_mais: string;
  qt_mat_branca: string;
  qt_mat_preta: string;
  qt_mat_parda: string;
  qt_mat_amarela: string;
  qt_mat_indigena: string;
  qt_mat_cornd: string;
  qt_conc: string;
  qt_conc_fem: string;
  qt_conc_masc: string;
  qt_conc_diurno: string;
  qt_conc_noturno: string;
  qt_conc_0_17: string;
  qt_conc_18_24: string;
  qt_conc_25_29: string;
  qt_conc_30_34: string;
  qt_conc_35_39: string;
  qt_conc_50_59: string;
  qt_conc_60_mais: string;
  qt_conc_branca: string;
  qt_conc_preta: string;
  qt_conc_parda: string;
  qt_conc_amarela: string;
  qt_conc_indigena: string;
  qt_conc_cornd: string;
  qt_aluno_deficiente: string;
  qt_ing_deficiente: string;
  qt_mat_deficiente: string;
  qt_conc_deficiente: string;
  qt_ing_financ: string;
  qt_ing_prounii: string;
  qt_ing_prounip: string;
  qt_ing_reserva_vaga: string;
  qt_ing_rvredepublica: string;
  qt_ing_rvetnico: string;
  qt_ing_rvpdef: string;
  qt_ing_rvsocial_rf: string;
  qt_ing_rvoutros: string;
  qt_mat_reserva_vaga: string;
  qt_mat_rvredepublica: string;
  qt_mat_rvetnico: string;
  qt_mat_rvpdef: string;
  qt_mat_rvsocial_rf: string;
  qt_mat_rvoutros: string;
  qt_conc_reserva_vaga: string;
  qt_conc_rvredepublica: string;
  qt_conc_rvetnico: string;
  qt_conc_rvpdef: string;
  qt_conc_rvsocial_rf: string;
  qt_conc_rvoutros: string;
  qt_sit_trancada: string;
  qt_sit_desvinculado: string;
  qt_sit_transferido: string;
  qt_sit_falecido: string;
  qt_ing_processpublica: string;
  qt_ing_processprivada: string;
  qt_ing_procnaoinformada: string;
  qt_mat_processpublica: string;
  qt_mat_processprivada: string;
  qt_mat_procnaoinformada: string;
  qt_conc_processpublica: string;
  qt_conc_processprivada: string;
  qt_conc_procnaoinformada: string;
  qt_apoio_social: string;
  qt_ing_apoio_social: string;
  qt_mat_apoio_social: string;
  qt_conc_apoio_social: string;
}

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

  const handleChange = (event: Event, newValue: number | number[]) => {
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

  if (isLoading) return <>carregando dados...</>
  if (error) return <div>Something went wrong!</div>;

  return (
    <div className="grid grid-cols-12 gap-5 border bg-gray-100/20">
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
          <div className="col-span-4 flex items-center justify-between row-span-1">
            <p className="font-bold">Quantitativos</p>
            <Button
              variant="contained"
              color="inherit"
              size="small"
              endIcon={<DownloadIcon />}
            >
              Export
            </Button>
          </div>

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
        <div className="col-span-5 row-span-1 border-1 border rounded-3xl relative bg-white shadow-md shadow-black/10">
          <HorizontalBarChart data={data[1].horizontalBar} />
        </div>
        <div className="col-span-12 gap-3">
          <div className=" border px-4 h-full pt-2 rounded-3xl bg-white shadow-md shadow-black/10">
            <BarChartTest />
          </div>
        </div>
        <div className="col-span-8 row-span-1 gap-3 rounded-3xl bg-white shadow-md shadow-black/10">
          <ChartLine />
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
          <ChartFunnel />
        </div>
      </div>
    </div>
  );
}
