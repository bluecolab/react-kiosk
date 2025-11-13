import React from 'react';
import { StyleSheet, View, Pressable } from 'react-native';
import Animated, {
    withDelay,
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
    SharedValue,
} from 'react-native-reanimated';
const AnimatedPressable = Animated.createAnimatedComponent(Pressable); // Create an animated version of Pressable
const OFFSET = 60;

interface ActionButtonProps {
    isExpanded: SharedValue<boolean>;
    index: number;
    buttonLabel: string;
    onPress?: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({ isExpanded, index, buttonLabel, onPress }) => {
    const animatedStyles = useAnimatedStyle(() => {
        const moveValue = OFFSET * index; // Always keep buttons at expanded positions
        const delay = index * 100;
        const scaleValue = isExpanded.value ? 1 : 1e-5;
        const opacityValue = isExpanded.value ? 1 : 1e-5;

        return {
            transform: [
                { translateY: -moveValue }, // Keep buttons spread out
                {
                    scale: withDelay(delay, withTiming(scaleValue)),
                    opacity: withDelay(delay, withTiming(opacityValue)),
                },
            ],
            opacity: withDelay(delay, withTiming(opacityValue)),
        };
    });

    const handlePress = () => {
        if (onPress) {
            onPress();
        }
    };

    // Always make button clickable at its position
    return (
        <AnimatedPressable
            onPress={handlePress}
            style={[animatedStyles, styles.shadow, styles.button]}
            pointerEvents="auto"
            hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}>
            <Animated.Text style={styles.content}>{buttonLabel}</Animated.Text>
        </AnimatedPressable>
    );
};

interface FloatingActionButtonProps {
    isExpanded: boolean;
    onToggle: () => void;
    onMenuPress?: () => void;
    onWeatherPress?: () => void;
    onAboutUsPress?: () => void;
    onWaterReportsPress?: () => void;
    onWaterDataPress?: () => void;
    onExpandKiosk?: () => void; // Add callback to expand kiosk
    onFeedbackPress?: () => void;
}
export default function FloatingActionButton({
    isExpanded,
    onToggle,
    onMenuPress,
    onWeatherPress,
    onAboutUsPress,
    onWaterReportsPress,
    onWaterDataPress,
    onExpandKiosk,
}: FloatingActionButtonProps) {
    const isExpandedValue = useSharedValue(isExpanded);

    React.useEffect(() => {
        isExpandedValue.value = isExpanded;
    }, [isExpanded, isExpandedValue]);

    const handlePress = () => {
        onToggle();
    };

    const handleActionPress = (action?: () => void) => {
        if (action) {
            // Toggle floating menu
            if (!isExpanded) {
                onToggle();
            }
            // Pull down UI (Reachability-style) by expanding the kiosk
            if (onExpandKiosk) {
                onExpandKiosk();
            }
            // Execute the navigation action
            action();
            // Close the floating menu after a short delay
            setTimeout(() => {
                if (isExpanded) {
                    onToggle();
                }
            }, 300);
        }
    };

    const plusIconStyle = useAnimatedStyle(() => {
        const moveValue = interpolate(Number(isExpandedValue.value), [0, 1], [0, 2]);
        const translateValue = withTiming(moveValue);
        const rotateValue = isExpandedValue.value ? '45deg' : '0deg';

        return {
            transform: [{ translateX: translateValue }, { rotate: withTiming(rotateValue) }],
        };
    });

    return (
        <View style={styles.mainContainer}>
            <View style={styles.buttonContainer}>
                <AnimatedPressable
                    onPress={handlePress}
                    onLongPress={handlePress}
                    pointerEvents="auto"
                    hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
                    style={[styles.shadow, mainButtonStyles.button]}>
                    <Animated.Text style={[plusIconStyle, mainButtonStyles.content]}>
                        +
                    </Animated.Text>
                </AnimatedPressable>

                <ActionButton
                    isExpanded={isExpandedValue}
                    index={1}
                    buttonLabel={'Menu'}
                    onPress={() => handleActionPress(onMenuPress)}
                />

                <ActionButton
                    isExpanded={isExpandedValue}
                    index={2}
                    buttonLabel={'Weather'}
                    onPress={() => handleActionPress(onWeatherPress)}
                />

                <ActionButton
                    isExpanded={isExpandedValue}
                    index={3}
                    buttonLabel={'Water Reports'}
                    onPress={() => handleActionPress(onWaterReportsPress)}
                />

                <ActionButton
                    isExpanded={isExpandedValue}
                    index={4}
                    buttonLabel={'About Us'}
                    onPress={() => handleActionPress(onAboutUsPress)}
                />

                <ActionButton
                    isExpanded={isExpandedValue}
                    index={5}
                    buttonLabel={'Water Data'}
                    onPress={() => handleActionPress(onWaterDataPress)}
                />
            </View>
        </View>
    );
}

const mainButtonStyles = StyleSheet.create({
    button: {
        zIndex: 1,
        height: 56,
        width: 56,
        opacity: 1,
        elevation: 8,
        borderRadius: 100,
        bottom: 0,
        backgroundColor: '#b58df1',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        fontSize: 24,
        color: '#f8f9ff',
    },
});

const styles = StyleSheet.create({
    mainContainer: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        height: 320,
        width: 50,
        opacity: 1,
        elevation: 8,
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        zIndex: 1000,
        pointerEvents: 'box-none',
    },
    button: {
        minWidth: 80,
        height: 40,
        paddingHorizontal: 18,
        backgroundColor: '#82cab2',
        position: 'absolute',
        borderRadius: 30,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 100,
        flexDirection: 'row',
    },
    buttonContainer: {
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        pointerEvents: 'box-none',
    },
    shadow: {
        shadowColor: '#171717',
        shadowOffset: { width: -0.5, height: 3.5 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    content: {
        color: '#f8f9ff',
        fontWeight: '500',
        fontSize: 12,
    },
});
