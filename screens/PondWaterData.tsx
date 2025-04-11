import React from 'react';
import InProgress from '@/components/InProgress';
import { View, Text } from 'react-native';


export default function PondWaterData() {
    return (<View>
          <Text style={
                    {
                        textAlign: 'center'
                    }
                }>Monitor pond water quality with real-time data.</Text>
        <InProgress />
    </View>
    )
}

