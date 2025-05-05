// hooks/useWaterReports.ts
import { useMemo } from 'react';

import Report2017 from '../assets/waterReport/Annual-Water-Quality-Report-for-2017.pdf';
import Report2018 from '../assets/waterReport/Annual-Water-Quality-Report-for-2018.pdf';
import Report2019 from '../assets/waterReport/Annual-Water-Quality-Report-for-2019.pdf';
import Report2020 from '../assets/waterReport/Annual-Water-Quality-Report-for-2020.pdf';
import Report2021 from '../assets/waterReport/Annual-Water-Quality-Report-for-2021.pdf';
import Report2022 from '../assets/waterReport/Annual-Water-Quality-Report-for-2022.pdf';
import Report2023 from '../assets/waterReport/Annual-Water-Quality-Report-for-2023.pdf';

export const useWaterReports = () => {
  return useMemo(() => ([
    {
      title: 'Annual Water Quality Report for 2017',
      url: Report2017,
    },
    {
      title: 'Annual Water Quality Report for 2018',
      url: Report2018,
    },
    {
      title: 'Annual Water Quality Report for 2019',
      url: Report2019,
    },
    {
      title: 'Annual Water Quality Report for 2020',
      url: Report2020,
    },
    {
      title: 'Annual Water Quality Report for 2021',
      url: Report2021,
    },
    {
      title: 'Annual Water Quality Report for 2022',
      url: Report2022,
    },
    {
      title: 'Annual Water Quality Report for 2023',
      url: Report2023,
    },
  ]), []);
};
