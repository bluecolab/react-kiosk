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
    /** Navy version of the icon, shown in dark mode. Make it with scripts/make-dark-icons.py. */
    darkImage?: number;
    screen: ReactNode;
    onPress?: () => void;
}

export const useWidgets = (): Widget[] => {
    const { t } = useTranslation();

    const widgets: Widget[] = [
        {
            title: t('widgets.mobileApp'),
            image: require('@/assets/images/icons/MobileIcon.png'),
            darkImage: require('@/assets/images/icons/dark/MobileIcon.png'),
            screen: React.createElement(MobileApp),
        },
        {
            title: t('widgets.games'),
            image: require('@/assets/images/icons/GamesIcon.png'),
            darkImage: require('@/assets/images/icons/dark/GamesIcon.png'),
            screen: React.createElement(Games),
        },
        {
            title: t('widgets.dataToMusic'),
            image: require('@/assets/images/icons/SonificationIcon.png'),
            darkImage: require('@/assets/images/icons/dark/SonificationIcon.png'),
            screen: React.createElement(DataToMusic),
        },
        {
            title: t('widgets.weather'),
            image: require('@/assets/images/icons/WeatherIcon.png'),
            darkImage: require('@/assets/images/icons/dark/WeatherIcon.png'),
            screen: React.createElement(Weather),
        },
        {
            title: t('widgets.waterData'),
            image: require('@/assets/images/icons/PondWaterDataIcon.png'),
            darkImage: require('@/assets/images/icons/dark/PondWaterDataIcon.png'),
            screen: React.createElement(PondWaterData),
        },
        {
            title: t('widgets.welcome'),
            image: require('@/assets/images/icons/Welcome Blue and White.png'),
            darkImage: require('@/assets/images/icons/dark/Welcome Blue and White.png'),
            screen: React.createElement(Welcome),
        },
        {
            title: t('widgets.aboutUs'),
            image: require('@/assets/images/icons/AboutIcon.png'),
            darkImage: require('@/assets/images/icons/dark/AboutIcon.png'),
            screen: React.createElement(AboutUs),
        },
        {
            title: t('widgets.rightToKnow'),
            image: require('@/assets/images/icons/RTKIcon.png'),
            darkImage: require('@/assets/images/icons/dark/RTKIcon.png'),
            screen: React.createElement(RightToKnow),
        },
        {
            title: t('widgets.waterReports'),
            image: require('@/assets/images/icons/WaterReportsIcon.png'),
            darkImage: require('@/assets/images/icons/dark/WaterReportsIcon.png'),
            screen: React.createElement(WaterReports),
        },
        {
            title: t('widgets.photoGallery'),
            image: require('@/assets/images/icons/PhotoGalleryIcon.png'),
            darkImage: require('@/assets/images/icons/dark/PhotoGalleryIcon.png'),
            screen: React.createElement(PhotoGallery),
        },
        {
            title: t('widgets.videos'),
            image: require('@/assets/images/icons/VideosIcon.png'),
            darkImage: require('@/assets/images/icons/dark/VideosIcon.png'),
            screen: React.createElement(Videos),
        },
        {
            title: t('widgets.credits'),
            image: require('@/assets/images/icons/Colab.png'),
            darkImage: require('@/assets/images/icons/dark/Colab.png'),
            screen: React.createElement(Credits),
            onPress: () =>
                window.dispatchEvent(new CustomEvent('kiosk-show-credits', { detail: {} })),
        },
    ];

    return widgets;
};