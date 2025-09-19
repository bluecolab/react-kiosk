import * as React from 'react';
import { View } from 'react-native';
import Animated, { interpolate } from 'react-native-reanimated';
import Carousel, { ICarouselInstance, TAnimationStyle } from 'react-native-reanimated-carousel';
import CarouselItem from './CarouselItem';
import { Widget } from '@/hooks/useWidgets';

// Define the types for the props
interface ScrollingCarouselProps {
    carouselLocationStyle: { top: number };
    height: number;
    width: number;
    setIndex: (index: number) => void;
    widgets: Widget[];
    ref: React.RefObject<ICarouselInstance | null>;
}

const ScrollingCarousel: React.FC<ScrollingCarouselProps> = ({
    carouselLocationStyle,
    height,
    width,
    setIndex,
    widgets,
    ref,
}) => {
    const PAGE_WIDTH = width;
    const itemSize = height * 0.185; // size of center icon is 18.5% of the height
    const centerOffset = PAGE_WIDTH / 2 - itemSize / 2;

    const animationStyle: TAnimationStyle = React.useCallback(
        (value: number) => {
            'worklet';

            // Controls how much the items move apart from each other
            // Not directly used, connected to horizontal positioning
            const itemGap = interpolate(
                value,
                [-3, -2, -1, 0, 1, 2, 3],
                [-20, -15, 0, 0, 0, 15, 20]
            );

            // Controls the horizontal positioning of the items
            const translateX =
                interpolate(value, [-1, 0, 1], [-itemSize, 0, itemSize]) + centerOffset - itemGap;
            // Controls the vertical positioning of the items
            const translateY = interpolate(
                value,
                [-2, -1, -0.5, 0, 0.5, 1, 2],
                [75, 30, 15, 10, 15, 30, 75]
            );
            // Controls the scaling of the items
            const scale = interpolate(value, [-1, -0.5, 0, 0.5, 1], [0.8, 0.85, 1.1, 0.85, 0.8]);

            return {
                transform: [{ translateX }, { translateY }, { scale }],
            };
        },
        [centerOffset, itemSize]
    );

    return (
        <Animated.View
            style={[
                carouselLocationStyle,
                {
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    zIndex: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    opacity: 1,
                },
            ]}>
            <View id="carousel-component">
                <Carousel
                    ref={ref}
                    width={itemSize}
                    height={itemSize}
                    style={{
                        width: PAGE_WIDTH,
                        height: height * 0.3,
                    }}
                    loop
                    data={widgets}
                    onSnapToItem={setIndex}
                    renderItem={({ index, animationValue }) => {
                        return (
                            <CarouselItem
                                widgets={widgets as Widget[]}
                                animationValue={animationValue}
                                index={index}
                            />
                        );
                    }}
                    customAnimation={animationStyle}
                    // minScrollDistancePerSwipe={0.1}
                    // maxScrollDistancePerSwipe={100}
                    // autoPlay={true}
                    // autoPlayInterval={0.1}
                    // scrollAnimationDuration={0.1}
                />
            </View>
        </Animated.View>
    );
};

export default ScrollingCarousel;
