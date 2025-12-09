import React, { useCallback, useEffect, useState } from 'react';
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
        <View className="flex flex-col items-center w-full">
            {serverUp === null && (
                <View className="items-center p-5">
                    <ActivityIndicator size="large" color="#0077cc" />
                    <Text className="mt-2 text-base text-gray-500">
                        Checking sonification server status...
                    </Text>
                    {retryCount > 0 && (
                        <Text className="mt-1 text-sm text-gray-400">
                            Retry attempt {retryCount}/{MAX_RETRIES}
                        </Text>
                    )}
                </View>
            )}
            {serverUp === false && (
                <View className="p-5 items-center">
                    <Text className="text-red-600 font-bold text-body text-center mb-2.5">
                        Sonification server is not reachable
                    </Text>
                    <Text className="text-gray-500  text-body text-center mb-4">
                        Please ensure the sonification server is running at http://127.0.0.1:5000/
                    </Text>
                    <View
                        className="bg-blue-500 py-2 px-5 rounded cursor-pointer  text-body"
                        onStartShouldSetResponder={() => true}
                        onResponderRelease={handleRetry}>
                        <Text className="text-white font-bold">Retry Connection</Text>
                    </View>
                </View>
            )}

            <iframe
                src="http://127.0.0.1:5000/"
                width="1500"
                height="800"
                style={{ border: 'none', borderRadius: 8, marginTop: 20 }}
                title="Sonification Interface"
            />
        </View>
    );
}
