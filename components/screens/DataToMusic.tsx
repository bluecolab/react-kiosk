import React from 'react';
// import InProgress from '@/components/InProgress'; // Placeholder import, not used in final code
import { ActivityIndicator, View, Text } from 'react-native';

export default function DataToMusic() {
    const [serverUp, setServerUp] = React.useState<boolean | null>(null); // null = unknown, true = up, false = down

    React.useEffect(() => {
        fetch('http://127.0.0.1:5000/', { method: 'HEAD' }) // Using HEAD to just check if the server is reachable
            .then(response => {
                if (response.ok) {
                    setServerUp(true); // Server is up and reachable
                } else {
                    setServerUp(false); // Server responded but with an error status
                }
            })
            .catch(error => {
                console.error('Error checking server status:', error);
                setServerUp(false); // Network error or server is down
            });
    }, []);

    return (
        <View
            style={{
                width: '100%',
                maxWidth: 1750,
                backgroundColor: '#fff',
                borderRadius: 12,
                padding: 20,
                zIndex: 1,
                alignItems: 'center', // ensures iframe is centered inside
            }}>
            {serverUp === null && <ActivityIndicator size="large" color="#888" />} {/* Loading indicator while checking server status */}
            {serverUp === false && (
                <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 20 }}>
                    Server at http://127.0.0.1:5000/ is down. Please verify 'sonification-flask' is running locally.
                </Text>
            )}
            {serverUp && (
                <Text style={{ color: 'green', fontWeight: 'bold', fontSize: 20 }}>
                    Server is up and running.
                </Text>
            )}
            <iframe
                src="http://127.0.0.1:5000/"
                width="1500"
                height="750"
                style={{
                    border: 'none',
                    borderRadius: 8,
                }}
            />
        </View>
    );
}
