import {
  Autocomplete,
  Button,
  CardContent,
  Collapse,
  LinearProgress,
  Slider,
  TextField,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import SchoolIcon from '@mui/icons-material/School';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { TbTools } from 'react-icons/tb';
import { HiCode } from "react-icons/hi";
import SearchIcon from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import WifiIcon from '@mui/icons-material/Wifi';
import ApartmentIcon from '@mui/icons-material/Apartment';
import { FaChalkboardTeacher } from 'react-icons/fa';
import { MdWork } from 'react-icons/md';
import { useMemo, useState } from 'react';
import { dataFilters } from '../utils/dataFilters';
import { ExpandMore } from '../utils/ExpandMore';
import IngressantesMain from '../components/Ingressantes2/IngressantesMain';
import api from '../services/api';
import { EntrantsData } from '../components/Ingressantes2/SchemaEntrants';

export default function Home2() {
  const [loanding, setLoanding] = useState(false);
  const [data, setData] = useState<EntrantsData>();
  const [expanded, setExpanded] = useState(false);
  const [expandedFilter, setExpandedFilter] = useState(false);
  const [years, setYears] = useState<[number, number]>([2009, 2024]);
  const [city, setCity] = useState<string | null>(null);
  const [course, setCourse] = useState<string | null>(null);
  const [modality, setModality] = useState<string | null>(null);
  const [degree, setDegree] = useState<string | null>(null);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleExpandClickFilter = () => {
    setExpandedFilter(!expandedFilter);
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
    setLoanding(true);
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
    } finally {
      setLoanding(false);
    }
  };

  

  return (
    <div className="grid grid-cols-12 p-2 md:p-4">
      <div className="col-span-12 mb-5 text-black/50">
        <h1 className="text-center  uppercase md:text-4xl text-xl font-bold">
          Ferramenta de Visualização de dados dos cursos da UNEMAT
        </h1>
        <div className="flex items-center md:flex-row flex-col justify-center text-xs mt-1 md:text-lg md:gap-3 gap-0">
          <h2>
            <span className="font-bold">Orientador:</span> Prof. Me. Marcos Paulo de Mesquita
          </h2>
          <h2>
            <span className="font-bold">Orientando:</span> Luander Ilidio de Arruda
          </h2>
        </div>
      </div>
      <div className="col-span-12 row-span-1">{loanding && <LinearProgress />}</div>
      <div className="col-span-12 grid grid-cols-15   p-3 bg-gray-200/30 rounded-lg shadow-md  border-red-500">
        <div className="col-span-15 flex items-center justify-between text-black/50  border-blue-500">
          <div className="flex items-center justify-start">
            <FilterAltIcon />
            <p className="text-left font-Roboto font-bold text-2xl ">Filtros</p>
          </div>
          <div className="flex">
            <div className="hidden md:block">
              <Button
                onClick={() => {
                  fecthData();
                }}
                endIcon={<SearchIcon />}
                variant="contained"
              >
                Pesquisar
              </Button>
            </div>
            {/* <div className="flex items-center justify-center">
              <ExpandMoreIcon />
            </div> */}
            <ExpandMore
              className="block md:hidden"
              expand={expandedFilter}
              onClick={handleExpandClickFilter}
              aria-expanded={expandedFilter}
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </div>
        </div>
        <div className="col-span-15   border-green-500 ">
          <Collapse in={expandedFilter} timeout="auto" unmountOnExit>
            <div className="grid grid-cols-15 gap-3 mt-3">
              <Autocomplete
                className="col-span-15 md:col-span-3"
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
              <Autocomplete
                className="col-span-15 md:col-span-3"
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
              <div className="col-span-15 md:col-span-2">
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
              <div className="col-span-15 md:col-span-3">
                <Autocomplete
                  options={graus}
                  value={degree}
                  onChange={(_, newValue) => setDegree(newValue)}
                  renderInput={(params) => <TextField {...params} label="Grau Acadêmico" />}
                  renderOption={(props, option) => (



                    <li {...props} key={option}>
                      <div className="flex gap-2 items-center justify-center">
                        {option === 'BACHARELADO' && <MdWork size={15} />}
                        {option === 'BACHARELADO E LICENCIATURA' && <TbTools size={15} />}
                        {option === 'LICENCIATURA' && <FaChalkboardTeacher size={15} />}
                        {option === 'TECNOLOGICO' && <HiCode size={15} />}
                        <p className={'!text-xs !font-semibold leading-none'}>{option}</p>
                      </div>
                    </li>
                  )}
                />
              </div>
              <div className="col-span-15 md:col-span-4 px-2">
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
                    ...Array.from({ length: 2024 - 2009 + 1 }, (_, i) => ({
                      value: 2009 + i,
                      //   label: String(2010 + i),
                    })),
                  ]}
                />
                <div className="flex justify-between items-center w-full text-sm font-bold text-black/50 leading-none">
                  <p> {years[0]}</p>
                  <p> {years[1]}</p>
                </div>
              </div>
              <div className="col-span-15 flex items-center justify-end md:hidden">
                <Button
                  fullWidth
                  onClick={() => {
                    fecthData();
                  }}
                  endIcon={<SearchIcon />}
                  variant="contained"
                >
                  Pesquisar
                </Button>
              </div>
            </div>
          </Collapse>
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
      <div className=" col-span-12 mt-5 ">
        <IngressantesMain
          // entrants={data}
          data={data?.entrants}
        />
      </div>
    </div>
  );
}
