import * as React from 'react';
import Animated from 'react-native-reanimated';

import { Widget } from '@/hooks/useWidgets';
import { FlatList } from 'react-native-gesture-handler';
import { DockItem } from './DockItem';
import { Platform, View } from 'react-native';

const GROWTH_RADIUS = 0.5; // how many neighbors are affected

interface DockProps {
    carouselLocationStyle: { bottom: number };
    width: number;
    setIndex: (index: number) => void;
    widgets: Widget[];
}

const Dock = ({ carouselLocationStyle, width, setIndex, widgets }: DockProps) => {
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const itemSize = (width / widgets.length) * 0.8; // 80% of the space allocated

    return (
        <Animated.View
            style={[
                carouselLocationStyle,
                {
                    position: 'absolute',
                    left: 0,
                    bottom: 0,
                    right: 0,
                    zIndex: 10,
                    height: 180, // or whatever height you want for the dock bar
                    justifyContent: 'flex-end', // anchor children to bottom
                    alignItems: 'center',
                    opacity: 1,
                },
            ]}>
            <View
                style={{
                    position: 'absolute',
                    left: 20,
                    right: 20,
                    bottom: 0,
                    height: 70,
                    backgroundColor: '#ffffff47',
                    borderTopLeftRadius: 24,
                    borderTopRightRadius: 24,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: -4 },
                    shadowOpacity: 0.25,
                    shadowRadius: 12,
                    ...Platform.select({
                        web: {
                            boxShadow: '0px -4px 24px 0px rgba(0,0,0,0.25)',
                        },
                    }),
                }}
            />
            <FlatList
                data={widgets}
                keyExtractor={(_, index) => `spacer-${index}`}
                horizontal
                contentContainerStyle={{
                    alignItems: 'flex-end', // anchor items to bottom of FlatList
                    height: '100%',
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
                            itemSize={itemSize}
                            animationValue={animationValue}
                        />
                    );
                }}
            />
        </Animated.View>
    );
};

export default Dock;
