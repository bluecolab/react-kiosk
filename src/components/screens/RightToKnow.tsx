import React, { useCallback, useState } from 'react';
import { View, Text, Pressable, Modal, ScrollView, Dimensions } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Image as ExpoImage } from 'expo-image';
import { DynamicImage } from '@/components/DynamicImage';

interface TeamPhoto {
    img: any;
    captionKey?: string;
}

interface TeamItem {
    titleKey: string;
    descriptionKey: string;
    studentsKey: string;
    img: any;
    textKey: string;
    extraTextKeys?: string[];
    photos?: TeamPhoto[];
}

const infoItems: TeamItem[] = [
    {
        titleKey: 'rightToKnow.team2023',
        descriptionKey: 'rightToKnow.descriptionR2K2023',
        studentsKey: 'rightToKnow.studentsR2K2023',
        img: require('@/assets/images/general/R2K2023.jpg'),
        textKey: 'rightToKnow.textR2K2023',
    },
    {
        titleKey: 'rightToKnow.team2024',
        descriptionKey: 'rightToKnow.descriptionR2K2024',
        studentsKey: 'rightToKnow.studentsR2K2024',
        img: require('@/assets/images/general/R2K2024.jpg'),
        textKey: 'rightToKnow.textR2K2024',
    },
    {
        titleKey: 'rightToKnow.team2025',
        descriptionKey: 'rightToKnow.descriptionR2K2025',
        studentsKey: 'rightToKnow.studentsR2K2025',
        img: require('@/assets/images/general/R2K2025.jpg'),
        textKey: 'rightToKnow.textR2K2025',
        extraTextKeys: ['rightToKnow.waterWalkR2K2025'],
        photos: [
            {
                img: require('@/assets/images/gallery/R2K2025-waterwalk-1.jpg'),
                captionKey: 'rightToKnow.waterWalkCaption1',
            },
            {
                img: require('@/assets/images/gallery/R2K2025-waterwalk-2.jpg'),
                captionKey: 'rightToKnow.waterWalkCaption2',
            },
        ],
    },
];

const THUMB_WIDTH = 180;
const THUMB_HEIGHT = 120;

export default function RightToKnow() {
    const { t } = useTranslation();
    const { width: W, height: H } = Dimensions.get('window');

    const [currentItem, setCurrentItem] = useState<TeamItem>(infoItems[0]);
    const [photoIndex, setPhotoIndex] = useState<number | null>(null);

    const photos = currentItem.photos ?? [];
    const openPhoto = photoIndex !== null ? photos[photoIndex] : null;

    const selectTeam = useCallback((item: TeamItem) => {
        setPhotoIndex(null);
        setCurrentItem(item);
    }, []);
    const close = useCallback(() => setPhotoIndex(null), []);
    const prev = useCallback(
        () => setPhotoIndex((i) => (i === null ? i : (i + photos.length - 1) % photos.length)),
        [photos.length]
    );
    const next = useCallback(
        () => setPhotoIndex((i) => (i === null ? i : (i + 1) % photos.length)),
        [photos.length]
    );

    return (
        <View>
            <Text className="text-h2 font-bold mb-4 text-center dark:text-white">
                {t('rightToKnow.mainHeading')}
            </Text>
            <Text className="text-body text-center mb-2 dark:text-white">
                {t('rightToKnow.introText')}
            </Text>
            <View className="flex-row flex-wrap justify-center my-2">
                {infoItems.map((item, index) => (
                    <Pressable
                        key={index}
                        className={`px-3 py-2 rounded-md m-1 ${currentItem.titleKey === item.titleKey ? 'bg-blue-400' : 'bg-gray-300 dark:bg-gray-600'}`}
                        onPress={() => selectTeam(item)}>
                        <Text className="text-button font-bold text-black dark:text-white">
                            {t(item.titleKey)}
                        </Text>
                    </Pressable>
                ))}
            </View>

            <View className="bg-white dark:bg-gray-800 rounded-xl flex-row p-4 items-start shadow w-full">
                <View className="flex-shrink-0 mr-4">
                    <DynamicImage imgSource={currentItem.img} width={600} />
                </View>
                <View className="flex-1 flex flex-col ml-4">
                    <Text className="text-h2 text-center font-bold mb-2 dark:text-white">
                        {t(currentItem.titleKey)}
                    </Text>
                    <Text className="text-h3 text-center mb-2 dark:text-white">
                        {t(currentItem.descriptionKey)}
                    </Text>
                    <Text className="text-body dark:text-white">{t(currentItem.textKey)}</Text>
                    {currentItem.extraTextKeys?.map((key) => (
                        <Text key={key} className="text-body mt-4 dark:text-white">
                            {t(key)}
                        </Text>
                    ))}
                    <Text className="text-body mt-4 dark:text-white">
                        {t(currentItem.studentsKey)}
                    </Text>

                    {photos.length > 0 && (
                        <View className="mt-6">
                            <Text className="text-h3 font-bold mb-2 dark:text-white">
                                {t('rightToKnow.photosHeading')}
                            </Text>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                {photos.map((photo, i) => (
                                    <Pressable
                                        key={i}
                                        onPress={() => setPhotoIndex(i)}
                                        accessibilityRole="imagebutton"
                                        accessibilityLabel={
                                            photo.captionKey ? t(photo.captionKey) : undefined
                                        }
                                        className="mr-3 rounded-lg overflow-hidden">
                                        <ExpoImage
                                            source={photo.img}
                                            style={{ width: THUMB_WIDTH, height: THUMB_HEIGHT }}
                                            contentFit="cover"
                                        />
                                    </Pressable>
                                ))}
                            </ScrollView>
                            <Text className="text-body mt-2 text-gray-500 dark:text-gray-300">
                                {t('rightToKnow.tapToEnlarge')}
                            </Text>
                        </View>
                    )}
                </View>
            </View>

            {/* Full-screen viewer: big photo, caption underneath, large touch targets. */}
            <Modal visible={openPhoto !== null} transparent animationType="fade" onRequestClose={close}>
                <View className="flex-1 bg-black/90 items-center justify-center">
                    <Pressable onPress={close} className="absolute top-8 right-8 p-4 z-10">
                        <Text className="text-white text-4xl font-bold">✕</Text>
                    </Pressable>

                    <View className="flex-row items-center">
                        {photos.length > 1 && (
                            <Pressable onPress={prev} className="p-6">
                                <Text className="text-white text-6xl font-bold">‹</Text>
                            </Pressable>
                        )}
                        {openPhoto && (
                            <ExpoImage
                                source={openPhoto.img}
                                style={{ width: W * 0.75, height: H * 0.7, borderRadius: 10 }}
                                contentFit="contain"
                                transition={200}
                            />
                        )}
                        {photos.length > 1 && (
                            <Pressable onPress={next} className="p-6">
                                <Text className="text-white text-6xl font-bold">›</Text>
                            </Pressable>
                        )}
                    </View>

                    {openPhoto?.captionKey && (
                        <Text
                            className="text-white text-h3 text-center mt-6"
                            style={{ maxWidth: W * 0.7 }}>
                            {t(openPhoto.captionKey)}
                        </Text>
                    )}
                    {photos.length > 1 && photoIndex !== null && (
                        <Text className="text-gray-300 text-body mt-2">
                            {photoIndex + 1} / {photos.length}
                        </Text>
                    )}
                </View>
            </Modal>
        </View>
    );
}