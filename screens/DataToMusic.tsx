import React from 'react';
import InProgress from '@/components/InProgress';
import { View, Text } from 'react-native';

export default function DataToMusic() {
    return (<View>
        <Text style={
            {
                textAlign: 'center'
            }
        }>Convert water data to music.</Text>
        <InProgress />
    </View>)
}