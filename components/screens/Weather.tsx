import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text } from 'react-native';

export default function PondWaterData() {
    const { t } = useTranslation();

    const weather_sensors = {
        odin: {
            label: 'Odin',
            URL: 'https://colabprod01.pace.edu/grafana/public-dashboards/139d29dc18204fa28d1b39ef672c45f5',
        },
        purple: {
            label: t('weatherWidget.aqi'),
            content: (
                <View
                    style={{
                        width: 1080,
                        height: 700,
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                    }}>
                    <View
                        style={{
                            height: 700,
                        }}>
                        <Text style={{ textAlign: 'center' }}>Softball Field</Text>
                        <iframe
                            style={{
                                border: 'none',
                                borderRadius: 8,
                            }}
                            height="700"
                            src="https://bluecolab.github.io/grafana-dashboard-gallery/purple-air-1"
                        />
                    </View>
                    <View
                        style={{
                            height: 700,
                        }}>
                        <Text style={{ textAlign: 'center' }}>Nature Center</Text>
                        <iframe
                            style={{
                                border: 'none',
                                borderRadius: 8,
                            }}
                            height="700"
                            src="https://bluecolab.github.io/grafana-dashboard-gallery/purple-air-2"
                        />
                    </View>
                </View>
            ),
        },
    };
    const [state, setState] = useState<any>(weather_sensors.odin); // default to Odin sensor

    return (
        <View>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', zIndex: 1 }}>
                {Object.entries(weather_sensors).map(([key, value]) => {
                    const isActive = state.label === value.label;
                    return (
                        <Text
                            key={key}
                            onPress={() => setState(value)}
                            style={{
                                backgroundColor: isActive ? '#fff' : '#3b4a6b',
                                color: isActive ? '#000' : '#fff',
                                fontWeight: isActive ? 'bold' : 'normal',
                                paddingVertical: 10,
                                paddingHorizontal: 20,
                                borderTopLeftRadius: 10,
                                borderTopRightRadius: 10,
                                marginHorizontal: 4,
                                zIndex: isActive ? 3 : 1,
                                boxShadow: isActive ? '0px -2px 4px rgba(0,0,0,0.2)' : undefined,
                                cursor: 'pointer',
                            }}>
                            {value.label}
                        </Text>
                    );
                })}
            </View>

            {/* Content container */}
            <View
                style={{
                    width: '100%',
                    maxWidth: 1200,
                    backgroundColor: '#fff',
                    borderRadius: 12,
                    padding: 20,
                    zIndex: 1,
                    alignItems: 'center',
                }}>
                {typeof state.URL === 'string' ? (
                    <iframe
                        src={state.URL}
                        width="1080"
                        height="700"
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
