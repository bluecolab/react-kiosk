// hooks/useWaterReports.ts
import { useMemo } from 'react';

import Report2017 from '@/assets/waterReport/Annual-Water-Quality-Report-for-2017.pdf';
import Report2018 from '@/assets/waterReport/Annual-Water-Quality-Report-for-2018.pdf';
import Report2019 from '@/assets/waterReport/Annual-Water-Quality-Report-for-2019.pdf';
import Report2020 from '@/assets/waterReport/Annual-Water-Quality-Report-for-2020.pdf';
import Report2021 from '@/assets/waterReport/Annual-Water-Quality-Report-for-2021.pdf';
import Report2022 from '@/assets/waterReport/Annual-Water-Quality-Report-for-2022.pdf';
import Report2023 from '@/assets/waterReport/Annual-Water-Quality-Report-for-2023.pdf';
import Report2024 from '@/assets/waterReport/Annual-Water-Quality-Report-for-2024.pdf';

export const useWaterReports = () => {
    return useMemo(
        () => [
            {
                buttonText: '2024 Water Report (by Blue CoLab)',
                image: require('@/assets/images/general/2024RR.png'),
                title: 'Annual Water Quality Report for 2024',
                url: Report2024,
            },
            {
                buttonText: '2023 Water Report',
                image: require('@/assets/images/general/2023RR.png'),
                title: 'Annual Water Quality Report for 2023',
                url: Report2023,
            },
            {
                buttonText: '2022 Water Report',
                image: require('@/assets/images/general/2022RR.png'),
                title: 'Annual Water Quality Report for 2022',
                url: Report2022,
            },

            {
                buttonText: '2021 Water Report',
                image: require('@/assets/images/general/2021RR.png'),
                title: 'Annual Water Quality Report for 2021',
                url: Report2021,
            },
            {
                buttonText: '2020 Water Report',
                image: require('@/assets/images/general/2020RR.png'),

                title: 'Annual Water Quality Report for 2020',
                url: Report2020,
            },
            {
                buttonText: '2019 Water Report',
                image: require('@/assets/images/general/2019RR.png'),

                title: 'Annual Water Quality Report for 2019',
                url: Report2019,
            },
            {
                buttonText: '2018 Water Report',
                image: require('@/assets/images/general/2018RR.png'),

                title: 'Annual Water Quality Report for 2018',
                url: Report2018,
            },
            {
                buttonText: '2017 Water Report',
                image: require('@/assets/images/general/2017RR.png'),
                title: 'Annual Water Quality Report for 2017',
                url: Report2017,
            },
        ],
        []
    );
};
