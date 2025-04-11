import React from 'react';
import { View, Image } from 'react-native';

let NoneYet = require('../assets/images/crotters/Crotter_Construction.png');

export default function InProgress() {
    return (
        <View>
            <Image
                source={NoneYet}
                style={{ height: 600}}
                resizeMode="contain"
            />

        </View>
    );
}
