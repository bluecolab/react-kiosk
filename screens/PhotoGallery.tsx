import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Dimensions,
} from 'react-native';
import { images } from '@/hooks/useGalleryImages';

export default function PhotoGallery() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const { width: W, height: H } = Dimensions.get('window');

  const open = (i: number) => setSelectedIndex(i);
  const close = () => setSelectedIndex(null);
  const prev = () =>
    selectedIndex !== null &&
    setSelectedIndex((selectedIndex + images.length - 1) % images.length);
  const next = () =>
    selectedIndex !== null &&
    setSelectedIndex((selectedIndex + 1) % images.length);

  return (
    <View style={styles.wrapper}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.galleryList}>
          {images.map((img, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => open(i)}
              style={styles.imageBox}
            >
              <Image
                source={img.source}
                style={styles.image}
                resizeMode="cover"
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Lightbox Modal */}
      <Modal
        visible={selectedIndex !== null}
        transparent
        onRequestClose={close}
      >
        <View style={styles.modalOverlay}>
          {/* close on tap outside */}
          <TouchableOpacity style={styles.closeArea} onPress={close} />

          <View style={styles.modalContent}>
            <TouchableOpacity onPress={prev} style={styles.navButton}>
              <Text style={styles.navText}>‹</Text>
            </TouchableOpacity>

            <Image
              source={
                images[selectedIndex !== null ? selectedIndex : 0].source
              }
              style={[
                styles.fullImage,
                { width: W * 0.8, height: H * 0.8 },
              ]}
              resizeMode="contain"
            />

            <TouchableOpacity onPress={next} style={styles.navButton}>
              <Text style={styles.navText}>›</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { flex: 1 },
  container: {
    padding: 20,
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  galleryList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  imageBox: {
    margin: 8,
  },
  image: {
    width: 500,     // ↑ bumped size
    height: 350 ,    // ↑ bumped size
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ccc',
  },

  // — Lightbox styles —
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.85)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeArea: {
    ...StyleSheet.absoluteFillObject, 
  },
  modalContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  navButton: {
    padding: 20,
  },
  navText: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
  },
  fullImage: {
    borderRadius: 10,
  },
});
