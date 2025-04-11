import React from 'react';
import InProgress from '@/components/InProgress';
import { View, Text } from 'react-native';
import { useWaterReports } from '@/hooks/useWaterReports';

export default function WaterReport() {
  useWaterReports();

  return (
    <View>
        <Text style={
                  {
                      textAlign: 'center'
                  }
              }>WATER REPORTR!!!!!</Text>
              <InProgress/>

    </View>
  );
}


/* 
Packages Used that may or may not be removed 
        "pdfjs-dist": "^5.1.91",
        "react-native-pdf": "^6.7.7",
        "react-pdf": "^9.2.1",
        "react-pdf-viewer": "^0.1.0",
*/
