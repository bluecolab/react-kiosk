import { TouchableOpacity, Text, View } from 'react-native';

interface ExpandButtonProps {
    isExpanded: boolean;
    onPress: () => void;
}

export default function ExpandButton({ isExpanded, onPress }: ExpandButtonProps) {
    return (
        <View
            style={{
                position: 'relative',
                bottom: 40,
                padding: 10,
                borderRadius: 10,
                zIndex: 15,
                width: '98%',
            }}>
            <TouchableOpacity onPress={onPress}>
                <Text
                    style={{
                        color: 'black',
                        alignContent: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                        fontSize: 18,
                    }}>
                    {isExpanded ? '△ Shrink △' : '▽ Expand ▽'}
                </Text>
            </TouchableOpacity>
        </View>
    );
}
