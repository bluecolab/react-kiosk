import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  Pressable,
  StyleSheet,
  Platform,
} from 'react-native';
import { useWaterReports } from '@/hooks/useWaterReports';
import { WebView } from 'react-native-webview';

export default function WaterReport() {
  const waterReports = useWaterReports();
  const [isModalVisible, setModalVisible] = useState(false);
  const [pdfUri, setPdfUri] = useState<string | null>(null);
  const [currentTitle, setCurrentTitle] = useState<string | null>(null);

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
      {waterReports.map((report, index) => (
        <Pressable
          key={index}
          style={styles.button}
          onPress={() => openPdfModal(report.url, report.title)}
        >
          <Text style={styles.buttonText}>{`Preview ${report.title}`}</Text>
        </Pressable>
      ))}

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
    backgroundColor: '#eee',
    flex: 1,
    width: '100%',
  },
  header: {
    fontSize: 18,
    marginBottom: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#000080',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    marginVertical: 6,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  modalHeader: {
    backgroundColor: '#000080',
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
