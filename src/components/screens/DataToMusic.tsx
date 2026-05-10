import React from 'react';
import { View } from 'react-native';

export default function DataToMusic() {
    return (
        <View className="flex flex-col items-center w-full">
            <iframe
                src="https://bluecolab.github.io/sonification-frontend/"
                width="1500"
                height="800"
                style={{ border: 'none', borderRadius: 8, marginTop: 20 }}
                title="Sonification Interface"
            />
        </View>
    );
}
