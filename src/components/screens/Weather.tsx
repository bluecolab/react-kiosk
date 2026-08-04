import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, Pressable } from 'react-native';

export default function PondWaterData() {
    const { t } = useTranslation();

    const weather_sensors = [
        {
            label: 'Odin',
            URL: 'https://colabprod01.pace.edu/grafana/public-dashboards/139d29dc18204fa28d1b39ef672c45f5',
        },
        {
            label: 'Njord Purple Air',
            URL: 'https://colabtest01.pace.edu/grafana/public-dashboards/74cfc60b7bae4a0793daa7a4d2581401',
        },

        {
            label: 'Skadi Purple Air',
            URL: 'https://colabtest01.pace.edu/grafana/public-dashboards/73ea1839409a47f49b05127b3b5cad2a',
        },
    ];
    const [state, setState] = useState<any>(weather_sensors[0]); // default to Odin sensor

    return (
        <View>
            <View className="flex-row flex-wrap justify-center my-2">
                {weather_sensors.map((item, index) => (
                    <Pressable
                        key={index}
                        className={`px-3 py-2 rounded-md m-1 ${state.label === item.label ? 'bg-blue-400' : 'bg-gray-300 dark:bg-gray-600'}`}
                        onPress={() => setState(item)}>
                        <Text className="text-button font-bold text-black dark:text-white">
                            {t(item.label)}
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
