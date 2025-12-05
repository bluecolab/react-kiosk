// Yes Yes work in progress - V
import React from 'react';
import { View, Image, Text } from 'react-native'; //, Pressable
import { useTranslation } from 'react-i18next';

const QRPlaceholder = require('@/assets/images/QR Placeholder.png'); // Placeholder image for QR code

export default function MobileApp() {
    const { t } = useTranslation();

    return (
        <View
            style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative', // Added for absolute positioning context
            }}>
            <View style={{ flex: 1, alignItems: 'center' }}>
                <Image
                    style={{ width: 300, height: 600 }}
                    source={require('@/assets/images/icons/MobileNewUI.png')}
                    alt="Mobile App"
                />
            </View>
            <View
                style={{
                    flex: 1,
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    paddingLeft: 20,
                    marginRight: 220, // Added to prevent text overlap with QR code
                }}>
                <Text style={{ fontSize: 40 }}>
                    {t('mobileApp.heading')}
                </Text>
                <Text style={{ fontSize: 22 }}>{t('mobileApp.stayUpdated')}</Text>
                <Text style={{ fontSize: 22 }}>{t('mobileApp.download')}</Text>
            </View>
            <View style={{ position: 'absolute', bottom: 20, right: 20 }}>
                <Image style={{ width: 200, height: 200 }} source={QRPlaceholder} />
            </View>
        </View>
    );
}
