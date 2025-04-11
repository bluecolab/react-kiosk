import React from 'react';
import InProgress from '@/components/InProgress';
import { View, Text } from 'react-native';

export default function RightToKnow() {
    return (<View >
          <Text style={
                    {
                        textAlign: 'center'
                    }
                }>Understand your right to know about water quality.</Text>
        <InProgress />
    </View>)
}   