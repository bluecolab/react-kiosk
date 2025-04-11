import * as React from 'react';
import { View } from 'react-native';
import { interpolate } from 'react-native-reanimated';
import Carousel, { TAnimationStyle } from 'react-native-reanimated-carousel';
import CarouselItem from './CarouselItem';


interface Widget {
    title: string;
    image: number;
}

// Define the types for the props
interface ScrollingCarouselProps {
    height: number;
    width: number;
    setIndex: (index: number) => void;
    widgets: Widget[]
}

const ScrollingCarousel: React.FC<ScrollingCarouselProps> = ({ height, width, setIndex, widgets }) => {
    const PAGE_WIDTH = width;
    const itemSize = height * 0.185; // size of icons is 18.5% of the height
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
        [centerOffset, itemSize]
    );

    return (
        <View id="carousel-component">
            <Carousel
                width={itemSize}
                height={itemSize}
                style={{
                    width: PAGE_WIDTH,
                    height: height * 0.25,
                }}
                loop
                data={widgets}
                renderItem={({ index, animationValue }) => {
                    return (
                        <CarouselItem
                            widgets={widgets}
                            index={index}
                            animationValue={animationValue}
                            setIndex={setIndex}
                        />
                    );
                }}
                customAnimation={animationStyle}
            />
        </View>
    );
}

export default ScrollingCarousel;
