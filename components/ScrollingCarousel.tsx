import * as React from 'react';
import { View } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Animated, { interpolate, Extrapolation, useAnimatedStyle, SharedValue } from 'react-native-reanimated';
import Carousel, { TAnimationStyle } from 'react-native-reanimated-carousel';

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
    const itemSize = 150;
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
            const translateY = interpolate(value, [-1, -0.5, 0, 0.5, 1], [65, 45, 40, 45, 65]);
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

    interface CustomItemProps {
        item: Widget;
        animationValue: SharedValue<number>;
    }

    const CustomItem: React.FC<CustomItemProps> = ({ item, animationValue }) => {
        const fadeStyle = useAnimatedStyle(() => {
            const opacity = interpolate(
                animationValue.value,
                [-4,-3, -2, -1, 0, 1, 2, 3, 4],
                [0.05,0.25, 0.5, 0.75, 1, 0.75, 0.5, 0.25, 0.05],  // Adjust these values for more or less fading
                Extrapolation.CLAMP,
            );
    
            return {
                opacity,
            };
        }, [animationValue]);
    
        return (
            <View style={{
                width: '100%',
                height: '100%',
            }}>
                <Animated.Text style={[{
                    alignSelf: 'center',
                    color: 'white',
                    fontWeight: 'bold',
                }, fadeStyle]}>
                    {item.title}
                </Animated.Text>
    
                <Animated.Image
                    source={item.image}
                    style={[{
                        width: '100%',
                        height: '100%',
                        resizeMode: 'contain',
                    }, fadeStyle]}
                    borderRadius={50}
                />
            </View>
        );
    };
    

    return (
        <View id="carousel-component">
            <Carousel
                width={itemSize}
                height={itemSize}
                style={{
                    width: PAGE_WIDTH,
                    height: height*0.4,
                }}
                loop
                data={widgets}
                renderItem={({ index, animationValue }) => (
                    <TouchableWithoutFeedback
                        key={index}
                        onPress={() => {
                            console.log(index);
                        }}
                        containerStyle={{ flex: 1 }}
                        style={{ flex: 1 }}
                    >
                        <CustomItem item={widgets[index]} animationValue={animationValue} />
                    </TouchableWithoutFeedback>
                )}
                customAnimation={animationStyle}
            />
        </View>
    );
}

export default ScrollingCarousel;