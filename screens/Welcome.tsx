import React from 'react';
import InProgress from '@/components/InProgress';
import { View, Text } from 'react-native';

export default function Welcome() {
    return (<View>
        <Text style={
            {
                textAlign: 'center'
            }
        }>Welcome to the kiosk!</Text>
        <InProgress />
    </View>)
}
