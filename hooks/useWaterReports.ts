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
  return useMemo(() => ({
    2017: Report2017,
    2018: Report2018,
    2019: Report2019,
    2020: Report2020,
    2021: Report2021,
    2022: Report2022,
    2023: Report2023,
  }), []);
};
