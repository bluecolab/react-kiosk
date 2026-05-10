import { Stack, useGlobalSearchParams } from 'expo-router';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/hooks/i18n';
import { useColorScheme } from 'nativewind';
import { useEffect } from 'react';
import '../../global.css';

export const featureFlags = {
    newsFeed: false,
};

export default function RootLayout() {
    const { setColorScheme } = useColorScheme();

    const newsFeed = useGlobalSearchParams();
    featureFlags.newsFeed = newsFeed.newsFeed === 'true';

    useEffect(() => {
        if (typeof window !== 'undefined' && window.localStorage) {
            const saved = window.localStorage.getItem('theme');
            if (saved === 'light' || saved === 'dark') {
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
