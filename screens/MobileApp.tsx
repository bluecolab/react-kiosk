// Yes Yes work in progress - V
import React from 'react';
import InProgress from '@/components/InProgress';
import { View, Image, Text} from 'react-native';

export default function MobileApp() {
    return (<View>
        <div style={{ display: 'flex' }}>        
            <Image source={require("../assets/images/icons/MobileNewUI.png")} alt="Mobile App"/>
        </div>
        <div>
            <Text style={{fontSize: 20, fontWeight:'bold'}}>Mobile App</Text>
            <Text>Access our research data and information on the go.</Text>
            <Text>Stay updated with real-time notifications.</Text>
            <Text>Download our mobile app for better access.</Text>
        <InProgress />

        </div>
    </View>)
}   