import React from 'react';
import { Pressable, Text, View, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import i18n from '@/hooks/i18n';
import Entypo from '@react-native-vector-icons/entypo';
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
    dampingRatio: 0.8,
};

const OFFSET = 60;

const LANGUAGES = [
    { code: 'en', label: 'English' },
    { code: 'es', label: 'Español' },
    { code: 'sq', label: 'Shqip' },
    { code: 'geo', label: 'ქართული' },
    { code: 'por', label: 'Português' },
];

interface FloatingLanguageButtonProps {
    isExpanded: SharedValue<boolean>;
    index: number;
    lang: { code: string; label: string };
    isActive: boolean;
    onPress: () => void;
}

const FloatingLanguageButton = ({
    isExpanded,
    index,
    lang,
    isActive,
    onPress,
}: FloatingLanguageButtonProps) => {
    const animatedStyles = useAnimatedStyle(() => {
        const moveValue = isExpanded.value ? OFFSET * index : 0;
        const translateValue = withSpring(-moveValue, SPRING_CONFIG);
        const delay = index * 100;
        const scaleValue = isExpanded.value ? 1 : 0;

        return {
            transform: [
                { translateY: translateValue },
                { scale: withDelay(delay, withTiming(scaleValue)) },
            ],
        };
    });

    return (
        <AnimatedPressable
            onPress={onPress}
            style={[animatedStyles, styles.shadow, styles.button, isActive && styles.buttonActive]}>
            <Animated.Text style={[styles.content, isActive && styles.contentActive]}>
                {lang.label}
            </Animated.Text>
        </AnimatedPressable>
    );
};

export default function LanguageToggle() {
    const { t } = useTranslation();
    const currentLang = i18n.language || 'en';
    const isExpanded = useSharedValue(false);

    const handlePress = () => {
        isExpanded.value = !isExpanded.value;
    };

    const handleChangeLanguage = (langCode: string) => {
        i18n.changeLanguage(langCode);
        if (typeof window !== 'undefined' && window.localStorage) {
            window.localStorage.setItem('appLanguage', langCode);
        }
        isExpanded.value = false;
    };

    const plusIconStyle = useAnimatedStyle(() => {
        const moveValue = interpolate(Number(isExpanded.value), [0, 0], [0, 0]);
        const translateValue = withTiming(moveValue);
        const rotateValue = isExpanded.value ? '0deg' : '0deg';

        return {
            transform: [{ translateX: translateValue }, { rotate: withTiming(rotateValue) }],
        };
    });

    const currentLanguage = LANGUAGES.find((l) => l.code === currentLang) || LANGUAGES[0];

    return (
        <View className="relative h-14 w-14 justify-end items-center">
            <View className="absolute flex flex-col items-center">
                <AnimatedPressable
                    onPress={handlePress}
                    style={[styles.shadow, mainButtonStyles.button]}
                    accessibilityLabel={t('language.description')}
                    accessibilityRole="button">
                    <Animated.Text style={[plusIconStyle, mainButtonStyles.content]}>
                        <Entypo name="globe" size={27} color="#f8f9ff" />
                    </Animated.Text>
                </AnimatedPressable>

                {LANGUAGES.map((lang, idx) => (
                    <FloatingLanguageButton
                        key={lang.code}
                        isExpanded={isExpanded}
                        index={idx + 1}
                        lang={lang}
                        isActive={currentLang === lang.code}
                        onPress={() => handleChangeLanguage(lang.code)}
                    />
                ))}
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
        backgroundColor: 'rgba(119, 205, 226, 0.95)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        fontSize: 16,
        color: '#f8f9ff',
        fontWeight: 'bold',
    },
});

const styles = StyleSheet.create({
    shadow: {
        shadowColor: '#171717',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    button: {
        marginLeft: 40,
        width: 100,
        height: 48,
        backgroundColor: 'rgba(119, 205, 226, 0.9)',
        position: 'absolute',
        borderRadius: 100,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonActive: {
        backgroundColor: '#ffffff',
    },
    content: {
        fontSize: 16,
        color: '#f8f9ff',
        position: 'absolute',
        fontWeight: '600',
    },
    contentActive: {
        color: '#333333',
    },
});
