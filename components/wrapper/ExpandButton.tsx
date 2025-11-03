import { TouchableOpacity, Text, View } from 'react-native';

interface ExpandButtonProps {
    isExpanded: boolean;
    onPress: () => void;
}

export default function ExpandButton({ isExpanded, onPress }: ExpandButtonProps) {
    return (
        <View
            style={{
                height: 0,
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
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
