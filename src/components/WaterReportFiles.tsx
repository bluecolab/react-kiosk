// This file contains the paths to the annual water quality reports for each year. Doing it on the WaterReports.tsx 
// Would be too big for no reason so I am doing it here. - V
// Whenever a new report is added, it should be added here as well.
import Report2017 from '../assets/Files/waterReport/Annual-Water-Quality-Report-for-2017.pdf';
import Report2018 from '../assets/Files/waterReport/Annual-Water-Quality-Report-for-2018.pdf';
import Report2019 from '../assets/Files/waterReport/Annual-Water-Quality-Report-for-2019.pdf';
import Report2020 from '../assets/Files/waterReport/Annual-Water-Quality-Report-for-2020.pdf';
import Report2021 from '../assets/Files/waterReport/Annual-Water-Quality-Report-for-2021.pdf';
import Report2022 from '../assets/Files/waterReport/Annual-Water-Quality-Report-for-2022.pdf';
import Report2023 from '../assets/Files/waterReport/Annual-Water-Quality-Report-for-2023.pdf';

export const waterReports = {
  2017: Report2017,
  2018: Report2018,
  2019: Report2019,
  2020: Report2020,
  2021: Report2021,
  2022: Report2022,
  2023: Report2023,
};

// On WaterReports.tsx, we will import this file.
