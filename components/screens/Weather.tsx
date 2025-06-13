// Please do check the dimentionns on the Kiosk - V
import React from 'react';
import { View } from 'react-native';


export default function PondWaterData() {
  const water_sensors = {
    odin: { label: "Odin", URL: "https://colabprod01.pace.edu/grafana/public-dashboards/139d29dc18204fa28d1b39ef672c45f5" },
  }
  const state = water_sensors.odin;

  return (

    <View>
      {/* Content container */}
      <View
        style={{
          width: '100%',
          maxWidth: 2050,
          backgroundColor: '#fff',
          borderRadius: 12,
          padding: 20,
          zIndex: 1,
          alignItems: 'center', // ensures iframe is centered inside
        }}
      >
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
