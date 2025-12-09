import React from 'react';
import { View, Text } from 'react-native';
import About from '@/assets/videos/Blue-CoLab.mp4';
import Fellowship from '@/assets/videos/fellowship.webm';
import Sonification from '@/assets/videos/Choate Pond Sonification, Pace 1080.mp4';
import ClearWaterSail from '@/assets/videos/Clearwater sails.mp4';
import { useTranslation } from 'react-i18next';

const videos = [
    { src: About, type: 'video/mp4', title: 'Blue CoLab Intro' },
    { src: Fellowship, type: 'video/webm', title: 'Fellowship Video' },
    { src: Sonification, type: 'video/mp4', title: 'Pond Sonification' },
    { src: ClearWaterSail, type: 'video/mp4', title: 'Clearwater Sail' },
    {
        src: 'http://localhost:9999/BlueCoLabCommunityImpactFinal.mp4',
        type: 'video/mp4',
        title: 'Blue CoLab Community Impact',
    },
    {
        src: 'http://localhost:9999/ChoateTimelapse.mp4',
        type: 'video/mp4',
        title: 'Choate Timelapse',
    },
];

const VideoComponent: React.FC<{ src: string; type: string }> = ({ src, type }) => (
    <video
        width="500"
        preload="auto"
        controls
        controlsList="nodownload noremoteplayback noplaybackrate"
        disablePictureInPicture
        className="rounded-xl shadow-lg">
        <source src={src} type={type} />
        Your browser does not support the video tag.
    </video>
);

export default function Videos() {
    const { t } = useTranslation();
    return (
        <View className="p-5 items-center">
            <Text className="text-h2 font-bold mb-5 text-center">
                {t('videos.watchEducational')}
            </Text>
            <View className="flex-row flex-wrap justify-center gap-4">
                {videos.map((video, index) => (
                    <View key={index} className="m-2 items-center">
                        <VideoComponent src={video.src} type={video.type} />
                        <Text className="mt-2 text-xl text-center">{video.title}</Text>
                    </View>
                ))}
            </View>
        </View>
    );
}
