import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const infoItems = [
    {
        title: '2023 Team',
        description: 'Right to Know H2O - 2023',
        students:
            'Left to right, from the top: Cece Porter, Lilah McCormack, Louisa Moquete, Sasha Palmer, Meryl Mizell, Sasha Breygina.',
        img: require('@/assets/images/general/R2K2023.jpg'),
        text: 'The second-ever Right-to-Know H2O team is building on the foundation set by the 2023 cohort, advancing the belief that the human right to safe drinking water must include the right to know if campus water is safe. With over 270 million people relying on water at the world’s 25,000+ colleges and universities, the team aims to create a technology-driven model that campuses everywhere can adopt. Their work begins at Pace’s Pleasantville campus with a water-quality awareness campaign, a summit with local officials, an online learning hub, and a campus survey. Next, the team is developing a data-collection system, digital reporting tools, and an enhanced emergency alert feature for water issues. Supported by the Millennium Fellowship network, these Seidenberg students are preparing tools that other institutions can use to replicate the model.',
    },
    {
        title: '2024 Team',
        description: 'Right to Know H2O - 2024',
        students:
            'Left to right, from the top: Ian Shimba, Isabella Coraci, Lizi Imedashvili, Sebastian Roman, Phoenix Ellrodt, Victor Lima, Charles Metayer.',
        img: require('@/assets/images/general/R2K2024.jpg'),
        text: 'The first-ever Right-to-Know H2O team, led by Prof. John Cronin, is advancing SDG 6: Clean Water and Sanitation by promoting a simple principle: access to clean water is a human right—and so is the right to know if your water is safe. The team is developing a UN-focused petition, U.S. policy recommendations, and a Pace-based water information system to make water quality transparency a global standard.',
    },
    {
        title: '2025 Team',
        description: 'Right to Know H2O - 2025',
        students:
            'Team members left to right, from the top: Isaac Lasso Younes, Silas Gonzalez; Mamoun Edfouf, Prof Leanne Keeley, Phoenix Ellrodt, Lizi Imedashvilli, Kiley Cosgrove, Prof John Cronin, Dillon Talactac, Caroline Zanuto-Winter, and Noor Huda.  Not pictured: Graig Decembre, Nailah Brown, Skyler Flynn.',
        img: require('@/assets/images/general/R2K2025.jpg'),
        text: 'In October 2025, 34 Pace University students were selected—out of over 60,000 global applicants—to join the United Nations Millennium Fellowship, representing a record high for Pace. This year’s cohort stands out not only for its size but also for its international reach: for the first time, Pace’s Blue CoLab partnered with students from Finland’s Häme University of Applied Sciences, forming a 19-member team focused on SDG 6: Clean Water and Sanitation. Their goal: to develop a bilateral action plan to promote the “right to know what’s in our water,” culminating in a joint proposal presented at the United Nations during the Finnish delegation’s visit to Pace. This cohort works across over 13 countries, tackling issues from environmental justice to education, health equity, and renewable systems through student-led projects. ',
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
                        style={[styles.tab, currentItem.title === item.title && styles.activeTab]}
                        onPress={() => setCurrentItem(item)}>
                        <Text style={styles.tabText}>{item.title}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <View style={styles.content}>
                <Text style={styles.title}>{currentItem.title}</Text>
                <Text style={styles.description}>{currentItem.description}</Text>
                <Image source={currentItem.img} style={styles.image} resizeMode="contain" />
                <Text style={styles.students}>{currentItem.students}</Text>
                <Text style={styles.text}>{currentItem.text}</Text>
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
