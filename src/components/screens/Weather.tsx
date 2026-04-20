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
            label: 'weatherWidget.aqi',
            content: (
                <View className="w-[1500px] h-[800px] flex-row justify-around">
                    <View className="h-[700px]">
                        <Text className="text-center text-body dark:text-white">
                            Softball Field
                        </Text>
                        <iframe
                            className="border-0 rounded-lg"
                            height="700"
                            src="https://bluecolab.github.io/grafana-dashboard-gallery/purple-air-1"
                        />
                    </View>
                    <View className="h-[700px]">
                        <Text className="text-center text-body dark:text-white">Nature Center</Text>
                        <iframe
                            className="border-0 rounded-lg"
                            height="700"
                            src="https://bluecolab.github.io/grafana-dashboard-gallery/purple-air-2"
                        />
                    </View>
                </View>
            ),
        },
    ];
    const [state, setState] = useState<any>(weather_sensors[0]); // default to Odin sensor

    return (
        <View>
            <View className="flex-row flex-wrap justify-center my-2">
                {weather_sensors.map((item, index) => (
                    <Pressable
                        key={index}
                        className={`px-3 py-2 rounded-md m-1 ${state.label === item.label ? 'bg-blue-400' : 'bg-gray-300'}`}
                        onPress={() => setState(item)}>
                        <Text className="text-button font-bold text-black dark:text-white">
                            {t(item.label)}
                        </Text>
                    </Pressable>
                ))}
            </View>

            {/* Content container */}
            <View className="bg-white rounded-xl flex-row p-4 items-start shadow w-full">
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
