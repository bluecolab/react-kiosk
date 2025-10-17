import React from 'react';
import { View, Text, Image } from 'react-native'; //, Pressable for future use of Pressable component

export default function WelcomeScreen() {
    let Cronin = require('@/assets/images/general/fall2025team.jpg'); 
  
 return ( 
     <View> 
         <Text 
             style={{
                 textAlign: 'center', 
                 fontSize: 24, 
                 fontWeight: 'bold', 
                 marginVertical: 30, 
             }}> 
             Welcome to Blue CoLab's Kiosk!{' '} 
         </Text> 
  
         <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}> 
            <View style={{ height: 500, flex: 1 }}> 
                <Image source={Cronin} style={{ height: 500, width: '100%'}} /> 
            </View> 
            {/* </Pressable> */} {/* Left Side with Image */} 
         </View> 
     </View>
    );
}
