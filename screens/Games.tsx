import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Pressable,
  Image,
  Platform,
} from 'react-native';
import { WebView } from 'react-native-webview';

const games = [
  {
    name: 'Jeopardy',
    description: 'Learn more about water while having fun.',
    creator: 'Keathson Lam',
    img: require('../assets/images/general/jeopardy.jpg'),
    url: 'https://bluecolab.github.io/BlueCoLab-Jeopardy/',
  },
  {
    name: 'Cronin Cruise',
    description: 'The one and only Cronin hops over sharks. Based off of Google Chrome dinosaur game.',
    creator: 'Daniel White & Jack Sullivan',
    img: require('../assets/images/general/cronincruise.jpg'),
    url: 'https://bluecolab.github.io/Games/Dinosaur%20Game%20Build/',
  },
  {
    name: 'Splashy Fish',
    description: 'Flappy bird remake.',
    creator: 'Daniel White & Jack Sullivan',
    img: require('../assets/images/general/splashyfish.jpg'),
    url: 'https://bluecolab.github.io/Games/Flappy%20Game%20Build/',
  },
];

export default function Games() {
  const [currentGame, setCurrentGame] = useState(games[0]);
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Play interactive games to learn about water!</Text>

      <View style={styles.gameList}>
        {games.map((game, index) => (
          <TouchableOpacity key={index} onPress={() => setCurrentGame(game)}>
            <Text style={styles.gameItem}>{game.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.preview}>
        <Text style={styles.title}>{currentGame.name}</Text>
        <Text style={styles.subTitle}>Created by: {currentGame.creator}</Text>
        <Text style={styles.description}>{currentGame.description}</Text>
        <Image source={currentGame.img} style={styles.image} resizeMode="contain" />
        <Pressable style={styles.button} onPress={() => setModalVisible(true)}>
          <Text style={styles.buttonText}>Play Game</Text>
        </Pressable>
      </View>

      <Modal visible={modalVisible} animationType="slide">
        <View style={{ flex: 1 }}>
          <View style={styles.modalHeader}>
            <Pressable onPress={() => setModalVisible(false)}>
              <Text style={styles.backText}>← Back</Text>
            </Pressable>
            <Text style={styles.modalTitle}>{currentGame.name}</Text>
          </View>

          {Platform.OS === 'web' ? (
            <View style={styles.iframeContainer}>
              <iframe
                src={currentGame.url}
                style={styles.iframe}
                allowFullScreen
              />
            </View>
          ) : (
            <WebView
              source={{ uri: currentGame.url }}
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
  gameList: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
    flexWrap: 'wrap',
  },
  gameItem: {
    backgroundColor: '#fff',
    padding: 8,
    margin: 4,
    borderRadius: 8,
    textAlign: 'center',
    fontWeight: 'bold',
    elevation: 2,
  },
  preview: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
    elevation: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 16,
    marginVertical: 4,
  },
  description: {
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#000080',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
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
  webview: {
    flex: 1,
  },
  iframeContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  iframe: {
    flex: 1,
    width: '100%',
    height: '100%',
    // border: 'none',
  },
});
