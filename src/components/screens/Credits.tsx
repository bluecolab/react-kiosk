import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    Text,
    TouchableWithoutFeedback,
    Animated,
    Easing,
    Platform,
    LayoutChangeEvent,
} from 'react-native';

type CreditsProps = {
    durationSeconds?: number;
    onNavigate?: () => void;
};

const credits = [
    { heading: 'Leadership', items: ['John Cronin', 'Leanne Keeley'] },
    { heading: 'Advisors', items: ['Sasha Cronin'] },
    {
        heading: 'React Kiosk',
        items: [
            'Robert Bunjaj',
            'Isaac Lasso Younes',
            'Lloyd Boadi-Amoah',
            'Victor Lima',
            'Kenji Okura',
        ],
    },
    {
        heading: 'Dashboards',
        items: [
            'Kyle Hanson',
            'Kainaat Babar',
            "Nicole D'Annunzio",
            'Sean Scully',
            'Sasha Breygina',
            'Alexandra Tejeda',
            'George Moses',
            'Victor Lima',
            'Kenji Okura',
            'Chris Rizzi (PurpleAir)',
            'Mamoun Edfouf (PurpleAir)',
        ],
    },
    {
        heading: 'Games',
        items: [
            'Keathson Lam',
            'Daniel White',
            'Jack Sullivan',
            'Isabella Coraci',
            'Ian Shimba',
            'Michael Rourke',
            'Sebastian Roman',
            'Kenji Okura',
        ],
    },
    { heading: 'Sonification', items: ['Blue CoLab Team', 'Lulu Moquete', 'Kenji Okura'] },
    {
        heading: 'Kiosk Development Teams',
        items: [
            'AJ Kopec',
            'Meryl Mizell',
            'Sohaib Babar',
            'Robert Bunjaj',
            'Nailah Brown',
            'Josh Connaught',
            'Stephanie Sicilian',
            'Jordan Butler',
            'Keathson Lam',
            'Sasha Breygina',
            'Kevin Mendez',
            'Max Yankowitz',
            'Anthony Jarama',
            'Katherine Welsh',
            'Edmund Diggle',
            'Isaac Lasso Younes',
            'Marcus Manning',
            'Zachary Goldberg',
            'Michael Rourke',
            'Erin Sorbella',
            'Josh Bloom',
            'Isabella Coraci',
        ],
    },
];

export default function Credits({ durationSeconds = 30, onNavigate }: CreditsProps) {
    const translateY = useRef(new Animated.Value(0)).current;
    const [containerHeight, setContainerHeight] = useState(0);
    const [contentHeight, setContentHeight] = useState(0);
    const animationRef = useRef<Animated.CompositeAnimation | null>(null);

    const startAnimation = () => {
        if (!containerHeight || !contentHeight) return;
        translateY.setValue(containerHeight);
        const distance = containerHeight + contentHeight;
        const duration = Math.max(
            1000,
            durationSeconds * 1000 * (distance / (containerHeight || 1))
        );
        animationRef.current = Animated.loop(
            Animated.timing(translateY, {
                toValue: -contentHeight,
                duration: duration,
                easing: Easing.linear,
                useNativeDriver: true,
            })
        );
        animationRef.current.start();
    };

    const stopAnimation = () => {
        if (animationRef.current) {
            animationRef.current.stop();
            animationRef.current = null;
        }
    };

    useEffect(() => {
        if (containerHeight && contentHeight) {
            stopAnimation();
            startAnimation();
        }
        return () => stopAnimation();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [containerHeight, contentHeight, durationSeconds]);

    useEffect(() => {
        if (containerHeight && !animationRef.current) {
            translateY.setValue(containerHeight);
        }
    }, [containerHeight, translateY]);

    const onContainerLayout = (e: LayoutChangeEvent) => {
        setContainerHeight(e.nativeEvent.layout.height);
    };

    const onContentLayout = (e: LayoutChangeEvent) => {
        setContentHeight(e.nativeEvent.layout.height);
    };

    const handleNavigate = () => {
        if (onNavigate) return onNavigate();
        try {
            if (typeof window !== 'undefined') {
                window.dispatchEvent(
                    new CustomEvent('kiosk-navigate', { detail: { title: 'Welcome' } })
                );
                return;
            }
        } catch {
            /* ignore */
        }
    };

    return (
        <TouchableWithoutFeedback onPress={handleNavigate}>
            <View
                className="flex-1 justify-center items-center overflow-hidden"
                style={
                    Platform.OS === 'web'
                        ? { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }
                        : undefined
                }
                onLayout={onContainerLayout}>
                {/* translucent overlay */}
                <View
                    className="absolute top-0 left-0 right-0 bottom-0 bg-black/45"
                    style={{
                        pointerEvents: 'none',
                    }}
                />

                <View
                    className="w-full items-center justify-center px-6 z-10"
                    style={{
                        pointerEvents: 'box-none',
                    }}>
                    <View className="w-4/5 max-w-[900px] min-w-[320px] items-center overflow-hidden h-3/5">
                        <Animated.View
                            onLayout={onContentLayout}
                            style={[
                                { transform: [{ translateY }] },
                                { width: '100%', alignItems: 'center' },
                            ]}>
                            <Text className="text-4xl text-white font-bold mb-4">
                                Kiosk Contributors
                            </Text>
                            {credits.map((section, i) => (
                                <View key={i} className="mb-3 items-center">
                                    <Text className="text-xl text-white font-bold mb-2">
                                        {section.heading}
                                    </Text>
                                    {section.items.map((it, k) => (
                                        <Text key={k} className="text-base text-white leading-6">
                                            {it}
                                        </Text>
                                    ))}
                                </View>
                            ))}
                            <Text className="mt-6 italic text-white text-center px-2">
                                This is a non-exhaustive list — many other contributors, interns,
                                and students have helped shape the kiosk over the years. Thank you
                                to everyone who contributed.
                            </Text>
                        </Animated.View>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}
