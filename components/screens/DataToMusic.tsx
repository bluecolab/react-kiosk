import React, { useCallback, useEffect, useState } from 'react';
// import InProgress from '@/components/InProgress'; // Placeholder import, not used in final code
import { ActivityIndicator, View, Text } from 'react-native';

export default function DataToMusic() {
    const [serverUp, setServerUp] = useState<boolean | null>(null); // null = unknown, true = up, false = down
    const [retryCount, setRetryCount] = useState(0);
    const MAX_RETRIES = 3;
    const RETRY_DELAY = 2000; // 2 seconds between retries
    const HEALTH_CHECK_INTERVAL = 30000; // Check every 30 seconds

    const checkServerStatus = useCallback(async () => {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

            const response = await fetch('http://127.0.0.1:5000', {
                method: 'GET',
                signal: controller.signal,
                headers: {
                    Accept: 'application/json',
                },
            });

            clearTimeout(timeoutId);

            if (response.ok) {
                setServerUp(true);
                setRetryCount(0);
                console.log('Sonification server is reachable');
            } else {
                // Try fallback to root endpoint
                const fallbackResponse = await fetch('http://127.0.0.1:5000/', {
                    method: 'HEAD',
                    signal: controller.signal,
                });
                if (fallbackResponse.ok || fallbackResponse.status < 500) {
                    setServerUp(true);
                    setRetryCount(0);
                    console.log('Sonification server is reachable (via fallback)');
                } else {
                    throw new Error(`Server returned status: ${fallbackResponse.status}`);
                }
            }
        } catch (error) {
            console.error('Error checking sonification server status:', error);
            if (retryCount < MAX_RETRIES) {
                console.log(`Retrying server check (${retryCount + 1}/${MAX_RETRIES})...`);
                setRetryCount((prev) => prev + 1);
                setTimeout(checkServerStatus, RETRY_DELAY);
            } else {
                setServerUp(false);
                console.error('Sonification server is not reachable after retries');
            }
        }
    }, [retryCount]);

    useEffect(() => {
        checkServerStatus();

        // Set up periodic health checks
        const intervalId = setInterval(checkServerStatus, HEALTH_CHECK_INTERVAL);

        return () => clearInterval(intervalId);
    }, [retryCount, checkServerStatus]);

    // Retry button handler
    const handleRetry = () => {
        setServerUp(null);
        setRetryCount(0);
        checkServerStatus();
    };

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
            {serverUp === null && (
                <View style={{ alignItems: 'center', padding: 20 }}>
                    <ActivityIndicator size="large" color="#0077cc" />
                    <Text style={{ marginTop: 10, fontSize: 16, color: '#666' }}>
                        Checking sonification server status...
                    </Text>
                    {retryCount > 0 && (
                        <Text style={{ marginTop: 5, fontSize: 14, color: '#999' }}>
                            Retry attempt {retryCount}/{MAX_RETRIES}
                        </Text>
                    )}
                </View>
            )}
            {serverUp === false && (
                <View style={{ padding: 20, alignItems: 'center' }}>
                    <Text
                        style={{
                            color: 'red',
                            fontWeight: 'bold',
                            fontSize: 20,
                            textAlign: 'center',
                            marginBottom: 10,
                        }}>
                        Sonification server is not reachable
                    </Text>
                    <Text
                        style={{
                            color: '#666',
                            fontSize: 16,
                            textAlign: 'center',
                            marginBottom: 15,
                        }}>
                        Please ensure the sonification server is running at http://127.0.0.1:5000/
                    </Text>
                    <View
                        style={{
                            backgroundColor: '#007AFF',
                            paddingVertical: 10,
                            paddingHorizontal: 20,
                            borderRadius: 5,
                            cursor: 'pointer',
                        }}
                        onStartShouldSetResponder={() => true}
                        onResponderRelease={handleRetry}>
                        <Text style={{ color: 'white', fontWeight: 'bold' }}>Retry Connection</Text>
                    </View>
                </View>
            )}

            <iframe
                src="http://127.0.0.1:5000/"
                width="1500"
                height="750"
                style={{
                    border: 'none',
                    borderRadius: 8,
                    marginTop: 20,
                }}
                title="Sonification Interface"
            />
        </View>
    );
}
