import * as React from 'react';
import { View } from 'react-native';
import  { interpolate } from 'react-native-reanimated';
import Carousel, { TAnimationStyle } from 'react-native-reanimated-carousel';
import CarouselItem from './CarouselItem';

interface Widget {
    title: string;
    image: number;
}

const widgets: Widget[] = [
    { title: 'Pond Water Data', image: require('../assets/images/icons/PondWaterDataIcon.png') },
    { title: 'Weather', image: require('../assets/images/icons/WeatherIcon.png') },
    { title: 'Data to Music', image: require('../assets/images/icons/SonificationIcon.png') },
    { title: 'Games', image: require('../assets/images/icons/GamesIcon.png') },
    { title: 'Right to Know (RTK)', image: require('../assets/images/icons/RTKIcon.png') },
    { title: 'Water Reports', image: require('../assets/images/icons/WaterReportsIcon.png') },
    { title: 'Mobile App', image: require('../assets/images/icons/MobileIcon.png') },
    { title: 'Photo Gallery', image: require('../assets/images/icons/PhotoGalleryIcon.png') },
    { title: 'Videos', image: require('../assets/images/icons/VideosIcon.png') },
    { title: 'About Us', image: require('../assets/images/icons/AboutIcon.png') },
];
// Define the types for the props
interface ScrollingCarouselProps {
    height: number;
    width: number;
  }
  
const ScrollingCarousel: React.FC<ScrollingCarouselProps> = ({ height, width }) => {

    const PAGE_WIDTH = width;
    const itemSize = 200;
    const centerOffset = PAGE_WIDTH / 2 - itemSize / 2;

    const animationStyle: TAnimationStyle = React.useCallback(
        (value: number) => {
            'worklet';

            const itemGap = interpolate(
                value,
                [-3, -2, -1, 0, 1, 2, 3],
                [-30, -15, 0, 0, 0, 15, 30],
            );

            const translateX = interpolate(value, [-1, 0, 1], [-itemSize, 0, itemSize]) + centerOffset - itemGap;
            const translateY = interpolate(value, [-1, -0.5, 0, 0.5, 1], [25, 15, 10, 15, 25]);
            const scale = interpolate(value, [-1, -0.5, 0, 0.5, 1], [0.8, 0.85, 1.1, 0.85, 0.8]);

            return {
                transform: [
                    { translateX },
                    { translateY },
                    { scale },
                ],
            };
        },
        [centerOffset]
    );

    

    return (
        <View id="carousel-component">
            <Carousel
                width={itemSize}
                height={itemSize}
                style={{
                    width: PAGE_WIDTH,
                    height: height*0.25,
                }}
                loop
                data={widgets}
                renderItem={({ index, animationValue }) => (
                   <CarouselItem widgets={widgets} index={index} animationValue={animationValue} />
                )}
                customAnimation={animationStyle}
            />
        </View>
    );
}

export default ScrollingCarousel;