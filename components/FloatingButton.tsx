import { Platform, TouchableOpacity, View, Text } from 'react-native';

interface FloatingButtonProps {
    setIsModalOpen: (isOpen: boolean) => void;
    close?: boolean;
}

export default function FloatingButton({ setIsModalOpen, close }: FloatingButtonProps) {
    return (
        <View
            style={{
                position: 'absolute',
                bottom: 15,
                padding: 5,
                left: '50%',
                transform: [{ translateX: '-50%' }],
                borderRadius: 20,
                zIndex: 15,
                width: '10%',
                backgroundColor: close ? 'rgba(255, 70, 70, 0.38)' : 'rgba(255,255,255,0.6)', // glassy white
                shadowOpacity: 0.15,
                shadowRadius: 20,
                shadowOffset: { width: 0, height: 8 },
                ...(Platform.OS === 'web' ? { backdropFilter: 'blur(20px)' } : {}),
            }}>
            <TouchableOpacity
                onPress={() => {
                    if (close) {
                        setIsModalOpen(false);
                    } else {
                        setIsModalOpen(true);
                    }
                }}>
                <Text
                    style={{
                        color: 'black',
                        alignContent: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                        fontSize: close ? 25 : 16,
                        textShadowColor: '#ffffff',
                        textShadowOffset: { width: 0, height: 0 },
                        textShadowRadius: 8,
                    }}>
                    {close ? 'Close' : 'Show All'}
                </Text>
            </TouchableOpacity>
        </View>
    );
}
