import React from 'react';
import { View, Text, Image } from 'react-native';

export default function Welcome() {
    let Cronin = require('@/assets/images/crotters/Crotter.png');
    // let gif = require('@/assets/images/general/Scroll.gif');

    return (
        <View>
            <Text style={{ textAlign: 'center', fontSize: 20, marginBottom: 20 }}>
                Welcome to Blue CoLab's Kiosk!
            </Text>

            <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                {/* <Pressable
                    onPress={() => {
                        console.log('Crotter Mode Enabled');
                        localStorage.setItem('crotterMode', 'true');
                    }}> */}
                <View
                    style={{ height: 500, flex: 1 }}
                    onStartShouldSetResponder={() => true}
                    onResponderRelease={() => {
                        if (localStorage.getItem('crotterMode') === 'true') {
                            console.log('Crotter Mode Disabled :(');
                            localStorage.setItem('crotterMode', 'false');
                            window.location.reload();
                        } else {
                            console.log('Crotter Mode Enabled');
                            localStorage.setItem('crotterMode', 'true');
                            window.location.reload();
                        }
                    }}>
                    <Image source={Cronin} style={{ height: 500, width: '100%' }} />
                </View>
                {/* </Pressable> */}
            </View>
        </View>
    );
}
