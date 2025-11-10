import React, { useEffect, useState } from 'react';
import { View, Pressable, Dimensions } from 'react-native';
import Animated, {
    Extrapolation,
    interpolate,
    SharedValue,
    useAnimatedStyle,
} from 'react-native-reanimated';

import { Widget } from '@/hooks/useWidgets';

interface CustomItemProps {
    item: Widget;
    animationValue: SharedValue<number>; // Shared animated value for interpolation
}

const CustomItem: React.FC<CustomItemProps> = ({ item, animationValue }) => {
    const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);

    useEffect(() => {
        const subscription = Dimensions.addEventListener('change', ({ window }) => {
            setScreenWidth(window.width);
        });

        return () => subscription?.remove();
    }, []);

    // Calculate responsive font size
    const getFontSize = () => {
        if (screenWidth < 768) return 10; // Mobile
        if (screenWidth < 1024) return 12; // Tablet
        return 14; // Desktop/Kiosk
    };

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
                width: '90%', // Slightly reduced width to fit better within carousel
                height: '90%', // Slightly reduced height to fit better within carousel
                alignSelf: 'center', // Center the item within the carousel
            }}
            onPress={() => {
                if (item.onPress) {
                    item.onPress();
                }
            }}>
            <Animated.Text
                style={[
                    {
                        alignSelf: 'center', // Center the text horizontally
                        marginTop: 0, // Reduced margin to bring text closer to the image above
                        color: 'white', // Keep white color for visibility
                        fontSize: getFontSize(), // Responsive font size based on screen width
                        marginBottom: 0, // Reduced margin to bring text closer to the image
                        textAlign: 'center', // Center the text horizontally
                    },
                    fadeStyle,
                ]}>
                {item.title}
            </Animated.Text>

            <Animated.Image
                source={item.image}
                style={[
                    {
                        width: '100%', // Full width to utilize available space
                        height: '100%', // Full height to utilize available space
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
}

const CarouselItem: React.FC<CarouselItemProps> = ({ index, widgets, animationValue }) => {
    return (
        <View style={{ flex: 1 }}>
            <CustomItem item={widgets[index]} animationValue={animationValue} />
        </View>
    );
};

export default CarouselItem;
