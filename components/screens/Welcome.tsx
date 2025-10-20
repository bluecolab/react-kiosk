import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Modal, TextInput } from 'react-native'; //, Pressable for future use of Pressable component to toggle Crotter Mode

export default function WelcomeScreen() {
    const [isFeedbackVisible, setIsFeedbackVisible] = useState(false); // State to control feedback modal visibility
    const [feedback, setFeedback] = useState(''); // State to hold feedback text input by user
    const [showSuccess, setShowSuccess] = useState(false); // State to show success message after feedback submission
    const Cronin = require('@/assets/images/general/fall2025team.jpg');

    const handleSubmitFeedback = () => {
        if (!feedback.trim()) {
            alert('Please enter some feedback before submitting.');
            return;
        }

        // Get existing feedback from localStorage (if any) and parse it as JSON array
        const existingFeedback = localStorage.getItem('kioskFeedback');
        const feedbackArray = existingFeedback ? JSON.parse(existingFeedback) : [];

        // Add new feedback with timestamp and date to the array
        const newFeedback = {
            text: feedback,
            timestamp: new Date().toISOString(),
            date: new Date().toLocaleString(),
        };
        feedbackArray.push(newFeedback);

        // Save back to localStorage
        localStorage.setItem('kioskFeedback', JSON.stringify(feedbackArray));

        console.log('Feedback submitted:', newFeedback);
        console.log('All feedback:', feedbackArray);

        // Show success message
        setShowSuccess(true);
        setFeedback('');

        // Close modal after a short delay
        setTimeout(() => {
            setIsFeedbackVisible(false);
            setShowSuccess(false);
        }, 2000);
    };

    return (
        <View>
            <View style={{ position: 'absolute', top: 0, right: 0, zIndex: 1000 }}>
                <TouchableOpacity
                    onPress={() => setIsFeedbackVisible(true)} // Open feedback modal
                    style={{
                        backgroundColor: '#007AFF',
                        padding: 10,
                        borderRadius: 10,
                        marginTop: 5,
                        marginBottom: 5,
                        marginLeft: 5,
                        marginRight: 5,
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
                        <Text
                            style={{
                                fontSize: 20,
                                fontWeight: 'bold',
                                marginRight: 20,
                                marginBottom: 20,
                            }}>
                            Provide Your Feedback
                        </Text>
                        {showSuccess && (
                            <View
                                style={{
                                    backgroundColor: '#4CAF50',
                                    padding: 10,
                                    borderRadius: 5,
                                    marginBottom: 15,
                                }}>
                                <Text
                                    style={{
                                        color: 'white',
                                        textAlign: 'center',
                                        fontWeight: 'bold',
                                    }}>
                                    Thank you! Your feedback has been saved.
                                </Text>
                            </View>
                        )}
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
                <Image source={Cronin} style={{ width: 1857 * 0.75, height: 1080 * 0.75 }} />
            </View>
        </View>
    );
}
