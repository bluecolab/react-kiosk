import React from 'react';
import { Pressable, Text, View, StyleSheet } from 'react-native';
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
            style={[animatedStyles, styles.shadow, styles.button, isActive && styles.buttonActive]}>
            <Text style={styles.flag}>{lang.flag}</Text>
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
        const moveValue = interpolate(Number(isExpanded.value), [0, 1], [0, 2]);
        const translateValue = withTiming(moveValue);
        const rotateValue = isExpanded.value ? '45deg' : '0deg';

        return {
            transform: [{ translateX: translateValue }, { rotate: withTiming(rotateValue) }],
        };
    });

    const currentLanguage = LANGUAGES.find((l) => l.code === currentLang) || LANGUAGES[0];

    return (
        <View style={styles.mainContainer}>
            <View style={styles.buttonContainer}>
                <AnimatedPressable
                    onPress={handlePress}
                    style={[styles.shadow, mainButtonStyles.button]}
                    accessibilityLabel={t('language.description')}
                    accessibilityRole="button">
                    <Text style={mainButtonStyles.flag}>{currentLanguage.flag}</Text>
                    <Animated.Text style={[plusIconStyle, mainButtonStyles.content]}>
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

/*
export const MainButton = ({ flag, label, onPress }: MainButtonProps) => {
  return (
    <Pressable
      onPress={onPress}
      className="
        relative
        w-14 h-[30px] 
        rounded-full 
        bg-[#77cde2]/95 
        justify-center items-center 
        z-[1]
      "
    >
      {/*Flag*//*}
      <Text className="text-[20px]">{flag}</Text>
      {label && (
        <Text className="absolute bottom-1 right-1 text-[16px] font-bold text-[#f8f9ff]">
          {label}
        </Text>
      )}
    </Pressable>
  );
};*/
const mainButtonStyles = StyleSheet.create({
    button: {
        zIndex: 1,
        height: 30,
        width: 56,
        borderRadius: 100,
        backgroundColor: 'rgba(119, 205, 226, 0.95)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    flag: {
        fontSize: 20,
    },
    content: {
        fontSize: 16,
        color: '#f8f9ff',
        position: 'absolute',
        bottom: 4,
        right: 4,
        fontWeight: 'bold',
    },
});

/*
export default function LanguageButton({ active }) {
  return (
    <View className="relative h-14 w-14 flex justify-end items-center">
      
      <View
        style={{
          shadowColor: "#171717",
          shadowOffset: { width: -0.5, height: 3.5 },
          shadowOpacity: 0.2,
          shadowRadius: 3,
        }}
        className={`absolute -z-10 h-12 w-12 rounded-full flex justify-center items-center flex-col
        ${active ? "bg-white/95" : "bg-[#77CDE2E6]"}`}
      >
        <Text className="text-base">EN</Text>

        <Text
          className={`font-medium text-[10px] ${
            active ? "text-[#333]" : "text-[#f8f9ff]"
          }`}
        >
          EN
        </Text>
      </View>

    </View>
  );
}
  */
const styles = StyleSheet.create({
    mainContainer: {
        position: 'relative',
        height: 56,
        width: 56,
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    button: {
        width: 48,
        height: 48,
        backgroundColor: 'rgba(119, 205, 226, 0.9)',
        position: 'absolute',
        borderRadius: 100,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: -2,
        flexDirection: 'column',
    },
    buttonActive: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
    },
    buttonContainer: {
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    shadow: {
        shadowColor: '#171717',
        shadowOffset: { width: -0.5, height: 3.5 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    flag: {
        fontSize: 16,
    },
    content: {
        color: '#f8f9ff',
        fontWeight: '500',
        fontSize: 10,
    },
    contentActive: {
        color: '#333',
    },
});
