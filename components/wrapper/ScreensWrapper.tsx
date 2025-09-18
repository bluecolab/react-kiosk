import React, { useState, useEffect, useMemo } from 'react';
import ScrollingCarousel from '@/components/wrapper/ScrollingCarousel';
import { View, Easing } from 'react-native';
import { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useWidgets } from '@/hooks/useWidgets';
import ScreenWrapperContent from './ScreenWrapperContent';
import ExpandButton from './ExpandButton';

export default function ScreensWrapper() {
    const widgets = useWidgets();

    const [windowDimensions, setWindowDimensions] = useState<{
        width: number | undefined;
        height: number | undefined;
    }>({ width: undefined, height: undefined });

    const [index, setIndex] = useState<number>(0);
    const [isExpanded, setIsExpanded] = useState<boolean>(false);

    const { height, width } = windowDimensions;

    const config = useMemo(
        () => ({
            duration: 500,
            easing: Easing.bezier(0.5, 0.01, 0, 1),
        }),
        []
    );

    // Animation values
    const carouselLocation = useSharedValue(0); // Start at 0 (off-screen or hidden)
    const viewAreaHeight = useSharedValue(0); // Start at 0 (off-screen or hidden)
    const viewAreaColor = useSharedValue('#efefefdd');
    const viewAreaWidth = useSharedValue(0);
    const viewAreaBorderRadius = useSharedValue(15);
    const viewAreaMarginTop = useSharedValue(10);

    const carouselLocationStyle = useAnimatedStyle(() => {
        return {
            top: carouselLocation.value,
        };
    });

    const contentAreaHeightStyle = useAnimatedStyle(() => {
        return {
            height: viewAreaHeight.value,
            backgroundColor: viewAreaColor.value,
            width: viewAreaWidth.value,
            borderRadius: viewAreaBorderRadius.value,
            marginTop: viewAreaMarginTop.value,
        };
    });

    useEffect(() => {
        const setInitialWindowDimensions = () => {
            setWindowDimensions({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        // Set initial dimensions
        setInitialWindowDimensions();
    }, []);

    useEffect(() => {
        if (height && width) {
            // Animate it in when height is available
            carouselLocation.value = withTiming(height * 0.75, config);
            viewAreaHeight.value = withTiming(height * 0.73, config);
            viewAreaWidth.value = withTiming(width * 0.98, config);
        }
    }, [config, height, carouselLocation, viewAreaHeight, viewAreaWidth, width]);

    // Fallback until height and width are available
    if (!height || !width) {
        return <View style={{ flex: 1 }} />;
    }

    return (
        <View style={{ flex: 1, position: 'relative' }}>
            <View
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    alignItems: 'center',
                    width: '100%',
                }}>
                <ScreenWrapperContent
                    title={widgets[index].title}
                    screen={widgets[index].screen}
                    contentAreaHeightStyle={contentAreaHeightStyle}
                />

                <ExpandButton
                    isExpanded={isExpanded}
                    onPress={() => {
                        if (height && !isExpanded) {
                            carouselLocation.value = withTiming(height * 1.05, config);
                            viewAreaHeight.value = withTiming(height, config);
                            viewAreaColor.value = withTiming('#efefefff', config);
                            viewAreaWidth.value = withTiming(width, config);
                            viewAreaBorderRadius.value = withTiming(0, config);
                            viewAreaMarginTop.value = withTiming(0, config);
                            setIsExpanded(!isExpanded);
                        } else if (height && isExpanded) {
                            carouselLocation.value = withTiming(height * 0.75, config);
                            viewAreaHeight.value = withTiming(height * 0.73, config);
                            viewAreaColor.value = withTiming('#efefefdd', config);
                            viewAreaWidth.value = withTiming(width * 0.98, config);
                            viewAreaBorderRadius.value = withTiming(15, config);
                            viewAreaMarginTop.value = withTiming(10, config);
                            setIsExpanded(!isExpanded);
                        }
                    }}
                />
            </View>

            <ScrollingCarousel
                carouselLocationStyle={carouselLocationStyle}
                widgets={widgets}
                height={height}
                width={width}
                setIndex={setIndex}
            />
        </View>
    );
}
