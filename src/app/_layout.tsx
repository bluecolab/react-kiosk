import { Stack } from 'expo-router';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/hooks/i18n';
import { useColorScheme } from 'nativewind';
import { useEffect } from 'react';
import '../../global.css';

export default function RootLayout() {
    const { setColorScheme } = useColorScheme();

    useEffect(() => {
        if (typeof window !== 'undefined' && window.localStorage) {
            const saved = window.localStorage.getItem('theme');
            if (saved === 'dark' || saved === 'light') {
                setColorScheme(saved);
            }
        }
    }, [setColorScheme]);

    return (
        <I18nextProvider i18n={i18n}>
            <Stack
                screenOptions={{
                    headerShown: false,
                }}
            />
        </I18nextProvider>
    );
}
