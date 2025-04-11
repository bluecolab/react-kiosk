// Yes Yes work in progress - V
import React from 'react';
import { View, Image, Text } from 'react-native';
import QRPlaceholder from '@/assets/images/QR Placeholder.png'

export default function MobileApp() {
    return (
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ flex: 1, alignItems: 'center' }}>
                <Image 
                    style={{ width: 300, height: 600 }} 
                    source={require("../assets/images/icons/MobileNewUI.png")} 
                    alt="Mobile App" 
                />
            </View>
            <View style={{ flex: 1, flexDirection: 'column', alignItems: 'flex-start', paddingLeft: 20 }}>
                <Text style = {{}}>Access our research data and information on the go.</Text>
                <Text>Stay updated with real-time notifications.</Text>
                <Text>Download our mobile app for better access.</Text>
            </View>
            {/* Gotta add the QR Place holder here somewhere for Apple and Android -V*/}
        </View>
    );
}
