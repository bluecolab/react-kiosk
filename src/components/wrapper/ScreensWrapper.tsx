import React, { useState, useEffect, useMemo, useRef } from 'react';
import { View, Easing, Pressable, Text } from 'react-native';
import { useColorScheme } from 'nativewind';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useWidgets } from '@/hooks/useWidgets';
import ScreenWrapperContent from './ScreenWrapperContent';
import ExpandButton from './ExpandButton';
import { useConfigs } from '@/hooks/useConfigs';
import Dock from './dock/Dock';
import SettingsToggle from '../SettingsToggle';

export default function ScreensWrapper() {
    const widgets = useWidgets();
    const { SHRUNKEN, EXPANDED } = useConfigs();
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';
    const shrunkenColor = isDark ? SHRUNKEN.VIEW_AREA_COLOR_DARK : SHRUNKEN.VIEW_AREA_COLOR;
    const expandedColor = isDark ? EXPANDED.VIEW_AREA_COLOR_DARK : EXPANDED.VIEW_AREA_COLOR;

    const [index, setIndex] = useState<number>(5);

    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const [isReachabilityActive, setIsReachabilityActive] = useState<boolean>(false);

    // Ref to store auto-hide timeout so we can clear it if user toggles manually
    const reachTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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
    const viewAreaColor = useSharedValue(shrunkenColor);
    const viewAreaWidth = useSharedValue(0);
    const viewAreaBorderRadius = useSharedValue(SHRUNKEN.VIEW_AREA_BORDER_RADIUS);
    const viewAreaMarginTop = useSharedValue(SHRUNKEN.VIEW_AREA_MARGIN_TOP);
    const reachabilityOffset = useSharedValue(0);

    // Update background color when system color scheme changes
    useEffect(() => {
        viewAreaColor.value = withTiming(isExpanded ? expandedColor : shrunkenColor, {
            duration: 300,
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [colorScheme]);

    const dockLocationStyle = useAnimatedStyle(() => {
        return {
            bottom: dockLocation.value + 10, // Animate dock position
            transform: [{ translateY: reachabilityOffset.value }],
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

    const reachabilityStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: reachabilityOffset.value }],
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

    const toggleReachability = () => {
        // Clear any existing auto-hide timer
        if (reachTimeoutRef.current) {
            clearTimeout(reachTimeoutRef.current as any);
            reachTimeoutRef.current = null;
        }

        if (isReachabilityActive) {
            // Slide back up and mark as inactive
            reachabilityOffset.value = withTiming(0, { duration: 300 });
            setIsReachabilityActive(false);
        } else {
            // Pull down UI by half screen height for easy top access
            reachabilityOffset.value = withTiming(window.innerHeight * 0.5, { duration: 300 });
            setIsReachabilityActive(true);

            // Auto-hide after 8s so it stays down longer; clear if toggled manually
            reachTimeoutRef.current = setTimeout(() => {
                reachabilityOffset.value = withTiming(0, { duration: 300 });
                setIsReachabilityActive(false);
                reachTimeoutRef.current = null;
            }, 30000);
        }
    };

    useEffect(() => {
        return () => {
            if (reachTimeoutRef.current) {
                clearTimeout(reachTimeoutRef.current as any);
                reachTimeoutRef.current = null;
            }
        };
    }, []);

    return (
        <View className="flex-1 relative">
            <Animated.View
                style={[
                    {
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        alignItems: 'center',
                        width: '100%',
                    },
                    reachabilityStyle,
                ]}>
                <ScreenWrapperContent
                    title={widgets[index].title}
                    screen={widgets[index].screen}
                    contentAreaHeightStyle={contentAreaHeightStyle as any}
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
                            viewAreaColor.value = withTiming(shrunkenColor, defaultAnimationConfig);
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
                            viewAreaColor.value = withTiming(expandedColor, defaultAnimationConfig);
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
            </Animated.View>

            {/* Dock Component */}
            <Dock
                dockLocationStyle={dockLocationStyle as any}
                width={window.innerWidth}
                height={window.innerHeight}
                setIndex={setIndex}
                widgets={widgets}
            />

            {/* Settings Toggle — language & dark mode */}
            <Pressable className="absolute bottom-5 left-5 z-50">
                <SettingsToggle />
            </Pressable>

            {/* Reachability Toggle Button */}
            <Pressable
                onPress={toggleReachability}
                className="absolute bottom-5 right-5 w-14 h-14 rounded-full bg-sky-300/90 justify-center items-center shadow-md z-50">
                <Text className="text-white font-bold text-2xl">
                    {isReachabilityActive ? '^' : 'v'}
                </Text>
            </Pressable>
        </View>
    );
}

// Clean up any pending timeout when component unmounts
// (placed after component to keep function body focused)
// Note: We use a separate effect above for declarative cleanup inside the component scope.
