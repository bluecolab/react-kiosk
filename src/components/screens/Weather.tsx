import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, Pressable } from 'react-native';

export default function PondWaterData() {
    const { t } = useTranslation();

    const weather_sensors = [
        {
            label: 'Odin',
            URL: 'https://colabprod01.pace.edu/grafana/public-dashboards/a7650075b40145ff95085bf75bc4d0b5',
        },
        {
            label: 'Njord Purple Air',
            URL: 'https://colabprod01.pace.edu/grafana/public-dashboards/274f6fb0903b46cea4f9ed57163d5d24',
        },

        {
            label: 'Skadi Purple Air',
            URL: 'https://colabprod01.pace.edu/grafana/public-dashboards/61fbf92eb544422880ac1c493c9737f7',
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
