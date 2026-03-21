import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Modal, TextInput, Pressable } from 'react-native';
import { DynamicImage } from '@/components/DynamicImage';
import { useTranslation } from 'react-i18next';
import FeedbackViewer from '../FeedbackViewer';

export default function WelcomeScreen() {
    const { t } = useTranslation();
    const [isFeedbackVisible, setIsFeedbackVisible] = useState(false); // State to control feedback modal visibility
    const [feedback, setFeedback] = useState(''); // State to hold feedback text input by user
    const [showFeedbackViewer, setShowFeedbackViewer] = useState(false); // State to control feedback viewer modal visibility
    const [showSuccess, setShowSuccess] = useState(false); // State to show success message after feedback submission
    const Cronin = require('@/assets/images/general/spring2026team.jpg');
    const crotter = require('@/assets/images/crotters/Crotter.png');
    let localStorage = window.localStorage; // Access localStorage for Crotter Mode and feedback storage

    const handleSubmitFeedback = () => {
        if (!feedback.trim()) {
            alert(t('feedback.emptyError'));
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
        <View className="relative">
            <View className="absolute top-2 right-2 z-50 flex-row gap-2 items-center">
                <Pressable
                    onPress={() => setIsFeedbackVisible(true)}
                    className="bg-blue-500 px-4 py-2 rounded-xl mt-1 mb-1 ml-1 mr-1">
                    <Text className="text-white font-bold text-xs">{t('feedback.button')}</Text>
                </Pressable>
            </View>
            <Text className="text-center text-h2 font-bold mt-10 mb-8">
                {t('widgets.welcome')} to Blue CoLab's Kiosk!
            </Text>

            <View className="flex-row items-start justify-center">
                <DynamicImage imgSource={Cronin} width={1392.75} />
            </View>

            <Pressable onPress={() => setShowFeedbackViewer(true)}>
                <Image
                    source={crotter}
                    style={{ width: 50, height: 50, alignSelf: 'center', marginTop: 20 }}
                />
            </Pressable>

            <Modal
                visible={isFeedbackVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setIsFeedbackVisible(false)}>
                <View className="flex-1 justify-center items-center bg-black/50">
                    <View className="bg-white p-5 rounded-xl w-full max-w-[500px]">
                        <Text className="text-xl font-bold mb-5">{t('feedback.title')}</Text>
                        {showSuccess && (
                            <View className="bg-green-600 p-3 rounded mb-4">
                                <Text className="text-white text-center font-bold">
                                    {t('feedback.success')}
                                </Text>
                            </View>
                        )}
                        <TextInput
                            value={feedback}
                            onChangeText={setFeedback}
                            multiline
                            numberOfLines={4}
                            className="border border-gray-300 rounded p-3 mb-4 text-base"
                            placeholder={t('feedback.placeholder')}
                            style={{ textAlignVertical: 'top' }}
                        />
                        <View className="flex-row justify-end gap-3">
                            <TouchableOpacity
                                onPress={() => setIsFeedbackVisible(false)}
                                className="bg-red-500 px-4 py-2 rounded">
                                <Text className="text-white">{t('feedback.cancel')}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={handleSubmitFeedback}
                                className="bg-blue-500 px-4 py-2 rounded">
                                <Text className="text-white">{t('feedback.submit')}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            <Modal
                visible={showFeedbackViewer}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setShowFeedbackViewer(false)}>
                <View className="flex-1 justify-center items-center bg-black/50">
                    <View className="w-full max-w-[600px] bg-white rounded-xl p-5">
                        <FeedbackViewer setShowFeedbackViewer={setShowFeedbackViewer} />
                    </View>
                </View>
            </Modal>
        </View>
    );
}
