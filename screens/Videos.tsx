import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import About from '../assets/videos/Blue-CoLab.mp4';
import Fellowship from '../assets/videos/fellowship.webm';
import Sonification from '../assets/videos/Choate Pond Sonification, Pace 1080.mp4';
import ClearWaterSail from '../assets/videos/Clearwater sails.mp4';

const videos = [
  { src: About, type: 'video/mp4', title: 'Blue CoLab Intro' },
  { src: Fellowship, type: 'video/webm', title: 'Fellowship Video' },
  { src: Sonification, type: 'video/mp4', title: 'Pond Sonification' },
  { src: ClearWaterSail, type: 'video/mp4', title: 'Clearwater Sail' },
];

const VideoComponent: React.FC<{ src: string; type: string }> = ({ src, type }) => (
  <video
    width="500"
    preload="auto"
    controls
    controlsList="nodownload noremoteplayback noplaybackrate"
    disablePictureInPicture
    style={styles.video}
  >
    <source src={src} type={type} />
    Your browser does not support the video tag.
  </video>
);

export default function Videos() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Watch educational videos on water science!</Text>
      <View style={styles.videoList}>
        {videos.map((video, index) => (
          <View key={index} style={styles.videoBox}>
            <VideoComponent src={video.src} type={video.type} />
            <Text style={styles.videoTitle}>{video.title}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  videoList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 16,
  },
  videoBox: {
    margin: 10,
    alignItems: 'center',
  },
  video: {
    borderRadius: 10,
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
  },
  videoTitle: {
    marginTop: 8,
    fontSize: 14,
    textAlign: 'center',
  },
});
