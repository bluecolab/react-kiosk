import * as React from 'react';
import { View, Text, Animated } from 'react-native';
import { useEffect, useRef, useState } from 'react';
const assetId = require('@/assets/videos/Blue Colab Attraction Loop.mp4');

// Current Time Hook for Standby Screen
const CurrentTime = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <Text className="text-2xl text-white font-bold font-sans">{time.toLocaleTimeString()}</Text>
    );
};

export default function Standby() {
    const pulseAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, {
                    toValue: 0.4,
                    duration: 800,
                    useNativeDriver: false,
                }),
                Animated.timing(pulseAnim, {
                    toValue: 1,
                    duration: 800,
                    useNativeDriver: false,
                }),
            ])
        ).start();
    }, [pulseAnim]);

    return (
        <Animated.View
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                pointerEvents: 'auto',
            }}>
            <video
                className="absolute top-0 left-0 w-full h-full object-cover -z-10"
                autoPlay
                loop
                muted>
                <source src={assetId} type="video/mp4" />
            </video>

            {/* Current Time and Version Bottom Right */}
            <View className="absolute bottom-4 right-4 items-end">
                <CurrentTime />
            </View>
        </Animated.View>
    );
}

/* On index.tsx, the Standby component works with :

  - isStandby: (true/false) — shows standby screen or main content

  - lastActivity: (timestamp) — tracks last user interaction

  - standbyTime: (ms) — how long until it goes to standby

  - resetInactivity(): when user touches/clicks/presses anything, reset the timer

  - checkInactivity: every second, check if user is inactive

*/
