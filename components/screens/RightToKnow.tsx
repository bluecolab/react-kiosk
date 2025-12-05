import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useTranslation } from 'react-i18next';

const infoItems = [
    {
        titleKey: 'rightToKnow.team2023',
        descriptionKey: 'rightToKnow.descriptionR2K2023',
        studentsKey: 'rightToKnow.studentsR2K2023',
        img: require('@/assets/images/general/R2K2023.jpg'),
        textKey: 'rightToKnow.textR2K2023',
    },
    {
        titleKey: 'rightToKnow.team2024',
        descriptionKey: 'rightToKnow.descriptionR2K2024',
        studentsKey: 'rightToKnow.studentsR2K2024',
        img: require('@/assets/images/general/R2K2024.jpg'),
        textKey: 'rightToKnow.textR2K2024',
    },
    {
        titleKey: 'rightToKnow.team2025',
        descriptionKey: 'rightToKnow.descriptionR2K2025',
        studentsKey: 'rightToKnow.studentsR2K2025',
        img: require('@/assets/images/general/R2K2025.jpg'),
        textKey: 'rightToKnow.textR2K2025',
    },
];

export default function RightToKnow() {
    const { t } = useTranslation();

    const [currentItem, setCurrentItem] = useState(infoItems[0]);

    return (
        <View style={styles.container}>
            <Text style={styles.header}>{t('rightToKnow.mainHeading')}</Text>
            <Text
                style={{
                    fontSize: 16,
                    textAlign: 'center',
                }}>
                {t('rightToKnow.introText')}
            </Text>
            <View style={styles.tabBar}>
                {infoItems.map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[
                            styles.tab,
                            currentItem.titleKey === item.titleKey && styles.activeTab,
                        ]}
                        onPress={() => setCurrentItem(item)}>
                        <Text style={styles.tabText}>{t(item.titleKey)}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <View style={styles.content}>
                <Text style={styles.title}>{t(currentItem.titleKey)}</Text>
                <Text style={styles.description}>{t(currentItem.descriptionKey)}</Text>
                <Image source={currentItem.img} style={styles.image} resizeMode="contain" />
                <Text style={styles.students}>{t(currentItem.studentsKey)}</Text>
                <Text style={styles.text}>{t(currentItem.textKey)}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        padding: 16,
        backgroundColor: '#f0f0f0',
    },
    header: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    tabBar: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 8,
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
        backgroundColor: '#55aaffff',
    },
    tabText: {
        fontSize: 25,
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
        fontSize: 40,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    description: {
        fontSize: 25,
        textAlign: 'center',
        marginBottom: 10,
    },
    image: {
        height: 500,
        marginBottom: 20,
        marginTop: 20,
    },
    students: {
        fontSize: 20,
        textAlign: 'center',
    },
    text: {
        fontSize: 20,
        marginTop: 50,
    },
});
