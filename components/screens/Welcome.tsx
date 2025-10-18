import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Modal, TextInput } from 'react-native'; //, Pressable for future use of Pressable component to toggle Crotter Mode

export default function WelcomeScreen() {
    const [isFeedbackVisible, setIsFeedbackVisible] = useState(false); // State to control feedback modal visibility
    const [feedback, setFeedback] = useState(''); // State to hold feedback text
    let localStorage = window.localStorage; // Access localStorage for Crotter Mode
    let Cronin = require('@/assets/images/crotters/Crotter.png'); // Crotter Image
    // let gif = require('@/assets/images/general/Scroll.gif'); // Future use for scroll indicator

    const handleSubmitFeedback = () => {
        // Here you would typically send the feedback to a server or store it
        console.log('Feedback submitted:', feedback);
        setFeedback('');
        setIsFeedbackVisible(false); // Close the modal after submission
    };

    return (
        <View>
            <View style={{ position: 'absolute', top: 0, right: 0, zIndex: 1000 }}>
                <TouchableOpacity
                    onPress={() => setIsFeedbackVisible(true)} // Open feedback modal
                    style={{
                        backgroundColor: '#007AFF',
                        padding: 8,
                        borderRadius: 10,
                        marginTop: 5,
                        marginBottom: 50,
                        marginLeft: 10,
                        marginRight: 10,
                    }}>
                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 12 }}>
                        Feedback
                    </Text>
                </TouchableOpacity>
            </View>

            <Modal
                visible={isFeedbackVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setIsFeedbackVisible(false)}>
                <View
                    style={{
                        flex: 2,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    }}>
                    <View
                        style={{
                            backgroundColor: 'white',
                            padding: 20,
                            borderRadius: 10,
                            width: '100%',
                            maxWidth: 500,
                        }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', marginRight: 20, marginBottom: 20 }}>
                            Provide Your Feedback
                        </Text>
                        <TextInput
                            value={feedback}
                            onChangeText={setFeedback}
                            multiline
                            numberOfLines={4}
                            style={{
                                borderWidth: 1,
                                borderColor: '#ccc',
                                borderRadius: 5,
                                padding: 10,
                                marginBottom: 15,
                                textAlignVertical: 'top',
                            }}
                            placeholder="Enter your feedback here..."
                        />
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: 10 }}>
                            <TouchableOpacity
                                onPress={() => setIsFeedbackVisible(false)}
                                style={{
                                    backgroundColor: '#ff3b30',
                                    padding: 10,
                                    borderRadius: 5,
                                }}>
                                <Text style={{ color: 'white' }}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={handleSubmitFeedback}
                                style={{
                                    backgroundColor: '#007AFF',
                                    padding: 10,
                                    borderRadius: 5,
                                }}>
                                <Text style={{ color: 'white' }}>Submit</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            <Text
                style={{
                    textAlign: 'center',
                    fontSize: 24,
                    fontWeight: 'bold',
                    marginTop: 40,
                    marginBottom: 30,
                }}>
                Welcome to Blue CoLab's Kiosk! {/* Added space for better readability */}
            </Text>

            <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                {/* <Pressable
                    onPress={() => {
                        console.log('Crotter Mode Enabled');
                        localStorage.setItem('crotterMode', 'true'); // Enable Crotter Mode on press
                        window.location.reload(); // Reload to apply changes
                    }}>
                </Pressable> */}
                <View
                    style={{ height: 500, flex: 1 }}
                    onStartShouldSetResponder={() => true}
                    onResponderRelease={() => {
                        if (localStorage.getItem('crotterMode') === 'true') {
                            console.log('Crotter Mode Disabled :(');
                            localStorage.setItem('crotterMode', 'false');
                            window.location.reload();
                        } else {
                            console.log('Crotter Mode Enabled');
                            localStorage.setItem('crotterMode', 'true');
                            window.location.reload(); // Reload to apply changes
                        }
                    }}>
                    <Image source={Cronin} style={{ height: 490, width: '100%' }} />
                </View>
                {/* </Pressable> */} {/* Left Side with Image */}
            </View>
        </View>
    );
}
