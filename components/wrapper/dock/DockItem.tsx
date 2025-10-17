import { Widget } from '@/hooks/useWidgets';
import { useEffect } from 'react';
import { Platform, Pressable } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    withTiming,
} from 'react-native-reanimated';

interface DockItemProps {
    item: Widget;
    index: number;
    setIndex: (index: number) => void;
    itemSize: number;
    animationValue: number; // plain number
}

export function DockItem({ item, index, setIndex, itemSize, animationValue }: DockItemProps) {
    const animatedSize = useSharedValue(animationValue);

    useEffect(() => {
        animatedSize.value = withSpring(animationValue, { damping: 30, stiffness: 180 });
    }, [animatedSize, animationValue]);

    const sizeStyle = useAnimatedStyle(() => {
        const size = itemSize * (1 + 0.25 * animatedSize.value);
        return {
            width: size,
            height: size,
        };
    });

    // Glow opacity: 1 if animatedSize.value is close to 1, else 0 (with smooth fade)
    const glowStyle = useAnimatedStyle(() => {
        // You can adjust the threshold (0.99) as needed
        const shouldGlow = animatedSize.value > 0.9;
        return {
            opacity: withTiming(shouldGlow ? 1 : 0, { duration: 180 }),
            position: 'absolute',
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            borderRadius: 20,
            shadowColor: '#fff',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 1,
            shadowRadius: 10,
            zIndex: 2,
            // Web glow
            ...Platform.select({
                web: {
                    boxShadow: '0 0 5px 8px #ffffff8d',
                },
            }),
        };
    });

    return (
        <Pressable onPress={() => setIndex(index)}>
            <Animated.View
                style={[
                    { marginHorizontal: 7, marginBottom: 30, alignSelf: 'flex-end' },
                    sizeStyle,
                ]}>
                <Animated.Text
                    ellipsizeMode="tail"
                    style={{
                        alignSelf: 'center',
                        color: 'white',
                        fontWeight: 'bold',
                        width: '100%',
                        textAlign: 'center',
                        fontSize: 16,
                        paddingBottom: 5,
                    }}>
                    {item.title}
                </Animated.Text>
                <Animated.View
                    style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: 30,
                        // Shadow props for iOS and elevation for Android
                        shadowColor: '#232323ff',
                        shadowOffset: { width: 0, height: 5 },
                        shadowOpacity: 0.8,
                        shadowRadius: 7,
                        elevation: 10, // for Android
                        overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
                    }}>
                    <Animated.Image
                        source={item.image}
                        style={{
                            width: '100%',
                            height: '100%',
                            resizeMode: 'contain',
                        }}
                    />
                    <Animated.View style={glowStyle} pointerEvents="none" />
                </Animated.View>
            </Animated.View>
        </Pressable>
    );
}
