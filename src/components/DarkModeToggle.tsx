import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { useColorScheme } from 'nativewind';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function DarkModeToggle() {
    const { colorScheme, setColorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';
    const scale = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    const handlePress = () => {
        scale.value = withSpring(0.85, { damping: 10 }, () => {
            scale.value = withSpring(1, { damping: 10 });
        });
        const next = isDark ? 'light' : 'dark';
        setColorScheme(next);
        if (typeof window !== 'undefined' && window.localStorage) {
            window.localStorage.setItem('theme', next);
        }
    };

    return (
        <AnimatedPressable
            onPress={handlePress}
            style={[styles.button, animatedStyle]}
            accessibilityLabel={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            accessibilityRole="button">
            <Text style={styles.icon}>{isDark ? '☀' : '☾'}</Text>
        </AnimatedPressable>
    );
}

const styles = StyleSheet.create({
    button: {
        height: 56,
        width: 56,
        borderRadius: 100,
        backgroundColor: 'rgba(119, 205, 226, 0.95)',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#171717',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    icon: {
        fontSize: 24,
        color: '#f8f9ff',
    },
});
