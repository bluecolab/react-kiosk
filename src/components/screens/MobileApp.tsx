// Yes Yes work in progress - V
import React from 'react';
import { View, Image, Text } from 'react-native'; //, Pressable
import { useTranslation } from 'react-i18next';

const qriOS = require('@/assets/images/qr-ios.png');
const qrAndroid = require('@/assets/images/qr-android.png');
const qrWebapp = require('@/assets/images/qr-webapp.png');

export default function MobileApp() {
    const { t } = useTranslation();

    return (
        <View className="flex-1 w-full items-center justify-center">
            <Text className="text-h2 font-bold text-center mb-2 dark:text-white">
                {t('mobileApp.heading')}
            </Text>
            <Text className="text-h3 text-center mb-1 dark:text-white">
                {t('mobileApp.stayUpdated')}
            </Text>
            <Text className="text-body text-center mb-6 dark:text-white">
                {t('mobileApp.download')}
            </Text>

            <View className="flex flex-col md:flex-row items-center justify-center gap-8 w-full max-w-6xl">
                <View className="flex items-center mb-8 md:mb-0">
                    <iframe
                        style={{ width: 300, height: 600, border: 'none' }}
                        src="https://aquawatchmobile.expo.app"
                        title="Mobile App"
                    />
                </View>
                <View className="flex flex-row items-center justify-center gap-8">
                    <View className="items-center">
                        <Text className="text-body text-center mb-2 dark:text-white">iOS</Text>
                        <Image style={{ width: 200, height: 200 }} source={qriOS} />
                    </View>
                    <View className="items-center">
                        <Text className="text-body text-center mb-2 dark:text-white">Android</Text>
                        <Image style={{ width: 200, height: 200 }} source={qrAndroid} />
                    </View>
                    <View className="items-center">
                        <Text className="text-body text-center mb-2 dark:text-white">Web App</Text>
                        <Image style={{ width: 200, height: 200 }} source={qrWebapp} />
                    </View>
                </View>
            </View>
        </View>
    );
}
