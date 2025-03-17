import * as React from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import CardForCarousel from './CardForCarousel';

import about from '../assets/icons/about-00605be862d7b603.png';
import cc from '../assets/icons/CroninCruise-55bfb351c9b39126.png';
import jeopardy from '../assets/icons/jeopardy-f6f2303b3c3deae2.png';
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
            title: 'Jeopardy',
            image: jeopardy,
        },
        {
            title: 'About Us',
            image: about,
        },
        {
            title: 'Cronin Cruise',
            image: cc,
        },
        {
            title: 'Water Reports',
            image: waterreports,
        },
    ]

    return <Carousel responsive={responsive}
        infinite={true}
        swipeable={true}
        draggable={true}
    >
        {
            widgets.map((item,index: number) => {
                return <CardForCarousel key={index} title={item.title} image={item.image} />;
            })
        }
        
    </Carousel>;
}
