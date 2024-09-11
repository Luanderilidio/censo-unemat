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
import ClearIcon from "@mui/icons-material/Clear";

import { useState } from "react";

const cities = [
  "",
  "ALTA FLORESTA",
  "ALTO ARAGUAIA",
  "ARIPUANA",
  "BARRA DO BUGRES",
  "CACERES",
  "COLIDER",
  "CONFRESA",
  "JUARA",
  "JUINA",
  "LUCAS DO RIO VERDE",
  "LUCIARA",
  'MIRASSOL D"OESTE',
  "NOVA XAVANTINA",
  "POCONE",
  "PONTES E LACERDA",
  "SINOP",
  "SORRISO",
  "TANGARA DA SERRA",
  "TAPURAH",
  "VILA RICA",
  "JAURU",
  "SAO FELIX DO ARAGUAIA",
  "GUARANTA DO NORTE",
  "MATUPA",
  "DIAMANTINO",
  "NOVA MUTUM",
  "ARENAPOLIS",
  "CAMPO VERDE",
  "COMODORO",
  "SAPEZAL",
  "ITIQUIRA",
  "RONDONOPOLIS",
  "AGUA BOA",
  "CAMPOS DE JULIO",
  "BRASNORTE",
  "MARCELANDIA",
  "SAO JOSE DOS QUATRO MARCOS",
  "CUIABA",
  "PEDRA PRETA",
  "PORTO ESPERIDIAO",
  "PRIMAVERA DO LESTE",
  "CANARANA",
  "PARANATINGA",
  "QUERENCIA",
];

const courses = [
  "",
  "AGRONOMIA",
  "CIENCIAS BIOLOGICAS",
  "ENGENHARIA FLORESTAL",
  "COMPUTACAO",
  "COMUNICACAO SOCIAL",
  "LETRAS",
  "ADMINISTRACAO",
  "ARQUITETURA E URBANISMO",
  "CIENCIA DA COMPUTACAO",
  "ENGENHARIA DE ALIMENTOS",
  "ENGENHARIA DE PRODUCAO AGROINDUSTRIAL",
  "MATEMATICA",
  "PROGRAMA DE FORMACAO PEDAGOGICA PARA DOCENTES INDIGENAS - CIENCIAS NATURAIS E MATEMATICA",
  "PROGRAMA DE FORMACAO PEDAGOGICA PARA DOCENTES INDIGENAS - CIENCIAS SOCIAIS",
  "PROGRAMA DE FORMACAO PEDAGOGICA PARA DOCENTES INDIGENAS - LINGUAS, ARTES E LITERATURA",
  "CIENCIAS CONTABEIS",
  "DIREITO",
  "EDUCACAO FISICA",
  "ENFERMAGEM",
  "GEOGRAFIA",
  "HISTORIA",
  "PEDAGOGIA",
  "TURISMO",
  "LETRAS - PORTUGUES E ESPANHOL",
  "CIENCIAS ECONOMICAS",
  "QUIMICA",
  "ZOOTECNIA",
  "LETRAS - PORTUGUES E INGLES",
  "ENGENHARIA CIVIL",
  "ADMINISTRACAO EM AGRONEGOCIOS - AGRONEGOCIO",
  "ADMINISTRACAO PUBLICA",
  "MEDICINA",
  "CIENCIAS HUMANAS",
  "LETRAS - ESPANHOL",
  "LETRAS - INGLES",
  "ENGENHARIA ELETRICA",
  "COMPUTACAO E INFORMATICA",
  "LICENCIATURA INTERCULTURAL INDIGENA",
  "SISTEMAS DE INFORMACAO",
  "JORNALISMO",
  "FISICA",
  "ARTES VISUAIS",
  "FILOSOFIA",
  "CIENCIAS SOCIAIS",
];

export default function Filters() {
  const [course, setCourse] = useState<string | null>(courses[0]);
  const [city, setCity] = useState<string | null>(cities[0]);
  const [modality, setModality] = useState<string>("");
  const [academicdegree, setAcademicDegree] = useState<string>("");

  const [year, setYear] = useState<number[]>([2010, 2022]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setYear(newValue as number[]);
  };
  return (
    <div className="flex flex-col gap-4 p-4 rounded-md border font-Roboto font-medium">
      <p>
        Filtros
      </p>
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
        renderInput={(params) => <TextField {...params} label="Município" />}
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
          value={academicdegree}
          
          label="Grau Acadêmico"
          onChange={(event: SelectChangeEvent) => {
            setAcademicDegree(event.target.value as string);
          }}
        >
          <MenuItem value={1}>Bacharelado</MenuItem>
          <MenuItem value={2}>Licenciatura</MenuItem>
        </Select>
        {academicdegree !== "" && (
          <IconButton
            
            onClick={() => setAcademicDegree("")}
            style={{
              position: "absolute",
              right: 20,
              top: "50%",
              transform: "translateY(-50%)",
            }}
          >
            <ClearIcon fontSize="small"/>
          </IconButton>
        )}
      </FormControl>
      {/* <Autocomplete
        className="col-span-3"
        fullWidth
        value={courses}
        options={cursos}
        onChange={(_event: any, newValue: string | null) => {
          setCourses(newValue);
        }}
        renderInput={(params) => <TextField {...params} label="Modalidade" />}
      /> */}

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
      <Button variant="contained">Gerar</Button>
    </div>
  );
}
