import React from 'react';
import { Pressable, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import i18n from '@/hooks/i18n';

export default function LanguageToggle() {
    const { t } = useTranslation();
    const currentLang = i18n.language || 'en';

    const handleChangeLanguage = () => {
        const nextLang = currentLang === 'en' ? 'es' : 'en';
        i18n.changeLanguage(nextLang);
        // Persist to localStorage
        if (typeof window !== 'undefined' && window.localStorage) {
            window.localStorage.setItem('appLanguage', nextLang);
        }
    };

    return (
        <Pressable
            onPress={handleChangeLanguage}
            className="px-3 py-2 rounded-lg min-w-[50px] items-center justify-center"
            accessibilityLabel={t('language.description')}
            accessibilityRole="button">
            <Text className="text-white font-bold text-widgetLabel">
                {currentLang.toUpperCase()}
            </Text>
        </Pressable>
    );
}
