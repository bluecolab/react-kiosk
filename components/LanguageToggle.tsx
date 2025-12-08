import React from 'react';
import { Pressable, Text, View, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import i18n from '@/hooks/i18n';
import { constants } from '@/hooks/constants/constants';

export default function LanguageToggle() {
    const { t } = useTranslation();
    const { standardTextSizes } = constants;
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
        <View style={styles.container}>
            <Pressable
                onPress={handleChangeLanguage}
                style={styles.button}
                accessibilityLabel={t('language.description')}
                accessibilityRole="button">
                <Text
                    style={{
                        color: '#fff',
                        fontWeight: 'bold',
                        fontSize: standardTextSizes.widgetLabel,
                    }}>
                    {currentLang.toUpperCase()}
                </Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        zIndex: 1200,
    },
    button: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
        minWidth: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
