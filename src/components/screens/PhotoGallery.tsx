import React, { useState, useCallback, useMemo, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Modal,
    Dimensions,
    FlatList,
    Image as RNImage,
} from 'react-native';
import { Image as ExpoImage } from 'expo-image';
import { images } from '@/hooks/useGalleryImages';

export default function PhotoGallery() {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const { width: W, height: H } = Dimensions.get('window');

    const open = useCallback((i: number) => setSelectedIndex(i), []);
    const close = useCallback(() => setSelectedIndex(null), []);
    const prev = useCallback(() => {
        setSelectedIndex((cur) => (cur !== null ? (cur + images.length - 1) % images.length : cur));
    }, []);
    const next = useCallback(() => {
        setSelectedIndex((cur) => (cur !== null ? (cur + 1) % images.length : cur));
    }, []);

    // Grid sizing and spacing (responsive)
    const numColumns = 3;
    const containerPadding = 20; // same as contentContainerStyle
    const itemMargin = 8; // applied around each item
    const ITEM_WIDTH = useMemo(() => {
        const totalMargins = itemMargin * 2 * numColumns;
        const available = W - containerPadding * 2 - totalMargins;
        return Math.floor(available / numColumns);
    }, [W]);
    const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 0.7);

    const keyExtractor = useCallback(
        (item: any, i: number) =>
            item?.source?.uri ? String(item.source.uri) : `gallery-img-${i}`,
        []
    );

    const renderItem = useCallback(
        ({ item, index }: { item: any; index: number }) => {
            return (
                <TouchableOpacity onPress={() => open(index)} style={{ margin: itemMargin }}>
                    <ExpoImage
                        source={item.source}
                        style={{
                            width: ITEM_WIDTH,
                            height: ITEM_HEIGHT,
                            borderRadius: 12,
                            borderWidth: 1,
                            borderColor: '#ccc',
                        }}
                        contentFit="cover"
                        transition={200}
                        priority="normal"
                    />
                </TouchableOpacity>
            );
        },
        [ITEM_WIDTH, ITEM_HEIGHT, open]
    );

    const getItemLayout = useCallback(
        (_: any, index: number) => {
            const row = Math.floor(index / numColumns);
            const length = ITEM_HEIGHT + itemMargin * 2;
            return { length, offset: length * row, index };
        },
        [ITEM_HEIGHT, itemMargin]
    );

    // Prefetch a small batch of image URIs into OS cache to smooth scrolling
    useEffect(() => {
        const uris = images
            .map((it: any) => it?.source?.uri)
            .filter(Boolean)
            .slice(0, 20) as string[];

        uris.forEach((u) => {
            try {
                RNImage.prefetch(u);
            } catch (e) {
                console.error(e);
                // ignore prefetch errors
            }
        });
    }, []);

    return (
        <View className="flex-1">
            <FlatList
                data={images}
                keyExtractor={keyExtractor}
                numColumns={numColumns}
                contentContainerStyle={{ padding: containerPadding, alignItems: 'center' }}
                renderItem={renderItem}
                initialNumToRender={8}
                maxToRenderPerBatch={8}
                windowSize={5}
                removeClippedSubviews
                getItemLayout={getItemLayout}
                showsVerticalScrollIndicator={false}
            />

            {/* Lightbox Modal */}
            <Modal visible={selectedIndex !== null} transparent onRequestClose={close}>
                <View
                    className="flex-1 justify-center items-center"
                    style={{ backgroundColor: 'rgba(0,0,0,0.85)' }}>
                    {/* close on tap outside */}
                    <TouchableOpacity style={StyleSheet.absoluteFillObject} onPress={close} />

                    <View className="flex-row items-center">
                        <TouchableOpacity onPress={prev} className="p-5">
                            <Text className="text-white text-2xl font-bold">‹</Text>
                        </TouchableOpacity>

                        {selectedIndex !== null && (
                            <ExpoImage
                                source={images[selectedIndex].source}
                                style={{ borderRadius: 10, width: W * 0.8, height: H * 0.8 }}
                                contentFit="contain"
                                transition={200}
                                priority="high"
                            />
                        )}

                        <TouchableOpacity onPress={next} className="p-5">
                            <Text className="text-white text-2xl font-bold">›</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}
