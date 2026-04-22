import React, { useState } from 'react';
import { View, Text, Modal, Pressable, Platform } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useWaterReports } from '@/hooks/useWaterReports';
import { WebView } from 'react-native-webview';
import { DynamicImage } from '../DynamicImage';

let animated = require('@/assets/images/Pace-PLV-water-animated.gif');

export default function WaterReport() {
    const { t } = useTranslation();
    const waterReports = useWaterReports();
    const [isModalVisible, setModalVisible] = useState(false);
    const [isStoryModalVisible, setIsStoryModalVisible] = useState(false);
    const [pdfUri, setPdfUri] = useState<string | null>(null);
    const [currentTitle, setCurrentTitle] = useState<string | null>(null);

    const openPdfModal = (uri: string, title: string) => {
        setPdfUri(uri);
        setCurrentTitle(title);
        setModalVisible(true);
    };

    const closePdfModal = () => {
        setModalVisible(false);
        setPdfUri(null);
        setCurrentTitle(null);
    };

    const openStoryModal = () => {
        setIsStoryModalVisible(true);
    };

    const closeStoryModal = () => {
        setIsStoryModalVisible(false);
    };

    return (
        <View className="flex-1 w-full items-center justify-center">
            <View className=" rounded-xl overflow-hidden">
                <View className="bg-white dark:bg-gray-800 rounded-xl flex-row p-4 items-start w-full shadow">
                    <View className="flex-1 flex flex-col ">
                        <Text className="text-h2 font-bold text-center mb-3 dark:text-white">
                            {t('waterReports.title')}
                        </Text>
                        <Text className="text-body mb-2  text-center dark:text-white">
                            {t('waterReports.description')}
                        </Text>
                        <Text className="text-body mb-5  text-center dark:text-white">
                            {t('waterReports.goal')}
                        </Text>
                        <Pressable
                            onPress={() => openStoryModal()}
                            className="bg-blue-500 dark:bg-blue-700 rounded-md px-4 py-2 items-center">
                            <Text className="text-white font-semibold">
                                {t('waterReports.whereWater')}
                            </Text>
                        </Pressable>
                    </View>
                    <View className="flex-shrink-0 mr-4 w-1/2">
                        <Text className="text-body  text-center dark:text-white">
                            {t('waterReports.selectYear')}
                        </Text>
                        <Text className=" text-body  text-center dark:text-white">
                            {t('waterReports.pdfFormat')}
                        </Text>
                        <View className="grid grid-cols-3 gap-x-8 p-5">
                            {waterReports.map((report, index) => {
                                return (
                                    <Pressable
                                        key={index}
                                        className={`relative bg-white dark:bg-gray-700 min-h-[160px] rounded-lg shadow-lg flex flex-col items-center justify-end border-l-8`}
                                        style={{ marginBottom: 24 }}
                                        onPress={() => {
                                            openPdfModal(report.url, report.title);
                                        }}>
                                        {/* Book cover image */}
                                        {report.image && (
                                            <DynamicImage imgSource={report.image} width={120} />
                                        )}
                                        {/* Year label as spine */}
                                        <Text
                                            className={`text-button font-bold text-blue-900 dark:text-blue-200 text-center`}>
                                            {t(report.buttonText)}
                                        </Text>
                                        {/* Shelf effect */}
                                        <View className="absolute left-0 bottom-[-8px] w-full h-2 bg-gray-300 dark:bg-gray-600 rounded-b-lg shadow-md" />
                                    </Pressable>
                                );
                            })}
                        </View>
                    </View>
                </View>
            </View>

            <Modal visible={isModalVisible} animationType="slide">
                <View className="flex-1 bg-white dark:bg-gray-900">
                    <View className="bg-blue-600/90 p-4 flex-row items-center">
                        <Pressable onPress={closePdfModal}>
                            <Text className="text-white text-lg mr-3">
                                {t('waterReports.back')}
                            </Text>
                        </Pressable>
                        <Text className="text-white text-xl font-bold">
                            {t(currentTitle ?? '')}
                        </Text>
                    </View>

                    {pdfUri && Platform.OS === 'web' ? (
                        <View className="flex-1 w-full h-full">
                            <iframe
                                src={`${pdfUri}#toolbar=0`}
                                className="w-full h-full"
                                allowFullScreen
                                title="PDF Viewer"
                            />
                        </View>
                    ) : (
                        <WebView source={{ uri: pdfUri || '' }} allowsFullscreenVideo />
                    )}
                </View>
            </Modal>

            <Modal visible={isStoryModalVisible} animationType="slide">
                <View className="flex-1 bg-white dark:bg-gray-900">
                    <View className="bg-blue-600/90 p-4 flex-row items-center">
                        <Pressable onPress={closeStoryModal}>
                            <Text className="text-white text-lg mr-3">
                                {t('waterReports.back')}
                            </Text>
                        </Pressable>
                        <Text className="text-white text-xl font-bold">
                            {t('waterReports.whereWater')}
                        </Text>
                    </View>
                    <Text className="mx-4 mt-4 text-body dark:text-white">
                        {t('waterReports.waterSource')}
                    </Text>
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 16 }}>
                        <DynamicImage imgSource={animated} width={500} />
                    </View>
                </View>
            </Modal>
        </View>
    );
}
