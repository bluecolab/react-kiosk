import React, { useState, useEffect, useMemo } from 'react';
import { View, Easing } from 'react-native';
import { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useWidgets } from '@/hooks/useWidgets';
import ScreenWrapperContent from './ScreenWrapperContent';
import ExpandButton from './ExpandButton';
import { useConfigs } from '@/hooks/useConfigs';
import Dock from './dock/Dock';
import FloatingActionButton from '../FloatingActionButton';

export default function ScreensWrapper() {
    const widgets = useWidgets();
    const { SHRUNKEN, EXPANDED } = useConfigs();

    const [index, setIndex] = useState<number>(0);

    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const [isFloatingMenuExpanded, setIsFloatingMenuExpanded] = useState<boolean>(false);

    const defaultAnimationConfig = useMemo(
        () => ({
            duration: 500,
            easing: Easing.bezier(0.5, 0.01, 0, 1),
        }),
        []
    );

    // Start location when height and width are not yet loaded
    const dockLocation = useSharedValue(0);
    const viewAreaHeight = useSharedValue(0);
    const viewAreaColor = useSharedValue(SHRUNKEN.VIEW_AREA_COLOR);
    const viewAreaWidth = useSharedValue(0);
    const viewAreaBorderRadius = useSharedValue(SHRUNKEN.VIEW_AREA_BORDER_RADIUS);
    const viewAreaMarginTop = useSharedValue(SHRUNKEN.VIEW_AREA_MARGIN_TOP);

    const dockLocationStyle = useAnimatedStyle(() => {
        return {
            bottom: dockLocation.value,
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
            dockLocation.value = withTiming(0, defaultAnimationConfig);
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
        dockLocation,
        viewAreaHeight,
        viewAreaWidth,
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
                            dockLocation.value = withTiming(0, defaultAnimationConfig);
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
                            dockLocation.value = withTiming(-500, defaultAnimationConfig);
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

            <FloatingActionButton
                isExpanded={isFloatingMenuExpanded}
                onToggle={() => setIsFloatingMenuExpanded(!isFloatingMenuExpanded)}
                onMenuPress={() => {
                    // Navigate to first widget (Welcome/Menu)
                    setIndex(0);
                }}
                onWeatherPress={() => {
                    // Navigate to Weather widget
                    const weatherIndex = widgets.findIndex((w) => w.title === 'Weather');
                    if (weatherIndex !== -1) {
                        setIndex(weatherIndex);
                    }
                }}
                onAboutUsPress={() => {
                    // Navigate to About Us widget
                    const aboutUsIndex = widgets.findIndex((w) => w.title === 'About Us');
                    if (aboutUsIndex !== -1) {
                        setIndex(aboutUsIndex);
                    }
                }}
                onWaterReportsPress={() => {
                    // Navigate to Water Reports widget
                    const waterReportsIndex = widgets.findIndex((w) => w.title === 'Water Reports');
                    if (waterReportsIndex !== -1) {
                        setIndex(waterReportsIndex);
                    }
                }}
                onWaterDataPress={() => {
                    // Navigate to Water Data widget
                    const waterDataIndex = widgets.findIndex((w) => w.title === 'Water Data');
                    if (waterDataIndex !== -1) {
                        setIndex(waterDataIndex);
                    }
                }}
                onRightToKnowPress={() => {
                    // Navigate to Right To Know
                    const rightToKnowIndex = widgets.findIndex((w) => w.title === 'Right to Know');
                    if (rightToKnowIndex !== -1) {
                        setIndex(rightToKnowIndex);
                    }
                }}
                onExpandKiosk={() => {
                    // Expand the kiosk if not already expanded
                    if (!isExpanded) {
                        dockLocation.value = withTiming(-500, defaultAnimationConfig);
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
                        setIsExpanded(true);
                    }
                }}
            />

            <Dock
                dockLocationStyle={dockLocationStyle}
                width={window.innerWidth}
                height={window.innerHeight}
                setIndex={setIndex}
                widgets={widgets}
            />
        </View>
    );
}
