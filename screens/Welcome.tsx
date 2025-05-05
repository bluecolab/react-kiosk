import React, { useEffect, useState } from 'react';
import InProgress from '@/components/InProgress';
import { View, Text } from 'react-native';

export default function Welcome() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        fetch('https://api.bluecolab.cc/api/influx/sensordata/Ada')
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((jsonData) => {
                console.log('Fetched Sensor Data:', jsonData); // 👈 Console log here
                setData(jsonData);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Fetch error:', err); // 👈 Log fetch errors
                setError(err.message);
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Loading sensor data...</p>;
    if (error) return <p>Error: {error}</p>;

    return (<View>
        <Text style={
            {
                textAlign: 'center'
            }
        }>Welcome to the kiosk!</Text>
        <Text>{JSON.stringify(data)}</Text>
    </View>)
}

