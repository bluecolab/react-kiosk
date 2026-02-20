import React, { useState } from 'react';
import { View, Text, Modal, Pressable, Platform, Button } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useWaterReports } from '@/hooks/useWaterReports';
import { WebView } from 'react-native-webview';
import { DynamicImage } from '../DynamicImage';
import PageFlipper from '../PageFlipper';

let animated = require('@/assets/images/Pace-PLV-water-animated.gif');

const page1 = require('@/assets/waterReport/2024-report/page_1.jpg');
const page2 = require('@/assets/waterReport/2024-report/page_2.jpg');
const page3 = require('@/assets/waterReport/2024-report/page_3.jpg');
const page4 = require('@/assets/waterReport/2024-report/page_4.jpg');
const page5 = require('@/assets/waterReport/2024-report/page_5.jpg');
const page6 = require('@/assets/waterReport/2024-report/page_6.jpg');
const page7 = require('@/assets/waterReport/2024-report/page_7.jpg');
const page8 = require('@/assets/waterReport/2024-report/page_8.jpg');
const page9 = require('@/assets/waterReport/2024-report/page_9.jpg');
const page10 = require('@/assets/waterReport/2024-report/page_10.jpg');
const page11 = require('@/assets/waterReport/2024-report/page_11.jpg');
const page12 = require('@/assets/waterReport/2024-report/page_12.jpg');
const page13 = require('@/assets/waterReport/2024-report/page_13.jpg');

const pages = [
    page1,
    page2,
    page3,
    page4,
    page5,
    page6,
    page7,
    page8,
    page9,
    page10,
    page11,
    page12,
    page13,
];

const FAKE_TEXTS = [
    `1 - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Facilisis volutpat est velit egestas dui id ornare arcu odio. Sit amet commodo nulla facilisi nullam. Nullam eget felis eget nunc lobortis mattis aliquam faucibus. Sit amet luctus venenatis lectus. Velit scelerisque in dictum non. Fermentum iaculis eu non diam phasellus vestibulum lorem. Vitae elementum curabitur vitae nunc sed velit. Amet purus gravida quis blandit turpis cursus. Eget dolor morbi non arcu. Diam vulputate ut pharetra sit.

  Nec dui nunc mattis enim ut tellus. Mauris cursus mattis molestie a. Lectus urna duis convallis convallis tellus id. Elementum integer enim neque volutpat ac tincidunt vitae semper quis. Morbi non arcu risus quis varius quam quisque id diam. Pulvinar pellentesque habitant morbi tristique senectus et netus et. Fermentum posuere urna nec tincidunt praesent semper feugiat nibh sed. Amet justo donec enim diam vulputate ut pharetra sit. Viverra adipiscing at in tellus integer feugiat scelerisque. Suscipit adipiscing bibendum est ultricies integer. Vel facilisis volutpat est velit egestas. Molestie at elementum eu facilisis sed odio. Platea dictumst quisque sagittis purus sit. Risus commodo viverra maecenas accumsan lacus vel facilisis volutpat. Faucibus turpis in eu mi bibendum neque egestas congue quisque. Lacus luctus accumsan tortor posuere ac ut. Risus pretium quam vulputate dignissim suspendisse. Aliquet sagittis id consectetur purus.`,
    `2- Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Fermentum et sollicitudin ac orci phasellus egestas tellus rutrum tellus. Mi proin sed libero enim sed faucibus turpis in eu. Lobortis elementum nibh tellus molestie nunc. Justo donec enim diam vulputate ut pharetra. Mi in nulla posuere sollicitudin aliquam ultrices sagittis. Amet nisl suscipit adipiscing bibendum. Libero nunc consequat interdum varius sit amet mattis vulputate enim. Id faucibus nisl tincidunt eget. Lacus sed viverra tellus in hac habitasse platea. Quisque egestas diam in arcu cursus euismod quis. Purus semper eget duis at tellus at urna. Viverra aliquet eget sit amet. Varius vel pharetra vel turpis. Pretium aenean pharetra magna ac placerat vestibulum lectus mauris. Sed lectus vestibulum mattis ullamcorper. Suspendisse ultrices gravida dictum fusce ut placerat. At consectetur lorem donec massa sapien faucibus et molestie. Amet cursus sit amet dictum sit.

  Pellentesque dignissim enim sit amet venenatis urna cursus eget nunc. Interdum velit euismod in pellentesque massa placerat duis ultricies lacus. Non consectetur a erat nam at lectus urna duis. Convallis a cras semper auctor neque vitae tempus quam. In hac habitasse platea dictumst. Tellus orci ac auctor augue mauris augue neque gravida in. Odio euismod lacinia at quis risus sed vulputate odio. Sodales neque sodales ut etiam. Dignissim suspendisse in est ante in nibh mauris. Elit eget gravida cum sociis natoque penatibus et magnis dis. Varius morbi enim nunc faucibus a. Aenean euismod elementum nisi quis eleifend.`,
    `3 - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Purus non enim praesent elementum facilisis leo vel fringilla. Augue mauris augue neque gravida in. Aliquet lectus proin nibh nisl condimentum id venenatis a. Quisque id diam vel quam elementum pulvinar. Fermentum posuere urna nec tincidunt praesent. Dolor sit amet consectetur adipiscing elit pellentesque. Arcu odio ut sem nulla pharetra diam sit amet nisl. Vitae proin sagittis nisl rhoncus mattis rhoncus urna neque viverra. Tristique risus nec feugiat in fermentum posuere urna. Luctus accumsan tortor posuere ac ut consequat semper viverra nam. Fermentum et sollicitudin ac orci phasellus. Integer quis auctor elit sed vulputate mi. Fringilla est ullamcorper eget nulla facilisi.

Orci sagittis eu volutpat odio facilisis. Curabitur vitae nunc sed velit. Nec feugiat nisl pretium fusce id velit ut tortor pretium. Nec feugiat nisl pretium fusce id. Ullamcorper sit amet risus nullam. Sagittis id consectetur purus ut faucibus pulvinar. Dolor magna eget est lorem ipsum dolor sit amet. Laoreet id donec ultrices tincidunt arcu non sodales. Bibendum est ultricies integer quis auctor elit sed vulputate mi. Vulputate enim nulla aliquet porttitor lacus luctus accumsan tortor posuere. Aliquet nec ullamcorper sit amet risus nullam eget. Ac turpis egestas integer eget aliquet. Ornare lectus sit amet est placerat in. Odio eu feugiat pretium nibh ipsum. Cras adipiscing enim eu turpis.`,
    `4 - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Facilisis volutpat est velit egestas dui id ornare arcu odio. Sit amet commodo nulla facilisi nullam. Nullam eget felis eget nunc lobortis mattis aliquam faucibus. Sit amet luctus venenatis lectus. Velit scelerisque in dictum non. Fermentum iaculis eu non diam phasellus vestibulum lorem. Vitae elementum curabitur vitae nunc sed velit. Amet purus gravida quis blandit turpis cursus. Eget dolor morbi non arcu. Diam vulputate ut pharetra sit.

Nec dui nunc mattis enim ut tellus. Mauris cursus mattis molestie a. Lectus urna duis convallis convallis tellus id. Elementum integer enim neque volutpat ac tincidunt vitae semper quis. Morbi non arcu risus quis varius quam quisque id diam. Pulvinar pellentesque habitant morbi tristique senectus et netus et. Fermentum posuere urna nec tincidunt praesent semper feugiat nibh sed. Amet justo donec enim diam vulputate ut pharetra sit. Viverra adipiscing at in tellus integer feugiat scelerisque. Suscipit adipiscing bibendum est ultricies integer. Vel facilisis volutpat est velit egestas. Molestie at elementum eu facilisis sed odio. Platea dictumst quisque sagittis purus sit. Risus commodo viverra maecenas accumsan lacus vel facilisis volutpat. Faucibus turpis in eu mi bibendum neque egestas congue quisque. Lacus luctus accumsan tortor posuere ac ut. Risus pretium quam vulputate dignissim suspendisse. Aliquet sagittis id consectetur purus.`,
    `5- Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Fermentum et sollicitudin ac orci phasellus egestas tellus rutrum tellus. Mi proin sed libero enim sed faucibus turpis in eu. Lobortis elementum nibh tellus molestie nunc. Justo donec enim diam vulputate ut pharetra. Mi in nulla posuere sollicitudin aliquam ultrices sagittis. Amet nisl suscipit adipiscing bibendum. Libero nunc consequat interdum varius sit amet mattis vulputate enim. Id faucibus nisl tincidunt eget. Lacus sed viverra tellus in hac habitasse platea. Quisque egestas diam in arcu cursus euismod quis. Purus semper eget duis at tellus at urna. Viverra aliquet eget sit amet. Varius vel pharetra vel turpis. Pretium aenean pharetra magna ac placerat vestibulum lectus mauris. Sed lectus vestibulum mattis ullamcorper. Suspendisse ultrices gravida dictum fusce ut placerat. At consectetur lorem donec massa sapien faucibus et molestie. Amet cursus sit amet dictum sit.

Pellentesque dignissim enim sit amet venenatis urna cursus eget nunc. Interdum velit euismod in pellentesque massa placerat duis ultricies lacus. Non consectetur a erat nam at lectus urna duis. Convallis a cras semper auctor neque vitae tempus quam. In hac habitasse platea dictumst. Tellus orci ac auctor augue mauris augue neque gravida in. Odio euismod lacinia at quis risus sed vulputate odio. Sodales neque sodales ut etiam. Dignissim suspendisse in est ante in nibh mauris. Elit eget gravida cum sociis natoque penatibus et magnis dis. Varius morbi enim nunc faucibus a. Aenean euismod elementum nisi quis eleifend.`,
    `6 - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Purus non enim praesent elementum facilisis leo vel fringilla. Augue mauris augue neque gravida in. Aliquet lectus proin nibh nisl condimentum id venenatis a. Quisque id diam vel quam elementum pulvinar. Fermentum posuere urna nec tincidunt praesent. Dolor sit amet consectetur adipiscing elit pellentesque. Arcu odio ut sem nulla pharetra diam sit amet nisl. Vitae proin sagittis nisl rhoncus mattis rhoncus urna neque viverra. Tristique risus nec feugiat in fermentum posuere urna. Luctus accumsan tortor posuere ac ut consequat semper viverra nam. Fermentum et sollicitudin ac orci phasellus. Integer quis auctor elit sed vulputate mi. Fringilla est ullamcorper eget nulla facilisi.

Orci sagittis eu volutpat odio facilisis. Curabitur vitae nunc sed velit. Nec feugiat nisl pretium fusce id velit ut tortor pretium. Nec feugiat nisl pretium fusce id. Ullamcorper sit amet risus nullam. Sagittis id consectetur purus ut faucibus pulvinar. Dolor magna eget est lorem ipsum dolor sit amet. Laoreet id donec ultrices tincidunt arcu non sodales. Bibendum est ultricies integer quis auctor elit sed vulputate mi. Vulputate enim nulla aliquet porttitor lacus luctus accumsan tortor posuere. Aliquet nec ullamcorper sit amet risus nullam eget. Ac turpis egestas integer eget aliquet. Ornare lectus sit amet est placerat in. Odio eu feugiat pretium nibh ipsum. Cras adipiscing enim eu turpis.`,
];

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
                <View className=" rounded-xl flex-row p-4 items-start w-full">
                    <View className="flex-1 flex flex-col ">
                        <Text className="text-h2 font-bold text-center mb-3">
                            {t('waterReports.title')}
                        </Text>
                        <Text className="text-body mb-2  text-center">
                            {t('waterReports.description')}
                        </Text>
                        <Text className="text-body mb-5  text-center">
                            {t('waterReports.goal')}
                        </Text>
                        <Button
                            onPress={() => openStoryModal()}
                            title={t('waterReports.whereWater')}
                        />
                    </View>
                    <View className="flex-shrink-0 mr-4 w-1/2">
                        <Text className="text-body  text-center">
                            {t('waterReports.selectYear')}
                        </Text>
                        <Text className=" text-body  text-center">
                            {t('waterReports.pdfFormat')}
                        </Text>
                        <View className="grid grid-cols-3 gap-x-8 p-5">
                            {waterReports.map((report, index) => {
                                return (
                                    <Pressable
                                        key={index}
                                        className={`relative bg-white min-h-[160px]  rounded-lg shadow-lg flex flex-col items-center justify-end border-l-8`}
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
                                            className={`text-button font-bold text-blue-900 text-center`}>
                                            {t(report.buttonText)}
                                        </Text>
                                        {/* Shelf effect */}
                                        <View className="absolute left-0 bottom-[-8px] w-full h-2 bg-gray-300 rounded-b-lg shadow-md" />
                                    </Pressable>
                                );
                            })}
                        </View>
                    </View>
                </View>
            </View>

            <Modal visible={isModalVisible} animationType="slide">
                <View className="flex-1">
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
                            {/* <iframe
                                src={`${pdfUri}#toolbar=0`}
                                className="w-full h-full"
                                allowFullScreen
                                title="PDF Viewer"
                            /> */}
                            <PageFlipper
                                // ref={pageFlipperRef}
                                data={FAKE_TEXTS}
                                pageSize={{
                                    height: 650,
                                    width: 400,
                                }}
                                pressable={true}
                                enabled={true}
                                singleImageMode={true}
                                portrait={false}
                                contentContainerStyle={{
                                    shadowColor: '#000',
                                    shadowOffset: {
                                        width: 0,
                                        height: 2,
                                    },
                                    shadowOpacity: 0.25,
                                    shadowRadius: 3.84,
                                    elevation: 5,
                                }}
                                renderPage={(data) => {
                                    return (
                                        <View
                                            style={{
                                                flex: 1,
                                                // padding: 15,
                                                backgroundColor: 'white',
                                                // paddingTop: safeInsets.top,
                                                // paddingBottom: safeInsets.bottom,
                                            }}>
                                            {/* <DynamicImage
                                                imgSource={data}
                                                width={600}
                                                // height={650}
                                            /> */}
                                            <Text>{data}</Text>
                                        </View>
                                    );
                                }}
                            />
                        </View>
                    ) : (
                        <WebView source={{ uri: pdfUri || '' }} />
                    )}
                </View>
            </Modal>

            <Modal visible={isStoryModalVisible} animationType="slide">
                <View className="flex-1">
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
                    <Text className="mx-4 mt-4 text-body">{t('waterReports.waterSource')}</Text>
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 16 }}>
                        <DynamicImage imgSource={animated} width={500} />
                    </View>
                </View>
            </Modal>
        </View>
    );
}
