import * as React from 'react';
import { Animated } from 'react-native';
import { useEffect, useRef } from 'react';
import { AttractionLoopAnimation } from '@/components/AttractionLoopAnimation';

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
            <AttractionLoopAnimation />
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
