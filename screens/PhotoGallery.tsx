import React from 'react';
import InProgress from '@/components/InProgress';
import { View, Text } from 'react-native';

export default function PhotoGallery() {
    return (<View>
          <Text style={
                    {
                        textAlign: 'center'
                    }
                }>Explore our photo gallery of research and events.</Text>
        <InProgress />
    </View>)
}   