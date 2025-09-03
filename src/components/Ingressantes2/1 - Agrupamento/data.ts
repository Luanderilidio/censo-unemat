import { faker } from '@faker-js/faker';
import { ChartConfig } from '../../ui/chart';

export const chartData1 = [
  {
    year: '2009',
    Masculino: faker.number.int(100),
    Feminino: faker.number.int(100),
    fill: faker.color.rgb({ casing: 'upper' }),
  },
  {
    year: '2010',
    Masculino: faker.number.int(100),
    Feminino: faker.number.int(100),
    fill: faker.color.rgb({ casing: 'upper' }),
  },
  {
    year: '2011',
    Masculino: faker.number.int(100),
    Feminino: faker.number.int(100),
    fill: faker.color.rgb({ casing: 'upper' }),
  },
  {
    year: '2012',
    Masculino: faker.number.int(100),
    Feminino: faker.number.int(100),
    fill: faker.color.rgb({ casing: 'upper' }),
  },
  {
    year: '2013',
    Masculino: faker.number.int(100),
    Feminino: faker.number.int(100),
    fill: faker.color.rgb({ casing: 'upper' }),
  },
  {
    year: '2014',
    Masculino: faker.number.int(100),
    Feminino: faker.number.int(100),
    fill: faker.color.rgb({ casing: 'upper' }),
  },
  {
    year: '2015',
    Masculino: faker.number.int(100),
    Feminino: faker.number.int(100),
    fill: faker.color.rgb({ casing: 'upper' }),
  },
  {
    year: '2016',
    Masculino: faker.number.int(100),
    Feminino: faker.number.int(100),
    fill: faker.color.rgb({ casing: 'upper' }),
  },
  {
    year: '2017',
    Masculino: faker.number.int(100),
    Feminino: faker.number.int(100),
    fill: faker.color.rgb({ casing: 'upper' }),
  },
  {
    year: '2018',
    Masculino: faker.number.int(100),
    Feminino: faker.number.int(100),
    fill: faker.color.rgb({ casing: 'upper' }),
  },
  {
    year: '2019',
    Masculino: faker.number.int(100),
    Feminino: faker.number.int(100),
    fill: faker.color.rgb({ casing: 'upper' }),
  },
  {
    year: '2020',
    Masculino: faker.number.int(100),
    Feminino: faker.number.int(100),
    fill: faker.color.rgb({ casing: 'upper' }),
  },
  {
    year: '2021',
    Masculino: faker.number.int(100),
    Feminino: faker.number.int(100),
    fill: faker.color.rgb({ casing: 'upper' }),
  },
  {
    year: '2022',
    Masculino: faker.number.int(100),
    Feminino: faker.number.int(100),
    fill: faker.color.rgb({ casing: 'upper' }),
  },
  {
    year: '2023',
    Masculino: faker.number.int(100),
    Feminino: faker.number.int(100),
    fill: faker.color.rgb({ casing: 'upper' }),
  },
];

export const chartConfig1 = {
  Masculino: { label: 'Masculino', color: faker.color.rgb({ casing: 'upper' }) },
  Feminino: { label: 'Feminino', color: faker.color.rgb({ casing: 'upper' }) },
} satisfies ChartConfig;
