import React from 'react';
import { View, Text, Image } from 'react-native'; //, Pressable for future use of Pressable component

export default function WelcomeScreen() {
    let Cronin = require('@/assets/images/crotters/Crotter.png');
    // let gif = require('@/assets/images/general/Scroll.gif'); // Future use for scroll prompt

    return (
        <View>
            <Text
                style={{
                    textAlign: 'center',
                    fontSize: 24,
                    fontWeight: 'bold',
                    marginVertical: 30,
                }}>
                Welcome to Blue CoLab's Kiosk!{' '}
            </Text>

            <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                {/* <Pressable
                    onPress={() => {
                        console.log('Crotter Mode Enabled');
                        localStorage.setItem('crotterMode', 'true'); // Enable Crotter Mode on press
                        window.location.reload(); // Reload to apply changes
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
                            window.location.reload(); // Reload to apply changes
                        }
                    }}>
                    <Image source={Cronin} style={{ height: 450, width: '100%' }} />
                </View>
                {/* </Pressable> */} {/* Left Side with Image */}
            </View>
        </View>
    );
}
