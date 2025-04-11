import React from 'react';
import AboutUs from '../screens/AboutUs';
import DataToMusic from '../screens/DataToMusic';
import Games from '../screens/Games';
import MobileApp from '../screens/MobileApp';
import PhotoGallery from '../screens/PhotoGallery';
import PondWaterData from '../screens/PondWaterData';
import RightToKnow from '../screens/RightToKnow';
import Videos from '../screens/Videos';
import WaterReports from '../screens/WaterReports';
import Weather from '../screens/Weather';
import Welcome from '@/screens/Welcome';

export interface Widget {
  title: string;
  image: number;
  screen: React.ReactNode;
}

export const useWidgets = (): Widget[] => {
  const widgets: Widget[] = [
    { title: 'Welcome!', image: require('../assets/images/icons/WelcomeIcon.png'), screen: React.createElement(Welcome) },
    { title: 'Pond Water Data', image: require('../assets/images/icons/PondWaterDataIcon.png'), screen: React.createElement(PondWaterData) },
    { title: 'Weather', image: require('../assets/images/icons/WeatherIcon.png'), screen: React.createElement(Weather) },
    { title: 'Data to Music', image: require('../assets/images/icons/SonificationIcon.png'), screen: React.createElement(DataToMusic) },
    { title: 'Games', image: require('../assets/images/icons/GamesIcon.png'), screen: React.createElement(Games) },
    { title: 'Right to Know', image: require('../assets/images/icons/RTKIcon.png'), screen: React.createElement(RightToKnow) },
    { title: 'Water Reports', image: require('../assets/images/icons/WaterReportsIcon.png'), screen: React.createElement(WaterReports) },
    { title: 'Mobile App', image: require('../assets/images/icons/MobileIcon.png'), screen: React.createElement(MobileApp) },
    { title: 'Photo Gallery', image: require('../assets/images/icons/PhotoGalleryIcon.png'), screen: React.createElement(PhotoGallery) },
    { title: 'Videos', image: require('../assets/images/icons/VideosIcon.png'), screen: React.createElement(Videos) },
    { title: 'About Us', image: require('../assets/images/icons/AboutIcon.png'), screen: React.createElement(AboutUs) },
  ];

  return widgets;
};

