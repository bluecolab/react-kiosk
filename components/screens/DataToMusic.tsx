import React from 'react';
// import InProgress from '@/components/InProgress'; // Placeholder import, not used in final code
import { ActivityIndicator, View, Text } from 'react-native';

export default function DataToMusic() {
    const [serverUp, setServerUp] = React.useState<boolean | null>(null); // null = unknown, true = up, false = down

    React.useEffect(() => {
        fetch('http://127.0.0.1:5000/', { method: 'HEAD' }) // Using HEAD to just check if the server is reachable
            .then((response) => {
                if (response.ok) {
                    setServerUp(true); // Server is up and reachable
                } else {
                    setServerUp(false); // Server responded but with an error status
                }
            })
            .catch((error) => {
                console.error('Error checking server status:', error);
                setServerUp(false); // Network error or server is down
            });
    }, []);

    return (
        <View
            style={{
                width: '100%',
                maxWidth: 1750, // Adjusted maxWidth to better fit the iframe
                height: '100%', // Full height to accommodate iframe
                justifyContent: 'center', // Center content vertically and horizontally
                backgroundColor: '#fff', // White background for better visibility of iframe content
                borderRadius: 12, // Rounded corners for the container to match iframe
                shadowColor: '#000', // Shadow for better visual separation
                shadowOffset: { width: 0, height: 2 }, // Shadow offset
                shadowOpacity: 0.3, // Shadow opacity
                shadowRadius: 4, // Shadow radius
                elevation: 5, // Elevation for Android shadow effect
                margin: 1, // Margin around the container
                padding: 1, // Padding inside the container
                overflow: 'hidden', // Ensures rounded corners are applied to iframe content as well (on iOS)
                zIndex: 1, // Ensures the container is above other elements
                display: 'flex', // Ensures flexbox layout is applied
                flexDirection: 'column', // Stack children vertically
                alignItems: 'center', // ensures iframe is centered inside the container horizontally
            }}>
            {serverUp === null && <ActivityIndicator size="large" color="#888" />}{' '}
            {/* Loading indicator while checking server status */}
            {serverUp === false && (
                <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 20 }}>
                    Server at http://127.0.0.1:5000/ is down. Please verify 'sonification-flask' is
                    running locally.
                </Text>
            )}
            {serverUp && (
                <iframe
                    src="http://127.0.0.1:5000/" // Ensure this matches your Flask server address
                    width="1500" // Adjust width as needed
                    height="750" // Adjust height as needed
                    style={{
                        border: 'none', // No border for the iframe
                        borderRadius: 8, // Rounded corners for the iframe to match the container
                        marginTop: 20, // Space between the status message and the iframe
                    }}
                />
            )}
        </View>
    );
}
