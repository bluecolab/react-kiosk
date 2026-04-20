import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, Pressable, Modal, Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import { DynamicImage } from '../DynamicImage';

export default function Games() {
    const { t } = useTranslation();

    const games = [
        {
            name: 'Jeopardy',
            descriptionKey: 'games.jeopardyDesc',
            creator: 'Keathson Lam',
            img: require('@/assets/images/general/jeopardy.jpg'),
            url: 'https://bluecolab.github.io/BlueCoLab-Jeopardy/',
        },
        {
            name: 'Cronin Cruise',
            descriptionKey: 'games.ccDesc',
            creator: 'Daniel White & Jack Sullivan',
            img: require('@/assets/images/general/cronincruise.jpg'),
            url: 'https://bluecolab.github.io/Games/Dinosaur%20Game%20Build/',
        },
        {
            name: 'Splashy Fish',
            descriptionKey: 'games.sfDesc',
            creator: 'Daniel White & Jack Sullivan',
            img: require('@/assets/images/general/splashyfish.jpg'),
            url: 'https://bluecolab.github.io/Games/Flappy%20Game%20Build/',
        },
    ];

    const [currentGame, setCurrentGame] = useState(games[0]);
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View className="flex-1 w-full">
            <Text className="text-h2 mb-4 text-center font-bold dark:text-white">
                {t('games.playInteractive')}
            </Text>

            <View className="flex-row flex-wrap justify-center my-2">
                {games.map((item, index) => (
                    <Pressable
                        key={index}
                        className={`px-3 py-2 rounded-md m-1 ${currentGame.name === item.name ? 'bg-blue-400' : 'bg-gray-300'}`}
                        onPress={() => setCurrentGame(item)}>
                        <Text className="text-button font-bold text-black dark:text-white">
                            {t(item.name)}
                        </Text>
                    </Pressable>
                ))}
            </View>

            <View className="bg-white rounded-xl flex-row p-4 items-start shadow w-full">
                <View className="flex-1 flex flex-col ml-4 items-center h-full">
                    <Text className="text-h2 text-center font-bold mb-2">
                        {t(currentGame.name)}
                    </Text>
                    <Text className="text-body text-center mb-2">
                        {t(currentGame.descriptionKey)}
                    </Text>
                    <Text className="text-body text-center">
                        {t('games.created')}: {currentGame.creator}
                    </Text>
                    <Pressable
                        className="bg-blue-900 px-4 py-2 rounded-lg mt-2 w-1/2 items-center absolute bottom-0"
                        onPress={() => setModalVisible(true)}>
                        <Text className="text-white font-bold text-center">{t('games.play')}</Text>
                    </Pressable>
                </View>
                <View className="flex-shrink-0 mr-4">
                    <DynamicImage imgSource={currentGame.img} width={800} />
                </View>
            </View>

            <Modal visible={modalVisible} animationType="slide">
                <View className="flex-1">
                    <View className="bg-[#6299ff] p-4 flex-row items-center ">
                        <Pressable onPress={() => setModalVisible(false)}>
                            <Text className="text-white text-button mr-3">{t('games.back')}</Text>
                        </Pressable>
                        <Text className="text-white text-xl font-bold">{currentGame.name}</Text>
                    </View>

                    {Platform.OS === 'web' ? (
                        <View className="flex-1 w-full h-full">
                            <iframe
                                src={currentGame.url}
                                style={{ flex: 1, width: '100%', height: '100%' }}
                                allowFullScreen
                            />
                        </View>
                    ) : (
                        <WebView
                            source={{ uri: currentGame.url }}
                            style={{ flex: 1 }}
                            allowsFullscreenVideo
                        />
                    )}
                </View>
            </Modal>
        </View>
    );
}
