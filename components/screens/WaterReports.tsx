import React, { useState } from 'react';
import { View, Text, Modal, Pressable, StyleSheet, Platform, Image } from 'react-native';
import { useWaterReports } from '@/hooks/useWaterReports';
import { WebView } from 'react-native-webview';

export default function WaterReport() {
    const waterReports = useWaterReports();
    const [isModalVisible, setModalVisible] = useState(false);
    const [pdfUri, setPdfUri] = useState<string | null>(null);
    const [currentTitle, setCurrentTitle] = useState<string | null>(null);
    const [selectedYear, setSelectedYear] = useState<string | null>(null);

    const openPdfModal = (uri: string, title: string) => {
        setPdfUri(uri);
        setCurrentTitle(title);
        setModalVisible(true);
    };

    const closePdfModal = () => {
        setModalVisible(false);
        setPdfUri(null);
        setCurrentTitle(null);
    };

    return (
        <View style={styles.container}>
            <View style={styles.bookContainer}>
                <Image source={{}} style={styles.bookBackground} />
                <View style={styles.yearSelector}>
                    <Text style={styles.bookTitle}> Pace University Water Quality Reports</Text>{' '}
                    {/* Updated title for clarity */}
                    <Text
                        style={{
                            fontSize: 16,
                            marginBottom: 10,
                            color: '#333',
                            textAlign: 'center',
                        }}>
                        At Pace University, we are committed to providing transparent information
                        about the quality of our water. Pace itself is known for it's water supply
                        initiatives and sustainability efforts rather than it's role as a water
                        supplier itself. Specifically in the Pleasantville campus it is considered a
                        "Community Water System" by the EPA, meaning it serves at least 25 people
                        for at least 60 days a year. Our water is supplied by the Town of Mount
                        Pleasant and is regularly tested to ensure it meets all federal and state
                        water quality standards.
                    </Text>
                    <Text
                        style={{
                            fontSize: 16,
                            marginBottom: 20,
                            color: '#333',
                            textAlign: 'center',
                        }}>
                        The goal for all water consumers is to be well-aware of the quality of their
                        water and any potential contaminants that may be present. With the advanced
                        framework brought to you by Blue Colab, we encourage you to explore our
                        annual water quality reports below to learn more about the safety and
                        quality of the water we provide.
                    </Text>
                    <View style={styles.yearGrid}>
                        {waterReports.map((report, index) => {
                            const year = report.title.match(/\d{4}/)?.[0];
                            return (
                                <Pressable
                                    key={index}
                                    style={[
                                        styles.yearButton,
                                        selectedYear === year && styles.selectedYear,
                                    ]}
                                    onPress={() => {
                                        setSelectedYear(year || null);
                                        openPdfModal(report.url, report.title);
                                    }}>
                                    <Text style={styles.yearText}>{year}</Text>
                                </Pressable>
                            );
                        })}
                    </View>
                </View>
            </View>

            <Text
                style={{
                    marginTop: 20,
                    fontSize: 18,
                    fontWeight: 'bold',
                    color: '#333',
                    textAlign: 'center',
                }}>
                Water Quality Reports are updated annually in compliance with EPA regulations.
            </Text>

            <Text style={{ marginTop: 20, fontSize: 16, color: '#555', textAlign: 'center' }}>
                Select a year to view the corresponding Water Quality Report.
            </Text>

            <Text style={{ marginTop: 10, fontSize: 14, color: '#777', textAlign: 'center' }}>
                (Reports are provided in PDF format.)
            </Text>

            <Modal visible={isModalVisible} animationType="slide">
                <View style={{ flex: 1 }}>
                    <View style={styles.modalHeader}>
                        <Pressable onPress={closePdfModal}>
                            <Text style={styles.backText}>← Back</Text>
                        </Pressable>
                        <Text style={styles.modalTitle}>{currentTitle}</Text>
                    </View>

                    {pdfUri && Platform.OS === 'web' ? (
                        <View style={styles.iframeContainer}>
                            <iframe
                                src={`${pdfUri}#toolbar=0`}
                                style={styles.iframe}
                                allowFullScreen
                                title="PDF Viewer"
                            />
                        </View>
                    ) : (
                        <WebView
                            source={{ uri: pdfUri || '' }}
                            style={styles.webview}
                            allowsFullscreenVideo
                        />
                    )}
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#f5f5f5',
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    bookContainer: {
        width: '80%',
        maxWidth: 800,
        height: 500,
        position: 'relative',
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 20,
        overflow: 'hidden',
    },
    bookBackground: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    yearSelector: {
        flex: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        padding: 20,
    },
    bookTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 30,
        color: '#000080',
    },
    yearGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 15,
        padding: 20,
    },
    yearButton: {
        backgroundColor: '#f0f0f0',
        padding: 16,
        borderRadius: 8,
        minWidth: 100,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    selectedYear: {
        backgroundColor: '#000080',
    },
    yearText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000080',
    },
    modalHeader: {
        backgroundColor: '#6299ffff',
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
    },
    backText: {
        color: '#fff',
        fontSize: 18,
        marginRight: 12,
    },
    modalTitle: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    iframeContainer: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    iframe: {
        width: '100%',
        height: '100%',
        // border: 'none',
    },
    webview: {
        flex: 1,
    },
});
