import React from 'react';
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

export interface Widget {
    title: string;
    image: number;
    screen: React.ReactNode;
    onPress?: () => void;
}

export const useWidgets = (): Widget[] => {
    const widgets: Widget[] = [
        {
            title: 'Mobile App',
            image: require('@/assets/images/icons/MobileIcon.png'),
            screen: React.createElement(MobileApp),
        },
        {
            title: 'Games',
            image: require('@/assets/images/icons/GamesIcon.png'),
            screen: React.createElement(Games),
        },
        {
            title: 'Data to Music',
            image: require('@/assets/images/icons/SonificationIcon.png'),
            screen: React.createElement(DataToMusic),
        },
        {
            title: 'Weather',
            image: require('@/assets/images/icons/WeatherIcon.png'),
            screen: React.createElement(Weather),
        },
        {
            title: 'Water Data',
            image: require('@/assets/images/icons/PondWaterDataIcon.png'),
            screen: React.createElement(PondWaterData),
        },        
        {
            title: 'Welcome!',
            image: require('@/assets/images/icons/WelcomeIcon.png'),
            screen: React.createElement(Welcome),
        },
        {
            title: 'About Us',
            image: require('@/assets/images/icons/AboutIcon.png'),
            screen: React.createElement(AboutUs),
        },        
        {
            title: 'Right to Know',
            image: require('@/assets/images/icons/RTKIcon.png'),
            screen: React.createElement(RightToKnow),
        },
        {
            title: 'Water Reports',
            image: require('@/assets/images/icons/WaterReportsIcon.png'),
            screen: React.createElement(WaterReports),
        },
        {
            title: 'Photo Gallery',
            image: require('@/assets/images/icons/PhotoGalleryIcon.png'),
            screen: React.createElement(PhotoGallery),
        },
        {
            title: 'Videos',
            image: require('@/assets/images/icons/VideosIcon.png'),
            screen: React.createElement(Videos),
        },
    ];

    return widgets;
};
