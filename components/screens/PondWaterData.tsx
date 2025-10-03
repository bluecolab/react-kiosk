// Please do check the dimensions on the Kiosk - V
import React from 'react';
import { View, Text } from 'react-native';

export default function PondWaterData() {
    const water_sensors = {
        alan: {
            label: 'Alan',
            URL: 'https://colabprod01.pace.edu/grafana/public-dashboards/841327a5d5fa493b8f14d638ffe2041e',
        },

        pier25: {
            label: 'Hudson River Pier 25',
            URL: 'https://colabprod01.pace.edu/grafana/public-dashboards/42fc4d25035b449c81f3d8ecb3f08e83?orgId=1',
        },

        piermont: {
            label: 'Piermont Pier',
            URL: 'https://colabprod01.pace.edu/grafana/public-dashboards/61951a2f584f49f690969a23c349f43e?orgId=1&from=now-2d&to=now&refresh=15m',
        },

        poughkeepsie: {
            label: 'Poughkeepsie',
            URL: 'https://colabprod01.pace.edu/grafana/public-dashboards/fa0d20863be848119bc21d7807f20b56?orgId=1&from=now-2d&to=now&refresh=15m',
        },

        albany: {
            label: 'Albany',
            URL: 'https://colabprod01.pace.edu/grafana/public-dashboards/1ca141bf9a394c86b9103c1812ec9b28?orgId=1&from=now-2d&to=now&refresh=15m',
        },
    };
    const [state, setState] = React.useState(water_sensors.alan); // default to Alan

    return (
        <View>
            {/* Tabs container */}
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', zIndex: 1 }}>
                {Object.entries(water_sensors).map(([key, value]) => {
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
                    maxWidth: 1100,
                    backgroundColor: '#fff',
                    borderRadius: 12,
                    padding: 20,
                    zIndex: 1,
                    alignItems: 'center', // ensures iframe is centered inside
                }}>
                <iframe
                    src={state.URL}
                    width="1080"
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
