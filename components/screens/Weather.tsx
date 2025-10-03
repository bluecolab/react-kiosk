// Please do check the dimensions on the Kiosk - V
import React from 'react';
import { View } from 'react-native';

export default function PondWaterData() {
    const water_sensors = {
        odin: {
            label: 'Odin',
            URL: 'https://colabprod01.pace.edu/grafana/public-dashboards/139d29dc18204fa28d1b39ef672c45f5',
        },
    };
    const state = water_sensors.odin;

    return (
        <View>
            {/* Content container */}
            <View
                style={{
                    width: '100%',
                    maxWidth: 2050, // Max width for larger screens - V
                    backgroundColor: '#100ddb81', // Dark blue background with transparency #100ddb81
                    marginTop: 20,
                    borderRadius: 12, // Rounded corners for the container box - V
                    overflow: 'hidden', // Ensures content respects border radius
                    padding: 20,
                    zIndex: 1,
                    alignItems: 'center', // ensures iframe is centered inside the container
                }}>
                <iframe
                    src={state.URL}
                    width="1000"
                    height="750"
                    style={{
                        border: 'none',
                        borderRadius: 8,
                    }}
                />
            </View>
        </View>
    );
}
