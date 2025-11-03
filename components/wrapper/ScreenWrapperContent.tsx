import { ScrollView, Text } from 'react-native';
import Animated from 'react-native-reanimated';

interface ScreenWrapperContentProps {
    title: string;
    screen: React.ReactNode;
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
                style={{ width: '100%' }}
                contentContainerStyle={{ alignItems: 'center' }}
                showsVerticalScrollIndicator={true}
                persistentScrollbar={true}>
                <Text
                    style={{
                        textAlign: 'center',
                        color: 'black',
                        fontSize: 45,
                        fontWeight: 'bold',
                        marginBottom: 10,
                    }}>
                    {title}
                </Text>
                {screen}
            </ScrollView>
        </Animated.View>
    );
}
