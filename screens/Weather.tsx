import React from 'react';
import InProgress from '@/components/InProgress';
import { View, Text } from 'react-native';

export default function Weather() {
    return (<View>
          <Text style={
                    {
                        textAlign: 'center'
                    }
                }>Check live weather conditions at our research sites.</Text>
        <InProgress />
    </View>)
}