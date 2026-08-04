import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';

export default function PondWaterData() {
    const water_sensors = [
        {
            label: 'Alan',
            URL: 'https://colabprod01.pace.edu/grafana/public-dashboards/841327a5d5fa493b8f14d638ffe2041e',
        },

        {
            label: 'Hudson River Pier 25',
            URL: 'https://colabprod01.pace.edu/grafana/public-dashboards/42fc4d25035b449c81f3d8ecb3f08e83?orgId=1',
        },

        {
            label: 'Piermont Pier',
            URL: 'https://colabprod01.pace.edu/grafana/public-dashboards/61951a2f584f49f690969a23c349f43e?orgId=1&from=now-2d&to=now&refresh=15m',
        },

        {
            label: 'Poughkeepsie',
            URL: 'https://colabprod01.pace.edu/grafana/public-dashboards/fa0d20863be848119bc21d7807f20b56?orgId=1&from=now-2d&to=now&refresh=15m',
        },

        {
            label: 'Albany',
            URL: 'https://colabprod01.pace.edu/grafana/public-dashboards/1ca141bf9a394c86b9103c1812ec9b28?orgId=1&from=now-2d&to=now&refresh=15m',
        },
        {
            label: 'Njord Purple Air',
            URL: 'https://colabtest01.pace.edu/grafana/public-dashboards/74cfc60b7bae4a0793daa7a4d2581401',
        },

        {
            label: 'Skadi Purpleair',
            URL: 'https://colabtest01.pace.edu/grafana/public-dashboards/73ea1839409a47f49b05127b3b5cad2a',
        },
    ];
    const [state, setState] = useState<any>(water_sensors[0]); // default to first sensor

    return (
        <View>
            <View className="flex-row flex-wrap justify-center my-2">
                {water_sensors.map((item, index) => (
                    <Pressable
                        key={index}
                        className={`px-3 py-2 rounded-md m-1 ${state.label === item.label ? 'bg-blue-400' : 'bg-gray-300 dark:bg-gray-600'}`}
                        onPress={() => setState(item)}>
                        <Text className="text-button font-bold text-black dark:text-white">
                            {item.label}
                        </Text>
                    </Pressable>
                ))}
            </View>

            {/* Content container */}
            <View className="bg-white dark:bg-gray-800 rounded-xl flex-row p-4 items-start shadow w-full">
                {typeof state.URL === 'string' ? (
                    <iframe
                        src={state.URL}
                        width="1500"
                        height="800"
                        style={{
                            border: 'none',
                            borderRadius: 8,
                        }}
                    />
                ) : (
                    state.content
                )}
            </View>
        </View>
    );
}
