import { ReactNode } from 'react';
import { ScrollView, Text } from 'react-native';
import Animated from 'react-native-reanimated';

interface ScreenWrapperContentProps {
    title: string;
    screen: ReactNode;
    contentAreaHeightStyle: {
        height: number;
        backgroundColor: string;
        width: number;
        borderRadius: number;
        marginTop: number;
    };
}

export default function ScreenWrapperContent({
    title,
    screen,
    contentAreaHeightStyle,
}: ScreenWrapperContentProps) {
    return (
        <Animated.View
            style={[
                {
                    padding: 15,
                    alignItems: 'center',
                    paddingBottom: 30,
                    width: '100%',
                },
                contentAreaHeightStyle,
            ]}>
            <ScrollView
                className="w-full"
                contentContainerClassName="items-center"
                showsVerticalScrollIndicator={true}
                persistentScrollbar={true}>
                <Text className="text-center text-black dark:text-white font-bold mb-2 text-title">
                    {title}
                </Text>
                {screen}
            </ScrollView>
        </Animated.View>
    );
}
