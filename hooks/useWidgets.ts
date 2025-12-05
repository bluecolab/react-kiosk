import React, { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import AboutUs from '@/components/screens/AboutUs';
import DataToMusic from '@/components/screens/DataToMusic';
import Games from '@/components/screens/Games';
import MobileApp from '@/components/screens/MobileApp';
import PhotoGallery from '@/components/screens/PhotoGallery';
import PondWaterData from '@/components/screens/PondWaterData';
import RightToKnow from '@/components/screens/RightToKnow';
import Videos from '@/components/screens/Videos';
import WaterReports from '@/components/screens/WaterReports';
import Weather from '@/components/screens/Weather';
import Welcome from '@/components/screens/Welcome';
import Credits from '@/components/screens/Credits';

export interface Widget {
    title: string;
    image: number;
    screen: ReactNode;
    onPress?: () => void;
}

export const useWidgets = (): Widget[] => {
    const { t } = useTranslation();

    const widgets: Widget[] = [
        {
            title: t('widgets.mobileApp'),
            image: require('@/assets/images/icons/MobileIcon.png'),
            screen: React.createElement(MobileApp),
        },
        {
            title: t('widgets.games'),
            image: require('@/assets/images/icons/GamesIcon.png'),
            screen: React.createElement(Games),
        },
        {
            title: t('widgets.dataToMusic'),
            image: require('@/assets/images/icons/SonificationIcon.png'),
            screen: React.createElement(DataToMusic),
        },
        {
            title: t('widgets.weather'),
            image: require('@/assets/images/icons/WeatherIcon.png'),
            screen: React.createElement(Weather),
        },
        {
            title: t('widgets.waterData'),
            image: require('@/assets/images/icons/PondWaterDataIcon.png'),
            screen: React.createElement(PondWaterData),
        },
        {
            title: t('widgets.welcome'),
            image: require('@/assets/images/icons/Welcome Blue and White.png'),
            screen: React.createElement(Welcome),
        },
        {
            title: t('widgets.aboutUs'),
            image: require('@/assets/images/icons/AboutIcon.png'),
            screen: React.createElement(AboutUs),
        },
        {
            title: t('widgets.rightToKnow'),
            image: require('@/assets/images/icons/RTKIcon.png'),
            screen: React.createElement(RightToKnow),
        },
        {
            title: t('widgets.waterReports'),
            image: require('@/assets/images/icons/WaterReportsIcon.png'),
            screen: React.createElement(WaterReports),
        },
        {
            title: t('widgets.photoGallery'),
            image: require('@/assets/images/icons/PhotoGalleryIcon.png'),
            screen: React.createElement(PhotoGallery),
        },
        {
            title: t('widgets.videos'),
            image: require('@/assets/images/icons/VideosIcon.png'),
            screen: React.createElement(Videos),
        },
        {
            title: t('widgets.credits'),
            image: require('@/assets/images/icons/Colab.png'),
            screen: React.createElement(Credits),
            onPress: () =>
                window.dispatchEvent(new CustomEvent('kiosk-show-credits', { detail: {} })),
        },
    ];

    return widgets;
};
