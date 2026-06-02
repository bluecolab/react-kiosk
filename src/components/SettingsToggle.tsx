import React from 'react';
import { Pressable, Text, View, StyleSheet } from 'react-native';
import i18n from '@/hooks/i18n';
import Entypo from "@react-native-vector-icons/entypo";
import { useColorScheme } from 'nativewind';
import Animated, {
    withDelay,
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

/** Vertical distance (px) between each fan level */
const FAN_OFFSET = 70;
/** Horizontal distance (px) between language option pills */
const LANG_OFFSET = 120;

const LANGUAGES = [
    { code: 'en', label: 'English' },
    { code: 'es', label: 'Español' },
    { code: 'sq', label: 'Shqip' },
    { code: 'geo', label: 'ქართული' },
    { code: 'por', label: 'Português' },
];

interface LangOptionProps {
    langOpen: SharedValue<boolean>;
    /** 1-based index used for offset and stagger delay */
    index: number;
    lang: { code: string; label: string };
    isActive: boolean;
    onPress: () => void;
}

function LangOption({ langOpen, index, lang, isActive, onPress }: LangOptionProps) {
    const style = useAnimatedStyle(() => ({
        transform: [
            { translateX: withSpring(langOpen.value ? LANG_OFFSET * index : 0, SPRING_CONFIG) },
            { scale: withDelay(index * 80, withTiming(langOpen.value ? 1 : 0)) },
        ],
    }));

    return (
        <AnimatedPressable
            onPress={onPress}
            style={[style, styles.shadow, styles.langButton, isActive && styles.langButtonActive]}>
            <Text style={[styles.langText, isActive && styles.langTextActive]}>{lang.label}</Text>
        </AnimatedPressable>
    );
}

export default function SettingsToggle() {
    const currentLang = i18n.language || 'en';
    const { colorScheme, setColorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';

    const settingsOpen = useSharedValue(false);
    const langOpen = useSharedValue(false);

    // Level 1 — theme button fans up one step
    const themeStyle = useAnimatedStyle(() => ({
        transform: [
            { translateY: withSpring(settingsOpen.value ? -FAN_OFFSET : 0, SPRING_CONFIG) },
            { scale: withTiming(settingsOpen.value ? 1 : 0) },
        ],
    }));

    // Level 2 — language group (globe + options) fans up two steps
    const langGroupStyle = useAnimatedStyle(() => ({
        transform: [
            { translateY: withSpring(settingsOpen.value ? -FAN_OFFSET * 2 : 0, SPRING_CONFIG) },
            { scale: withTiming(settingsOpen.value ? 1 : 0) },
        ],
    }));

    const handleToggleSettings = () => {
        if (settingsOpen.value) {
            langOpen.value = false;
        }
        settingsOpen.value = !settingsOpen.value;
    };

    const handleToggleTheme = () => {
        const next = isDark ? 'light' : 'dark';
        setColorScheme(next);
        if (typeof window !== 'undefined' && window.localStorage) {
            window.localStorage.setItem('theme', next);
        }
    };

    const handleChangeLanguage = (langCode: string) => {
        i18n.changeLanguage(langCode);
        if (typeof window !== 'undefined' && window.localStorage) {
            window.localStorage.setItem('appLanguage', langCode);
        }
        langOpen.value = false;
    };

    return (
        <View style={styles.container}>
            {/* Level 2: language group — globe button with language options fanning right */}
            <Animated.View style={[langGroupStyle, styles.absoluteBase]}>
                {LANGUAGES.map((lang, idx) => (
                    <LangOption
                        key={lang.code}
                        langOpen={langOpen}
                        index={idx + 1}
                        lang={lang}
                        isActive={currentLang === lang.code}
                        onPress={() => handleChangeLanguage(lang.code)}
                    />
                ))}
                <AnimatedPressable
                    onPress={() => {
                        langOpen.value = !langOpen.value;
                    }}
                    style={[styles.shadow, styles.subButton]}
                    accessibilityLabel="Select language"
                    accessibilityRole="button">
                    <Entypo name="globe" size={24} color="#f8f9ff" />
                </AnimatedPressable>
            </Animated.View>

            {/* Level 1: theme toggle button */}
            <AnimatedPressable
                onPress={handleToggleTheme}
                style={[themeStyle, styles.shadow, styles.subButton, styles.absoluteBase]}
                accessibilityLabel={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                accessibilityRole="button">
                <Text style={styles.subIcon}>{isDark ? '\u2600' : '\u263e'}</Text>
            </AnimatedPressable>

            {/* Main settings gear button */}
            <AnimatedPressable
                onPress={handleToggleSettings}
                style={[styles.shadow, styles.mainButton]}
                accessibilityLabel="Settings"
                accessibilityRole="button">
                <Entypo name="cog" size={27} color="#f8f9ff" />
            </AnimatedPressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 56,
        height: 56,
        overflow: 'visible',
    },
    absoluteBase: {
        position: 'absolute',
        bottom: 0,
        left: 0,
    },
    mainButton: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        zIndex: 10,
        width: 56,
        height: 56,
        borderRadius: 100,
        backgroundColor: 'rgba(119, 205, 226, 0.95)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    subButton: {
        width: 56,
        height: 56,
        borderRadius: 100,
        backgroundColor: 'rgba(119, 205, 226, 0.95)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    subIcon: {
        fontSize: 22,
        color: '#f8f9ff',
    },
    langButton: {
        position: 'absolute',
        left: 0,
        top: 4,
        width: 110,
        height: 48,
        borderRadius: 100,
        backgroundColor: 'rgba(119, 205, 226, 0.9)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    langButtonActive: {
        backgroundColor: '#ffffff',
    },
    langText: {
        fontSize: 15,
        color: '#f8f9ff',
        fontWeight: '600',
    },
    langTextActive: {
        color: '#333333',
    },
    shadow: {
        shadowColor: '#171717',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
});
