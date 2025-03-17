import * as React from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import CardForCarousel from './CardForCarousel';

import about from '../assets/icons/about-00605be862d7b603.png';
import cc from '../assets/icons/CroninCruise-55bfb351c9b39126.png';
import jeopardy from '../assets/icons/jeopardy-f6f2303b3c3deae2.png';
import waterreports from '../assets/icons/waterreports-23ea9c613afdb295.png';
import { Box } from '@mui/material';

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
            children: <Box sx={{
                p: 1,
                height: "100%",
                width: "100%",
                background: "#000080"
            }}>
                <iframe
                    style={{
                        width: "100%",
                        height: "100%",
                        border: "none",
                    }}
                    src="https://bluecolab.github.io/BlueCoLab-Jeopardy/"></iframe>
            </Box>,
        },
        {
            title: 'About Us',
            image: about,
            children: <div>hello</div>,
        },
        {
            title: 'Cronin Cruise',
            image: cc,
            children: <Box sx={{
                p: 1,
                height: "100%",
                width: "100%",
                background: "#000080"
            }}>
                <iframe height="167" frameBorder="0" src="https://itch.io/embed/2699888" width="552"><a href="https://bluecolab.itch.io/cronin-cruise">Cronin Cruise by BlueColab</a></iframe>            </Box>,
        },
        {
            title: 'Water Reports',
            image: waterreports,
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
