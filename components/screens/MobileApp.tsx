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
        <View
            style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative', // Added for absolute positioning context
            }}>
            <View style={{ flex: 1, alignItems: 'center' }}>
                <iframe
                    style={{ width: 300, height: 600, border: 'none' }}
                    src="https://aquawatchmobile.expo.app"
                    title="Mobile App"
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
                <Text style={{ fontSize: 40 }}>{t('mobileApp.heading')}</Text>
                <Text style={{ fontSize: 22 }}>{t('mobileApp.stayUpdated')}</Text>
                <Text style={{ fontSize: 22 }}>{t('mobileApp.download')}</Text>
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                    }}>
                    <View style={{ margin: 20 }}>
                        <Text style={{ fontSize: 22, textAlign: 'center' }}>iOS</Text>
                        <Image style={{ width: 200, height: 200 }} source={qriOS} />
                    </View>
                    <View style={{ margin: 20 }}>
                        <Text style={{ fontSize: 22, textAlign: 'center' }}>Android</Text>
                        <Image style={{ width: 200, height: 200 }} source={qrAndroid} />
                    </View>
                    <View style={{ margin: 20 }}>
                        <Text style={{ fontSize: 22, textAlign: 'center' }}>Web App</Text>
                        <Image style={{ width: 200, height: 200 }} source={qrWebapp} />
                    </View>
                </View>
            </View>
        </View>
    );
}
