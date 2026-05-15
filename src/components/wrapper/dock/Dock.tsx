import * as React from 'react';
import Animated from 'react-native-reanimated';

import { Widget } from '@/hooks/useWidgets';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { DockItem } from './DockItem';
import { Modal, Text, Pressable, View } from 'react-native';
import { useState } from 'react';
import { NewsFeed } from './NewsFeed';
import { DynamicImage } from '@/components/DynamicImage';

const GROWTH_RADIUS = 0.5; // how many neighbors are affected
const LABEL_OVERHANG = 44; // space for labels that float below icon bounds

export interface News {
    id: number;
    title: string;
    date: string;
    text: string;
    link?: string;
    image?: any;
    author?: string;
}

const news = [
    {
        id: 1,
        title: 'Special: Caroline Zanuto-Winter to be Valedictorian Speaker',
        date: 'May 6, 2026',
        text: `Congrats Caroline! Didn't have a formal write up for this one, but we are all happy and proud of you! Not just for getting that 4.0 but for being you.`,
        author: 'Anonymous',
    },
    {
        id: 2,
        title: 'San Miguel Academy in Newburgh, NY Students visit Gale Epstein Center',
        date: 'April 21, 2026',
        image: require('@/assets/images/news/san miguel and st benedict copy.jpg'),
        text: `Twenty-eight students from San Miguel Academy in Newburgh, NY and St. Benedict’s Preparatory School in Newark, NJ. joined the staff of Seidenberg’s Gale Epstein Center on April 21 to conduct their first Student Environmental Congress in the Gottesman Room on the Pleasantville campus. The day’s theme was the Future of Urban Rivers. In the morning, students presented their research on the water quality, aquatic life, and pollution of their home rivers, the Passaic in NJ and the Hudson in NY. The afternoon session was dedicated to five working groups that developed and then presented their far-reaching recommendations for making urban rivers sustainable. “The day was an inspiration,” said Lizi Imedashvili, the Center’s project manager and an organizer of the event. “These students, from some of the nation’s toughest neighborhoods, rose up with an optimism and vision that should grab the attention of every environmental decision maker in America.”`,
        author: 'John Cronin',
    },
    {
        id: 3,
        title: 'Silas Gonzalez, Lizi Imedashvili, and Victor Lima awarded Project Planet 2025–2026 Grant',
        date: 'April 6, 2026',
        image: require('@/assets/images/news/Silas, Lizi, Victor copy.jpg'),
        text: `Seidenberg students Silas Gonzalez, Lizi Imedashvili and Victor Lima (L to R) were awarded a Project Planet grant for their proposal to develop a business incubator for the Gale Epstein Center for Technology, Policy and the Environment. Speed Emissions, a vehicle inspection company located in Buford, Georgia, sponsors the annual contest at Pace. Of the sixty -three proposals submitted by Pace students this year, five grants of $6,000 were awarded. The Seidenberg team’s grant totaled $12,000 thanks to matching funds from Gale Epstein. Silas explained, "Our goal is to fulfill the public's right to know the environmental conditions in which they live by making Blue CoLab's information systems and tools available to schools, libraries, and local governments."`,
        author: 'John Cronin',
    },
    {
        id: 4,
        title: 'Pace University Celebrates Launch of Gale Epstein Center for Technology, Policy and the Environment',
        date: 'March 2, 2026',
        image: require('@/assets/images/news/article-hero-gale-epstein-center.webp'),
        text: `Pace University celebrated the ribbon cutting and official inauguration of the Gale Epstein Center for Technology, Policy and the Environment at the Seidenberg School of Computer Science and Information Systems on March 2, 2026. Made possible by a transformative gift from philanthropist and business leader Gale Epstein, it expands on Blue CoLab work in real-time water monitoring and environmental information systems. Its guiding principle is that informed decision-making about public health requires access to timely, accurate information about environmental conditions.`,
        author: 'Pace University',
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

                    <ScrollView className="flex-1 w-full h-full">
                        <View className="w-full items-center p-4">
                            <DynamicImage imgSource={currentNewsItem?.image} width={800} />
                        </View>

                        <Text className="text-h3 font-bold text-[#374151] dark:text-gray-300 px-4">
                            {currentNewsItem?.date}
                        </Text>
                        {currentNewsItem?.author && (
                            <Text className="text-lg text-[#3b3e45] dark:text-gray-400 px-4">
                                Author: {currentNewsItem.author}
                            </Text>
                        )}
                        <Text className="text-body mt-2 text-[#374151] dark:text-gray-300 px-4 pb-4">
                            {currentNewsItem?.text}
                        </Text>
                    </ScrollView>
                </View>
            </Modal>
        </Animated.View>
    );
};

export default Dock;
