import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import {
    getAllFeedback,
    clearAllFeedback,
    exportFeedbackAsJSON,
    exportFeedbackAsCSV,
    FeedbackItem,
} from '@/utils/feedbackStorage';

export default function FeedbackViewer({
    setShowFeedbackViewer,
}: {
    setShowFeedbackViewer: (visible: boolean) => void;
}) {
    const [feedbackList, setFeedbackList] = useState<FeedbackItem[]>([]);
    const [refreshKey, setRefreshKey] = useState(0);

    useEffect(() => {
        loadFeedback();
    }, [refreshKey]);

    const loadFeedback = () => {
        const feedback = getAllFeedback();
        setFeedbackList(feedback);
    };

    const handleClearAll = () => {
        if (confirm('Are you sure you want to delete all feedback?')) {
            clearAllFeedback();
            setRefreshKey((prev) => prev + 1);
        }
    };

    const handleExportJSON = () => {
        const json = exportFeedbackAsJSON();
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `kiosk-feedback-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        URL.revokeObjectURL(url);
    };

    const handleExportCSV = () => {
        const csv = exportFeedbackAsCSV();
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `kiosk-feedback-${new Date().toISOString().split('T')[0]}.csv`;
        link.click();
        URL.revokeObjectURL(url);
    };

    return (
        <View className="flex-1 bg-gray-100 p-5">
            <View className="mb-5">
                <Text className="text-2xl font-bold mb-4">
                    Feedback Submissions ({feedbackList.length})
                </Text>
                <View className="flex-row flex-wrap gap-2">
                    <Pressable
                        className="bg-blue-500 px-4 py-2 rounded"
                        onPress={() => setRefreshKey((prev) => prev + 1)}>
                        <Text className="text-white font-bold">Refresh</Text>
                    </Pressable>
                    <Pressable className="bg-blue-500 px-4 py-2 rounded" onPress={handleExportJSON}>
                        <Text className="text-white font-bold">Export JSON</Text>
                    </Pressable>
                    <Pressable className="bg-blue-500 px-4 py-2 rounded" onPress={handleExportCSV}>
                        <Text className="text-white font-bold">Export CSV</Text>
                    </Pressable>
                    <Pressable className="bg-red-500 px-4 py-2 rounded" onPress={handleClearAll}>
                        <Text className="text-white font-bold">Clear All</Text>
                    </Pressable>
                    <Pressable
                        className="bg-red-500 px-4 py-2 rounded"
                        onPress={() => setShowFeedbackViewer(false)}>
                        <Text className="text-white font-bold">Close</Text>
                    </Pressable>
                </View>
            </View>

            <ScrollView className="flex-1">
                {feedbackList.length === 0 ? (
                    <Text className="text-center text-gray-500 text-base mt-12">
                        No feedback submissions yet.
                    </Text>
                ) : (
                    feedbackList.map((item, index) => (
                        <View key={index} className="bg-white p-4 rounded-lg mb-3 shadow">
                            <Text className="text-xs text-gray-500 mb-2">{item.date}</Text>
                            <Text className="text-sm text-gray-800">{item.text}</Text>
                        </View>
                    ))
                )}
            </ScrollView>
        </View>
    );
}
