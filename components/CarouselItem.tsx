import React from "react";
import { View } from "react-native";
import Animated, { Extrapolation, interpolate, SharedValue, useAnimatedStyle,   useAnimatedReaction, runOnJS, } from "react-native-reanimated";
import { Widget } from "@/hooks/useWidgets";

interface CustomItemProps {
    item: Widget;
    animationValue: SharedValue<number>;
}

const CustomItem: React.FC<CustomItemProps> = ({ item, animationValue }) => {
    const fadeStyle = useAnimatedStyle(() => {
        const opacity = interpolate(
            animationValue.value,
            [-4, -3, -2, -1, 0, 1, 2, 3, 4],
            [0.05, 0.25, 0.5, 0.75, 1, 0.75, 0.5, 0.25, 0.05],
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

interface CarouselItemProps {
    index: number;
    widgets: Widget[];
    animationValue: SharedValue<number>;
    setIndex: (index: number) => void;
}

const CarouselItem: React.FC<CarouselItemProps> = ({ index, widgets, animationValue, setIndex}) => {
    useAnimatedReaction(
        () => animationValue.value,
        (current, prev) => {
          if (current === 0 && prev !== 0 && setIndex) {
            runOnJS(setIndex)(index);
          }
        },
        [animationValue]
    );
    
    return (
        <View style={{ flex: 1 }}>
            <CustomItem item={widgets[index]} animationValue={animationValue} />
        </View>
    );

}

export default CarouselItem;

