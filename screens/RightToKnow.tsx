import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';

const infoItems = [
  {
    title: '2023 Team',
    description: 'Right to Know - 2023',
    students: 'Left to right, from the top: Cece Porter, Lilah McCormack, Louisa Moquete, Sasha Palmer, Meryl Mizell, Sasha Breygina.',
    img: require('../assets/images/general/R2K2023.jpg'),
  },
  {
    title: '2024 Team',
    description: 'Right to Know - 2024',
    students: 'Left to right, from the top: Ian Shimba, Isabella Coraci, Lizi Imedashvili, Sebastian Roman, Phoenix Ellrodt, Victor Lima, Charles Metayer.',
    img: require('../assets/images/general/R2K2024.jpg'),
  },
];

export default function RightToKnow() {
  const [currentItem, setCurrentItem] = useState(infoItems[0]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Understand Your Right to Know About Water Quality</Text>

      <View style={styles.tabBar}>
        {infoItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.tab,
              currentItem.title === item.title && styles.activeTab,
            ]}
            onPress={() => setCurrentItem(item)}
          >
            <Text style={styles.tabText}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>{currentItem.title}</Text>
        <Text style={styles.description}>{currentItem.description}</Text>
        <Image source={currentItem.img} style={styles.image} resizeMode="contain" />
        <Text style={styles.description}>{currentItem.students}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f0f0f0',
    flex: 1,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
    flexWrap: 'wrap',
  },
  tab: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#ddd',
    borderRadius: 6,
    margin: 4,
  },
  activeTab: {
    backgroundColor: '#0066cc',
  },
  tabText: {
    color: '#000',
    fontWeight: 'bold',
  },
  content: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
    elevation: 2,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 10,
  },
  image: {
    width: 400,
    height: 250,
  },
});
