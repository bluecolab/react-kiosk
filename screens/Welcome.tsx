import React from 'react';
import { View, Text, Image } from 'react-native';

export default function Welcome() {
    let Cronin = require('../assets/images/crotters/Crotter.png');
    let gif = require('../assets/images/general/Scroll.gif');

    return (
        <View>
            <Text style={{ textAlign: 'center', fontSize: 20, marginBottom: 20 }}>
                Welcome to Blue CoLab's Kiosk!
            </Text>

            <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                <Image
                    source={Cronin}
                    style={{ height: 600, flex: 1 }}
                    resizeMode="contain"
                />

                <View style={{ flex: 1 }}>
                <Text style={{ marginTop: 0, fontSize: 16, color: '#333', textAlign: 'center' }}>
                        Scroll the bottom icons to learn more!
                    </Text>
                    <Image
                        source={gif}
                        style={{ height: 600, width: '100%' }}
                        resizeMode="contain"
                    />
                    
                </View>
            </View>
        </View>
    );
}
