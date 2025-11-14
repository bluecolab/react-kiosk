import React from 'react';
import { StyleSheet, View, Pressable } from 'react-native';
import Animated, {
    withDelay,
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
    SharedValue,
} from 'react-native-reanimated';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const SPRING_CONFIG = {
    duration: 1200,
    overshootClamping: true,
    dampingRatio: 0.9,
};

const OFFSET = 60;

interface ActionButtonProps {
    isExpanded: SharedValue<boolean>;
    index: number;
    buttonLabel: string;
    onPress?: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({ isExpanded, index, buttonLabel, onPress }) => {
    const animatedStyles = useAnimatedStyle(() => {
        const moveValue = isExpanded.value ? OFFSET * index : 0;
        const translateValue = withSpring(-moveValue, SPRING_CONFIG);
        const delay = index * 100;
        const scaleValue = isExpanded.value ? 1 : 0;

        return {
            transform: [
                { translateY: translateValue },
                {
                    scale: withDelay(delay, withTiming(scaleValue)),
                },
            ],
        };
    });

    return (
        <AnimatedPressable onPress={onPress} style={[animatedStyles, styles.shadow, styles.button]}>
            <Animated.Text style={styles.content}>{buttonLabel}</Animated.Text>
        </AnimatedPressable>
    );
};

interface FloatingActionButtonProps {
    isExpanded: boolean;
    onToggle: () => void;
    onRightToKnowPress?: () => void;
    onMenuPress?: () => void;
    onWeatherPress?: () => void;
    onAboutUsPress?: () => void;
    onWaterReportsPress?: () => void;
    onWaterDataPress?: () => void;
    onExpandKiosk?: () => void;
}

export default function FloatingActionButton({
    isExpanded,
    onToggle,
    onRightToKnowPress,
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
            if (!isExpanded) {
                onToggle();
            }
            if (onExpandKiosk) {
                onExpandKiosk();
            }
            action();
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
                    style={[styles.shadow, mainButtonStyles.button]}>
                    <Animated.Text style={[plusIconStyle, mainButtonStyles.content]}>
                        +
                    </Animated.Text>
                </AnimatedPressable>

                <ActionButton
                    isExpanded={isExpandedValue}
                    index={1}
                    buttonLabel={'Right To Know'}
                    onPress={() => handleActionPress(onRightToKnowPress)}
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
        borderRadius: 100,
        backgroundColor: '#2db0ecff',
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
        bottom: 86,
        right: 20,
        height: 380,
        width: 56,
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        zIndex: 1000,
        pointerEvents: 'box-none',
    },
    button: {
        minWidth: 80,
        height: 40,
        paddingHorizontal: 12,
        backgroundColor: '#82cab2',
        position: 'absolute',
        borderRadius: 20,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 0,
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
