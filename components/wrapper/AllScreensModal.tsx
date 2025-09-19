import { useWidgets } from '@/hooks/useWidgets';
import { Modal, Pressable, View, Image, Text, FlatList, Dimensions } from 'react-native';
import FloatingButton from '../FloatingButton';

interface AllScreensModalProps {
    isModalOpen: boolean;
    setIsModalOpen: (isOpen: boolean) => void;
    ref: React.RefObject<any>;
    setIndex: (index: number) => void;
}

export default function AllScreensModal({
    isModalOpen,
    setIsModalOpen,
    ref,
    setIndex,
}: AllScreensModalProps) {
    const widgets = useWidgets();

    const closeModal = (index: number) => {
        setIsModalOpen(false);
        ref.current?.scrollTo({ index, animated: true });
        setIndex(index);
    };

    const modalWidth = Dimensions.get('window').width * 0.98; // matches your modal width
    const itemSize = modalWidth * 0.185;

    return (
        <Modal visible={isModalOpen} transparent animationType="slide">
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(0,0,0,0.3)', // semi-transparent overlay
                }}>
                <View
                    style={{
                        width: '98%',
                        height: '98%',
                        padding: 24,
                        backgroundColor: '#ffff',
                        borderRadius: 20,
                    }}>
                    <FlatList
                        data={widgets}
                        numColumns={5}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => (
                            <Pressable onPress={() => closeModal(index)} key={index}>
                                <View
                                    style={{
                                        width: itemSize,
                                        height: itemSize,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}>
                                    <Image
                                        style={{
                                            width: itemSize * 0.7,
                                            height: itemSize * 0.7,
                                            // borderRadius: itemSize * 0.35,
                                            alignSelf: 'center',
                                        }}
                                        source={item.image}
                                    />
                                    <Text
                                        style={{
                                            color: 'black',
                                            fontWeight: 'bold',
                                            textAlign: 'center',
                                            fontSize: 25,
                                        }}>
                                        {item.title}
                                    </Text>
                                </View>
                            </Pressable>
                        )}
                    />
                </View>
            </View>

            <FloatingButton setIsModalOpen={setIsModalOpen} close />
        </Modal>
    );
}
