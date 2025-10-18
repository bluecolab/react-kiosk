import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import {
    getAllFeedback,
    clearAllFeedback,
    exportFeedbackAsJSON,
    exportFeedbackAsCSV,
    FeedbackItem,
} from '@/utils/feedbackStorage';

export default function FeedbackViewer() {
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
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Feedback Submissions ({feedbackList.length})</Text>
                <View style={styles.buttonRow}>
                    <Pressable
                        style={styles.button}
                        onPress={() => setRefreshKey((prev) => prev + 1)}>
                        <Text style={styles.buttonText}>Refresh</Text>
                    </Pressable>
                    <Pressable style={styles.button} onPress={handleExportJSON}>
                        <Text style={styles.buttonText}>Export JSON</Text>
                    </Pressable>
                    <Pressable style={styles.button} onPress={handleExportCSV}>
                        <Text style={styles.buttonText}>Export CSV</Text>
                    </Pressable>
                    <Pressable
                        style={[styles.button, styles.dangerButton]}
                        onPress={handleClearAll}>
                        <Text style={styles.buttonText}>Clear All</Text>
                    </Pressable>
                </View>
            </View>

            <ScrollView style={styles.scrollView}>
                {feedbackList.length === 0 ? (
                    <Text style={styles.emptyText}>No feedback submissions yet.</Text>
                ) : (
                    feedbackList.map((item, index) => (
                        <View key={index} style={styles.feedbackItem}>
                            <Text style={styles.date}>{item.date}</Text>
                            <Text style={styles.feedbackText}>{item.text}</Text>
                        </View>
                    ))
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 20,
    },
    header: {
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    buttonRow: {
        flexDirection: 'row',
        gap: 10,
        flexWrap: 'wrap',
    },
    button: {
        backgroundColor: '#007AFF',
        padding: 10,
        borderRadius: 5,
    },
    dangerButton: {
        backgroundColor: '#ff3b30',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    scrollView: {
        flex: 1,
    },
    emptyText: {
        textAlign: 'center',
        color: '#666',
        fontSize: 16,
        marginTop: 50,
    },
    feedbackItem: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    date: {
        fontSize: 12,
        color: '#666',
        marginBottom: 8,
    },
    feedbackText: {
        fontSize: 14,
        color: '#333',
    },
});
