import { Widget } from '@/hooks/useWidgets';
import { useEffect, useRef, useState } from 'react';
import { Platform, Pressable, Text, TextProps } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    withTiming,
} from 'react-native-reanimated';

type OnTextLayoutEvent = Parameters<NonNullable<TextProps['onTextLayout']>>[0];
type OnLayoutEvent = Parameters<NonNullable<TextProps['onLayout']>>[0];

interface DockItemProps {
    item: Widget;
    index: number;
    setIndex: (index: number) => void;
    itemSize: number;
    animationValue: number; // plain number
}

export function DockItem({ item, index, setIndex, itemSize, animationValue }: DockItemProps) {
    const animatedSize = useSharedValue(animationValue);
    const [isSingleLineTitle, setIsSingleLineTitle] = useState(false);
    const normalizedTitle = item.title.trim().replace(/\s+/g, ' ');
    const displayTitle = isSingleLineTitle ? `${normalizedTitle}\n ` : normalizedTitle;
    const hasMeasuredTitleRef = useRef(false);

    const handleMeasureTitleLayout = (event: OnTextLayoutEvent) => {
        if (hasMeasuredTitleRef.current) return;

        hasMeasuredTitleRef.current = true;
        const singleLine = event.nativeEvent.lines.length <= 1;
        if (singleLine !== isSingleLineTitle) {
            setIsSingleLineTitle(singleLine);
        }
    };

    const handleTitleLayoutFallback = (event: OnLayoutEvent) => {
        if (Platform.OS !== 'web') return;
        if (hasMeasuredTitleRef.current) return;

        const { height } = event.nativeEvent.layout;
        // Web fallback: estimate 1-line vs 2-line using rendered height.
        const isLikelySingleLine = height <= 22;
        hasMeasuredTitleRef.current = true;
        setIsSingleLineTitle(isLikelySingleLine);
    };

    useEffect(() => {
        hasMeasuredTitleRef.current = false;
        setIsSingleLineTitle(false);
    }, [normalizedTitle]);

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
        <Pressable
            onPress={() => {
                if (item.onPress) {
                    try {
                        item.onPress();
                    } catch {
                        // swallow: fallback to selecting index
                        setIndex(index);
                    }
                } else {
                    setIndex(index);
                }
            }}>
            <Animated.View
                style={[
                    {
                        marginHorizontal: 7,
                        marginBottom: 30,
                        alignSelf: 'flex-end',
                        position: 'relative',
                    },
                    sizeStyle,
                ]}>
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
                        }}
                        resizeMode="contain"
                    />
                    <Animated.View
                        style={{
                            pointerEvents: 'none',
                            ...glowStyle,
                        }}
                    />
                </Animated.View>
                <Text
                    adjustsFontSizeToFit
                    numberOfLines={2}
                    onTextLayout={handleMeasureTitleLayout}
                    onLayout={handleTitleLayoutFallback}
                    minimumFontScale={0.3} // won't shrink below 50% of the original size
                    ellipsizeMode="tail"
                    className="text-white font-bold text-center z-1"
                    style={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        bottom: -40,
                        paddingHorizontal: 6,
                        textShadowColor: 'rgba(0,0,0,0.75)',
                        textShadowOffset: { width: 0, height: 1 },
                        textShadowRadius: 2,
                    }}>
                    {displayTitle}
                </Text>
            </Animated.View>
        </Pressable>
    );
}
