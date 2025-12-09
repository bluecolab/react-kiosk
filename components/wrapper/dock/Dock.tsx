import * as React from 'react';
import Animated from 'react-native-reanimated';

import { Widget } from '@/hooks/useWidgets';
import { FlatList } from 'react-native-gesture-handler';
import { DockItem } from './DockItem';
import { View } from 'react-native';
import { useState } from 'react';

const GROWTH_RADIUS = 0.5; // how many neighbors are affected

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
                        itemSizeHeight < itemSizeWidth ? itemSizeHeight * 1.5 : itemSizeWidth * 1.5,
                    justifyContent: 'flex-end', // anchor children to bottom
                    alignItems: 'center',
                    opacity: 1,
                },
            ]}>
            <View className="absolute left-5 right-5 bottom-0 h-[70px] bg-white/30 rounded-t-3xl shadow-lg" />

            <FlatList
                data={widgets}
                keyExtractor={(_, index) => `spacer-${index}`}
                horizontal
                contentContainerStyle={{
                    alignItems: 'flex-end', // anchor items to bottom of FlatList
                    height: '100%',
                    paddingHorizontal: 20,
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
        </Animated.View>
    );
};

export default Dock;
