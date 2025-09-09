import { faker } from '@faker-js/faker';
import { ChartConfig } from '../../ui/chart';

export const chartData3 = [
  {
    year: '2009',
    Diurno: faker.number.int(100),
    Noturno: faker.number.int(100),
    fill: faker.color.rgb({ casing: 'upper' }),
  },
  {
    year: '2010',
    Diurno: faker.number.int(100),
    Noturno: faker.number.int(100),
    fill: faker.color.rgb({ casing: 'upper' }),
  },
  {
    year: '2011',
    Diurno: faker.number.int(100),
    Noturno: faker.number.int(100),
    fill: faker.color.rgb({ casing: 'upper' }),
  },
  {
    year: '2012',
    Diurno: faker.number.int(100),
    Noturno: faker.number.int(100),
    fill: faker.color.rgb({ casing: 'upper' }),
  },
  {
    year: '2013',
    Diurno: faker.number.int(100),
    Noturno: faker.number.int(100),
    fill: faker.color.rgb({ casing: 'upper' }),
  },
  {
    year: '2014',
    Diurno: faker.number.int(100),
    Noturno: faker.number.int(100),
    fill: faker.color.rgb({ casing: 'upper' }),
  },
  {
    year: '2015',
    Diurno: faker.number.int(100),
    Noturno: faker.number.int(100),
    fill: faker.color.rgb({ casing: 'upper' }),
  },
  {
    year: '2016',
    Diurno: faker.number.int(100),
    Noturno: faker.number.int(100),
    fill: faker.color.rgb({ casing: 'upper' }),
  },
  {
    year: '2017',
    Diurno: faker.number.int(100),
    Noturno: faker.number.int(100),
    fill: faker.color.rgb({ casing: 'upper' }),
  },
  {
    year: '2018',
    Diurno: faker.number.int(100),
    Noturno: faker.number.int(100),
    fill: faker.color.rgb({ casing: 'upper' }),
  },
  {
    year: '2019',
    Diurno: faker.number.int(100),
    Noturno: faker.number.int(100),
    fill: faker.color.rgb({ casing: 'upper' }),
  },
  {
    year: '2020',
    Diurno: faker.number.int(100),
    Noturno: faker.number.int(100),
    fill: faker.color.rgb({ casing: 'upper' }),
  },
  {
    year: '2021',
    Diurno: faker.number.int(100),
    Noturno: faker.number.int(100),
    fill: faker.color.rgb({ casing: 'upper' }),
  },
  {
    year: '2022',
    Diurno: faker.number.int(100),
    Noturno: faker.number.int(100),
    fill: faker.color.rgb({ casing: 'upper' }),
  },
  {
    year: '2023',
    Diurno: faker.number.int(100),
    Noturno: faker.number.int(100),
    fill: faker.color.rgb({ casing: 'upper' }),
  },
];

export const chartConfig3 = {
  Diurno: { label: 'Diurno', color: '#E69F00' },
  Noturno: { label: 'Noturno', color: '#0072B2' },
} satisfies ChartConfig;
