import * as React from 'react';
import Animated from 'react-native-reanimated';

import { Widget } from '@/hooks/useWidgets';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { DockItem } from './DockItem';
import { Modal, Text, Pressable, View } from 'react-native';
import { useEffect, useState } from 'react';
import { NewsFeed } from './NewsFeed';
import { DynamicImage } from '@/components/DynamicImage';
// Copy of the feed baked into the build, shown until (or if) the live fetch works.
import bundledNews from '@/assets/images/news/news.json';

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

/* ------------------------------------------------------------------ */
/* News feed: loaded at runtime from news.json instead of hard coded.  */
/* To post news: on GitHub, upload the photo to                        */
/* src/assets/images/news/ and add an entry to news.json in the same   */
/* folder. The kiosk picks it up within 15 minutes, no rebuild.        */
/* ------------------------------------------------------------------ */

const NEWS_BASE_URL =
    process.env.EXPO_PUBLIC_NEWS_BASE_URL ??
    'https://raw.githubusercontent.com/bluecolab/react-kiosk/main/src/assets/images/news/';

const NEWS_REFRESH_MS = 15 * 60 * 1000; // re-check every 15 minutes

/** Shape of one entry in news.json. */
interface NewsEntry {
    id: number;
    title: string;
    /** ISO date, e.g. "2026-05-06" */
    date: string;
    text: string;
    author?: string;
    link?: string;
    /** File name next to news.json, or a full https:// URL */
    image?: string;
}

function isNewsEntry(x: unknown): x is NewsEntry {
    const n = x as NewsEntry;
    return (
        !!n &&
        typeof n.id === 'number' &&
        typeof n.title === 'string' &&
        typeof n.date === 'string' &&
        typeof n.text === 'string'
    );
}

function formatNewsDate(iso: string): string {
    const [y, m, d] = iso.split('-').map(Number);
    if (!y || !m || !d) return iso; // not ISO: show as written
    // Local date, so "2026-05-06" never shows as May 5.
    return new Date(y, m - 1, d).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    });
}

function newsImageSource(image?: string) {
    if (!image) return undefined;
    const uri = /^https?:\/\//.test(image) ? image : NEWS_BASE_URL + encodeURIComponent(image);
    return { uri };
}

/** Validates raw JSON and converts it to what NewsFeed renders: newest first. */
function toNews(data: unknown): News[] {
    if (!Array.isArray(data)) return [];
    return data
        .filter(isNewsEntry)
        .sort((a, b) => b.date.localeCompare(a.date))
        .map((n) => ({
            id: n.id,
            title: n.title,
            date: formatNewsDate(n.date),
            text: n.text,
            author: n.author,
            link: n.link,
            image: newsImageSource(n.image),
        }));
}

function useNews(): News[] {
    const [news, setNews] = useState<News[]>(() => toNews(bundledNews));

    useEffect(() => {
        let cancelled = false;

        const load = async () => {
            try {
                // Cache-buster so the kiosk doesn't keep a stale copy.
                const res = await fetch(`${NEWS_BASE_URL}news.json?t=${Date.now()}`);
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const items = toNews(await res.json());
                if (!cancelled && items.length > 0) setNews(items);
            } catch (e) {
                // Offline or bad JSON: keep whatever is already showing.
                console.warn('News feed refresh failed:', e);
            }
        };

        load();
        const timer = setInterval(load, NEWS_REFRESH_MS);
        return () => {
            cancelled = true;
            clearInterval(timer);
        };
    }, []);

    return news;
}

interface DockProps {
    dockLocationStyle: { bottom: number };
    width: number;
    height: number;
    setIndex: (index: number) => void;
    widgets: Widget[];
}

const Dock = ({ dockLocationStyle, width, height, setIndex, widgets }: DockProps) => {
    const news = useNews();
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