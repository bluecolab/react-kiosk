import React from 'react';
// import InProgress from '@/components/InProgress';
import { View } from 'react-native';

export default function DataToMusic() {
    return (    <View
          style={{
            width: '100%',
            maxWidth: 1750,
            backgroundColor: '#fff',
            borderRadius: 12,
            padding: 20,
            zIndex: 1,
            alignItems: 'center', // ensures iframe is centered inside
          }}
        >
          <iframe
            src="http://127.0.0.1:5000/"
            width="1500"
            height="750"
            style={{
              border: 'none',
              borderRadius: 8,
            }}
          />
        </View>)
}
