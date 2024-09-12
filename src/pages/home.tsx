import { useQuery } from "@tanstack/react-query";
import api from "../services/api";
import { useEffect } from "react";
import { Button } from "@mui/material";
import Filters from "../components/filters";
import { faker } from "@faker-js/faker";
import CardQtd from "../components/CardQtd";
import DownloadIcon from "@mui/icons-material/Download";
import BarChartTest from "../components/ChartBar";

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

const fecthData = async () => {
  const apiUrl = import.meta.env.VITE_BACK_END_URL as string;
  console.log("apiUrl", apiUrl);
  try {
    const response = await api.get(apiUrl, {
      params: {
        action: "get",
        // limit: limit,
      },
    });

    console.log("API Response:", response.data.output);
    return response.data.output;
  } catch (error) {
    console.log(error);
  }
};

export default function Home() {
  // const { data, error, isLoading } = useQuery({
  //   queryKey: ["posts"],
  //   queryFn: fecthData,
  //   staleTime: 999999, // 5 segundos antes de marcar como stale
  // });

  // if (isLoading) return <div>Loading...</div>;
  // if (error) return <div>Something went wrong!</div>;
  return (
    <div className="grid grid-cols-12 gap-5 border bg-gray-100/20">
      <div className="col-span-12 row-span-1 text-center font-bold text-2xl flex items-center justify-center border-green-500">
        DASHBOARD CENSO DA EDUCAÇÃO SUPERIOR - UNEMAT
      </div>
      <div className="col-span-2">
        <Filters />
      </div>
      <div className="col-span-10  grid grid-cols-12 grid-rows-12 gap-3  border-red-500 ">
        <div className="col-span-7 row-span-2 grid grid-cols-4 grid-rows-5 gap-3 border-1 border p-4 rounded-3xl bg-white shadow-md shadow-black/10 ">
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
            qtd={faker.number.int({ min: 500, max: 55665 })}
            data={[
              faker.number.int({ min: 500, max: 1500 }),
              faker.number.int({ min: 500, max: 1500 }),
              faker.number.int({ min: 500, max: 1500 }),
              faker.number.int({ min: 500, max: 1500 }),
              faker.number.int({ min: 500, max: 1500 }),
              faker.number.int({ min: 500, max: 1500 }),
              faker.number.int({ min: 500, max: 1500 }),
              faker.number.int({ min: 500, max: 1500 }),
              faker.number.int({ min: 500, max: 1500 }),
              faker.number.int({ min: 500, max: 1500 }),
              faker.number.int({ min: 500, max: 1500 }),
              faker.number.int({ min: 500, max: 1500 }),
              faker.number.int({ min: 500, max: 1500 }),
            ]}
            title="Qtd Ingressantes"
          />
          <CardQtd
            qtd={faker.number.int({ min: 500, max: 55665 })}
            data={[
              faker.number.int({ min: 500, max: 1500 }),
              faker.number.int({ min: 500, max: 1500 }),
              faker.number.int({ min: 500, max: 1500 }),
              faker.number.int({ min: 500, max: 1500 }),
              faker.number.int({ min: 500, max: 1500 }),
              faker.number.int({ min: 500, max: 1500 }),
              faker.number.int({ min: 500, max: 1500 }),
              faker.number.int({ min: 500, max: 1500 }),
              faker.number.int({ min: 500, max: 1500 }),
              faker.number.int({ min: 500, max: 1500 }),
              faker.number.int({ min: 500, max: 1500 }),
              faker.number.int({ min: 500, max: 1500 }),
              faker.number.int({ min: 500, max: 1500 }),
            ]}
            title="Qtd Ingressantes"
          />
          <CardQtd
            qtd={faker.number.int({ min: 500, max: 55665 })}
            data={[
              faker.number.int({ min: 500, max: 1500 }),
              faker.number.int({ min: 500, max: 1500 }),
              faker.number.int({ min: 500, max: 1500 }),
              faker.number.int({ min: 500, max: 1500 }),
              faker.number.int({ min: 500, max: 1500 }),
              faker.number.int({ min: 500, max: 1500 }),
              faker.number.int({ min: 500, max: 1500 }),
              faker.number.int({ min: 500, max: 1500 }),
              faker.number.int({ min: 500, max: 1500 }),
              faker.number.int({ min: 500, max: 1500 }),
              faker.number.int({ min: 500, max: 1500 }),
              faker.number.int({ min: 500, max: 1500 }),
              faker.number.int({ min: 500, max: 1500 }),
            ]}
            title="Qtd Ingressantes"
          />
          <CardQtd
            qtd={faker.number.int({ min: 500, max: 55665 })}
            data={[
              faker.number.int({ min: 500, max: 1500 }),
              faker.number.int({ min: 500, max: 1500 }),
              faker.number.int({ min: 500, max: 1500 }),
              faker.number.int({ min: 500, max: 1500 }),
              faker.number.int({ min: 500, max: 1500 }),
              faker.number.int({ min: 500, max: 1500 }),
              faker.number.int({ min: 500, max: 1500 }),
              faker.number.int({ min: 500, max: 1500 }),
              faker.number.int({ min: 500, max: 1500 }),
              faker.number.int({ min: 500, max: 1500 }),
              faker.number.int({ min: 500, max: 1500 }),
              faker.number.int({ min: 500, max: 1500 }),
              faker.number.int({ min: 500, max: 1500 }),
            ]}
            title="Qtd Ingressantes"
          />
        </div>
        <div className="col-span-5 row-span-2 border-1 border rounded-3xl relative bg-white shadow-md shadow-black/10">
          <BarChartTest />
        </div>
        <div className="col-span-12 row-span-3 grid grid-cols-7 gap-3 ">
          <div className="col-span-7 border p-4 rounded-3xl bg-white shadow-md shadow-black/10">
            <BarChartTest />
          </div>
        </div>

        <div className="col-span-8 row-span-4 grid grid-cols-7 gap-3 border border-purple-600">
          <div className="col-span-5 border"></div>
          <div className="col-span-2 border"></div>
        </div>
        <div className="col-span-4 row-span-4 border border-green-500">
          grafico 1
        </div>
      </div>
    </div>
  );
}
