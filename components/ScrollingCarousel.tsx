import * as React from 'react';
import { View, Image, Text,useWindowDimensions } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { interpolate } from 'react-native-reanimated';
import Carousel, { TAnimationStyle } from 'react-native-reanimated-carousel';

import mobileapp from '../assets/images/icons/MobileIcon.png';
import games from '../assets/images/icons/GamesIcon.png';
import datatomusic from '../assets/images/icons/SonificationIcon.png';
import photogal from '../assets/images/icons/PhotoGalleryIcon.png';
import pond_data from '../assets/images/icons/PondWaterDataIcon.png';
import rtk from '../assets/images/icons/RTKIcon.png';
import videos from '../assets/images/icons/VideosIcon.png';
import weather from '../assets/images/icons/WeatherIcon.png';
import about from '../assets/images/icons/AboutIcon.png';
import waterreports from '../assets/images/icons/WaterReportsIcon.png';

// const PAGE_WIDTH = 1500;

export default function ScrollingCarousel() {
    const { width} = useWindowDimensions();


    const itemSize = 200;
    const PAGE_WIDTH = width; // 600px
    const centerOffset = PAGE_WIDTH / 2 - itemSize / 2;

    const animationStyle: TAnimationStyle = React.useCallback(
        (value: number) => {
            'worklet';

            const itemGap = interpolate(
                value,
                [-3, -2, -1, 0, 1, 2, 3],
                [-30, -15, 0, 0, 0, 15, 30],
            );

            const translateX =
                interpolate(value, [-1, 0, 1], [-itemSize, 0, itemSize]) +
                centerOffset -
                itemGap;

            const translateY = interpolate(
                value,
                [-1, -0.5, 0, 0.5, 1],
                [100, 70, 40, 70, 100], // higher curve
            );

            const scale = interpolate(
                value,
                [-1, -0.5, 0, 0.5, 1],
                [0.8, 0.85, 1.1, 0.85, 0.8],
            );

            return {
                transform: [
                    {
                        translateX,
                    },
                    {
                        translateY,
                    },
                    { scale },
                ],
            };
        },
        [centerOffset],
    );

    

    const widgets = [
        {
            title: 'Pond Water Data',
            image: pond_data,
        },
        {
            title: 'Weather',
            image: weather,
        },
        {
            title: 'Data to Music',
            image: datatomusic,
        },
        {
            title: 'Games',
            image: games,
        },
        {
            title: 'Right to Know (RTK)',
            image: rtk,
        },
        {
            title: 'Water Reports',
            image: waterreports,
        },
        {
            title: 'Mobile App',
            image: mobileapp,
        },
        {
            title: 'Photo Gallery',
            image: photogal,
        },
        {
            title: 'Videos',
            image: videos,
        },
        {
            title: 'About Us',
            image: about,
        },
    ];

    return (
        <View id="carousel-component">
            <Carousel
                width={itemSize}
                height={itemSize}
                style={{
                    width: PAGE_WIDTH,
                    height: PAGE_WIDTH / 2,
                }}
                loop
                data={widgets}
                renderItem={({ index }) => (
                    <TouchableWithoutFeedback
                        key={index}
                        onPress={() => {
                            console.log(index);
                        }}
                        containerStyle={{ flex: 1 }}
                        style={{ flex: 1 }}
                    >
                    
                            <View style={{ width: '100%', height: '100%' }}>
                            <Text style={{
                                    color: 'white',
                                    textAlign: 'center',
                                    fontWeight: 'bold',
                                    fontSize: 24
                                }}>{widgets[index].title}</Text> 
                                <Image
                                    source={widgets[index].image}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        resizeMode: 'contain',
                                    }}
                                />
                               
                            </View>
                    </TouchableWithoutFeedback>
                )}
                customAnimation={animationStyle}
            />
        </View>
    );
}
