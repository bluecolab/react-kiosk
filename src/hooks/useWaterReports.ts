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
                buttonText: 'waterReport.2024Button',
                image: require('@/assets/images/general/2024RR.png'),
                title: 'waterReport.2024Title',
                url: Report2024,
            },
            {
                buttonText: 'waterReport.2023Button',
                image: require('@/assets/images/general/2023RR.png'),
                title: 'waterReport.2023Title',
                url: Report2023,
            },
            {
                buttonText: 'waterReport.2022Button',
                image: require('@/assets/images/general/2022RR.png'),
                title: 'waterReport.2022Title',
                url: Report2022,
            },

            {
                buttonText: 'waterReport.2021Button',
                image: require('@/assets/images/general/2021RR.png'),
                title: 'waterReport.2021Title',
                url: Report2021,
            },
            {
                buttonText: 'waterReport.2020Button',
                image: require('@/assets/images/general/2020RR.png'),
                title: 'waterReport.2020Title',
                url: Report2020,
            },
            {
                buttonText: 'waterReport.2019Button',
                image: require('@/assets/images/general/2019RR.png'),
                title: 'waterReport.2019Title',
                url: Report2019,
            },
            {
                buttonText: 'waterReport.2018Button',
                image: require('@/assets/images/general/2018RR.png'),
                title: 'waterReport.2018Title',
                url: Report2018,
            },
            {
                buttonText: 'waterReport.2017Button',
                image: require('@/assets/images/general/2017RR.png'),
                title: 'waterReport.2017Title',
                url: Report2017,
            },
        ],
        []
    );
};
