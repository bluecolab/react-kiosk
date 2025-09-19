import React, { useState, useEffect, useMemo, useRef } from 'react';
import ScrollingCarousel from '@/components/wrapper/ScrollingCarousel';
import { View, Easing } from 'react-native';
import { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useWidgets } from '@/hooks/useWidgets';
import ScreenWrapperContent from './ScreenWrapperContent';
import ExpandButton from './ExpandButton';
import { useConfigs } from '@/hooks/useConfigs';
import { ICarouselInstance } from 'react-native-reanimated-carousel';
import FloatingButton from '../FloatingButton';
import AllScreensModal from './AllScreensModal';

export default function ScreensWrapper() {
    const widgets = useWidgets();
    const { SHRUNKEN, EXPANDED } = useConfigs();

    const ref = useRef<ICarouselInstance>(null);

    const [index, setIndex] = useState<number>(0);
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [windowDimensions, setWindowDimensions] = useState<{
        width: number | undefined;
        height: number | undefined;
    }>({ width: undefined, height: undefined });

    const defaultAnimationConfig = useMemo(
        () => ({
            duration: 500,
            easing: Easing.bezier(0.5, 0.01, 0, 1),
        }),
        []
    );

    // Start location when height and width are not yet loaded
    const carouselLocation = useSharedValue(0);
    const viewAreaHeight = useSharedValue(0);
    const viewAreaColor = useSharedValue(SHRUNKEN.VIEW_AREA_COLOR);
    const viewAreaWidth = useSharedValue(0);
    const viewAreaBorderRadius = useSharedValue(SHRUNKEN.VIEW_AREA_BORDER_RADIUS);
    const viewAreaMarginTop = useSharedValue(SHRUNKEN.VIEW_AREA_MARGIN_TOP);

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

    const { height, width } = windowDimensions;

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
            carouselLocation.value = withTiming(
                height * SHRUNKEN.CAROUSEL_LOCATION,
                defaultAnimationConfig
            );
            viewAreaHeight.value = withTiming(
                height * SHRUNKEN.VIEW_AREA_HEIGHT,
                defaultAnimationConfig
            );
            viewAreaWidth.value = withTiming(
                width * SHRUNKEN.VIEW_AREA_WIDTH,
                defaultAnimationConfig
            );
        }
    }, [
        defaultAnimationConfig,
        height,
        carouselLocation,
        viewAreaHeight,
        viewAreaWidth,
        width,
        SHRUNKEN.CAROUSEL_LOCATION,
        SHRUNKEN.VIEW_AREA_HEIGHT,
        SHRUNKEN.VIEW_AREA_WIDTH,
    ]);

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
                        if (isExpanded) {
                            carouselLocation.value = withTiming(
                                height * SHRUNKEN.CAROUSEL_LOCATION,
                                defaultAnimationConfig
                            );
                            viewAreaHeight.value = withTiming(
                                height * SHRUNKEN.VIEW_AREA_HEIGHT,
                                defaultAnimationConfig
                            );
                            viewAreaColor.value = withTiming(
                                SHRUNKEN.VIEW_AREA_COLOR,
                                defaultAnimationConfig
                            );
                            viewAreaWidth.value = withTiming(
                                width * SHRUNKEN.VIEW_AREA_WIDTH,
                                defaultAnimationConfig
                            );
                            viewAreaBorderRadius.value = withTiming(
                                SHRUNKEN.VIEW_AREA_BORDER_RADIUS,
                                defaultAnimationConfig
                            );
                            viewAreaMarginTop.value = withTiming(
                                SHRUNKEN.VIEW_AREA_MARGIN_TOP,
                                defaultAnimationConfig
                            );
                            setIsExpanded(!isExpanded);
                        } else {
                            carouselLocation.value = withTiming(
                                height * EXPANDED.CAROUSEL_LOCATION,
                                defaultAnimationConfig
                            );
                            viewAreaHeight.value = withTiming(
                                height * EXPANDED.VIEW_AREA_HEIGHT,
                                defaultAnimationConfig
                            );
                            viewAreaColor.value = withTiming(
                                EXPANDED.VIEW_AREA_COLOR,
                                defaultAnimationConfig
                            );
                            viewAreaWidth.value = withTiming(
                                width * EXPANDED.VIEW_AREA_WIDTH,
                                defaultAnimationConfig
                            );
                            viewAreaBorderRadius.value = withTiming(
                                EXPANDED.VIEW_AREA_BORDER_RADIUS,
                                defaultAnimationConfig
                            );
                            viewAreaMarginTop.value = withTiming(
                                EXPANDED.VIEW_AREA_MARGIN_TOP,
                                defaultAnimationConfig
                            );
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
                ref={ref}
            />

            {!isExpanded && <FloatingButton setIsModalOpen={setIsModalOpen} />}

            <AllScreensModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                ref={ref}
                setIndex={setIndex}
            />
        </View>
    );
}
