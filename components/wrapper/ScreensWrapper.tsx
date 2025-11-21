import React, { useState, useEffect, useMemo, useRef } from 'react';
import { View, Easing, TouchableOpacity, Text, StyleSheet } from 'react-native'; // Fixed extra space in import path
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'; // Fixed extra space in import path
import { useWidgets } from '@/hooks/useWidgets';
import ScreenWrapperContent from './ScreenWrapperContent';
import ExpandButton from './ExpandButton';
import { useConfigs } from '@/hooks/useConfigs';
import Dock from './dock/Dock';

export default function ScreensWrapper() {
    const widgets = useWidgets();
    const { SHRUNKEN, EXPANDED } = useConfigs();

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
    const viewAreaColor = useSharedValue(SHRUNKEN.VIEW_AREA_COLOR);
    const viewAreaWidth = useSharedValue(0);
    const viewAreaBorderRadius = useSharedValue(SHRUNKEN.VIEW_AREA_BORDER_RADIUS);
    const viewAreaMarginTop = useSharedValue(SHRUNKEN.VIEW_AREA_MARGIN_TOP);
    const reachabilityOffset = useSharedValue(0);

    const dockLocationStyle = useAnimatedStyle(() => {
        return {
            bottom: dockLocation.value, // Animate dock position
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
        <View style={{ flex: 1, position: 'relative' }}>
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
            </Animated.View>

            {/* Dock Component */}
            <Dock
                dockLocationStyle={dockLocationStyle}
                width={window.innerWidth}
                height={window.innerHeight}
                setIndex={setIndex}
                widgets={widgets}
            />

            {/* Reachability Toggle Button */}
            <TouchableOpacity onPress={toggleReachability} style={reachabilityStyles.toggleButton}>
                <Text style={reachabilityStyles.toggleIcon}>
                    {isReachabilityActive ? '^' : 'v'}
                </Text>
            </TouchableOpacity>
        </View>
    );
}

// Clean up any pending timeout when component unmounts
// (placed after component to keep function body focused)
// Note: We use a separate effect above for declarative cleanup inside the component scope.

const reachabilityStyles = StyleSheet.create({
    toggleButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        width: 56,
        height: 56,
        borderRadius: 27,
        backgroundColor: 'rgba(119, 205, 226, 0.9)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
        shadowColor: '#171717',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    toggleIcon: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#f8f9ff',
    },
});
