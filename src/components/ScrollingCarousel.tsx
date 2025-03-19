import * as React from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Box } from '@mui/material';

// ../assets/icons 
import mobileapp from '../assets/icons/Mobile.png';
import games from '../assets/icons/games.png';
import datatomusic from '../assets/icons/Data_to_Music.png';
import photogal from '../assets/icons/Photo_Gal.png';
import pond_data from '../assets/icons/PondWaterData.png';
import rtk from '../assets/icons/RTK.png';
import videos from '../assets/icons/videos.png';
import weather from '../assets/icons/weather.png';
import CardForCarousel from './CardForCarousel';
import about from '../assets/icons/about-00605be862d7b603.png';
import cc from '../assets/icons/CroninCruise-55bfb351c9b39126.png'; // Will be used under Games
import jeopardy from '../assets/icons/jeopardy-f6f2303b3c3deae2.png'; // Will be used under Games
import waterreports from '../assets/icons/waterreports-23ea9c613afdb295.png';

export default function ScrollingCarousel() {
    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3,
            slidesToSlide: 1 // optional, default to 1.
        }
    };

    const widgets = [
        {
            title: 'Pond Water Data',
            image: pond_data,
            children: (
                <Box sx={{ textAlign: 'center', p: 2 }}>
                    <p>Monitor pond water quality with real-time data.</p>

                </Box>
            ),
        },
        {
            title: 'Weather',
            image: weather,
            children: (
                <Box sx={{ textAlign: 'center', p: 2 }}>
                    <p>Check live weather conditions at our research sites.</p>
                </Box>
            ),
        },
        {
            title: 'Data to Music',
            image: datatomusic,
            children: (
                <Box sx={{ textAlign: 'center', p: 2 }}>
                    <p>Convert water data into music.</p>
                </Box>
            ),
        },
        { // Jere is where to store Cronin Cruise Jeopardy and other games
            title: 'Games',
            image: games,
            children: (
                <Box sx={{ p: 1, height: "100%", width: "100%", background: "#000000", textAlign: 'center' }}>
                    <p>Play interactive games to learn about water!</p>
                </Box>
            ),
        },
        {
            title: 'Right to Know (RTK)',
            image: rtk,
            children: (
                <Box sx={{ textAlign: 'center', p: 2 }}>
                    <p>Understand your right to know about water quality.</p>

                </Box>
            ),
        },
        {
            title: 'Water Reports',
            image: waterreports,
            children: <div>hello</div>,
        },
        {
            title: 'Mobile App',
            image: mobileapp,
            children: (
                <Box sx={{ textAlign: 'center', p: 2 }}>
                    <p>Download our mobile app for better access.</p>
                </Box>
            ),
        },
        {
            title: 'Photo Gallery',
            image: photogal,
            children: (
                <Box sx={{ textAlign: 'center', p: 2 }}>
                    <p>Explore our photo gallery of research and events.</p>

                </Box>
            ),
        },
        {
            title: 'Videos',
            image: videos,
            children: (
                <Box sx={{ textAlign: 'center', p: 2 }}>
                    <p>Watch educational videos on water science.</p>

                </Box>
            ),
        },
        {
            title: 'About Us',
            image: about,
            children: <div>hello</div>,
        },
    ]

    return <Carousel responsive={responsive}
        infinite={true}
        swipeable={true}
        draggable={true}
        showDots={true}
        renderDotsOutside={true}
    >
        {
            widgets.map((item, index: number) => {
                return <CardForCarousel key={index} title={item.title} image={item.image}>
                    {item.children}
                </CardForCarousel>;
            })
        }

    </Carousel>;
}
