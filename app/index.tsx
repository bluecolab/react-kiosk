import React, { useState, useEffect, useCallback } from 'react';
import Head from 'expo-router/head';
import { View } from 'react-native';
import Standby from '@/components/Standby';
import ScreensWrapper from '@/components/wrapper/ScreensWrapper';

const assetId = require('@/assets/videos/background.mp4');

export default function Index() {
    // Standby screen
    const [isStandby, setIsStandby] = useState(true);
    const [fadeOut, setFadeOut] = useState(false);
    const [lastActivity, setLastActivity] = useState(Date.now());
    const [standbyTime] = useState(300000); //  300000 = 5 minutes 4000 = 4 seconds (for testing)

    const resetInactivity = useCallback(() => {
        setLastActivity(Date.now());
        if (isStandby) {
            setIsStandby(false);
        }
    }, [isStandby]);

    useEffect(() => {
        const checkInactivity = setInterval(() => {
            if (Date.now() - lastActivity >= standbyTime) {
                setIsStandby(true);
                console.log('Standby mode activated');
            }
        }, 1000);

        return () => clearInterval(checkInactivity);
    }, [lastActivity, standbyTime]);

    useEffect(() => {
        const defaultEvents = ['touchstart', 'resize', 'mousedown', 'wheel', 'keydown'];

        defaultEvents.forEach((event) => {
            window.addEventListener(event, resetInactivity);
        });

        return () => {
            defaultEvents.forEach((event) => {
                window.removeEventListener(event, resetInactivity);
            });
        };
    }, [resetInactivity]);

    const handleStart = () => {
        setFadeOut(true);
        setTimeout(() => {
            setIsStandby(false);
            resetInactivity();
        }, 500);
    };

    return (
        <>
            <Head>
                <title>Blue CoLab Kiosk</title>
                <meta name="description" content="Blue CoLab Kiosk" />
            </Head>

            <View style={{ flex: 1, position: 'relative' }}>
                {/* Background Video (ALWAYS present) */}
                <video
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        zIndex: -1,
                    }}
                    autoPlay
                    loop
                    muted>
                    <source src={assetId} type="video/mp4" />
                </video>

                {isStandby ? (
                    <Standby onStart={handleStart} fadeOut={fadeOut} />
                ) : (
                    <ScreensWrapper />
                )}
            </View>
        </>
    );
}
