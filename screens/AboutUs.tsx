import React from 'react';
import InProgress from '@/components/InProgress';
import { View, Text } from 'react-native';

export default function AboutUs() {
    return (<View>
        <Text style={
            {
                textAlign: 'center'
            }
        }>Learn more about Blue CoLab.</Text>
        <InProgress />
    </View>)
}
