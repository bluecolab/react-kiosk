import React, { useState, useEffect, useMemo, useRef } from 'react';
import ScrollingCarousel from '@/components/wrapper/carousel/ScrollingCarousel';
import { View, Easing } from 'react-native';
import { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useWidgets } from '@/hooks/useWidgets';
import ScreenWrapperContent from './ScreenWrapperContent';
import ExpandButton from './ExpandButton';
import { useConfigs } from '@/hooks/useConfigs';
import { ICarouselInstance } from 'react-native-reanimated-carousel';
import FloatingButton from '../FloatingButton';
import AllScreensModal from './modal/AllScreensModal';
import { UIType } from '@/hooks/constants/constants';
import Dock from './dock/Dock';

export default function ScreensWrapper() {
    const widgets = useWidgets();
    const { SHRUNKEN, EXPANDED, mode } = useConfigs();

    const ref = useRef<ICarouselInstance>(null);

    const [index, setIndex] = useState<number>(0);
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

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

    useEffect(() => {
        if (window.innerHeight && window.innerWidth) {
            // Animate it in when height is available
            carouselLocation.value = withTiming(
                window.innerHeight * SHRUNKEN.CAROUSEL_LOCATION,
                defaultAnimationConfig
            );
            viewAreaHeight.value = withTiming(
                window.innerHeight * SHRUNKEN.VIEW_AREA_HEIGHT,
                defaultAnimationConfig
            );
            viewAreaWidth.value = withTiming(
                window.innerWidth * SHRUNKEN.VIEW_AREA_WIDTH,
                defaultAnimationConfig
            );
            viewAreaHeight.value = withTiming(
                window.innerHeight * SHRUNKEN.VIEW_AREA_HEIGHT,
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
            viewAreaWidth.value = withTiming(
                window.innerWidth * SHRUNKEN.VIEW_AREA_WIDTH,
                defaultAnimationConfig
            );
        }
    }, [
        defaultAnimationConfig,
        carouselLocation,
        viewAreaHeight,
        viewAreaWidth,
        SHRUNKEN.CAROUSEL_LOCATION,
        SHRUNKEN.VIEW_AREA_HEIGHT,
        SHRUNKEN.VIEW_AREA_WIDTH,
        SHRUNKEN.VIEW_AREA_BORDER_RADIUS,
        SHRUNKEN.VIEW_AREA_MARGIN_TOP,
        viewAreaBorderRadius,
        viewAreaMarginTop,
    ]);

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
                                window.innerHeight * SHRUNKEN.CAROUSEL_LOCATION,
                                defaultAnimationConfig
                            );
                            viewAreaHeight.value = withTiming(
                                window.innerHeight * SHRUNKEN.VIEW_AREA_HEIGHT,
                                defaultAnimationConfig
                            );
                            viewAreaColor.value = withTiming(
                                SHRUNKEN.VIEW_AREA_COLOR,
                                defaultAnimationConfig
                            );
                            viewAreaWidth.value = withTiming(
                                window.innerWidth * SHRUNKEN.VIEW_AREA_WIDTH,
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
                                window.innerHeight * EXPANDED.CAROUSEL_LOCATION,
                                defaultAnimationConfig
                            );
                            viewAreaHeight.value = withTiming(
                                window.innerHeight * EXPANDED.VIEW_AREA_HEIGHT,
                                defaultAnimationConfig
                            );
                            viewAreaColor.value = withTiming(
                                EXPANDED.VIEW_AREA_COLOR,
                                defaultAnimationConfig
                            );
                            viewAreaWidth.value = withTiming(
                                window.innerWidth * EXPANDED.VIEW_AREA_WIDTH,
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

            {(mode === UIType.MIXED || mode === UIType.CAROUSEL) && (
                <ScrollingCarousel
                    carouselLocationStyle={carouselLocationStyle}
                    widgets={widgets}
                    height={window.innerHeight}
                    width={window.innerWidth}
                    setIndex={setIndex}
                    ref={ref}
                />
            )}

            {!isExpanded && (mode === UIType.MIXED || mode === UIType.MODAL) && (
                <FloatingButton setIsModalOpen={setIsModalOpen} />
            )}

            {mode === UIType.DOCK && (
                <Dock
                    carouselLocationStyle={carouselLocationStyle}
                    height={window.innerHeight}
                    setIndex={setIndex}
                    widgets={widgets}
                />
            )}

            <AllScreensModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                ref={ref}
                setIndex={setIndex}
            />
        </View>
    );
}
