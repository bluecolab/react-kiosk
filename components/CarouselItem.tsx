import React, { useState } from "react";
import { Modal, TouchableWithoutFeedback, View, Text, StyleSheet, Pressable } from "react-native";
import Animated, { Extrapolation, interpolate, SharedValue, useAnimatedStyle } from "react-native-reanimated";


interface Widget {
    title: string;
    image: number;
} // make this a global import

interface CustomItemProps {
    item: Widget;
    animationValue: SharedValue<number>;
}

const CustomItem: React.FC<CustomItemProps> = ({ item, animationValue }) => {
    const fadeStyle = useAnimatedStyle(() => {
        const opacity = interpolate(
            animationValue.value,
            [-4, -3, -2, -1, 0, 1, 2, 3, 4],
            [0.05, 0.25, 0.5, 0.75, 1, 0.75, 0.5, 0.25, 0.05],
            Extrapolation.CLAMP,
        );


        return {
            opacity,
        };
    }, [animationValue]);

    return (
        <View style={{
            width: '100%',
            height: '100%',
        }}>
            <Animated.Text style={[{
                alignSelf: 'center',
                color: 'white',
                fontWeight: 'bold',
            }, fadeStyle]}>
                {item.title}
            </Animated.Text>

            <Animated.Image
                source={item.image}
                style={[{
                    width: '100%',
                    height: '100%',
                    resizeMode: 'contain',
                }, fadeStyle]}
                borderRadius={50}
            />
        </View>
    );
};

interface CarouselItemProps {
    index: number;
    widgets: Widget[];
    animationValue: SharedValue<number>;
}

const CarouselItem: React.FC<CarouselItemProps> = ({ index, widgets, animationValue }) => {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Hello World!</Text>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}>
                            <Text style={styles.textStyle}>Hide Modal</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>

            <TouchableWithoutFeedback
                key={index}
                onPress={() => {
                    if (animationValue.value === 0)
                        setModalVisible(true);
                }}
            >
                <View style={{ flex: 1 }}>
                    <CustomItem item={widgets[index]} animationValue={animationValue} />
                </View>
            </TouchableWithoutFeedback>
        </>
    );

}

export default CarouselItem;


const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        margin: 20,
        backgroundColor: '#111111dd',
        borderRadius: 20,
        padding: 15,
        alignItems: 'center',
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: "98%",
        height: "70%",
        position: 'absolute',
        left: 0,
        top: 0
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        color: 'white',

    },
});