import {
  Autocomplete,
  Box,
  Button,
  CardContent,
  Collapse,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Slider,
  TextField,
  Typography,
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import SchoolIcon from '@mui/icons-material/School';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { TbTools } from 'react-icons/tb';
import SearchIcon from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import WifiIcon from '@mui/icons-material/Wifi';
import ApartmentIcon from '@mui/icons-material/Apartment';
import { FaChalkboardTeacher } from 'react-icons/fa';
import { MdWork } from 'react-icons/md';

import { cities, courses } from '../utils/options';
import { useMemo, useState } from 'react';
import { dataFilters } from '../utils/dataFilters';
import { ExpandMore } from '../utils/ExpandMore';
import IngressantesMain from '../components/Ingressantes2/IngressantesMain';
import api from '../services/api';
import { EntrantsData, EntrantsDataSchema } from '../components/Ingressantes2/SchemaEntrants';

export default function Home2() {
  const [data, setData] = useState<EntrantsData>();
  const [expanded, setExpanded] = useState(false);
  const [years, setYears] = useState<[number, number]>([2009, 2023]);
  const [city, setCity] = useState<string | null>(null);
  const [course, setCourse] = useState<string | null>(null);
  const [modality, setModality] = useState<string | null>(null);
  const [degree, setDegree] = useState<string | null>(null);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const anos = useMemo(
    () => Array.from(new Set(dataFilters.map((d) => Number(d.NU_ANO_CENSO)))).sort(),
    [],
  );

  const handleYearChange = (_: Event, newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      setYears([newValue[0], newValue[1]]);
    }
  };

  const filteredData = useMemo(() => {
    let filtered = dataFilters.filter(
      (d) => Number(d.NU_ANO_CENSO) >= years[0] && Number(d.NU_ANO_CENSO) <= years[1],
    );
    if (city) filtered = filtered.filter((d) => d.NO_MUNICIPIO === city);
    if (course) filtered = filtered.filter((d) => d.NO_CURSO === course);
    if (modality) filtered = filtered.filter((d) => d.TP_MODALIDADE_ENSINO === modality);
    if (degree) filtered = filtered.filter((d) => d.TP_GRAU_ACADEMICO === degree);
    return filtered;
  }, [years, city, course, modality, degree]);

  const municipios = useMemo(
    () => Array.from(new Set(filteredData.map((d) => d.NO_MUNICIPIO))).sort(),
    [filteredData],
  );

  const cursos = useMemo(
    () => Array.from(new Set(filteredData.map((d) => d.NO_CURSO))).sort(),
    [filteredData],
  );

  const modalidades = useMemo(
    () => Array.from(new Set(filteredData.map((d) => d.TP_MODALIDADE_ENSINO))).sort(),
    [filteredData],
  );

  const graus = useMemo(
    () => Array.from(new Set(filteredData.map((d) => d.TP_GRAU_ACADEMICO))).sort(),
    [filteredData],
  );

  const columns = [
    { field: 'NU_ANO_CENSO', headerName: 'Ano', width: 100 },
    { field: 'NO_MUNICIPIO', headerName: 'Município', width: 180 },
    { field: 'NO_CURSO', headerName: 'Curso', width: 200 },
    { field: 'TP_MODALIDADE_ENSINO', headerName: 'Modalidade', width: 150 },
    { field: 'TP_GRAU_ACADEMICO', headerName: 'Grau Acadêmico', width: 180 },
  ];

  const fecthData = async () => {
    const apiUrl = import.meta.env.VITE_BACK_END_URL as string;
    console.log('apiUrl', apiUrl);
    try {
      const response = await api.get<EntrantsData>(apiUrl, {
        params: {
          course: course,
          city: city,
          modality: modality,
          degree: degree,
          year_start: years[0],
          year_end: years[1],
        },
      });

      setData(response.data);

      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="grid grid-cols-12 p-4">
      <div className="col-span-12 grid grid-cols-15 gap-3 p-3 bg-gray-200/30 rounded-lg shadow-md">
        <div className="col-span-15 flex items-center justify-between text-black/50 mb-3">
          <div className="flex items-center justify-start">
            <FilterAltIcon />
            <p className="text-left font-Roboto font-bold text-2xl ">Filtros</p>
          </div>
          <div className="flex">
            <Button
              onClick={() => {
                // console.log({
                //   course: course,
                //   city: city,
                //   modality: modality,
                //   degree: degree,
                //   yearStart: years[0],
                //   yearEnd: years[1],
                // });

                fecthData();
              }}
              endIcon={<SearchIcon />}
              variant="contained"
            >
              Pesquisar
            </Button>

            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </div>
        </div>
        <Autocomplete
          className="col-span-3"
          options={municipios}
          value={city}
          onChange={(_, newValue) => setCity(newValue)}
          renderInput={(params) => <TextField {...params} label="Município" />}
          renderOption={(props, option) => (
            <li {...props} key={option}>
              <div className="flex gap-1 items-center justify-center">
                {option !== 'Selecionar tudo' && <FmdGoodIcon sx={{ fontSize: 12 }} />}
                <p className={`!text-sm !font-semibold leading-none  `}>{option}</p>
              </div>
            </li>
          )}
        />

        {/* Curso - Autocomplete */}
        <Autocomplete
          className="col-span-3"
          options={cursos}
          value={course}
          onChange={(_, newValue) => setCourse(newValue)}
          renderInput={(params) => <TextField {...params} label="Curso" />}
          renderOption={(props, option) => (
            <li {...props} key={option}>
              <div className="flex gap-1 items-start justify-center">
                {option !== 'Selecionar tudo' && <SchoolIcon sx={{ fontSize: 12 }} />}
                <p
                  className={`!text-xs !font-semibold leading-none ${
                    option === 'Selecionar tudo' && 'text-black/40'
                  }`}
                >
                  {option}
                </p>
              </div>
            </li>
          )}
        />

        {/* Modalidade - Select */}
        <div className="col-span-2">
          <Autocomplete
            options={modalidades}
            value={modality}
            onChange={(_, newValue) => setModality(newValue)}
            renderInput={(params) => <TextField {...params} label="Modalidade" />}
            renderOption={(props, option) => (
              <li {...props} key={option}>
                <div className="flex gap-2 items-center justify-center">
                  {option === 'DISTANCIA' ? (
                    <WifiIcon sx={{ fontSize: 20 }} />
                  ) : (
                    <ApartmentIcon sx={{ fontSize: 20 }} />
                  )}
                  <p className={'!text-sm !font-semibold leading-none'}>{option}</p>
                </div>
              </li>
            )}
          />
        </div>

        {/* Grau Acadêmico - Select */}
        <div className="col-span-3">
          <Autocomplete
            options={graus}
            value={degree}
            onChange={(_, newValue) => setDegree(newValue)}
            renderInput={(params) => <TextField {...params} label="Grau Acadêmico" />}
            renderOption={(props, option) => (
              <li {...props} key={option}>
                <div className="flex gap-2 items-center justify-center">
                  {option === 'BACHARELADO' && <MdWork size={15} />}
                  {option === 'LICENCIATURA' && <FaChalkboardTeacher size={15} />}
                  {option === 'TECNOLOGICO' && <TbTools size={15} />}
                  <p className={'!text-sm !font-semibold leading-none'}>{option}</p>
                </div>
              </li>
            )}
          />
        </div>
        <div className="col-span-4 px-2">
          <div className="flex justify-between items-center w-full text-sm font-bold text-black/50 leading-none">
            <p>Início</p>
            <p>Fim</p>
          </div>
          <Slider
            value={years}
            onChange={handleYearChange}
            valueLabelDisplay="auto"
            min={Number(anos[0])}
            max={Number(anos[anos.length - 1])}
            step={1}
            marks={[
              ...Array.from({ length: 2023 - 2010 + 1 }, (_, i) => ({
                value: 2010 + i,
                //   label: String(2010 + i),
              })),
            ]}
          />
          <div className="flex justify-between items-center w-full text-sm font-bold text-black/50 leading-none">
            <p> {years[0]}</p>
            <p> {years[1]}</p>
          </div>
        </div>
      </div>
      <div className="col-span-12 bg-gray-200/30">
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <DataGrid
              rows={filteredData.map((row, i) => ({ id: i, ...row }))}
              columns={columns}
              rowHeight={50}
              getRowId={(row) => row.id}
              editMode="row"
              initialState={{
                pagination: {
                  paginationModel: { pageSize: 10 },
                },
              }}
              pageSizeOptions={[5, 10]}
              disableRowSelectionOnClick
            />
          </CardContent>
        </Collapse>
      </div>

      {/* INGRESSANTES */}
      <div className="col-span-15">
        <IngressantesMain
          // entrants={data}
          data={data?.entrants}
        />
      </div>
    </div>
  );
}
