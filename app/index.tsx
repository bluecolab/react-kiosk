import React, { useState, useEffect, useCallback } from 'react';
import Head from 'expo-router/head';
import { View } from 'react-native';
import Standby from '@/components/Standby';
import ScreensWrapper from '@/components/wrapper/ScreensWrapper';
import Credits from '@/components/screens/Credits';
import { useConfigs } from '@/hooks/useConfigs';
import '../hooks/i18n';

const assetId = require('@/assets/videos/background.mp4');

export default function Index() {
    const { MAX_IDLE_TIME } = useConfigs();

    // Standby screen
    const [isStandby, setIsStandby] = useState(true);
    const [showCredits, setShowCredits] = useState(false);
    const [lastActivity, setLastActivity] = useState(Date.now());
    const [standbyTime] = useState(MAX_IDLE_TIME);
    // index of screen to open when exiting standby (optional)
    const resetInactivity = useCallback(() => {
        setLastActivity(Date.now());
        if (isStandby) {
            setIsStandby(false);
        }
    }, [isStandby]);

    useEffect(() => {
        const showHandler = () => {
            setShowCredits(true);
        };

        const navHandler = () => {
            setShowCredits(false);
        };

        window.addEventListener('kiosk-show-credits', showHandler as EventListener);
        window.addEventListener('kiosk-navigate', navHandler as EventListener);

        const checkInactivity = setInterval(() => {
            if (Date.now() - lastActivity >= standbyTime) {
                setIsStandby(true);
                console.log('Standby mode activated');
            }
        }, 1000);

        // cleanup both listeners and interval
        return () => {
            window.removeEventListener('kiosk-show-credits', showHandler as EventListener);
            window.removeEventListener('kiosk-navigate', navHandler as EventListener);
            clearInterval(checkInactivity);
        };
    }, [lastActivity, standbyTime]);

    useEffect(() => {
        const defaultEvents = ['touchstart', 'resize', 'mousedown', 'wheel', 'keydown'];

        defaultEvents.forEach((event) => {
            window.addEventListener(event, resetInactivity);
        });

        const preventDefault = (e: TouchEvent) => {
            if (e.touches.length > 1) e.preventDefault();
        };
        window.addEventListener('touchmove', preventDefault, { passive: false });

        return () => {
            defaultEvents.forEach((event) => {
                window.removeEventListener(event, resetInactivity);
            });
            window.removeEventListener('touchmove', preventDefault);
        };
    }, [resetInactivity]);

    return (
        <>
            <Head>
                <title>Blue CoLab Kiosk</title>
                <meta name="description" content="Blue CoLab Kiosk" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
                />
                <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
            </Head>

            <View className="flex-1 relative">
                {/* Background Video (ALWAYS present) */}
                <video
                    className="absolute top-0 left-0 w-full h-full object-cover -z-10"
                    autoPlay
                    loop
                    muted>
                    <source src={assetId} type="video/mp4" />
                </video>
                {isStandby ? (
                    <Standby />
                ) : showCredits ? null : ( // when showing credits, hide the wrapper (carousel + dock)
                    <ScreensWrapper />
                )}
                {showCredits ? <Credits /> : null}
            </View>
        </>
    );
}
