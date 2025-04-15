// Please do check the dimentionns on the Kiosk - V
import React from 'react';
import InProgress from '@/components/InProgress';
import { View, Text } from 'react-native';


export default function PondWaterData() {
    const water_sensors = {
        alan:{label: "Alan", URL:"https://colabprod01.pace.edu/grafana/public-dashboards/841327a5d5fa493b8f14d638ffe2041e"},
        ada:{label: "Ada", URL:"https://colabprod01.pace.edu/grafana/public-dashboards/28b52eaadf8041d490b3bca36f16101c"}
    }
    const [state, setState] = React.useState(water_sensors.alan) // default to Alan 
    
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
          }}
        >
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
    }}
  >
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
