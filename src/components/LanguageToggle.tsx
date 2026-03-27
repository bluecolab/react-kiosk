import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import i18n from '@/hooks/i18n';
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
    { code: 'en', label: 'EN', flag: '🇺🇸' },
    { code: 'es', label: 'ES', flag: '🇪🇸' },
    { code: 'sq', label: 'SQ', flag: '🇦🇱' },
];

interface FloatingLanguageButtonProps {
    isExpanded: SharedValue<boolean>;
    index: number;
    lang: { code: string; label: string; flag: string };
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
            style={animatedStyles}
            className={`shadow-md w-12 h-12 rounded-full justify-center items-center mb-2 ${
                isActive ? 'bg-white' : 'bg-[#77cde2e6]'
            }`}>
            <Text className="text-lg">{lang.flag}</Text>
            <Animated.Text
                className={`absolute bottom-1 right-1 text-xs font-semibold ${
                    isActive ? 'text-[#333]' : 'text-white'
                }`}>
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
        const moveValue = interpolate(Number(isExpanded.value), [0, 1], [0, 2]);
        const translateValue = withTiming(moveValue);
        const rotateValue = isExpanded.value ? '45deg' : '0deg';

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
                    className="shadow-md z-10 w-14 h-8 rounded-full bg-[#77cde2f0] justify-center items-center"
                    accessibilityLabel={t('language.description')}
                    accessibilityRole="button">
                    <Text className="text-xl">{currentLanguage.flag}</Text>
                    <Animated.Text
                        style={plusIconStyle}
                        className="absolute bottom-1 right-1 text-base font-bold text-white">
                        +
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
