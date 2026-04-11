import { Pressable, Text, View } from 'react-native';

interface ExpandButtonProps {
    isExpanded: boolean;
    onPress: () => void;
}

export default function ExpandButton({ isExpanded, onPress }: ExpandButtonProps) {
    return (
        <View
            className="h-0 justify-center items-center w-full mb-2 border-t-0 border-t-black"
            style={{ bottom: 15 }}>
            <Pressable onPress={onPress}>
                <Text className="text-black text-center text-body">
                    {isExpanded ? '△ Shrink △' : '▽ Expand ▽'}
                </Text>
            </Pressable>
        </View>
    );
}
