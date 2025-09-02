import { faker } from '@faker-js/faker';
import * as z from 'zod';

export const ChartEntrantsQtd = z.array(
  z.object({
    year: z.string(),
    Ingressantes: z.number(),
  }),
);

export type DataEntrantsQtd = z.infer<typeof ChartEntrantsQtd>;

export const ChartDataEntrantsSex = z.array(
  z.object({
    year: z.string(),
    Masculino: z.number(),
    Feminino: z.number(),
    fill: faker.color.rgb({ casing: 'upper' }),
  }),
);

export type DataEntrantsSex = z.infer<typeof ChartDataEntrantsSex>;

export const ChartDataEntrantsAge = z.array(
  z.object({
    year: z.string(),
    Ing_0_17: z.number(),
    Ing_18_24: z.number(),
    Ing_25_29: z.number(),
    Ing_30_34: z.number(),
    Ing_35_39: z.number(),
    Ing_40_49: z.number(),
    Ing_50_59: z.number(),
    Ing_60_mais: z.number(),
    fill: faker.color.rgb({ casing: 'upper' }),
  }),
);

export type DataEntrantsAge = z.infer<typeof ChartDataEntrantsAge>;

export const ChartDataEntrantsShift = z.array(
  z.object({
    year: z.string(),
    Diurno: z.number(),
    Noturno: z.number(),
    fill: faker.color.rgb({ casing: 'upper' }),
  }),
);

export type DataEntrantsShift = z.infer<typeof ChartDataEntrantsShift>;

export const ChartDataEntrantsColor = z.array(
  z.object({
    year: z.string(),
    Branca: z.number(),
    Preta: z.number(),
    Parda: z.number(),
    Amarela: z.number(),
    Indigena: z.number(),
    Indefinido: z.number(),
    fill: faker.color.rgb({ casing: 'upper' }),
  }),
);

export type DataEntrantsColor = z.infer<typeof ChartDataEntrantsColor>;

export const ChartDataEntrantsForm = z.array(
  z.object({
    year: z.string(),
    Vestibular: z.number(),
    Enem: z.number(),
    Avaliacao_Seriada: z.number(),
    Selecao_Simplificada: z.number(),
    EGR: z.number(),
    Outro_Tipo_Selecao: z.number(),
    Processo_Seletivo: z.number(),
    Vaga_Remanescente: z.number(),
    Programa_Especial: z.number(),
    Outra_Forma: z.number(),
    fill: faker.color.rgb({ casing: 'upper' }),
  }),
);
export type DataEntrantsForm = z.infer<typeof ChartDataEntrantsForm>;

export const EntrantsDataSchema = z.object({
  entrants: z.object({
    entrantsQtd: ChartEntrantsQtd,
    entrantsSex: ChartDataEntrantsSex,
    entrantsAge: ChartDataEntrantsAge,
    entrantsShift: ChartDataEntrantsShift,
    entrantsColor: ChartDataEntrantsColor,
    entrantsForm: ChartDataEntrantsForm,
  }),
});

export type EntrantsData = z.infer<typeof EntrantsDataSchema>;
