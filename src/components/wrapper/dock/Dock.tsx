import * as React from 'react';
import Animated from 'react-native-reanimated';

import { Widget } from '@/hooks/useWidgets';
import { FlatList } from 'react-native-gesture-handler';
import { DockItem } from './DockItem';
import { Modal, Text, Pressable, View } from 'react-native';
import { useState } from 'react';
import { NewsFeed } from './NewsFeed';

const GROWTH_RADIUS = 0.5; // how many neighbors are affected
const LABEL_OVERHANG = 44; // space for labels that float below icon bounds

export interface News {
    id: number;
    title: string;
    date: string;
    text: string;
    link?: string;
}

const news = [
    {
        id: 1,
        title: 'Special: Caroline Zanuto-Winter to be Valedictorian Speaker',
        date: 'May 6, 2026',
        text: 'Blah blah blah',
    },
    {
        id: 2,
        title: 'Silas Gonzalez, Lizi Imedashvili, and Victor Lima awarded Project Planet 2025–2026 Grant',
        date: 'April 6, 2026',
        text: 'Blah blah blah',
    },
    {
        id: 3,
        title: 'Pace University Celebrates Launch of Gale Epstein Center for Technology, Policy and the Environment',
        date: 'March 2, 2026',
        text: 'Blah blah blah',
    },
    {
        id: 4,
        title: 'San Miguel Academy in Newburgh, NY Students visit Gale Epstein Center',
        date: 'April 21, 2026',
        text: 'Blah blah blah',
    },
];

interface DockProps {
    dockLocationStyle: { bottom: number };
    width: number;
    height: number;
    setIndex: (index: number) => void;
    widgets: Widget[];
}

const Dock = ({ dockLocationStyle, width, height, setIndex, widgets }: DockProps) => {
    const [selectedIndex, setSelectedIndex] = useState(5);
    const itemSizeWidth = (width / widgets.length) * 0.8; // 80% of the space allocated
    const itemSizeHeight = height * 0.14; // 14% of the height allocated
    const [isModalVisible, setModalVisible] = useState(false);
    const [currentNewsItem, setCurrentNewsItem] = useState<News | null>(null);

    const openModal = (key: number) => {
        const item = news.find((n) => n.id === key);
        if (item) {
            setCurrentNewsItem(item);
            setModalVisible(true);
        }
    };

    const closeModal = () => {
        setModalVisible(false);
        setCurrentNewsItem(null);
    };

    return (
        <Animated.View
            style={[
                dockLocationStyle,
                {
                    position: 'absolute',
                    left: 0,
                    bottom: 0,
                    right: 0,
                    zIndex: 10,
                    height:
                        (itemSizeHeight < itemSizeWidth
                            ? itemSizeHeight * 1.6
                            : itemSizeWidth * 1.6) + LABEL_OVERHANG,
                    justifyContent: 'flex-end', // anchor children to bottom
                    alignItems: 'center',
                    opacity: 1,
                    overflow: 'visible',
                },
            ]}>
            <View className="absolute left-5 right-5 bottom-0 h-[70px] bg-white/30 dark:bg-black/40 rounded-t-3xl shadow-lg" />

            <FlatList
                data={widgets}
                keyExtractor={(_, index) => `spacer-${index}`}
                horizontal
                removeClippedSubviews={false}
                style={{ overflow: 'visible' }}
                contentContainerStyle={{
                    alignItems: 'flex-end', // anchor items to bottom of FlatList
                    height: '100%',
                    paddingHorizontal: 20,
                    overflow: 'visible',
                }}
                renderItem={({ item, index }) => {
                    const distance = Math.abs(selectedIndex - index);
                    const animationValue =
                        distance < GROWTH_RADIUS ? 1 - distance / GROWTH_RADIUS : 0;
                    return (
                        <DockItem
                            item={item}
                            index={index}
                            setIndex={(i) => {
                                setSelectedIndex(i);
                                setIndex(i);
                            }}
                            itemSize={
                                itemSizeHeight < itemSizeWidth ? itemSizeHeight : itemSizeWidth
                            }
                            animationValue={animationValue}
                        />
                    );
                }}
            />

            <NewsFeed openModal={openModal} news={news} />

            <Modal visible={isModalVisible} animationType="slide">
                <View className="flex-1 bg-white dark:bg-gray-900">
                    <View className="bg-blue-600/90 p-4 flex-row items-center">
                        <Pressable onPress={closeModal}>
                            <Text className="text-white text-lg mr-3">Back </Text>
                        </Pressable>
                        <Text className="text-white text-xl font-bold">
                            {currentNewsItem?.title}
                        </Text>
                    </View>

                    <View className="flex-1 w-full h-full">
                        <Text>{currentNewsItem?.date}</Text>
                        <Text>{currentNewsItem?.text}</Text>
                    </View>
                </View>
            </Modal>
        </Animated.View>
    );
};

export default Dock;
