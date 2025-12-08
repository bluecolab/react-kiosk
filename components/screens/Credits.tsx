import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
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

        // Start below the bottom (containerHeight) and end above the top (-contentHeight)
        const distance = containerHeight + contentHeight;
        translateY.setValue(containerHeight);

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
        // restart when sizes available
        if (containerHeight && contentHeight) {
            stopAnimation();
            startAnimation();
        }
        return () => stopAnimation();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [containerHeight, contentHeight, durationSeconds]);

    // Ensure content starts fully off-screen as soon as we know the container height.
    // This avoids a brief flash where content is visible before the animation starts.
    useEffect(() => {
        if (containerHeight && !animationRef.current) {
            // position the roll below the visible area
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
        // fallback for web: dispatch the same custom event used elsewhere
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
            <View style={styles.container} onLayout={onContainerLayout}>
                {/* translucent overlay */}
                <View style={styles.overlay} pointerEvents="none" />

                <View style={styles.center} pointerEvents="box-none">
                    <View style={styles.contentWrapper}>
                        <Animated.View
                            onLayout={onContentLayout}
                            style={[styles.animatedContainer, { transform: [{ translateY }] }]}>
                            <Text style={styles.title}>Kiosk Contributors</Text>

                            {credits.map((section, i) => (
                                <View key={i} style={styles.section}>
                                    <Text style={styles.heading}>{section.heading}</Text>
                                    {section.items.map((it, k) => (
                                        <Text key={k} style={styles.item}>
                                            {it}
                                        </Text>
                                    ))}
                                </View>
                            ))}

                            <Text style={styles.footer}>
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

const styles = StyleSheet.create({
    container: {
        ...Platform.select({ web: { position: 'fixed' as const }, default: {} }),
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        flex: 1,
        backgroundColor: 'transparent',
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.45)',
    },
    center: {
        zIndex: 2,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 24,
    },
    contentWrapper: {
        width: '80%',
        maxWidth: 900,
        minWidth: 320,
        alignItems: 'center',
        overflow: 'hidden',
        height: '60%',
    },
    animatedContainer: {
        width: '100%',
        alignItems: 'center',
    },
    title: {
        fontSize: 36,
        color: '#fff',
        marginBottom: 16,
        fontWeight: '700',
    },
    section: {
        marginBottom: 12,
        alignItems: 'center',
    },
    heading: {
        fontSize: 22,
        color: '#fff',
        fontWeight: '700',
        marginBottom: 8,
    },
    item: {
        color: '#fff',
        fontSize: 16,
        lineHeight: 22,
    },
    footer: {
        marginTop: 24,
        fontStyle: 'italic',
        color: '#fff',
        textAlign: 'center',
        paddingHorizontal: 8,
    },
});
