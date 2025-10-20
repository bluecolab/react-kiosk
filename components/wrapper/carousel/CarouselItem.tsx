import React from 'react';
import { Pressable, View } from 'react-native';
import Animated, {
    Extrapolation,
    interpolate,
    SharedValue,
    useAnimatedStyle,
} from 'react-native-reanimated';

import { Widget } from '@/hooks/useWidgets';
import { ICarouselInstance } from 'react-native-reanimated-carousel';

interface CustomItemProps {
    item: Widget;
    animationValue: SharedValue<number>; // Shared animated value for interpolation
}

const CustomItem: React.FC<CustomItemProps> = ({ item, animationValue }) => {
    const fadeStyle = useAnimatedStyle(() => {
        const opacity = interpolate(
            animationValue.value,
            [-4, -3, -2, -1, 0, 1, 2, 3, 4],
            [0.05, 0.25, 0.5, 0.75, 1, 0.75, 0.5, 0.25, 0.05],
            Extrapolation.CLAMP
        );

        return {
            opacity,
        };
    }, [animationValue]);

    return (
        <Pressable
            style={{
                width: '100%',
                height: '100%',
            }}
            onPress={() => {
                if (item.onPress) {
                    item.onPress();
                }
            }}>
            <Animated.Text
                style={[
                    {
                        alignSelf: 'center',
                        color: 'white',
                        fontWeight: 'bold',
                    },
                    fadeStyle,
                ]}>
                {item.title}
            </Animated.Text>

            <Animated.Image
                source={item.image}
                style={[
                    {
                        width: '100%',
                        height: '100%',
                        resizeMode: 'contain',
                    },
                    fadeStyle,
                ]}
                borderRadius={50}
            />
        </Pressable>
    );
};

interface CarouselItemProps {
    index: number;
    widgets: Widget[];
    animationValue: SharedValue<number>;
    setIndex: (index: number) => void;
    ref: React.RefObject<ICarouselInstance | null>;
}

const CarouselItem: React.FC<CarouselItemProps> = ({
    index,
    widgets,
    animationValue,
    setIndex,
    ref,
}) => {
    return (
        <View style={{ flex: 1 }}>
            <Pressable
                onPress={() => {
                    ref.current?.scrollTo({ index, animated: true });
                    setIndex(index);
                }}
                style={{ flex: 1 }}>
                <CustomItem item={widgets[index]} animationValue={animationValue} />
            </Pressable>
        </View>
    );
};

export default CarouselItem;
